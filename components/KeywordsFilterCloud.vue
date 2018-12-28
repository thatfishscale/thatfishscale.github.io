<template>
  <div>
    <b-form-input v-model="input" v-on:input="filter" type="text" placeholder="Filter by category"></b-form-input>

    <b-link class="link-filter" :href="`?page=1`" v-on:click="selectKeyword('all')">All Videos</b-link>
    <b-link class="link-filter" v-if="index < 50" :href="`?tag=${tag(keyword)}&page=1`" v-for="(keyword, index) in keywords" :key="index" v-on:click="selectKeyword(keyword)">
      {{ keyword }}
    </b-link>

    <b-nav v-if="!showMore" vertical>
      <b-nav-item v-on:click="showMoreAction">Show more keywords..</b-nav-item>
    </b-nav>

    <b-link class="link-filter" v-if="index >= 50 && showMore" :href="`?tag=${tag(keyword)}&page=1`" v-for="(keyword, index) in keywords" :key="index" v-on:click="selectKeyword(keyword)">
      {{ keyword }}
    </b-link>
  </div>
</template>

<script>
  import { main } from '~/services/main'

  export default {
    name: 'keywordsFilterCloud',
    props: ['data', 'cb'],
    data () {
      return {
        showMore: false,
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
