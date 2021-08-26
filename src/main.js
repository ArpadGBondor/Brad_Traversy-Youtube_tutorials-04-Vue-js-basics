import App from './App.vue';
import { createApp } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import router from './router';

library.add(faTimes, faSpinner);

createApp(App)
  .use(router)
  .component('fa', FontAwesomeIcon)
  .mount('#app');
