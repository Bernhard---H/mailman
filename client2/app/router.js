import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('auth', function() {
    this.route('login');
  });
  this.route('domains', function() {
    this.route('domain', function() {
      this.route('account');
      this.route('alias');
    });
  });
  this.route('policies', function() {
    this.route('policy');
  });
});
