<template>
  <section>
    <NavbarComponent/>
    <section class="container">
      <b-card class="mt-5">
        <h1 class="title">2257</h1>

        <p>18 USC 2257 Statement: {{ site }}</p>
        <p>{{ site }} is not a producer (primary or secondary) of any and all of the content found on the website ({{ site }}). With respect to the records as per 18 USC 2257 for any and all content found on this site, please kindly direct your request to the site for which the content was produced.</p>
        <p>{{ site }} is a video sharing site in which allows for the uploading, sharing and general viewing of various types of adult content and while {{ site }} does the best it can with verifying compliance, it may not be 100% accurate.</p>
        <p>{{ site }} abides by the following procedures to ensure compliance:</p>
        <p>Requiring all users to be 18 years of age to upload videos.</p>
        <p>When uploading, user must verify the content; assure he/she is 18 years of age; certify that he/she keeps records of the models in the content and that they are over 18 years of age.</p>
        <p>For further assistance and/or information in finding the content's originating site, please contact {{ site }} compliance at copyright@{{ site }}</p>
        <p>{{ site }} allows content to be flagged as inappropriate. Should any content be flagged as illegal, unlawful, harassing, harmful, offensive or various other reasons, {{ site }} shall remove it from the site without delay.</p>
        <p>Users of {{ site }} who come across such content are urged to flag it as inappropriate by clicking 'Flag this video' link found below each video.</p>
      </b-card>
    </section>
    <FooterComponent/>
  </section>
</template>

<script>
  import { main } from '~/services/main'
  import NavbarComponent from '~/components/Navbar.vue'
  import FooterComponent from '~/components/Footer.vue'

  export default {
    data () {
      return {
        site: 'bathroomatahouseparty.com'
      }
    },
    components: {
      NavbarComponent,
      FooterComponent
    }
  }
</script>

<style>

</style>
