<template>
  <section>
    <div v-if="transition == false">
        <h1>BASTIAN</h1>
        <img src="../assets/BASTIAN 1.png" alt="" @click="acceder">
        
  </div>
  <div v-else>
    <img src="../assets/Dual Ring@1x-1.0s-200px-200px.gif" alt="" id="loading">
  </div>
  </section>
  
</template>

<script>
import { mapState } from 'vuex'
export default {
    data(){
        return{
            transition : false
        }
    },
    methods: {
        acceder(){
            this.transition = true
            setTimeout(()=>{
                this.$router.push({name: "login"})
            },5000)
            
            
        }
    },
    computed: {
        ...mapState(['transition'])
    }
}
</script>

<style lang="sass">
    section
        height: 100vh
        width: 100%
        display: flex
        justify-content: center
        align-items: center
        background-color: #2E263F
        div
            height: 90%
            width: 50% 
            display: flex
            justify-content: space-evenly
            align-items: center
            flex-direction: column
            img 
                height: 90%
                width: 1200px
                z-index: 2
                margin-left: 145px
                margin-bottom: 70px
                
            h1 
                font-size: 230px
                position: absolute
                z-index: 1
                letter-spacing: 4px
                color: #9678D3
                font-weight: bold
                filter: blur(2px)
            #loading
                height: 300px
                width: 300px
                margin-left: -50px
            
</style>