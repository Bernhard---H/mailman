import Model,{attr} from '@ember-data/model';

export default class AccountModel extends Model {
    @attr username;
    @attr domain;
    @attr password;
    @attr("number") quota;
    @attr("boolean") enabled;
    @attr("boolean") sendonly;
}
