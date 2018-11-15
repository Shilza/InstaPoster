const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.react('resources/js/app.js', 'public/js')
    .styles([
            'resources/assets/css/landingImage.css',
            'resources/assets/css/imageComment.css',
            'resources/assets/css/imagesSlider.css',
            'resources/assets/css/header.css',
            'node_modules/antd/dist/antd.css'
        ],
        'public/css/all.css');

mix.disableNotifications();