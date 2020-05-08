import Route from '@ember/routing/route';

export default class DomainsDomainIndexRoute extends Route {

  model() {
    return [
      {
        username: "hansi",
        domain: "example.com",
        quota: 4096,
        enabled: true,
        sendonly: false
      }, {
        username: "seppi",
        domain: "example.com",
        quota: 1024,
        enabled: false,
        sendonly: false
      }, {
        username: "susi",
        domain: "example.com",
        quota: 512,
        enabled: true,
        sendonly: false
      }, {
        username: "nextcloud",
        domain: "example.com",
        quota: 0,
        enabled: true,
        sendonly: true
      }
    ].map(account => {
      account.quota = account.quota * 1024 * 1024;
      return account;
    });
  }
}
