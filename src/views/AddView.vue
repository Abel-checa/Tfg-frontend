<template>
    <nav>
            <div id="logo">
              <img src="../assets/logo.png" alt="">
            </div>

            <div id="rutas">
              <ul>
                <i class="fa-solid fa-house" @click="ir_home"></i>
                <i class="fa-solid fa-plus" @click="ir_tareas"></i>
                <i class="fa-solid fa-user"></i>
              </ul>
            </div>
    </nav>
   <div v-if="done">
            <button @click="input_marked">Añadir</button>
          </div>
          <div v-else>
            
              <input type="text" placeholder="nombre" v-model="nombre">
              <input type="text" placeholder="descripcion" v-model="descripcion">
              <input type="date" placeholder="EndTime" v-model="endtime">

              <button @click="input_Not_marked">Añadir Tarea</button>
            
    </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
export default {
  name: "AddTasksView",
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
    input_Not_marked(){
      const new_task = {
        tarea: {
          nombre: this.nombre,
          descripcion: this.descripcion,
          endtime: this.date_stringify(this.endtime)
        } ,
        user: this.actual_user.nombre
      }
      console.log(new_task);
      // console.log("Nueva Tarea: ",new_task)
      this.AddTask(new_task)
      console.log("Tareas Usuario:",this.user_tasks);
      this.done = true
    },
    date_stringify(date){
      const new_date = date.replace("-","/").replace("-","/")
      return new_date
    },
    ir_home(){
      this.$router.push({ name: 'home', params: { user: this.actual_user.nombre } })
    },
    ir_tareas(){
        this.$router.push({name: "tareas", params: { user: this.$route.params.user}})
    }
    
  },
  computed: {
    ...mapState(['actual_user','user_tasks'])
  }
}
</script>


<style scoped lang="sass" >
    #rutas
      width: 33%
      height: 100%
      display: flex
      justify-content: center
      align-items: flex-end
      ul 
        width: 60%
        height: 50%
        display: flex
        justify-content: space-around
        align-items: flex-end

        i 
          font-size: 40px
          padding: .4rem
          &:hover
            border-bottom: 2px solid  
    nav
        height: 18%
        width: 100%
        display: flex
        justify-content: space-around
        align-items: center
    

    #logo
      width: 33%
      height: 100%
      display: flex
      justify-content: center
      align-items: center
      padding: .4rem

      img 
        height: 400px
        width: 430px
        margin-bottom: -95px
</style>>

