// Declare the reset and token layers before importing component styles.
import '@moduix/svelte/reset.css';
import '@moduix/svelte/style.css';
import '@fontsource-variable/noto-sans';
import { mount } from 'svelte';
import App from './App.svelte';
import './styles.css';

mount(App, { target: document.getElementById('app-root')! });