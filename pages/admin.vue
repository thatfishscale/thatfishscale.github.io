<template>
  <section class="bg-white">
    <NavbarComponent/>
    <b-container class="mt-5">
      <b-row>
        <b-col>
          <b-form @submit="onSubmit">
            <input type="hidden" name="id" v-model="form.id">

            <b-form-group label="Video title" label-for="titleInput">
              <b-form-input id="titleInput" type="text" v-model="form.title" required placeholder="Enter title, ex: Sabrina sucks dick"></b-form-input>
            </b-form-group>
            <b-form-group label="Video image name" label-for="imgInput">
              <b-form-input id="imgInput" type="text" v-model="form.img" required placeholder="Enter image name, ex: sabrina-sucks-dick.jpg"></b-form-input>
            </b-form-group>
            <b-form-group label="Video video name/url" label-for="uriInput">
              <b-form-input id="uriInput" type="text" v-model="form.uri" placeholder="Enter video name, ex: sabrina-sucks-dick.mp4"></b-form-input>
            </b-form-group>
            <b-form-group label="Video keywords" label-for="keywordsInput">
              <b-form-input id="keywordsInput" type="text" v-model="form.keywords" placeholder="Enter video name, ex: bbw, black, cum"></b-form-input>
            </b-form-group>
            <b-form-group label="Video description" label-for="descriptionInput">
              <b-form-textarea id="descriptionInput" :rows="3" v-model="form.description" placeholder="Enter video description"></b-form-textarea>
            </b-form-group>

            <b-button type="submit" variant="primary">Test video</b-button>
          </b-form>
        </b-col>
        <b-col style="background: #000000">
          <div ref="container"></div>
          <div class="text-white">{{form.title}}</div>
          <div class="text-white">{{form.description}}</div>
          <iframe v-if="!isLocal && form.uri !== ''" :src="form.uri" frameborder=0 width=100% height=400 scrolling=no allowfullscreen=allowfullscreen></iframe>
          <b-button v-if="showSave" type="submit" variant="success" v-on:click="saveVideo">Add video</b-button>
        </b-col>
      </b-row>
    </b-container>

    <b-container class="mt-5" fluid>
      <b-form-row>
        <b-col v-for="(video, index) in videos" :key="index" md="3" xl="2">
          <b-card v-if="video.id !== 'ad'"
                  v-on:click="initiateVideo(video)"
                  :img-src="video.img"
                  :img-alt="video.title"
                  img-top
                  class="mb-2 pointer">
            <p class="card-text">{{video.title}}</p>
            <p class="card-text">{{video.keywords}}</p>
            <b-button type="submit" variant="danger" size="sm" v-on:click="removeVideo(video.id)">Delete</b-button>
          </b-card>
        </b-col>
      </b-form-row>

      <b-pagination-nav v-if="videosPage" align="center" :base-url="`?${tag}page=`" :number-of-pages="videosPage.totalPages" v-model="currentPage"/>
    </b-container>
  </section>
</template>

<script>
  import Vue from 'vue'
  import NavbarComponent from '~/components/Navbar.vue'
  import VideoComponent from '~/components/Video.vue'
  import { main } from '~/services/main'
  import slugify from 'slugify'
  import { db } from '~/services/fireinit'

  export default {
    layout: 'admin',
    components: {
      NavbarComponent,
      VideoComponent
    },
    data () {
      return {
        currentPage: 1,
        tag: '',
        form: {
          id: null,
          title: '',
          img: '',
          uri: '',
          keywords: '',
          description: '',
        },
        showSave: false,
        video: {},
        videosPage: null,
        videos: null,
        isLocal: true,
      }
    },
    mounted () {
      this.currentPage = parseInt(this.$route.query.page || 1)

      db.ref('videos/').on('value', (resp) => {
        this.initialVideos = main.refToArray(resp.val())
        this.videosPage = main.paginator(this.initialVideos, this.currentPage)

        this.videos = this.videosPage.data
        // this._reSaveData()
      })
    },

    methods: {
      onSubmit (evt) {
        evt.preventDefault()

        this.isLocal = main.isLocal(this.form.uri)
        const uri = this.isLocal ? `${main.getVideoDomain()}/videos/${this.form.uri}` : this.form.uri

        this.video = this.form.id ? this.form : {
          id: slugify(this.form.title.trim(), { remove: /[*+~.()'"!:@]/g, lower: true }),
          title: this.form.title.trim(),
          img: `${main.getVideoDomain()}/images/${this.form.img}`,
          uri: uri,
          keywords: this.form.keywords,
          description: this.form.description
        }

        this.initiateVideo(this.video, this.form.id)

        this.showSave = true
      },

      saveVideo (evt) {
        evt.preventDefault()
        this.video.timestamp = Date.now()

        db.ref(`videos/${this.video.id}`).set(this.video).then(() => {
          this.form = { title: '', img: '', uri: '', keywords: '', description: '' }

          this.$refs.container.innerHTML = ''
          this.showSave = false
        })
      },

      removeVideo (videoId) {
        let r = confirm('Fish, are you sure you want to remove this porno?')
        if (r === true) {
          db.ref(`videos/${videoId}`).remove().then(() => {
            // console.log('Video removed ' + videoId)
          })
        }
      },

      initiateVideo (video) {
        this.form = video
        window.scrollTo(0, 0)

        if (this.isLocal) {
          setTimeout(() => {
            if (this.$refs.container !== undefined) {
              const ComponentClass = Vue.extend(VideoComponent)
              const instance = new ComponentClass({
                propsData: {
                  video: video,
                  description: video.description,
                  cb: this._handleVideoCloseButton,
                  closeButton: false
                }
              })

              instance.$mount()
              this.$refs.container.innerHTML = ''
              this.$refs.container.appendChild(instance.$el)
            }
          }, 300)
        }
      },

      _handleVideoCloseButton () {

      },

      _reSaveData () {
        for (let i = 0; i < this.videos.length; i++) {
          if (this.videos[i].img && this.videos[i].uri) {
            let v = {
              id: this.videos[i].id,
              img: this.videos[i].img.replace('http:', ''),
              uri: this.videos[i].uri.replace('http:', ''),
              keywords: this.videos[i].keywords || '',
              title: this.videos[i].title,
              description: this.videos[i].description || '',
              timestamp: this.videos[i].timestamp || Date.now(),
            }

            db.ref(`videos/${v.id}`).set(v).then(() => {
              console.warn(i)
            })
          }
        }
      }
    }
  }
</script>

<style>
  *, h1, h2, h3, h4 {
    font-size : 14px;
  }
</style>
