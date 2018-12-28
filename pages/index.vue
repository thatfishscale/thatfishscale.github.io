<template>
  <section>
    <div class="loader-container" v-if="!videos">
      <div class="loader"></div>
    </div>

    <NavbarComponent/>

    <div class="VideoPlayer-container">
      <b-container v-if="showPlayer">
        <div ref="container"></div>
      </b-container>

      <div class="text-center hidden-xs">
        <ins id="714218" data-width="728" data-height="102" class="Ad-leaderboard"></ins>
      </div>
    </div>

    <b-container class="Videos-container" fluid>
      <b-row>
        <b-col class="hidden-xs">
          <KeywordsFilterComponent v-if="videos" :data="keywords"/>
        </b-col>

        <b-col md="9" lg="10">

          <b-link v-on:click="showFilterCloudAction" class="visible-xs link-filter">Filter by keywords</b-link>
          <KeywordsFilterCloudComponent v-if="showFilterCloud && videos" :data="keywords"/>

          <div class="text-center visible-xs">
            <ins id="714217" data-width="300" data-height="262"></ins>
          </div>

          <b-row v-if="videos">
            <b-col v-for="(video, index) in videos.data" :key="index" md="6" xl="3">
              <VideoCardComponent :video="video" :cb="goToVideo"/>
            </b-col>
          </b-row>

          <div class="text-center visible-xs">
            <ins id="716756" data-width="300" data-height="262"></ins>
          </div>

        </b-col>
      </b-row>

      <b-pagination-nav v-if="videos" align="center" :base-url="`?${tag}page=`" :number-of-pages="videos.totalPages" v-model="currentPage"/>
    </b-container>
  </section>
</template>

<script>
  import Vue from 'vue'

  const SocialSharing = require('vue-social-sharing')
  Vue.use(SocialSharing)

  import anchorme from 'anchorme'
  import NavbarComponent from '~/components/Navbar.vue'
  import VideoCardComponent from '~/components/VideoCard.vue'
  import VideoComponent from '~/components/Video.vue'
  import KeywordsFilterComponent from '~/components/KeywordsFilter.vue'
  import KeywordsFilterCloudComponent from '~/components/KeywordsFilterCloud.vue'
  import FooterComponent from '~/components/Footer.vue'
  import { db } from '~/services/fireinit'
  import { main } from '~/services/main'
  import config from '../nuxt.config'

  export default {
    head () {
      return {
        title: this.title,
        meta: [
          { hid: 'description', name: 'description', content: this.description }
        ]
      }
    },
    data () {
      return {
        showFilterCloud: false,
        currentPage: 1,
        initialVideos: null,
        videos: null,
        showPlayer: false,
        keywords: [],
        video: null,
        tag: '',
      }
    },
    components: {
      NavbarComponent,
      FooterComponent,
      VideoCardComponent,
      VideoComponent,
      KeywordsFilterComponent,
      KeywordsFilterCloudComponent
    },
    asyncData (context) {
      return {
        title: context.route.query.video ? context.route.query.video.split('-').join(' ') : config.head.title,
        description: context.route.query.video ? context.route.query.video.split('-').join(' ') + ' ' + config.head.description : config.head.description
      }
    },
    mounted () {
      this.currentPage = parseInt(this.$route.query.page || 1)

      if (this.$route.query.tag) {
        this.tag = `tag=${this.$route.query.tag}&`
      }

      if (this.$route.query.video) {
        this.getOneVideo(this.$route.query.video)
      }

      main.resetVideos()

      let localVideos = null
      try {
        localVideos = localStorage.getItem('tbaahp_videos')
      } catch (e) {
        db.ref('videos/').once('value').then(resp => {
          this.initialVideos = main.refToArray(resp.val())
          this.handleVideos(this.initialVideos)
        })
      }

      if (localVideos === null) {
        db.ref('videos/').once('value').then(resp => {
          this.initialVideos = main.refToArray(resp.val())
          localStorage.setItem('tbaahp_videos', JSON.stringify(this.initialVideos))
          this.handleVideos(this.initialVideos)
        })
      } else {
        this.initialVideos = JSON.parse(localVideos)
        this.handleVideos(this.initialVideos)
      }
    },
    methods: {
      getOneVideo (videoId) {
        db.ref(`videos/${videoId}`).once('value').then(resp => {
          this.video = resp.val()

          if (this.video) this.initiateVideo(this.video)
        })
      },

      handleVideos (videos) {
        if (this.$route.query.tag && !this.$route.query.search) {
          videos = main.filterKeyword(this.initialVideos, this.$route.query.tag)
        }

        if (this.$route.query.search) {
          videos = main.filterSearch(this.initialVideos, this.$route.query.search)
        }

        this.videos = main.paginator(videos, this.currentPage)
        this.keywords = main.getKeywords(this.initialVideos)
      },

      initiateVideo (video) {
        if (!video) return

        this.showPlayer = true
        this.showFilterCloud = false
        window.scrollTo(0, 0)

        setTimeout(() => {
          if (this.$refs.container !== undefined) {
            const ComponentClass = Vue.extend(VideoComponent)

            const instance = new ComponentClass({
              propsData: {
                videoQuery: this.$route.query.video,
                video: video,
                description: anchorme(video.description, {
                  attributes: [{
                    name: 'target',
                    value: '_blank'
                  }]
                }),
                cb: this._handleVideoCloseButton,
                closeButton: true
              }
            })

            instance.$mount()
            this.$refs.container.innerHTML = ''
            this.$refs.container.appendChild(instance.$el)
          }
        }, 300)
      },

      goToVideo (video) {
        // window.location.href = `${config.url}?video=${video.id}`;

        this.$router.replace(`?video=${video.id}`)
        this.initiateVideo(video)
      },

      showFilterCloudAction () {
        this.showFilterCloud = !this.showFilterCloud
      },

      _handleVideoCloseButton () {
        this.showPlayer = false
      },
    }
  }
</script>

<style>

</style>
