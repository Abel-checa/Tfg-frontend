<template>
  <section>
    <div id="logo">
        <img src="../assets/logo.png" alt="">
        <button><p>Acceder</p></button>
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
        background: #D9D9D9
        justify-content: center
        align-items: center
        flex-direction: column
        #logo
            display: flex
            flex-direction: column
            justify-content: start
            align-items: center
            img
                z-index: 1
            

            button
                position: absolute
                top: 70% 
                z-index: 2
                width: 200px
                
                padding: .6rem
                background-color: black
                border-radius: 10px
                border: none
                box-shadow: 0px 3px 8px
                
                p
                    
                    font-family: "Major Mono Display", monospace
                    font-weight: 400
                    font-style: normal
                    color: white
                    font-size: 25px
                    transition: .4s
                &:hover
                    background-color: white

                    p
                        color: black
                        font-weight: bold

                    





            // button
            //     position: absolute
            //     top: 70%
            //     right: 45%
            //     z-index: 2
            //     width: 200px
            //     height: 50px
            //     background: none
            //     font-size: 20px
            //     box-shadow: -6px 15px 18px 10px rgba(0,0,0,0.1)
                
                
                


</style>