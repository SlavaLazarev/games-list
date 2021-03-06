import Vue from 'vue'
import App from './App.vue'
import Vuelidate from "vuelidate"
import VueMask from 'v-mask'

import 'bootstrap/dist/css/bootstrap.css'

Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.use(VueMask)

new Vue({
  render: h => h(App)
}).$mount('#app')
