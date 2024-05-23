<template>
  <div v-if="token_verification">
    <h1>Home</h1>
  </div>
  <div v-else>
    <h1>Not Authorized</h1>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: "HomeView",
  methods: {
    ...mapActions(['Validate']),
    verificacion(){
      this.Validate(this.actual_user.token)
    }
    
  },
  computed: {
    ...mapState(['actual_user','token_verification'])
  },
  mounted(){
    this.verificacion()
  }
}
</script>

<style>

</style>