// Declare the reset and token layers before importing component styles.
import '@moduix/solid/reset.css';
import '@moduix/solid/style.css';
import '@fontsource-variable/noto-sans';
import { render } from 'solid-js/web';
import App from './App';
import './styles.css';

render(() => <App />, document.getElementById('app-root')!);