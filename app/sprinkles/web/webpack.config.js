var _ = require('lodash');
var glob = require('glob');
var Encore = require('@symfony/webpack-encore');
const path = require('path');

Encore
    .setOutputPath('assets/build/')
    .setPublicPath('/build')
    .cleanupOutputBeforeBuild()
    .autoProvidejQuery()
    .autoProvideVariables({
        "window.jQuery": "jquery",
        "window.Bloodhound": require.resolve('bloodhound-js'),
        "jQuery.tagsinput": "bootstrap-tagsinput",
        "window.Vue":"vue"
    })
    .enableSassLoader()
    .enableVueLoader()
    .enableVersioning(false)
    .createSharedEntry('js/common', ['jquery','Vue'])
    .addEntry('js/app', ['./app/main.js'])
// .addEntry('js/login', './assets/js/login.js')
// .addEntry('js/admin', './assets/js/admin.js')
// .addEntry('js/search', './assets/js/search.js')
// .addStyleEntry('css/app', ['./assets/scss/app.scss'])
// .addStyleEntry('css/admin', ['./assets/scss/admin.scss'])
;

const _config = Encore.getWebpackConfig();
_config.resolve = {
    extensions: ['.js', '.vue', '.json'],
    alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': 'app',
    },
    modules: [
        'node_modules',
        path.resolve(__dirname, "")
    ]
}
//config.resolve.alias.lang=  "assets/js/lang"


//config.watchOptions = { poll: true, ignored: /node_modules/ };

//console.log(exports[0].resolve.alias)
module.exports = _config

