import type { Preview } from '@storybook/react-vite';
import '@/lib/moduix/styles/reset.css';
import '@/lib/moduix/styles/style.css';

const preview: Preview = {
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