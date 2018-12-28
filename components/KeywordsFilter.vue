<template>
  <div :class="`KeywordsFilter ${showMoreClass}`">
    <b-form-input v-model="input" v-on:input="filter" type="text" placeholder="Filter by category"></b-form-input>

    <b-nav class="filterNav" vertical>
      <b-nav-item href="/" v-on:click="selectKeyword('all')">All Videos</b-nav-item>
      <b-nav-item :href="`?tag=${tag(keyword)}&page=1`" v-for="(keyword, index) in keywords" :key="index" v-on:click="selectKeyword(keyword)">
        {{ keyword }}
      </b-nav-item>
    </b-nav>

    <b-nav vertical>
      <b-nav-item v-if="!showMore" v-on:click="showMoreAction">Show more..</b-nav-item>
    </b-nav>
  </div>
</template>

<script>
  import { main } from '~/services/main'

  export default {
    name: 'keywordsFilter',
    props: ['data', 'cb'],
    data () {
      return {
        showMore: false,
        showMoreClass: '',
        input: '',
        keywords: []
      }
    },
    mounted () {
      this.keywords = this.data
    },
    methods: {
      tag (keyword) {
        return keyword.toLowerCase()
      },
      showMoreAction () {
        this.showMore = true
        this.showMoreClass = 'showMore'
      },
      filter () {
        this.keywords = this.data.filter(key => {
          return key.toLowerCase().indexOf(this.input) !== -1
        })
      },
      selectKeyword (keyword) {
        if (typeof this.cb === 'function') this.cb(keyword.toLowerCase())
      }
    }
  }

</script>
