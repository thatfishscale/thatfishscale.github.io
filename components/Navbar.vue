<template>
  <b-navbar toggleable="md" type="dark" class="bg-black">
    <b-navbar-toggle target="nav_collapse"/>
    <b-navbar-brand href="#">TBAAHP</b-navbar-brand>
    <b-collapse id="nav_collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/">Videos</b-nav-item>
        <b-nav-item to="/live-cams">Live Cams</b-nav-item>
        <b-nav-item href="https://discordapp.com/invite/X5FEnnQ" target="_blank">Community</b-nav-item>
        <b-nav-item href="/2257">2257</b-nav-item>
        <b-nav-item href="/sitemap">Sitemap</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search" v-model="search.keywords"/>
          <b-button size="sm" class="my-2 my-sm-0" type="submit" v-on:click="searchVideos">Search</b-button>
        </b-nav-form>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
  export default {
    name: 'navbar',
    data () {
      return {
        search: {
          keywords: ''
        }
      }
    },
    mounted () {

    },
    methods: {
      searchVideos (event) {
        event.preventDefault()
        location.replace(`/?search=${this.search.keywords.toLowerCase()}`)
      }
    }
  }
</script>
