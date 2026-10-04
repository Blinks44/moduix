import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, nextTick, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { Heading } from '../src';

test.each([false, true])(
  'keeps the host and ref stable between semantic changes, asChild=%s',
  async (asChild) => {
    const element = ref<NonNullable<InstanceType<typeof Heading>['$props']['as']>>();
    const title = ref('Initial');
    const rootRef = ref<ComponentPublicInstance>();
    render({
      components: { Heading },
      setup: () => ({ element, title, rootRef, asChild }),
      template: `
      <Heading ref="rootRef" :as="element" :as-child="asChild" :title="title" data-testid="root">
        <h2>Content</h2>
      </Heading>
    `,
    });
    for (const as of ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const) {
      element.value = as;
      await nextTick();
      const host = screen.getByTestId('root');
      expect(host.tagName).toBe(asChild ? 'H2' : as.toUpperCase());
      expect(rootRef.value?.$el).toBe(host);
      title.value = as;
      await nextTick();
      expect(screen.getByTestId('root')).toBe(host);
      expect(rootRef.value?.$el).toBe(host);
      expect(host).toHaveAttribute('title', as);
      expect(host).toHaveTextContent('Content');
    }
    element.value = undefined;
    await nextTick();
    expect(screen.getByTestId('root').tagName).toBe(asChild ? 'H2' : 'H1');
  },
);

test('exposes only the flat root value', () => {
  expect('Root' in Heading).toBe(false);
});

test('renders an h1 with native defaults, stable hooks, and forwarded ref', () => {
  const rootRef = ref<ComponentPublicInstance | null>(null);
  const Harness = defineComponent({
    components: { Heading },
    setup() {
      return { rootRef };
    },
    template: `
      <Heading ref="rootRef" data-testid="heading">
        Build reliable interfaces
      </Heading>
    `,
  });

  render(Harness);

  const heading = screen.getByRole('heading', { name: 'Build reliable interfaces', level: 1 });

  expect(rootRef.value?.$el).toBe(heading);
  expect(heading).toHaveAttribute('data-scope', 'heading');
  expect(heading).toHaveAttribute('data-part', 'root');
  expect(heading).toHaveAttribute('data-slot', 'heading-root');
  expect(heading).toHaveAttribute('data-weight', 'semibold');
  expect(heading).not.toHaveAttribute('data-size');
  expect(heading).toHaveClass(
    'm-0',
    'text-3xl',
    'font-semibold',
    'text-foreground',
    'tracking-normal',
    'text-balance',
    'wrap-anywhere',
  );
});

test('renders every supported semantic level with its default visual size', () => {
  const levels = [
    ['h1', 1, 'text-3xl'],
    ['h2', 2, 'text-2xl'],
    ['h3', 3, 'text-xl'],
    ['h4', 4, 'text-lg'],
    ['h5', 5, 'text-md'],
    ['h6', 6, 'text-sm'],
  ] as const;

  for (const [as, level, sizeClass] of levels) {
    const { unmount } = render({
      components: { Heading },
      template: `<Heading as="${as}">${as}</Heading>`,
    });

    expect(screen.getByRole('heading', { name: as, level })).toHaveClass(sizeClass);
    unmount();
  }
});

test('keeps explicit visual props separate from heading semantics', () => {
  render({
    components: { Heading },
    template: '<Heading as="h3" size="2xl" weight="bold">Section title</Heading>',
  });

  const heading = screen.getByRole('heading', { name: 'Section title', level: 3 });

  expect(heading).toHaveAttribute('data-size', '2xl');
  expect(heading).toHaveAttribute('data-weight', 'bold');
  expect(heading).toHaveClass('text-3xl', 'font-bold');
  expect(heading).not.toHaveClass('text-xl', 'font-semibold');
});

test('preserves component-owned styling hooks when data attributes collide', () => {
  render({
    components: { Heading },
    template: `
      <Heading
        data-testid="heading"
        data-scope="custom-scope"
        data-part="custom-part"
        data-slot="custom-slot"
        data-size="xs"
        data-weight="bold"
      >
        Page title
      </Heading>
    `,
  });

  const heading = screen.getByTestId('heading');

  expect(heading).toHaveAttribute('data-scope', 'heading');
  expect(heading).toHaveAttribute('data-part', 'root');
  expect(heading).toHaveAttribute('data-slot', 'heading-root');
  expect(heading).not.toHaveAttribute('data-size');
  expect(heading).toHaveAttribute('data-weight', 'semibold');
});

test('lets consumer utilities override the native defaults', () => {
  render({
    components: { Heading },
    template:
      '<Heading class="text-lg font-normal text-primary" data-testid="heading">Page title</Heading>',
  });

  const heading = screen.getByTestId('heading');

  expect(heading).toHaveClass('text-lg', 'font-normal', 'text-primary');
  expect(heading).not.toHaveClass('text-3xl', 'font-semibold', 'text-foreground');
});

test('forwards props and refs through a semantic asChild host', () => {
  const rootRef = ref<ComponentPublicInstance | null>(null);
  const Harness = defineComponent({
    components: { Heading },
    setup() {
      return { rootRef };
    },
    template: `
      <Heading ref="rootRef" as-child size="xl" weight="medium" class="custom-heading">
        <h2>Factory-composed heading</h2>
      </Heading>
    `,
  });

  render(Harness);

  const heading = screen.getByRole('heading', { name: 'Factory-composed heading', level: 2 });

  expect(rootRef.value?.$el).toBe(heading);
  expect(heading).toHaveClass('custom-heading', 'text-2xl', 'font-medium');
  expect(heading).toHaveAttribute('data-size', 'xl');
  expect(heading).toHaveAttribute('data-weight', 'medium');
  expect(heading).toHaveAttribute('data-part', 'root');
});

test('renders and hydrates a semantic asChild host without changing its element', async () => {
  const App = defineComponent({
    components: { Heading },
    template: `
      <Heading as-child size="xl" class="hydrated-heading">
        <h2>Hydrated heading</h2>
      </Heading>
    `,
  });

  const html = await renderToString(createSSRApp(App));
  expect(html).toContain('<h2');
  expect(html).toContain('data-slot="heading-root"');

  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const app = createSSRApp(App);
  app.mount(host);
  await nextTick();

  expect(host.querySelectorAll('h2')).toHaveLength(1);
  expect(host.querySelector('h2')).toHaveClass('hydrated-heading', 'text-2xl');
  expect(host.querySelector('h2')).toHaveAttribute('data-size', 'xl');

  app.unmount();
  host.remove();
});