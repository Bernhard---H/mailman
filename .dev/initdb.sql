CREATE TABLE `domains` (
  `id`     int unsigned NOT NULL AUTO_INCREMENT,
  `domain` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY (`domain`)
);

insert into domains (domain)
values ('example.com');

CREATE TABLE `accounts` (
  `id`       int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(64)  NOT NULL,
  `domain`   varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `quota`    int unsigned          DEFAULT '0',
  `enabled`  boolean               DEFAULT '0',
  `sendonly` boolean               DEFAULT '0',
  PRIMARY KEY (id),
  UNIQUE KEY (`username`, `domain`),
  FOREIGN KEY (`domain`) REFERENCES `domains` (`domain`)
);

insert into accounts (username, domain, password, quota, enabled, sendonly)
values ('admin',
        'example.com',
        '{SHA512-CRYPT}$6$8beb58c5e59ee2da$tElO4XZsIQWUEoZgmyxeIxviB0fAEOXreRl3Qgn1R4nN/OiRx3hTXhpInjnE8k4fGvnweEYEOqzB0CcRN3Nsj.',
        1024,
        true,
        false);

CREATE TABLE `aliases` (
  `id`                   int unsigned NOT NULL AUTO_INCREMENT,
  `source_username`      varchar(64)  NOT NULL,
  `source_domain`        varchar(255) NOT NULL,
  `destination_username` varchar(64)  NOT NULL,
  `destination_domain`   varchar(255) NOT NULL,
  `enabled`              boolean               DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY (`source_username`, `source_domain`, `destination_username`, `destination_domain`),
  FOREIGN KEY (`source_domain`) REFERENCES `domains` (`domain`)
);

CREATE TABLE `tlspolicies` (
  `id`     int unsigned                                                                            NOT NULL AUTO_INCREMENT,
  `domain` varchar(255)                                                                            NOT NULL,
  `policy` enum ('none', 'may', 'encrypt', 'dane', 'dane-only', 'fingerprint', 'verify', 'secure') NOT NULL,
  `params` varchar(255),
  PRIMARY KEY (`id`),
  UNIQUE KEY (`domain`)
);

insert into tlspolicies (domain, policy, params)
values ('gmx.de', 'secure', 'match=.gmx.net');
insert into tlspolicies (domain, policy)
values ('mailbox.org', 'dane-only');

