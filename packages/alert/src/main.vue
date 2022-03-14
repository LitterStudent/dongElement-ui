<template>
  <transition name="el-alert-fade">
    <div class="el-alert"
    :class="[typeClass, center ? 'is-center' : '', 'is-' + effect]"
    v-show="visible"
  >
   <i class="el-alert__icon" :class="[ iconClass, isBigIcon ]" v-if="showIcon"></i>
   <div class="el-alert__content ">
    <span class="el-alert__title" :class="[ isBoldTitle ]" v-if="title || $slots.title">
      <slot name='title'>{{title}}</slot>
    </span>
    <p class="el-alert__description" v-if="$slots.default && !description"><slot></slot></p>
    <p class="el-alert__description" v-if="!$slots.default && description">{{description}}</p>
    <i class="el-alert__closebtn"
       :class="{ 'is-customed': closeText !== '', 'el-icon-close': closeText === '' }" 
       v-show="closable" 
       @click="close()"
    >
      {{closeText}}
    </i>
   </div>
  </div>
  </transition>
</template>

<script>
const TYPE_CLASSES_MAP = {
    'success': 'el-icon-success',
    'warning': 'el-icon-warning',
    'error': 'el-icon-error'
};
export default {
  name: 'ElAlert',
  props: {
    description:{
    type: String,
    default: ""
    },
    type: {
      type: String,
      default: 'info'
    },
    effect: {
     type: String,
     default: 'light',
     validator: function(value) {
      return ['light', 'dark'].indexOf(value) !== -1;
     }
    },
    center: Boolean,
    title: {
      type: String,
      default: ''
    },
    closeText: {
      type: String,
      default: ''
    },
    closable: {
      type: Boolean,
      default: true
    },
    description: {
      type: String,
      default: ''
    },
    showIcon: Boolean,
  },
  computed: {
    typeClass() {
        return `el-alert--${ this.type }`;
    },
    isBoldTitle() {
        return this.description || this.$slots.default ? 'is-bold' : '';
    },
    iconClass() {
      return TYPE_CLASSES_MAP[this.type] || 'el-icon-info';
    },
    isBigIcon() {
      return this.description || this.$slots.default ? 'is-big' : '';
    },

  },
  data(){
    return {
      visible: true
    }
  },
  methods:{
    close(){
      this.visible =false;
      this.$emit('close')
    }
  }


};
</script>
