import db from "../db";
import crypto from "crypto";
import { sha512crypt } from "sha512crypt-node";
import argon2 from "argon2";
import bytes from "bytes";

class PasswordHash {
  isValidFor(schema) {
    throw new Error("not implemented!");
  }

  async generateHash(password) {
    throw new Error("not implemented!");
  }

  async comparePasswords(hash, password) {
    throw new Error("not implemented!");
  }
}

class SHA512Hash extends PasswordHash {

  constructor() {
    this.isValidFor = this.isValidFor.bind(this);
    this.randomSalt = this.randomSalt.bind(this);
    this.getSaltFromHash = this.getSaltFromHash.bind(this);
    this.generateHash = this.generateHash.bind(this);
    this.comparePasswords = this.comparePasswords.bind(this);
  }

  isValidFor(schema) {
    return "SHA512-CRYPT" === schema;
  }

  randomSalt() {
    return crypto.randomBytes(64).toString("hex");
  }

  getSaltFromHash(hash) {
    // example:
    // $6$24923bb9fc4a008d$D.aFhvUgjHL9RtXgTH8bDf9MS6MVVTBMMSLPON9OBzeMtVVUKnnrLBInjXNKCvGg5xZGDKFOX2Zhb/3mM7HYF0
    const [, , salt] = hash.split("$");
    return salt;
  }

  async generateHash(password, salt = this.randomSalt()) {
    return sha512crypt(password, salt);
  }

  async comparePasswords(hash, password) {
    const salt = this.getSaltFromHash(hashPassword);
    const plainPasswordHash = await this.hashPassword(plainPassword, salt);

    return plainPasswordHash === hashPassword;
  }
}

class Argon2iHash extends PasswordHash {

  constructor() {
    this.isValidFor = this.isValidFor.bind(this);
    this.generateHash = this.generateHash.bind(this);
    this.comparePasswords = this.comparePasswords.bind(this);
  }

  isValidFor(schema) {
    return "ARGON2I" === schema;
  }

  async generateHash(password) {
    let memoryStr = process.env.MAILMAN_PW_ARGON2I_MEMORY || "64MB";
    let memoryCost = bytes.parse(memoryStr) / 1024;

    return await argon2.hash(password, {
      memoryCost
    });
  }

  async comparePasswords(hash, password) {
    return await argon2.verify(hash, password);
  }
}

async function findAsync(arr, asyncCallback) {
  const promises = arr.map(asyncCallback);
  const results = await Promise.all(promises);
  const index = results.findIndex(result => result);
  return arr[index];
}


const hashFunctions = [new SHA512Hash(), new Argon2iHash()];

class Account {
  async getAccounts() {
    return await db
      .select("id", "username", "domain", "quota", "enabled", "sendonly")
      .from("accounts")
      .orderBy("domain", "asc")
      .orderBy("username", "asc");
  }

  async getAccountsForEmail(email) {
    const [username, domain] = email.split("@");
    return await db
      .select("id", "username", "domain", "quota", "enabled", "sendonly")
      .from("accounts")
      .where({ username, domain })
      .orderBy("domain", "asc")
      .orderBy("username", "asc");
  }

  async getAccount(fields) {
    return await db
      .select()
      .from("accounts")
      .where(fields)
      .limit(1);
  }

  async createAccount(fields) {
    if (fields.password) {
      fields.password = await this.hashPassword(fields.password);
    }
    return await db("accounts").insert(fields);
  }

  async updateAccount(fields, id) {
    if (fields.password) {
      fields.password = await this.hashPassword(fields.password);
    }
    return await db("accounts")
      .update(fields)
      .where({ id });
  }

  async deleteAccount(id) {
    return await db("accounts")
      .delete()
      .where({ id });
  }

  async hashPassword(password) {
    // use old hash function for backwards compatibility
    let schema = process.env.MAILMAN_PW_SCHEMA || "SHA512-CRYPT";

    let result = await hashFunctions.reduce(async (prev, hashFunction) => {
      if (!prev && hashFunction.isValidFor(schema)) {
        let hash = await hashFunction.comparePasswords(hashOnly, plaintext);
      }
      return prev;
    }, Promise.resolve(null));

    if (result === null) {
      throw new Error(
        "the given password hash function is not implemented: " + schema
      );
    }
    return result;
  }

  async comparePasswords(plaintext, hashed) {
    let [dovecotSchema, ...hashParts] = hashed.split("$");
    let schema = dovecotSchema.substring(1, dovecotSchema.length - 1);
    let hash = `$${hashParts.join("$")}`;

    return await findAsync(hashFunctions, async (hashFunction) => {
      console.warn("schema: ", schema, " hashOnly: ", hash);
      if (hashFunction.isValidFor(schema)) {
        console.warn("schema", schema, "fitts", hashFunction.constructor.name);
        let result = await hashFunction.comparePasswords(hash, plaintext);
        console.warn("schema", schema, " result: ", result);
        return result;
      }
      return false;
    });
  }
}

export default new Account();
