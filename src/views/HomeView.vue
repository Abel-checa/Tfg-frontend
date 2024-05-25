<template>
  <div v-if="token_verification">
    <h1>Home</h1>
    <div id="tasks">
      <div v-if="user_tasks.length == 0">
        <h1>Aun no tienes ninguna tarea añadida</h1>
        <button>Añadir</button>
      </div>
      <div v-else>
        <div v-for="tarea in user_tasks" :key="tarea">
          <h1>{{tarea}}</h1>
        </div>
      </div>
    </div>
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
      console.log(this.actual_user);
    }
    
  },
  computed: {
    ...mapState(['actual_user','token_verification','user_tasks'])
  },
  mounted(){
    this.verificacion()
  }
}
</script>

<style>

</style>