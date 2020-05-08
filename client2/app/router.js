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
    this.route('domain', { path: '/:domain_name' }, function() {
      this.route('account', { path: 'account/:account_name' });
      this.route('alias', { path: 'alias/:alias_email' });
    });
  });
  this.route('policies', function() {
    this.route('policy');
  });
});
