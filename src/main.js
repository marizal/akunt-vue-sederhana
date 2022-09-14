import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import './index.css'


import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'

// createApp(App).mount('#app')

const app = createApp(App)
app.use(router)
// #app element yang memakai id app
app.mount('#app')
