import Icon from './src/main.vue';

/* istanbul ignore next */
Icon.install = function(Vue) {
Vue.component(Icon.name, Icon);
};
        
export default Icon;
