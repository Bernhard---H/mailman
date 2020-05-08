import Route from '@ember/routing/route';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default class AuthLoginRoute extends Route.extend(UnauthenticatedRouteMixin) {
}
