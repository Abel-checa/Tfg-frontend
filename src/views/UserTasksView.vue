<template>
   
  <div v-if="actual_user.cargo =='admin'" >
      <p>Hola administrador</p>
    </div>
    <div v-else id="interfaz">
        
        <nav>
            <div id="logo">
              <img src="../assets/logo.png" alt="">
            </div>

            <div id="rutas">
              <ul>
                <i class="fa-solid fa-house" @click="ir_home"></i>
                <i class="fa-solid fa-plus" @click="ir_add"></i>
                <i class="fa-solid fa-user"></i>
              </ul>
            </div>
        </nav>
      <div id="tasks">
        <div v-if="user_tasks.length == 0" id="contenedor_message">
          <div id="text_none">
            <h1>Aun no tienes ninguna tarea añadida</h1>
          </div>
          <div id="text_message">
            <p>Prueba a añadir alguna desde el menu de añadir ahi arriba!!!</p>
            <i class="fa-solid fa-arrow-up fa-beat"></i>
          </div>
          
        </div>
        <div v-else id="tareas">
          <div v-for="tarea in user_tasks" :key="tarea" class="card">
            
              <div class="card-content">
                <h3>Nombre: {{ tarea.nombre }}</h3>
                <p>Descr: {{ tarea.descripcion }}</p>
                  <div class="button-container">
                    <i class="fas fa-check" @click="eliminar(tarea.nombre)"></i>
                    <i class="fas fa-trash-alt"  @click="eliminar(tarea.nombre)"></i>
                  </div>
              </div>
            
          </div>
          <!-- <div v-if="done">
            <button @click="input_marked">Añadir</button>
          </div>
          <div v-else>
            
              <input type="text" placeholder="nombre" v-model="nombre">
              <input type="text" placeholder="descripcion" v-model="descripcion">
              <input type="date" placeholder="EndTime" v-model="endtime">

              <button @click="input_Not_marked">Añadir Tarea</button>
            
          </div> -->
        </div>
    </div>

    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: "UserTasksView",
  data(){
    return {
      done: true,
      nombre: "",
      descripcion: "",
      endtime: "",
      tareas: "",
      cantidad: false
    }
  },
  methods: {
    ...mapActions(['Validate','AddTask','RemoveTask']),
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
    ir_add(){
      this.$router.push({ name: 'add', params: { user: this.actual_user.nombre } })
    },
    eliminar(nombre){
      const object = {
        nombre: nombre,
        user: this.$route.params.user
      }
      console.log(nombre);
      this.RemoveTask(object)
    },
    update_cuantity(){
      if(this.user_tasks.length == 0){
        this.cantidad = true
      }
    }
    
  },
  computed: {
    ...mapState(['actual_user','user_tasks','deleted_task'])
  },
  mounted(){
    this.mostrar_tareas()
    this.cantidad = setInterval(this.update_cuantity, 5000)
    setInterval(console.log(this.user_tasks),1000)
  }
}
</script>

<style scoped lang="sass">

  .button-container
    margin-top: 10px
    width: 80% 
    display: flex
    justify-content: space-between
    align-items: center
    height: 50px
    i 
      font-size: 23px
      padding: .4rem
      transition: .4s
      
    .fa-check
      color: green
      &:hover
        background-color: green
        color: white
    .fa-trash-alt
      color: red
      &:hover
        background-color: red 
        color: white
      
    
  .btn
    padding: 10px 15px
    margin-right: 10px
    border: none
    border-radius: 5px
    cursor: pointer
    transition: background-color 0.3s ease

  .complete-btn
    background-color: #28a745
    color: white

  .complete-btn:hover
    background-color: #218838

  .delete-btn
    background-color: #dc3545
    color: white

  .delete-btn:hover
    background-color: #c82333
  #tareas
    height: 85%
    display: flex
    flex-direction: row
    flex-wrap: wrap
    margin-right: 30px
    padding: 10px
    
    .card
      width: 300px
      height: 200px
      margin: 20px
      position: relative
      transition: transform 0.3s ease, box-shadow 0.3s ease, z-index 0.3s ease
      transform: translateZ(0)
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1)
      

      .card:hover
        transform: translateY(-10px) translateZ(20px)
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2)
        z-index: 10

      .card-content
        height: 100%
        width: 100%
        padding: 20px
        background: white
        display: flex
        flex-direction: column
        align-items: center
        justify-content: space-between
        background: #f5f5f5
        h3, p
          font-weight: bolder
  #tasks
    width: 68%
    height: 70%
    display: flex
    flex-direction: column
    position: fixed
    top: 27%
    margin-bottom: 100px
    #contenedor_message
      height: 100%
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      #text_message
        height: 30%
        width: 80%
        display: flex
        justify-content: space-evenly
        align-items: center
        flex-direction: column
        p 
          font-size: 30px
          width: 40%
          font-weight: bold
          
        i 
          font-size: 30px

      #text_none
        height: 50px
        display: flex
        justify-content: center
        align-items: center

        h1
          border-bottom: 2px solid 
          font-weight: bold
          padding: 10px
          margin-bottom: 10px
          font-size: 40px
          
    
  #interfaz
    height: 100vh
    width: 100%
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    border: 1px solid
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
    position: fixed
    top: 0
    

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
        

</style>