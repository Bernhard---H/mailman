import Route from '@ember/routing/route';

export default class DomainsRoute extends Route {
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
