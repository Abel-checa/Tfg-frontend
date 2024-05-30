<template>
  <div v-if=token_verification>
    <div v-if="actual_user.cargo =='admin'" >
      <p>Hola administrador</p>
    </div>
    <div v-else>
        <h1>Home</h1>
    <div id="tasks">
      <div v-if="user_tasks.length == 0">
        <h1>Aun no tienes ninguna tarea añadida</h1>
        <div v-if="done">
          <button @click="input_marked">Añadir</button>
        </div>
        <div v-else>
          
            <input type="text" placeholder="nombre" v-model="nombre">
            <input type="text" placeholder="descripcion" v-model="descripcion">
            <input type="date" placeholder="EndTime" v-model="endtime">

            <button @click="input_Not_marked">Añadir Tarea</button>
          
        </div>
        
      </div>
      <div v-else>
        <div v-for="tarea in user_tasks" :key="tarea">
          <h1>{{tarea}}</h1>
        </div>
        <div v-if="done">
          <button @click="input_marked">Añadir</button>
        </div>
        <div v-else>
          
            <input type="text" placeholder="nombre" v-model="nombre">
            <input type="text" placeholder="descripcion" v-model="descripcion">
            <input type="date" placeholder="EndTime" v-model="endtime">

            <button @click="input_Not_marked">Añadir Tarea</button>
          
        </div>
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
  name: "UserTasksView",
  data(){
    return {
      done: true,
      nombre: "",
      descripcion: "",
      endtime: "",
      tareas: ""
    }
  },
  methods: {
    ...mapMutations(['SET_INPUT']),
    ...mapActions(['Validate','AddTask']),
    verificacion(){
      this.Validate(this.actual_user.token)
      
      console.log("token:",this.token_verification);
    },
   input_marked(){
      this.done = false
    },
    mostrar_tareas(){
      this.tareas = this.user_tasks
    },

    input_Not_marked(){
      const new_task = {
        tarea: {
          nombre: this.nombre,
          descripcion: this.descripcion,
          endtime: this.endtime
        } ,
        user: this.actual_user.nombre
      }
      // console.log("Nueva Tarea: ",new_task)
      this.AddTask(new_task)
      console.log("Tareas Usuario:",this.user_tasks);
      this.done = true
    }
    
  },
  computed: {
    ...mapState(['actual_user','token_verification','user_tasks'])
  },
  mounted(){
    this.verificacion(),
    this.mostrar_tareas()
  }
}
</script>

<style>

</style>