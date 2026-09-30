import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, nextTick, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { Separator } from '../src';

test('exposes only the flat root value', () => {
  expect('Root' in Separator).toBe(false);
});

test('keeps ARIA metadata and stable data hooks aligned with public props', () => {
  render({
    components: { Separator },
    template: `
      <Separator
        aria-orientation="vertical"
        data-testid="separator"
        data-orientation="vertical"
        data-part="custom"
        data-scope="custom"
        data-size="xs"
        data-slot="custom"
        data-variant="solid"
        orientation="horizontal"
        size="lg"
        variant="dotted"
      />
    `,
  });

  const separator = screen.getByTestId('separator');

  expect(separator).toHaveAttribute('role', 'separator');
  expect(separator).toHaveAttribute('aria-orientation', 'horizontal');
  expect(separator).toHaveAttribute('data-scope', 'separator');
  expect(separator).toHaveAttribute('data-part', 'root');
  expect(separator).toHaveAttribute('data-slot', 'separator-root');
  expect(separator).toHaveAttribute('data-orientation', 'horizontal');
  expect(separator).toHaveAttribute('data-size', 'lg');
  expect(separator).toHaveAttribute('data-variant', 'dotted');
});

test('applies the public defaults and direct styling props', () => {
  render({
    components: { Separator },
    template: '<Separator data-testid="separator" class="custom-separator" style="color: red" />',
  });

  const separator = screen.getByTestId('separator');

  expect(separator).toHaveAttribute('role', 'separator');
  expect(separator).toHaveAttribute('aria-orientation', 'horizontal');
  expect(separator).toHaveAttribute('data-orientation', 'horizontal');
  expect(separator).toHaveAttribute('data-size', 'sm');
  expect(separator).toHaveAttribute('data-variant', 'solid');
  expect(separator).toHaveClass('custom-separator');
  expect(separator).toHaveStyle({ color: 'red' });
});

test('forwards refs through the ordinary Ark Vue root path', () => {
  const rootRef = ref<ComponentPublicInstance | null>(null);
  const Harness = defineComponent({
    components: { Separator },
    setup() {
      return { rootRef };
    },
    template: '<Separator ref="rootRef" data-testid="separator" />',
  });

  render(Harness);

  expect(rootRef.value?.$el).toBe(screen.getByTestId('separator'));
});

test('supports decorative separators and semantic asChild hosts', () => {
  const rootRef = ref<ComponentPublicInstance | null>(null);
  const Harness = defineComponent({
    components: { Separator },
    setup() {
      return { rootRef };
    },
    template: `
      <div>
        <Separator data-testid="decorative" role="presentation" aria-orientation="vertical" />
        <Separator ref="rootRef" as-child>
          <hr data-testid="native-rule" />
        </Separator>
      </div>
    `,
  });

  render(Harness);
  const decorative = screen.getByTestId('decorative');
  const nativeRule = screen.getByTestId('native-rule');

  expect(decorative).toHaveAttribute('role', 'presentation');
  expect(decorative).not.toHaveAttribute('aria-orientation');
  expect(rootRef.value?.$el).toBe(nativeRule);
  expect(nativeRule).toHaveAttribute('data-slot', 'separator-root');
});

test('renders and hydrates a semantic asChild host without changing its element', async () => {
  const App = defineComponent({
    components: { Separator },
    template: `
      <Separator as-child size="lg" class="hydrated-separator">
        <hr />
      </Separator>
    `,
  });

  const html = await renderToString(createSSRApp(App));
  expect(html).toContain('<hr');
  expect(html).toContain('data-slot="separator-root"');

  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const app = createSSRApp(App);
  app.mount(host);
  await nextTick();

  expect(host.querySelectorAll('hr')).toHaveLength(1);
  expect(host.querySelector('hr')).toHaveClass('hydrated-separator');
  expect(host.querySelector('hr')).toHaveAttribute('data-size', 'lg');

  app.unmount();
  host.remove();
});