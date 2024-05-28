<template>
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

            <button @click="register">Register</button>
        
        </div>
        <div id="img_bastian">
            <h1>BASTIAN</h1>    
            <img src="../assets/BASTIAN 1.png" alt="">
        </div>
  </div>
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
    }
  },
  methods: {
    ...mapActions(['RegisterUser']),
    ir_login(){
      this.$router.push({ name: 'login' });
    },
    async register(){
      const secure =  await bcrypt.hash(this.password,10)
      const newUser = {
        nombre: this.username,
        password: secure,
        email: this.email,
        cargo: this.cargo
      }
      await this.RegisterUser(newUser)
      if(this.registered){
        this.$router.push({ name: 'login' })
      }else{
        console.log(this.registered);
      }

    },
    
    

  },
  computed: {
      ...mapState(['registered'])
    }
}
</script>

<style  lang="sass">
// Define variables
$background-color: #2E263F
$form-background-color: #FFFFFF
$primary-color: #6C5B7B
$input-border-color: #CCCCCC
$input-focus-border-color: #6C5B7B
$button-background-color: #6C5B7B
$button-hover-background-color: #A59ACA
$text-color: #333333

body 
  background-color: $background-color
  display: flex
  justify-content: center
  align-items: center
  height: 100vh
  margin: 0
  font-family: Arial, sans-serif


.login-container 
  background-color: $form-background-color
  padding: 30px
  border-radius: 8px
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1)
  width: 300px
  height: 500px
  #img_bastian
    height: 35%
    margin-top: 30px
    display: flex
    justify-content: center
    align-items: center
    h1
        font-size: 55px
        position: absolute
        z-index: 1
        letter-spacing: 4px
        color: #9678D3
        font-weight: bold
        
    img
        width: 500px
        height: 200px
        margin-left: 60px
        z-index: 2
        margin-bottom: 20px

.login-form 
  text-align: center

  h1 
    margin-bottom: 20px
    color: $primary-color
  

  .input-group 
    margin-bottom: 15px
    text-align: left

    label 
      display: block
      margin-bottom: 5px
      color: $text-color
    

    input 
      width: 100%
      padding: 8px
      border: 1px solid $input-border-color
      border-radius: 4px
      box-sizing: border-box
      transition: border-color 0.3s

      &:focus 
        border-color: $input-focus-border-color
        outline: none
      
    
  

  button 
    width: 100%
    padding: 10px
    border: none
    border-radius: 4px
    background-color: $button-background-color
    color: #FFFFFF
    font-size: 16px
    cursor: pointer
    transition: background-color 0.3s

    &:hover 
      background-color: $button-hover-background-color
    
  


</style>