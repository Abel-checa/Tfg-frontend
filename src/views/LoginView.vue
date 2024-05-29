<template>

    <section>
        <div id="logo">
            <img src="../assets/logo.png" alt="">
        </div>
        <div class="login-container">
            <div class="login-form">
                <h1>Login</h1>
        
                <div class="input-group">
                    <label for="username">Username</label>
                    <input type="text" id="username" name="username" required v-model="user">
                </div>
            <div class="input-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" required v-model="password">
            </div>
            <div class="errors">
                <p id="error">{{error}}</p>
            </div>
            <p>No tienes Cuenta?? <a href="/register">Registrate</a></p>
            <button @click="login"><p>Acceder</p></button>
        
            </div>
        </div>
    </section>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
    name: "LoginView",
    data() {
        return {
            user: "",
            password: "",
            error: ""
        };
    },
    methods: {
        ...mapActions(['LOGIN', 'fetchUsers']),
        async login() {
            if(this.user == ""|| this.password==""){
                this.error = "Complete correctamente los campos"
            }else{
                const new_user = {
                nombre: this.user,
                password: this.password
                };

                await this.LOGIN(new_user);

                if (this.logged) {
                    this.$router.push({ name: 'home', params: { user: this.user } });
                } else {
                    this.$router.push({ name: 'register' });
                }
            }
            
        }
    },
    computed: {
        ...mapState(['logged'])
    },
    mounted() {
        this.fetchUsers();  // Fetch users when component is created
    }
};
</script>

<style scoped lang="sass">
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
                margin-top: -30px
                #error
                    color: red

            p 
                font-size: 13px
                font-weight: bold
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
                p 
                    color: white
                    font-size: 15px
                    transition: .4s
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
                    font-size: 60px
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