import Scroller from './scroller';
import Header from './header';
import Detail from './detail';

export default Vue => {
  Vue.component('Scroller', Scroller);
  Vue.component('Header', Header);
  Vue.component('Detail', Detail);
}