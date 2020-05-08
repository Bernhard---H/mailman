import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default class DomainsRoute extends Route.extend(AuthenticatedRouteMixin) {
  authenticationRoute = 'auth.login';

  model() {
    return [
      {
        id: 1,
        domain: "example-1.com"
      }, {
        id: 2,
        domain: "example-2.com"
      }, {
        id: 3,
        domain: "example-3.com"
      }, {
        id: 4,
        domain: "example-4.com"
      }, {
        id: 5,
        domain: "example-5.com"
      }
    ]
  }
}
