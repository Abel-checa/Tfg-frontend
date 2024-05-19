import axios from 'axios'
// store.js
// import Vue from 'vue';
import Vuex from 'vuex';
import bcrypt from 'bcryptjs'

// Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        users: [],      // Array para almacenar los usuarios
        logged: false,  // Estado de autenticación login
        registered: false,// Estado de autenticación registro
        actual_user: "" 
    },
    mutations: {
        SET_USERS(state, users) {
            state.users = users;
        },
        SET_LOGGED(state, status) {
            state.logged = status;
        },
        SET_REGISTERED(state, status) {
            state.registered = status;
            console.log(state.registered);
        },
    },
    actions: {
        async fetchUsers({ commit }) {
            try {
                const response = await axios.get('http://localhost:3003/users');
                commit('SET_USERS', response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        },
        async LOGIN({ commit, state }, user) {
            try {
                
                const userFound = state.users.find(x => x.nombre === user.nombre);
                const verification = bcrypt.compareSync(user.password, userFound.password)
                if(verification){
                    commit('SET_LOGGED', !!userFound);
                }
                
            } catch (error) {
                console.error('Error during login:', error);
                commit('SET_LOGGED', false);
            }
        },
        async RegisterUser({ commit },usuario) {
            try {
                await axios.post('http://localhost:3003/add',usuario).then(response => commit('SET_REGISTERED', !!response.data));
                
            } catch (error) {
                console.error('Error Registering User:', error);
                commit('SET_REGISTERED', false)
            }
        },
    },
});

