import Route from '@ember/routing/route';

export default class DomainsDomainRoute extends Route {

  model(params) {
    return {
      domain: params.domain
    };
  }
}
