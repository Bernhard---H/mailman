import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default class PoliciesRoute extends Route.extend(AuthenticatedRouteMixin) {
  authenticationRoute = 'auth.login';

}
