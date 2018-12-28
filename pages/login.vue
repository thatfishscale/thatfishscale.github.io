<template>
  <section>
    <NavbarComponent/>
    <b-container>
      <b-row>
        <b-col></b-col>
        <b-col>
          <b-card class="mt-5">
            <b-form @submit="onSubmit">
              <b-form-group label="Email address:" label-for="emailLabel">
                <b-form-input id="emailLabel" type="email" v-model="form.email" required placeholder="Enter email"></b-form-input>
              </b-form-group>
              <b-form-group label="Password" label-for="passwordLabel">
                <b-form-input id="passwordLabel" type="password" v-model="form.password" required placeholder="Enter password"></b-form-input>
              </b-form-group>
              <b-button v-if="!redirecting" type="submit" variant="primary">Login</b-button>
              <p v-if="redirecting">Redirecting. Stand the fuck by..</p>
            </b-form>
          </b-card>
        </b-col>
        <b-col></b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
  import NavbarComponent from '~/components/Navbar.vue'

  export default {
    components: {
      NavbarComponent
    },
    data () {
      return {
        form: {
          email: '',
          password: ''
        },
        redirecting: false
      }
    },
    methods: {
      onSubmit (evt) {
        evt.preventDefault()

        this.$store.dispatch('main/signInWithEmailAndPassword', this.form).then(resp => {
          this.redirecting = true
          setTimeout(() => window.location.href = '/admin', 3000)
        }).catch((e) => {
          // console.log(e.message)
        })
      },
    }
  }
</script>

<style>

</style>
