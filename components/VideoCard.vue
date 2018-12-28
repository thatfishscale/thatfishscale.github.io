<template>
  <b-card v-on:click="initiateVideo(video)"
          :img-src="video.img"
          :img-alt="video.title"
          img-top
          class="mb-2 card-video">

      <p class="card-text">
        <span class="video-title">{{video.title}}</span>
      </p>
<br><br><br><br>
    <div style="clear:both;"></div>

    <div class="video-tags-list">
      <div class="video-tag" v-for="item in video.keywords.split(',')" v-if="item.length !== 0">
        {{item}}
      </div>
    </div>

  </b-card>
</template>

<script>
  export default {
    name: 'VideoCard',
    props: ['video', 'cb'],
    methods: {
      initiateVideo (video) {
        if (typeof this.cb === 'function') this.cb(video)
      }
    }
  }
</script>
