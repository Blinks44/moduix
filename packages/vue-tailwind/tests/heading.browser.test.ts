import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, nextTick, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { Heading } from '../src';
import TestHeading from './fixtures/TestHeading.vue';

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
      expect(host.getAttribute('title')).toBe(as);
      expect(host.textContent).toContain('Content');
    }
    element.value = undefined;
    await nextTick();
    expect(screen.getByTestId('root').tagName).toBe(asChild ? 'H2' : 'H1');
  },
);

test('preserves h1 defaults, refs, and owned hooks when consumer props conflict', () => {
  const rootRef = ref<ComponentPublicInstance | null>(null);
  const Harness = {
    components: { Heading },
    setup() {
      return { rootRef };
    },
    template: `
      <Heading ref="rootRef" data-testid="heading" data-scope="custom-scope" data-part="custom-part" data-slot="custom-slot" data-size="xs" data-weight="bold">
        Build reliable interfaces
      </Heading>
    `,
  };

  render(Harness);

  const heading = screen.getByRole('heading', { name: 'Build reliable interfaces', level: 1 });

  expect(rootRef.value?.$el).toBe(heading);
  expect(heading.getAttribute('data-scope')).toBe('heading');
  expect(heading.getAttribute('data-part')).toBe('root');
  expect(heading.getAttribute('data-slot')).toBe('heading-root');
  expect(heading.getAttribute('data-weight')).toBe('semibold');
  expect(heading.hasAttribute('data-size')).toBe(false);

  expect('Root' in Heading).toBe(false);
  expect(getComputedStyle(heading)).toMatchObject({
    fontSize: '30px',
    fontWeight: '600',
    overflowWrap: 'anywhere',
    textWrap: 'balance',
  });
});

test('renders every supported semantic level with its default visual size', () => {
  const levels = [
    ['h1', 1, '30px'],
    ['h2', 2, '24px'],
    ['h3', 3, '20px'],
    ['h4', 4, '18px'],
    ['h5', 5, '16px'],
    ['h6', 6, '14px'],
  ] as const;

  for (const [as, level, fontSize] of levels) {
    const { unmount } = render({
      components: { Heading },
      template: `<Heading as="${as}">${as}</Heading>`,
    });

    expect(screen.getByRole('heading', { name: as, level }).getAttribute('data-weight')).toBe(
      'semibold',
    );
    expect(getComputedStyle(screen.getByRole('heading', { name: as, level })).fontSize).toBe(
      fontSize,
    );
    unmount();
  }
});

test('keeps explicit visual props separate from heading semantics', () => {
  render({
    components: { Heading },
    template: '<Heading as="h3" size="2xl" weight="bold">Section title</Heading>',
  });

  const heading = screen.getByRole('heading', { name: 'Section title', level: 3 });

  expect(heading.getAttribute('data-size')).toBe('2xl');
  expect(heading.getAttribute('data-weight')).toBe('bold');
  expect([...heading.classList]).toEqual(expect.arrayContaining(['text-3xl', 'font-bold']));
  expect([...heading.classList]).not.toContain('text-xl');
  expect([...heading.classList]).not.toContain('font-semibold');
  expect(getComputedStyle(heading)).toMatchObject({ fontSize: '30px', fontWeight: '700' });
});

test('lets consumer utilities override the native defaults', () => {
  render({
    components: { Heading },
    template:
      '<Heading class="text-lg font-normal text-primary" data-testid="heading">Page title</Heading>',
  });

  const heading = screen.getByTestId('heading');

  expect([...heading.classList]).toEqual(
    expect.arrayContaining(['text-lg', 'font-normal', 'text-primary']),
  );
  expect([...heading.classList]).not.toContain('text-3xl');
  expect([...heading.classList]).not.toContain('font-semibold');
  expect([...heading.classList]).not.toContain('text-foreground');
  expect(getComputedStyle(heading)).toMatchObject({ fontSize: '18px', fontWeight: '400' });
});

test('forwards props and refs through a semantic asChild host', () => {
  const rootRef = ref<ComponentPublicInstance | null>(null);
  const Harness = {
    components: { Heading },
    setup() {
      return { rootRef };
    },
    template: `
      <Heading ref="rootRef" as-child size="xl" weight="medium" class="custom-heading">
        <h2>Factory-composed heading</h2>
      </Heading>
    `,
  };

  render(Harness);

  const heading = screen.getByRole('heading', { name: 'Factory-composed heading', level: 2 });

  expect(rootRef.value?.$el).toBe(heading);
  expect([...heading.classList]).toEqual(
    expect.arrayContaining(['custom-heading', 'text-2xl', 'font-medium']),
  );
  expect(heading.getAttribute('data-size')).toBe('xl');
  expect(heading.getAttribute('data-weight')).toBe('medium');
  expect(heading.getAttribute('data-part')).toBe('root');
});

test('hydrates heading without replacing the server host', async () => {
  const host = document.createElement('div');
  host.innerHTML = await renderToString(createSSRApp(TestHeading));
  document.body.append(host);
  const serverRoot = host.querySelector<HTMLElement>('h2')!;
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  const app = createSSRApp(TestHeading);
  try {
    app.mount(host);
    await expect
      .element(page.getByRole('heading', { name: 'Hydrated heading', level: 2 }))
      .toHaveCount(1);
    expect(host.querySelectorAll('h2')).toHaveLength(1);
    expect(host.querySelector('h2')).toBe(serverRoot);
    expect([...serverRoot.classList]).toContain('hydrated-heading');
    expect(serverRoot.getAttribute('data-size')).toBe('xl');
    expect(getComputedStyle(serverRoot).fontSize).toBe('24px');
    expect(warn).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
  } finally {
    app.unmount();
    host.remove();
    warn.mockRestore();
    error.mockRestore();
  }
});