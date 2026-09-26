import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { Container } from '../src';

test('exposes only the flat root value', () => {
  expect('Root' in Container).toBe(false);
});

test('renders the default root with stable hooks and visible layout utilities', () => {
  render({
    components: { Container },
    template: '<Container data-testid="container" />',
  });
  const container = screen.getByTestId('container');

  expect(container).toHaveAttribute('data-scope', 'container');
  expect(container).toHaveAttribute('data-part', 'root');
  expect(container).toHaveAttribute('data-slot', 'container-root');
  expect(container).toHaveAttribute('data-size', 'lg');
  expect(container).toHaveAttribute('data-gutter', 'md');
  expect(container).toHaveClass('w-full', 'min-w-0', 'mx-auto');
});

test.each(['xs', 'sm', 'md', 'lg', 'xl', 'full'] as const)('renders the %s size preset', (size) => {
  render({
    components: { Container },
    template: `<Container data-testid="container" size="${size}" />`,
  });

  expect(screen.getByTestId('container')).toHaveAttribute('data-size', size);
});

test.each(['none', 'sm', 'md', 'lg'] as const)('renders the %s gutter preset', (gutter) => {
  render({
    components: { Container },
    template: `<Container data-testid="container" gutter="${gutter}" />`,
  });

  expect(screen.getByTestId('container')).toHaveAttribute('data-gutter', gutter);
});

test('retains its public root hooks when consumer props conflict', () => {
  render({
    components: { Container },
    template: `
      <Container
        data-testid="container"
        data-scope="custom"
        data-part="custom"
        data-slot="custom"
        data-size="custom"
        data-gutter="custom"
        class="consumer-class"
      />
    `,
  });
  const container = screen.getByTestId('container');

  expect(container).toHaveAttribute('data-scope', 'container');
  expect(container).toHaveAttribute('data-part', 'root');
  expect(container).toHaveAttribute('data-slot', 'container-root');
  expect(container).toHaveAttribute('data-size', 'lg');
  expect(container).toHaveAttribute('data-gutter', 'md');
  expect(container).toHaveClass('consumer-class');
});

test('lets consumer Tailwind utilities override conflicting defaults', () => {
  render({
    components: { Container },
    template: '<Container data-testid="container" class="w-1/2 max-w-sm px-2" />',
  });
  const container = screen.getByTestId('container');

  expect(container).toHaveClass('w-1/2', 'max-w-sm', 'px-2');
  expect(container).not.toHaveClass('w-full');
  expect(container.className).not.toContain('max-w-[calc');
  expect(container.className).not.toContain('px-[clamp');
});

test('exposes the ordinary DOM root through a Vue component ref', () => {
  const rootRef = ref<ComponentPublicInstance | null>(null);
  const Harness = defineComponent({
    components: { Container },
    setup() {
      return { rootRef };
    },
    template: '<Container ref="rootRef" data-testid="container" size="md" gutter="lg" />',
  });

  render(Harness);
  const container = screen.getByTestId('container');

  expect(rootRef.value?.$el).toBe(container);
  expect(container).toHaveAttribute('data-size', 'md');
  expect(container).toHaveAttribute('data-gutter', 'lg');
});

test('composes a semantic asChild element and exposes its DOM root through a Vue ref', () => {
  const rootRef = ref<ComponentPublicInstance | null>(null);
  const Harness = defineComponent({
    components: { Container },
    setup() {
      return { rootRef };
    },
    template: `
      <Container ref="rootRef" as-child size="md" gutter="lg" class="semantic-root">
        <main aria-label="Page content" />
      </Container>
    `,
  });

  render(Harness);
  const main = screen.getByRole('main', { name: 'Page content' });

  expect(rootRef.value?.$el).toBe(main);
  expect(main).toHaveAttribute('data-scope', 'container');
  expect(main).toHaveAttribute('data-part', 'root');
  expect(main).toHaveAttribute('data-slot', 'container-root');
  expect(main).toHaveAttribute('data-size', 'md');
  expect(main).toHaveAttribute('data-gutter', 'lg');
  expect(main).toHaveClass('semantic-root');
});

test('renders and hydrates a semantic asChild root without changing its host', async () => {
  const App = defineComponent({
    components: { Container },
    template: `
      <Container as-child size="md" gutter="lg" class="semantic-root">
        <main aria-label="Page content">Page content</main>
      </Container>
    `,
  });

  const html = await renderToString(createSSRApp(App));
  expect(html).toContain('<main');
  expect(html).toContain('data-slot="container-root"');

  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const app = createSSRApp(App);
  app.mount(host);

  expect(host.querySelectorAll('main')).toHaveLength(1);
  expect(host.querySelector('main')).toHaveAttribute('data-size', 'md');
  expect(host.querySelector('main')).toHaveAttribute('data-gutter', 'lg');
  expect(host.querySelector('main')).toHaveClass('semantic-root');

  app.unmount();
  host.remove();
});