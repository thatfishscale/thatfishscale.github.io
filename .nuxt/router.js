import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'

const _69c27218 = () => interopDefault(import('..\\pages\\2257.vue' /* webpackChunkName: "pages_2257" */))
const _3c2b6689 = () => interopDefault(import('..\\pages\\admin.vue' /* webpackChunkName: "pages_admin" */))
const _2c55d523 = () => interopDefault(import('..\\pages\\community.vue' /* webpackChunkName: "pages_community" */))
const _1d2175ff = () => interopDefault(import('..\\pages\\live-cams.vue' /* webpackChunkName: "pages_live-cams" */))
const _573894ba = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages_login" */))
const _a7132722 = () => interopDefault(import('..\\pages\\sitemap.vue' /* webpackChunkName: "pages_sitemap" */))
const _0abc128c = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

Vue.use(Router)

if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some(r => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise((resolve) => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}

export function createRouter() {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,

    routes: [{
      path: "/2257",
      component: _69c27218,
      name: "2257"
    }, {
      path: "/admin",
      component: _3c2b6689,
      name: "admin"
    }, {
      path: "/community",
      component: _2c55d523,
      name: "community"
    }, {
      path: "/live-cams",
      component: _1d2175ff,
      name: "live-cams"
    }, {
      path: "/login",
      component: _573894ba,
      name: "login"
    }, {
      path: "/sitemap",
      component: _a7132722,
      name: "sitemap"
    }, {
      path: "/",
      component: _0abc128c,
      name: "index"
    }],

    fallback: false
  })
}
