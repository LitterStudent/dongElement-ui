/**
 * 自动在 /packages/theme-chalk/src/index.scss|css 中引入各个组件包的样式
 * 在全量注册组件库时需要用到该样式文件，即 import 'packages/theme-chalk/src/index.scss
 */

var fs = require('fs');
var path = require('path');
var Components = require('../../components.json');
var themes = [
    'theme-chalk'
]

Components = Object.keys(Components);

var basepath = path.resolve(__dirname,'../../packages/');


function filteExists(filepath) {
    try{
        return fs.statSync(filepath).isFile();
    } catch(err){
        return false;
    }
}


themes.forEach((theme) =>{
    var isScss = theme !== 'theme -default';
    var indexContent = isScss ? '@import "./base.scss";\n' : '@import "./base.css";\n';
    Components.forEach(function(key) {
        if(['icon', 'option', 'option-group'].indexOf(key) > -1) return;

        var fileName = key + (isScss ? '.scss' : '.css');
        indexContent += '@import "./' + fileName + '";\n';

        var filePath = path.resolve(basepath,theme,'src',fileName);
        if (!filteExists(filePath)){
            fs.writeFileSync(filePath,'','utf-8');
            console.log(theme,'创建遗漏的的 ', fileName);
        }
    })
    fs.writeFileSync(path.resolve(basepath,theme,'src', isScss ? 'index.scss' : 'index.css'),indexContent)
})