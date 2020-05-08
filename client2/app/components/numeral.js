import Component from '@glimmer/component';
import numeral from 'numeral';
import { tracked } from '@glimmer/tracking';

export default class NumeralComponent extends Component {

  get format() {
    return numeral(this.args.value).format(this.args.format);
  }
}
