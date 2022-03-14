/* Automatically generated by './build/bin/build-entry.js' */
import Alert from '../packages/alert/index.js';
import Button from '../packages/button/index.js';
import Card from '../packages/card/index.js';
import Icon from '../packages/icon/index.js';
import Badge from '../packages/badge/index.js';
import Test from '../packages/test/index.js';
import Input from '../packages/input/index.js';

const components = [
 Alert,
 Button,
 Card,
 Icon,
 Badge,
 Test,
 Input
];
const install = function(Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
};
/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  version: '1.0.0',
  install,
  Alert,
  Button,
  Card,
  Icon,
  Badge,
  Test,
  Input
};
