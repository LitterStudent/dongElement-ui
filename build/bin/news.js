// node news button
// 在conponents.json文件中添加 buttom项

// console.log(process.argv)
const path = require('path');
const fs = require('fs');
const fileSave = require('file-save');
const uppercamelcase = require('uppercamelcase');

const componentname = process.argv[2];

// 将 button-group 转为 ButtonGroup
const ComponentName = uppercamelcase(componentname);

// packages/button/
const PackagePath = path.resolve(__dirname,'../../packages',componentname)

// 1.编写模板 componentName/index.js componentName/src/main.vue
//           theme-chalk/src/xxx.scss
const Files = [
  {
    filename: 'index.js',
    // 文件内容，引入组件，定义组件静态方法 install 用来注册组件，然后导出组件
    content: `import ${ComponentName} from './src/main.vue';

/* istanbul ignore next */
${ComponentName}.install = function(Vue) {
  Vue.component(${ComponentName}.name, ${ComponentName});
};

export default ${ComponentName};`
  },
  {
        filename: 'src/main.vue',
    // 文件内容，sfc
    content: `<template>
  <div class="el-${componentname}"></div>
</template>

<script>
export default {
  name: 'El${ComponentName}'
};
</script>`
  },
  {
    filename: path.join('../../packages/theme-chalk/src', `${componentname}.scss`),
    // 文件基本结构
    content: `@import "mixins/mixins";
@import "common/var";

@include b(${componentname}) {
}`
  }
]

// 2.判断 组件是否以及存在 components.json
const componentsFile = require('../../components.json');
if(componentsFile[componentname]){
  console.error(`${componentname} 已存在.`);
  process.exit(1);  //退出
}

// 将新增的组件样式文件在 index.scss 中引入
const sassPath = path.join(__dirname, '../../packages/theme-chalk/src/index.scss');
const sassImportText = `${fs.readFileSync(sassPath)}@import "./${componentname}.scss";`;
fileSave(sassPath)
  .write(sassImportText, 'utf8')
  .end('\n');

  // 将新增的组件名和路径写入 components.json 文件
componentsFile[componentname] = `./packages/${componentname}/index.js`;
fileSave(path.join(__dirname, '../../components.json'))
  .write(JSON.stringify(componentsFile, null, '  '), 'utf8')
  .end('\n');

  

// 遍历 Files 数组，创建列出的所有文件并写入文件内容
// 在packages文件下添加组件文件夹,index.js，src/main.vue
// 在packages/theme-chalk下添加 component.name.scss
// 在components.json添加一项
Files.forEach(file => {
    console.log(path.join(PackagePath, file.filename));
    fileSave(path.join(PackagePath, file.filename))
      .write(file.content, 'utf8')
      .end('\n');
  });