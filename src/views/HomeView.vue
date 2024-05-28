<template>
  <div v-if=token_verification>
    <h1>Home</h1>
    <div id="tasks">
      <div v-if="user_tasks.length == 0">
        <h1>Aun no tienes ninguna tarea añadida</h1>
        <div v-if="done">
          <button @click="input_marked">Añadir</button>
        </div>
        <div v-else>
          <form action="">
            <input type="text" placeholder="nombre">
            <input type="text" placeholder="descripcion">
            <input type="datetime" placeholder="EndTime">

            <button @click="input_Not_marked">Añadir Tarea</button>
          </form>
        </div>
        
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
import { mapActions, mapMutations, mapState } from 'vuex'
export default {
  name: "HomeView",
  data(){
    return {
      done: true
    }
  },
  methods: {
    ...mapMutations(['SET_INPUT']),
    ...mapActions(['Validate']),
    verificacion(){
      this.Validate(this.actual_user.token)
      console.log(this.actual_user);
      console.log("token:",this.token_verification);
    },
    input_marked(){
      this.done = false
    },
    input_Not_marked(){
      this.done = true
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