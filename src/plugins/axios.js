import Vue from 'vue'
import axios from 'axios'

Vue.use({
    install(Vue) {
        Vue.prototype.$http = axios.create({
            baseURL: 'https://api.themoviedb.org/3/',
            headers: {
                "Authorization": ''
            }
        })

        Vue.prototype.$http.interceptors.request.use(config => {
            config.params = {
                "api_key": "1c519c045917610c31c91d1f52acb7f2",
                ...config.params
            }
            return config
        }, error => Promise.reject(error))

        Vue.prototype.$http.interceptors.response.use(res => {
            return res
        }, error => Promise.reject(error))
    }
})