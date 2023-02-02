import { createApp } from 'vue';
// import './style.css';
import App from './App.vue';
import './index.css';
import router from './router';
import './firebase/firebaseInit.js';
import store from './store'


const app  = createApp(App)

app.use(store)
app.use(router)
app.mount('#app')
