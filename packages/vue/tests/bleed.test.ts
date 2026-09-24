import { expect, test } from '@rstest/core';
import { render } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { Bleed } from '../src';

test('renders the default full-bleed root with stable hooks', () => {
  const { getByTestId } = render({
    components: { Bleed },
    template: '<Bleed data-testid="bleed" />',
  });
  const bleed = getByTestId('bleed');

  expect(bleed).toHaveAttribute('data-scope', 'bleed');
  expect(bleed).toHaveAttribute('data-part', 'root');
  expect(bleed).toHaveAttribute('data-slot', 'bleed-root');
  expect(bleed).toHaveAttribute('data-inline', 'full');
  expect(bleed).toHaveAttribute('data-block', 'none');
});

test('exposes the default DOM root through a Vue component ref', () => {
  const rootRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
    components: { Bleed },
    setup() {
      return { rootRef };
    },
    template: '<Bleed ref="rootRef" data-testid="bleed" inline="md" block="sm" />',
  });
  const { getByTestId } = render(Harness);
  const bleed = getByTestId('bleed');

  expect(rootRef.value?.$el).toBe(bleed);
  expect(bleed).toHaveAttribute('data-inline', 'md');
  expect(bleed).toHaveAttribute('data-block', 'sm');
});

test('composes a semantic asChild element and exposes its DOM root through a Vue ref', () => {
  const rootRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
    components: { Bleed },
    setup() {
      return { rootRef };
    },
    template: `
      <Bleed ref="rootRef" as-child inline="md" block="sm" class="figure">
        <figure aria-label="Full-width map" />
      </Bleed>
    `,
  });
  const { getByRole } = render(Harness);
  const figure = getByRole('figure', { name: 'Full-width map' });

  expect(rootRef.value?.$el).toBe(figure);
  expect(figure).toHaveAttribute('data-inline', 'md');
  expect(figure).toHaveAttribute('data-block', 'sm');
  expect(figure).toHaveClass('figure');
});

test('keeps wrapper-owned hooks and merges consumer classes', () => {
  const { getByTestId } = render({
    components: { Bleed },
    template: `
      <Bleed
        data-testid="bleed"
        data-scope="custom"
        data-part="custom"
        data-slot="custom"
        inline="xs"
        block="lg"
        class="consumer-class"
      />
    `,
  });
  const bleed = getByTestId('bleed');

  expect(bleed).toHaveAttribute('data-scope', 'bleed');
  expect(bleed).toHaveAttribute('data-part', 'root');
  expect(bleed).toHaveAttribute('data-slot', 'bleed-root');
  expect(bleed).toHaveAttribute('data-inline', 'xs');
  expect(bleed).toHaveAttribute('data-block', 'lg');
  expect(bleed).toHaveClass('consumer-class');
  expect(bleed.className).not.toBe('consumer-class');
});

test('renders and hydrates a semantic asChild root without changing its host', async () => {
  const App = defineComponent({
    components: { Bleed },
    template: `
      <Bleed as-child inline="md" block="sm" class="figure">
        <figure aria-label="Full-width map">Map</figure>
      </Bleed>
    `,
  });

  const html = await renderToString(createSSRApp(App));
  expect(html).toContain('<figure');
  expect(html).toContain('data-slot="bleed-root"');

  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const app = createSSRApp(App);
  app.mount(host);

  expect(host.querySelectorAll('figure')).toHaveLength(1);
  expect(host.querySelector('figure')).toHaveAttribute('data-inline', 'md');
  expect(host.querySelector('figure')).toHaveAttribute('data-block', 'sm');
  expect(host.querySelector('figure')).toHaveClass('figure');

  app.unmount();
  host.remove();
});