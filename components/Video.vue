<template>
  <div class="video-player">
    <b-button v-if="closeButton" variant="secondary" v-on:click="closePlayer">X</b-button>
    <video v-if="isLocal && video.uri !== ''" controls width="100%" :poster="video.img">
      <source :src="video.uri" type="video/mp4">
    </video>

    <iframe v-if="!isLocal && video.uri !== ''" :src="video.uri" frameborder="0" width="100%" :height="isLocal ? 0 : 500" scrolling="no" allowfullscreen="allowfullscreen"></iframe>
    <h1 class="text-white pre">{{ video.title }}</h1>
    <h2 class="text-white pre" v-html="description"></h2>
<div class="video-tags-list">
      <div class="video-tag" v-for="item in video.keywords.split(',')" v-if="item.length !== 0">
        {{item}}
      </div>
    </div>
    <div style="clear:both;"></div>
    <social-sharing :url="`http://bathroomatahouseparty.com?video=${videoQuery}`"
                    title="Free Porn Videos & HD Sex Tube Movies at TBAAHP"
                    description="Watch and download all Porn Videos at TBAAHP for Free, including HD. Browse sex photos, date girls to fuck & have fun in Live Sex Chat only at TBAAHP!"
                    :quote="video.title"
                    hashtags="bathroomatahouseparty,tbaahp"
                    twitter-user="tbaahp"
                    inline-template>
      <div>

        <network network="facebook" url="https://www.facebook.com/groups/479877949157768" class="social-icon">
          <img src="~/assets/social/facebook.svg">
        </network>
        <network network="reddit" url="https://www.reddit.com/r/tbaahp" class="social-icon">
          <img src="~/assets/social/reddit.svg">
        </network>
        <network network="twitter" url="https://twitter.com/tbaahp" class="social-icon">
          <img src="~/assets/social/twitter.svg">
        </network>
      </div>
    </social-sharing>


    <div id="disqus_thread"></div>
  </div>
</template>

<script>
  import { main } from '~/services/main'

  export default {
    name: 'vue-plyr',
    props: ['video', 'description', 'videoQuery', 'ad', 'cb', 'closeButton'],
    data () {
      return {
        page: {},
        isLocal: main.isLocal(this.video.uri),
      }
    },

    mounted () {
      this.initDisqus()
    },
    methods: {
      closePlayer () {
        if (typeof this.cb === 'function') this.cb()
      },

      initDisqus () {
        window.disqus_config = () => {
          this.page.url = `http://bathroomatahouseparty.com?video=${this.videoQuery}`
          this.page.identifier = this.videoQuery
        }
        setTimeout(() => {
          let d = document
            , s = d.createElement('script')
          s.setAttribute('id', 'embed-disqus')
          s.setAttribute('data-timestamp', +new Date())
          s.type = 'text/javascript'
          s.async = true
          s.src = `//bathroomatahouseparty.disqus.com/embed.js`
          ;(d.head || d.body).appendChild(s)
        }, 0)
      },
    }
  }

</script>
