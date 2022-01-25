/* --------------------------------------- */
/* STORE CONFIGURATION
/* --------------------------------------- */

const HOST = {
    local: 'http://localhost:3000',
    dev: 'http://localhost:3000',
    stage: 'http://localhost:3000',
    prod: 'http://localhost:3000',
};

/* Magento GraphQL Endpoint */
const graphqlEndpoint = {
    local: 'https://swiftoms-gql.testingnow.me/graphql',
    dev: 'https://swiftoms-gql.testingnow.me/graphql',
    stage: 'https://swiftoms-gql.testingnow.me/graphql',
    prod: 'https://swiftoms-gql.testingnow.me/graphql',
};

/* --------------------------------------- */
/* FEATURES CONFIGURATION
/* --------------------------------------- */

const installMessage = 'Get our free app.';
const appName = 'Swift APP';

/* Social Sharing */
const shareIcon = {
    facebook: true,
    twitter: true,
    line: true,
    email: true,
    telegram: true,
    pinterest: false,
    linkedin: false,
};

/* Password Validator */
const passwordStrength = {
    minValue: 8,
    maxValue: 20,
    numberOfRequiredClass: 3, // Lowercase + Uppercse + Dgits + spesial caracter = 4
};

/* Translation */
const languagesLabel = {
    id: 'Bahasa Indonesia',
    en: 'English',
};

/* Google Tag Manager
 * before enable this configuration, firstly you need to import the gtm tags json.
 * gtm tags json need to be exported from Magento admin in Welpixel GTM configuration.
 * adjust the tag name if you want before import into GTM dashboard setting.
 * as reference you can find sample gtm tags in folder "sample/gtm" folder
 * NOTE: this GTM functionality includes connecting to GA via GTM tag.
 */
const GTM = {
    enable: false,
    gtmId: {
        local: '', // sample: GTM-N76V8KQ
        dev: '', // sample: GTM-N76V8KQ
        stage: '', // sample: GTM-N76V8KQ
        prod: '', // sample: GTM-N76V8KQ
    },
};

/* Recapthca Configuration */
const recaptcha = {
    enable: false,
    siteKey: {
        local: '', // sample: 6LcZmLEZAAAAADkdlp8S8tExis2EVhNiuMv6ayo7
        dev: '', // sample: 6LcZmLEZAAAAADkdlp8S8tExis2EVhNiuMv6ayo7
        stage: '', // sample: 6LcZmLEZAAAAADkdlp8S8tExis2EVhNiuMv6ayo7
        prod: '', // sample: 6LcZmLEZAAAAADkdlp8S8tExis2EVhNiuMv6ayo7
    },
    serverKey: {
        local: '', // sample: 6LcZmLEZAAAAANHhkqwoRna2vqIVWHNKwOvxm26n
        dev: '', // sample: 6LcZmLEZAAAAANHhkqwoRna2vqIVWHNKwOvxm26n
        stage: '', // sample: 6LcZmLEZAAAAANHhkqwoRna2vqIVWHNKwOvxm26n
        prod: '', // sample: 6LcZmLEZAAAAANHhkqwoRna2vqIVWHNKwOvxm26n
    },
};

const sentry = {
    enabled: false,
    enableMode: 'production',
    dsn: {
        local: 'https://9700d1051b5b4e13a450411af92303e2@o451158.ingest.sentry.io/5436645',
        dev: 'https://9700d1051b5b4e13a450411af92303e2@o451158.ingest.sentry.io/5436645',
        stage: 'https://9700d1051b5b4e13a450411af92303e2@o451158.ingest.sentry.io/5436645',
        prod: 'https://9700d1051b5b4e13a450411af92303e2@o451158.ingest.sentry.io/5436645',
    },
};

/* Loader */
const loaderImage = '/assets/img/loader.svg';

/* --------------------------------------- */
/* LOCAD DATA CACHE & COKIES
/* --------------------------------------- */

const expiredCookies = 6;
const storeConfigNameCookie = 'storeConfig';
const nameCartId = 'nci';
const custDataNameCookie = 'cdt';
const nameCheckoutCookie = 'ccdt';
const nameGlobalCookie = 'spwa';
const nameToken = 'sk';
const expiredToken = new Date(Date.now() + 1000 * 60 * 60);
const expiredDefault = 365;
const localResolverKey = 'resolver';

const features = {
    ssrCache: false,
    facebookMetaId: {
        enabled: false,
        app_id: '', // if enabled add fb app id here. e.g. 3080154482073095
    },
    vesMenu: {
        enabled: true,
    },
    customInstallApp: {
        enabled: true,
    },
    pushNotification: {
        enabled: false,
        config: {
            apiKey: 'AIzaSyBwAPEXdjKf84q-T7tUxVJBcOJJ8hzrXTI',
            authDomain: 'swift-pwa.firebaseapp.com',
            databaseURL: 'https://swift-pwa.firebaseio.com',
            projectId: 'swift-pwa',
            storageBucket: 'swift-pwa.appspot.com',
            messagingSenderId: '1029426161575',
            appId: '1:1029426161575:web:2c57e3f74cb00e0132f882',
            measurementId: 'G-VSRV1DJVSQ',
        },
    },
};

const nossrCache = [
    '/graphql',
];

const debuging = {
    originalError: false,
};

module.exports = {
    sentry,
    debuging,
    GTM,
    HOST,
    graphqlEndpoint,
    shareIcon,
    passwordStrength,
    languagesLabel,
    expiredCookies,
    storeConfigNameCookie,
    nameCartId,
    nameToken,
    expiredToken,
    expiredDefault,
    loaderImage,
    custDataNameCookie,
    nameCheckoutCookie,
    nameGlobalCookie,
    features,
    nossrCache,
    recaptcha,
    installMessage,
    appName,
    localResolverKey,
};
