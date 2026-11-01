// Declare the reset and token layers before importing component styles.
import '@moduix/vue/reset.css';
import '@moduix/vue/style.css';
import '@fontsource-variable/noto-sans';
import { createApp } from 'vue';
import App from './App.vue';
import './styles.css';

createApp(App).mount('#app-root');