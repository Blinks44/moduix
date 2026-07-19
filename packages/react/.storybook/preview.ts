import type { Preview } from '@storybook/react-vite';
import '@/lib/moduix/styles/reset.css';
import '@/lib/moduix/styles/style.css';

const nativeFocus = HTMLElement.prototype.focus;

const preview: Preview = {
  beforeEach: () => {
    Object.defineProperty(HTMLElement.prototype, 'focus', {
      configurable: true,
      value: nativeFocus,
      writable: true,
    });
  },
  parameters: {
    options: {
      storySort: {
        method: 'alphabetical',
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;