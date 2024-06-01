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
        actual_user: "",
        token_verification: false,
        user_tasks: "",
        transition: false,
        input_done: false,
        user_warnings: [],
        deleted_task : false
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
        SET_ACTUALUSER(state, user) {
            state.actual_user = user;
        },
        SET_TOKEN_VERIFICATION(state,verification){
            state.token_verification = verification
        },
        SET_USER_TASKS(state,verification){
            state.user_tasks = verification        
        },
        SET_INPUT(state,verification){
            state.input_done = verification
        },
        UPDATE_USER_TASKS(state,verification){
            state.user_tasks = verification
        },
        SET_AVISOS(state,avisos){
            state.user_warnings = avisos
            console.log('User_warnings:',state.user_warnings);
        },
        SET_DELETED_TASK(state,verification){
            state.user_tasks = verification
        }
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
                    commit('SET_ACTUALUSER', userFound);
                    commit('SET_USER_TASKS', userFound.tareas);
                    commit('SET_LOGGED', !!userFound);
                }
                
            } catch (error) {
                console.error('Error during login:', error);
                commit('SET_LOGGED', false);
            }
        },
        async RegisterUser({ commit },usuario) {
            try {
                console.log('Usuario: ',usuario);
                await axios.post('http://localhost:3003/add',usuario).then(response => commit('SET_REGISTERED', !!response.data));
                
            } catch (error) {
                console.error('Error Registering User:', error);
                commit('SET_REGISTERED', false)
            }
        },
        async Validate({commit},token){
            try{ 
                const token_verify={
                    token: token
                } 
                const response = await axios.post('http://localhost:3003/validate',token_verify)
                commit('SET_TOKEN_VERIFICATION', response.data.valid);

            }catch(e){
                console.log(e);
            }
        },
        async AddTask({ commit }, object) {
            try {
                
                const response = await axios.post("http://localhost:3003/usertask/"+object.user, object.tarea);
                commit('SET_USER_TASKS', response.data.tareas);
                console.log(response.data);
            } catch (error) {
                console.error('Error Registering User:', error);
                commit('SET_REGISTERED', false);
            }
        },
        async Avisos({commit}, objeto){
            try{
                
                console.log('objeto  en avisos',objeto);
                console.log('He entrado en avisos');
                const response = await axios.get('http://localhost:3003/notCompleted/'+objeto.user)
                console.log(response.data);
                commit('SET_AVISOS',response.data)
            }catch(error){
                console.log(error);
            }
        },
        async RemoveTask({commit}, objeto){
            const param = {
                nombre: objeto.nombre
            }
            const response = await axios.post('http://localhost:3003/deleteTask/'+objeto.user,param)
            commit('SET_DELETED_TASK', response.data)
            console.log('Deleted_task',response.data);
        }
        
    },
});

