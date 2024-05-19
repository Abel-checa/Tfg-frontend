<template>
    <div>
        <input v-model="user" placeholder="Username" />
        <input v-model="password" type="password" placeholder="Password" />
        <button @click="login">Login</button>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
    name: "LoginView",
    data() {
        return {
            user: "",
            password: ""
        };
    },
    methods: {
        ...mapActions(['LOGIN', 'fetchUsers']),
        async login() {
            const new_user = {
                nombre: this.user,
                password: this.password
            };

            await this.LOGIN(new_user);

            if (this.logged) {
                console.log("Logged: ", this.logged);
                this.$router.push({ name: 'home', params: { user: this.user } });
            } else {
                console.log("Logged: ", this.logged);
                this.$router.push({ name: 'register' });
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
