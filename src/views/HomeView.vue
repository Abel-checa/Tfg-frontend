<template>
  <div id="app">
    <div v-if="show" id="bienvenida">
        <h1 class="animate__animated animate__fadeIn">Bienvenido/a {{actual_user.nombre}}</h1>
    </div>
    <div v-else id="interfaz" class="animate__animated animate__fadeIn">
        
          <nav>
            <div id="logo">
              <img src="../assets/logo.png" alt="">
            </div>

            <div id="time">
              <h1>{{currentTime}}</h1>
            </div>

            <div id="rutas">
              <ul>
                <i class="fa-solid fa-list-check" @click="ir_user_task"></i>
                <i class="fa-solid fa-plus"></i>
                <i class="fa-solid fa-user"></i>
              </ul>
            </div>
          </nav>

          <div id="contenedor">
            <div>
              <div id="avisos">

              </div>

              <div id="tiempo">

              </div>
            </div>
          </div>
        
    </div>
  </div>
</template>



<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      show: true,
       currentTime: this.getCurrentTime()
    };
  },
  methods: {
    transicion(){
      setTimeout(()=>{
        this.show = false
      },5000)
    },
    getCurrentTime() {
      const now = new Date();
      return now.toLocaleTimeString();
    },
    updateTime() {
      this.currentTime = this.getCurrentTime();
    },
    ir_user_task(){
      this.$router.push({name: "tareas", params: { user: this.$route.params.user}})
    }
  },
  computed: {
    ...mapState(['actual_user','user_tasks'])
  },
  mounted(){
    this.transicion(),
    this.timer = setInterval(this.updateTime, 1000);
  },
  beforeUnmount() {
    clearInterval(this.timer);
  }
};
</script>




/* Entrada y Salida */
<style scoped lang="sass">
/* Transiciones para entrada y salida */
#interfaz
  height: 100vh
  width: 100%
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  nav
    height: 15%
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
        margin-bottom: -75px
    
    #time
      width: 33%
      height: 100%
      display: flex
      justify-content: center
      align-items: flex-end
      h1
        font-size: 40px
        padding: .4rem
        border-bottom: 5px solid
        margin-top: -60px

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
  #contenedor
    height: 85%
    width: 100%
    


#app
  height: 100vh
  width: 100% 
  display: flex
  justify-content: center
  align-items: center
  background-color: #D9D9D9
  #bienvenida
    height: 400px
    width: 1000px
    display: flex
    align-items: center
    justify-content: center
    h1
      font-size: 60px
      color: black
      font-weight: bold
    .animate__animated.animate__fadeIn

      --animate-duration: 5s




</style>



