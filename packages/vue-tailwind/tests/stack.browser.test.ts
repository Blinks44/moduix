import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, nextTick, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { Stack } from '../src';
import TestStack from './fixtures/TestStack.vue';

test.each([false, true])(
  'updates responsive layout and removes stale styles, asChild=%s',
  async (asChild) => {
    const direction = ref<InstanceType<typeof Stack>['$props']['direction']>();
    const gap = ref<number | string>();
    const fill = ref<boolean>();
    const style = ref<InstanceType<typeof Stack>['$props']['style']>();
    const rootRef = ref<ComponentPublicInstance>();
    render({
      components: { Stack },
      setup: () => ({ direction, gap, fill, style, rootRef, asChild }),
      template: `
      <Stack ref="rootRef" :as-child="asChild" :direction="direction" :gap="gap" :fill="fill"
        :style="style" data-testid="stack"><section>Content</section></Stack>
    `,
    });
    const stack = screen.getByTestId('stack');
    for (const [value, mobile, desktop] of [
      ['row', 'row', 'row'],
      [{ desktop: 'row-reverse' }, 'row-reverse', 'row-reverse'],
      [{ mobile: 'column-reverse' }, 'column-reverse', 'column-reverse'],
      [{ mobile: 'column', desktop: 'row' }, 'column', 'row'],
      [undefined, 'column', undefined],
    ] as const) {
      direction.value = value;
      await nextTick();
      const classes = {
        row: 'flex-row',
        'row-reverse': 'flex-row-reverse',
        column: 'flex-col',
        'column-reverse': 'flex-col-reverse',
      };
      expect([...stack.classList]).toEqual(expect.arrayContaining([classes[mobile]]));
      expect(stack.className.split(' ').filter((name) => name.startsWith('sm:flex-'))).toEqual(
        desktop ? ['sm:' + classes[desktop]] : [],
      );
      expect(getComputedStyle(stack).flexDirection).toBe(
        window.matchMedia('(min-width: 640px)').matches ? (desktop ?? mobile) : mobile,
      );
      expect(screen.getByTestId('stack')).toBe(stack);
      expect(rootRef.value?.$el).toBe(stack);
    }
    gap.value = 0;
    fill.value = true;
    await nextTick();
    expect(stack.style.gap).toBe('0px');
    expect([...stack.classList]).toEqual(expect.arrayContaining(['flex-1']));
    gap.value = '1rem';
    fill.value = false;
    style.value = ['color:red', { gap: '2rem' }];
    await nextTick();
    expect(stack.style).toMatchObject({ color: 'red', gap: '2rem' });
    expect([...stack.classList]).not.toContain('flex-1');
    style.value = undefined;
    await nextTick();
    expect(stack.style.gap).toBe('1rem');
    expect(stack.style.color).toBe('');
    gap.value = undefined;
    fill.value = undefined;
    await nextTick();
    expect(stack.style.gap).toBe('');
    expect([...stack.classList]).not.toContain('flex-1');
  },
);

test('renders a flex root with stable styling hooks and default utilities', () => {
  render({
    components: { Stack },
    template:
      '<Stack data-part="custom" data-scope="custom" data-slot="custom" data-testid="stack" />',
  });

  const stack = screen.getByTestId('stack');

  expect(stack.getAttribute('data-scope')).toBe('stack');
  expect(stack.getAttribute('data-part')).toBe('root');
  expect(stack.getAttribute('data-slot')).toBe('stack-root');
  expect([...stack.classList]).toEqual(expect.arrayContaining(['flex', 'flex-col']));
  expect(getComputedStyle(stack).display).toBe('flex');
  expect(getComputedStyle(stack).flexDirection).toBe('column');
});

test('writes flex props and reverse directions as native utilities and root styles', () => {
  render({
    components: { Stack },
    template: `
      <Stack
        align="center"
        :direction="{ mobile: 'column-reverse', desktop: 'row-reverse' }"
        fill
        :gap="12"
        justify="space-between"
        wrap="wrap"
        data-testid="stack"
      />
    `,
  });

  const stack = screen.getByTestId('stack');

  expect([...stack.classList]).toEqual(
    expect.arrayContaining(['flex', 'flex-col-reverse', 'sm:flex-row-reverse', 'flex-1']),
  );
  expect(stack.style).toMatchObject({
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '12px',
    justifyContent: 'space-between',
  });
  expect(getComputedStyle(stack)).toMatchObject({
    display: 'flex',
    flexDirection: window.matchMedia('(min-width: 640px)').matches
      ? 'row-reverse'
      : 'column-reverse',
    flexGrow: '1',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '12px',
  });
});

test('leaves optional layout styles unset and lets style override layout props', () => {
  render({
    components: { Stack },
    template: `
      <Stack data-testid="defaults" />
      <Stack
        direction="row"
        fill
        :gap="12"
        wrap="wrap"
        :style="{ gap: '2rem', flexWrap: 'nowrap' }"
        data-testid="overridden"
      />
    `,
  });

  const defaults = screen.getByTestId('defaults');
  const overridden = screen.getByTestId('overridden');

  expect(defaults.style.gap).toBe('');
  expect([...overridden.classList]).toEqual(
    expect.arrayContaining(['flex-row', 'sm:flex-row', 'flex-1']),
  );
  expect(overridden.style).toMatchObject({ flexWrap: 'nowrap', gap: '2rem' });
});

test('lets consumer Tailwind utilities override fixed defaults', () => {
  render({
    components: { Stack },
    template: '<Stack direction="row" fill class="flex-none flex-col" data-testid="stack" />',
  });
  const stack = screen.getByTestId('stack');

  expect([...stack.classList]).toEqual(expect.arrayContaining(['flex-none', 'flex-col']));
  expect([...stack.classList]).not.toContain('flex-1');
  expect([...stack.classList]).not.toContain('flex-row');
  expect(getComputedStyle(stack).flex).toBe('0 0 auto');
});

test('preserves semantic hosts and refs with asChild', () => {
  const rootRef = ref<ComponentPublicInstance>();
  const Harness = {
    components: { Stack },
    setup() {
      return { rootRef };
    },
    template: `
      <Stack ref="rootRef" as-child :gap="12" class="stack-class">
        <section aria-label="Project updates" class="section-class" style="color: red" />
      </Stack>
    `,
  };

  render(Harness);

  const section = screen.getByRole('region', { name: 'Project updates' });

  expect(rootRef.value?.$el).toBe(section);
  expect(section.style.gap).toBe('12px');
  expect([...section.classList]).toEqual(expect.arrayContaining(['section-class', 'stack-class']));
  expect(section.style).toMatchObject({ color: 'red' });
  expect(section.getAttribute('data-slot')).toBe('stack-root');
});

test('hydrates stack without replacing the server host', async () => {
  const host = document.createElement('div');
  host.innerHTML = await renderToString(createSSRApp(TestStack));
  document.body.append(host);
  const serverRoot = host.querySelector<HTMLElement>('figure')!;
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  const app = createSSRApp(TestStack);
  try {
    app.mount(host);
    await expect.element(page.getByRole('figure', { name: 'Project updates' })).toHaveCount(1);
    expect(host.querySelectorAll('figure')).toHaveLength(1);
    expect(host.querySelector('figure')).toBe(serverRoot);
    expect(serverRoot.dataset).toMatchObject({ slot: 'stack-root' });
    expect([...serverRoot.classList]).toContain('figure');
    expect(getComputedStyle(serverRoot).flexDirection).toBe('row');
    expect(warn).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
  } finally {
    app.unmount();
    host.remove();
    warn.mockRestore();
    error.mockRestore();
  }
});