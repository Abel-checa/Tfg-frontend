<template>
  <section>
     <div id="logo">
            <img src="../assets/logo.png" alt="">
      </div>
    <div class="login-container">
        <div class="login-form">
          <h1>Register</h1>
        
            <div class="input-group">
              <label for="username">Username</label>
              <input type="text" id="username" v-model="username" required>
            </div>
            <div class="input-group">
              <label for="password">Password</label>
              <input type="password" id="password" v-model="password" required>
            </div>

            <div class="input-group">
              <label for="email">Email</label>
              <input type="email" id="email" v-model="email" required>
            </div>
            <div class="errors">
                <p id="error">{{error}}</p> 
            </div>
            <p>Ahora te acuerdas que tienes cuenta??!<a href="/login"> Login</a></p>
            <button @click="register"><p>Registrar</p></button>
        
        </div>
  </div>
  </section>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import bcrypt from 'bcryptjs'
export default {
  data(){
    return{
      username: "",
      password: "",
      email: "",
      cargo: "cliente",
      error: ""
    }
  },
  methods: {
    ...mapActions(['RegisterUser']),
    ir_login(){
      this.$router.push({ name: 'login' });
    },
    async register(){
      if(this.username == ""|| this.password=="" || this.email == "" || this.username.length <= 5 || this.password.length <= 5 || this.email.includes("@") != 1){
          this.error = "Complete correctamente los campos"
      }else{
          const secure =  await bcrypt.hash(this.password,10)
          const newUser = {
            nombre: this.username,
            password: secure,
            email: this.email,
            cargo: this.cargo
          }
          console.log(newUser);
          await this.RegisterUser(newUser)
          if(this.registered){
            this.$router.push({ name: 'login' })
          }else{
            console.log(this.registered);
          }
      }
    },
    
    

  },
  computed: {
      ...mapState(['registered'])
    }
}
</script>

<style  lang="sass">

    section
        height: 100vh
        width: 100%
        display: flex
        background: #D9D9D9

        .login-container
            height: 100%
            width: 50%
            display: flex
            justify-content: center
            align-items: center
            .errors
                width: 68%
                height: 50px
                display: flex
                justify-content: center
                align-items: center
                
                #error
                    color: red
                    width: 100%
            p 
                font-size: 13px
                font-weight: bold
                width: 60%
                a 
                    text-decoration: none
                    color: red
                    font-weight: bold
                    &::hover
                       color: orange 
            button
                width: 200px
                padding: .6rem
                background-color: black
                border-radius: 10px
                border: none
                color: white
                display: flex
                justify-content: center
                align-items: center
                p 
                    color: white
                    font-size: 15px
                    transition: .4s
                    font-weight: bold

                &:hover
                    background-color: white

                    p
                        color: black
                        font-weight: bold
            .login-form
                height: 60%
                width: 40%
                padding: .4rem
                display: flex
                flex-direction: column
                justify-content: space-evenly
                align-items: center
                background-color: lightgrey
                box-shadow: 0px 3px 8px
                h1 
                    font-size: 50px
                    font-weight: bold
            .input-group
                display: flex
                flex-direction: column
                justify-content: space-between
                align-items: center
                width: 80%
                height: 10%
                input
                    padding: .6rem
                    outline: none
                    border: none
                label
                    font-weight: bold

    
  


</style>