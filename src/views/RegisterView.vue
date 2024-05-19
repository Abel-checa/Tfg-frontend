<template>
  <div>
    <input type="text" v-model="username" placeholder="Usuario">
    <input type="text" v-model="password" placeholder="Password">
    <input type="text" v-model="email" placeholder="email">
    <button type="submit" @click="register">Entrar</button>
    <button @click="ir_login">Volver A LOGIN</button>
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

<style>

</style>