var _ = require('lodash');
var glob = require('glob');
var Encore = require('@symfony/webpack-encore');
const path = require('path');

Encore
    .setOutputPath('public/build/')
    .setPublicPath('/build')
    .cleanupOutputBeforeBuild()
    .autoProvidejQuery()
    .autoProvideVariables({
        "window.jQuery": "jquery",
        "window.Bloodhound": require.resolve('bloodhound-js'),
        "jQuery.tagsinput": "bootstrap-tagsinput"
    })
    .enableSassLoader()
    .enableVueLoader()
    .enableVersioning(false)
    .createSharedEntry('js/common', ['jquery'])
//.addEntry('js/app', './assets/js/home.js')
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
    },
    modules: [
        'node_modules',
        path.resolve(__dirname, "")
    ]
}
//config.resolve.alias.lang=  "assets/js/lang"

var exports = [_config];

glob.sync('app/sprinkles/**/webpack.config.js', {ignore: 'packages/**/node_modules/**'}).forEach(function (file) {
    var dir = path.join(__dirname, path.dirname(file));


    exports = exports.concat(require('./' + file).map(function (config) {

        return _.merge({},_config, {context: dir, output: {path: dir}}, config);
    }));

});
//config.watchOptions = { poll: true, ignored: /node_modules/ };

//console.log(exports[0].resolve.alias)
module.exports = exports

