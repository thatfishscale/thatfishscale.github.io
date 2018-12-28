const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: 'Free Porn Videos & HD Sex Tube Movies at TBAAHP',
    description: 'Watch and download all Porn Videos at TBAAHP for Free, including HD. Browse sex photos, date girls to fuck & have fun in Live Sex Chat only at TBAAHP!',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Watch and download all Porn Videos at TBAAHP for Free, including HD. Browse sex photos, date girls to fuck & have fun in Live Sex Chat only at TBAAHP!' },
      { name: 'keywords', content: 'porn, videos, free, 18, amateur, college, milf, homemade, slut, pussy, fuck, toy, anime, blowjob, casting, bdsm, bbw, classic, cum, creampie, erotic, escort' },
      // { name: 'juicyads-site-verification', content: '379a8b2b086f7240fb1393f3c86cc4a9' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script:[
      {src: 'http://js.juicyads.com/jam_min.js'}
    ]
  },

  dev: (process.env.NODE_ENV !== 'production'),

  url: process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : 'https://bathroomatahouseparty.com',

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '~/css/main.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/fireauth.js', ssr: false },
    { src: '~/plugins/router-auth.js', ssr: false }
  ],

  router: {
    // middleware: ['router-auth']
  },

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    // '@nuxtjs/sitemap',
    // ['@nuxtjs/google-analytics', {id: 'UA-127953545-1'}],
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt'
  ],

  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    publicPath: '/static/',
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      // Run ESLint on save
      /*
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      */
    }
  }
}
