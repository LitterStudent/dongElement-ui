import ElButton from './src/button.vue'


ElButton.install = function (Vue) {
  Vue.component(ElButton.name, ElButton)
}

export default ElButton;