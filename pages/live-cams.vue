<template>
  <section>
    <NavbarComponent/>
    <section class="container-fluid">
      <h1 class="title">Live Cams</h1>

      <div class="text-center hidden-xs">
        <ins id="714218" data-width="728" data-height="102" class="Ad-leaderboard"></ins>
      </div>

      <iframe src="https://chaturbate.com/in/?track=embed&tour=dTm0&campaign=H9Ohi&disable_sound=1&embed_video_only=0&target=_parent&mobileRedirect=never&"
              height="700" width="100%" frameborder="0" class="code"></iframe>

      <div class="text-center visible-xs">
        <ins id="714217" data-width="300" data-height="262"></ins>
      </div>

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
      return {}
    },
    components: {
      NavbarComponent,
      FooterComponent
    }
  }
</script>

<style>

</style>
