import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class AuthLoginController extends Controller {
  @inject session;

  @tracked errorMessage = null;

  email = "";
  password = "";

  @action
  async login(event) {
    event.preventDefault();

    try {
      await this.session.authenticate('authenticator:mailman', this.email, this.password);
    } catch(error) {
      if (error) {
        if (error.response) {
          this.errorMessage = error.response;
        } else {
          this.errorMessage = error;
        }
      } else {
        this.errorMessage = "Unkown Error!";
      }
    }

    if (this.session.isAuthenticated) {
      this.errorMessage = null;
      this.email = "";
      this.password = "";

      this.transitionToRoute("domains");
    }
  }
}
