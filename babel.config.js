/* eslint-disable func-names */
module.exports = function (api) {
    api.cache(true);
    return {
        presets: [
            'next/babel',
        ],
        plugins: [
            [
                'module-resolver',
                {
                    root: [
                        '.',
                    ],
                    alias: {
                        '@root': './',
                        '@core': './core',
                        '@middlewares': './core/middlewares',
                        '@helpers': './core/helpers',
                        '@services': './core/services',
                        '@config': './swift.config.js',

                        '@next_headcustom': './core/nextjs_custom/HeadCustom',
                        '@next_nextscriptcustom': './core/nextjs_custom/NextScriptCustom',

                        '@middleware_route': './core/middlewares/route',

                        '@graphql_request': './core/api/graphql/request',

                        '@lib': './core/lib',
                        '@lib_apollo': './core/lib/apollo',
                        '@lib_gtag': './core/lib/gtag',
                        '@lib_firebase': './core/lib/firebase',
                        '@i18n': './core/lib/i18n',

                        '@layout': 'swift-pwa-core/core/modules/theme/layout',

                        // theme
                        '@theme': './core/theme',
                        '@theme_color': './core/theme/colors',
                        '@theme_mixins': './core/theme/mixins',
                        '@theme_theme': './core/theme/theme',
                        '@theme_typography': './core/theme/typography',
                        '@theme_vars': './core/theme/vars',

                        // helpers
                        '@helper_auth': './core/helpers/auth',
                        '@helper_cartid': './core/helpers/cartId',
                        '@helper_checkcomponents': './core/helpers/checkComponent',
                        '@helper_checkimagesrc': './core/helpers/checkImageSrc',
                        '@helper_config': './core/helpers/config',
                        '@helper_cookies': './core/helpers/cookies',
                        '@helper_currency': './core/helpers/currency',
                        '@helper_date': './core/helpers/date',
                        '@helper_encryption': './core/helpers/encryption',
                        '@helper_fonts': './core/helpers/fonts',
                        '@helper_generatequery': './core/helpers/generateQuery',
                        '@helper_getpath': './core/helpers/getPath',
                        '@helper_noreload': './core/helpers/noReload',
                        '@helper_passwordstrength': './core/helpers/passwordStrength',
                        '@helper_productbyvariant': './core/helpers/productByVariant',
                        '@helper_regex': './core/helpers/regex',
                        '@helper_text': './core/helpers/text',
                        '@helper_theme': './core/helpers/theme',
                        '@helper_urlparser': './core/helpers/urlParser',
                        '@helper_zxcvbn': './core/helpers/zxcvbn',
                        '@helper_localstorage': './core/helpers/localstorage',

                        // commons
                        '@common_button': 'swift-pwa-core/core/modules/commons/Button',
                        '@common_buttonqty': 'swift-pwa-core/core/modules/commons/ButtonQty',
                        '@common_breadcrumb': 'swift-pwa-core/core/modules/commons/Breadcrumb',
                        '@common_confirmdialog': 'swift-pwa-core/core/modules/commons/ConfirmDialog',
                        '@common_dropfile': 'swift-pwa-core/core/modules/commons/DropFile',
                        '@common_googlemaps': 'swift-pwa-core/core/modules/commons/GoogleMaps',
                        '@common_gridlist': 'swift-pwa-core/core/modules/commons/GridList',
                        '@common_priceformat': 'swift-pwa-core/core/modules/commons/PriceFormat',
                        '@common_ratingstar': 'swift-pwa-core/core/modules/commons/RatingStar',
                        '@common_tabs': 'swift-pwa-core/core/modules/commons/Tabs',
                        '@common_toast': 'swift-pwa-core/core/modules/commons/Toast',
                        '@common_typography': 'swift-pwa-core/core/modules/commons/Typography',
                        '@common_checkbox': 'swift-pwa-core/core/modules/commons/CheckBox',
                        '@common_password': 'swift-pwa-core/core/modules/commons/Password',
                        '@common_radio': 'swift-pwa-core/core/modules/commons/Radio',
                        '@common_rangeslider': 'swift-pwa-core/core/modules/commons/RangeSlider',
                        '@common_select': 'swift-pwa-core/core/modules/commons/Select',
                        '@common_textfield': 'swift-pwa-core/core/modules/commons/TextField',
                        '@common_carousel': 'swift-pwa-core/core/modules/commons/carousel',
                        '@common_image': 'swift-pwa-core/core/modules/commons/Image',
                        '@common_backdrop': 'swift-pwa-core/core/modules/commons/Backdrop',
                        '@common_pageprogress': 'swift-pwa-core/core/modules/commons/PageProgress',
                        '@common_slick': 'swift-pwa-core/core/modules/commons/Slick',
                        '@common_slider': 'swift-pwa-core/core/modules/commons/Slider',
                        '@common_filterdialog': 'swift-pwa-core/core/modules/commons/FilterDialog',
                        '@common_forms': 'swift-pwa-core/core/modules/commons/Forms',
                        '@common_searchmodal': 'swift-pwa-core/core/modules/commons/SearchModal',
                        '@common_loaders': 'swift-pwa-core/core/modules/commons/Loaders',
                        '@common_navigation': 'swift-pwa-core/core/modules/commons/Navigation',
                        '@common_spancategory': 'swift-pwa-core/core/modules/commons/SpanCategory',
                        '@common_span': 'swift-pwa-core/core/modules/commons/Span',
                        '@common_skeleton': 'swift-pwa-core/core/modules/commons/Skeleton',
                        '@common_scrolltotop': 'swift-pwa-core/core/modules/commons/ScrollToTop',
                        '@common_headermobile': 'swift-pwa-core/core/modules/theme/components/header/mobile',
                        '@common_headerdesktop': 'swift-pwa-core/core/modules/theme/components/header/desktop',
                        '@common_bottomnavigation': 'swift-pwa-core/core/modules/theme/components/bottom-navigation/mobile',
                        '@common_footer': 'swift-pwa-core/core/modules/theme/components/footer/desktop',
                        '@common_productlabel': 'swift-pwa-core/core/modules/commons/ProductLabel',
                        '@common_optionconfigurable': 'swift-pwa-core/core/modules/commons/OptionConfigurable',
                    },
                },
            ],
        ],
    };
};
