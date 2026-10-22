import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, nextTick, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { Stack } from '../src';
import TestStack from './fixtures/TestStack.vue';

const isDesktop = () => window.matchMedia('(min-width: 640px)').matches;

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
      [{ desktop: 'row-reverse' }, 'column', 'row-reverse'],
      [{ mobile: 'column-reverse' }, 'column-reverse', 'column-reverse'],
      [{ mobile: 'column', desktop: 'row' }, 'column', 'row'],
      [undefined, 'column', 'column'],
    ] as const) {
      direction.value = value;
      await nextTick();
      // The mobile branch is not rendered at the test viewport, so read the value it resolves to.
      expect(getComputedStyle(stack).getPropertyValue('--_stack-direction')).toBe(mobile);
      expect(getComputedStyle(stack).flexDirection).toBe(isDesktop() ? desktop : mobile);
      expect(screen.getByTestId('stack')).toBe(stack);
      expect(rootRef.value?.$el).toBe(stack);
    }
    gap.value = 0;
    fill.value = true;
    await nextTick();
    expect(stack.style.gap).toBe('0px');
    expect(getComputedStyle(stack).flexGrow).toBe('1');
    gap.value = '1rem';
    fill.value = false;
    style.value = ['color:red', { gap: '2rem' }];
    await nextTick();
    expect(stack.style).toMatchObject({ color: 'red', gap: '2rem' });
    expect(getComputedStyle(stack).flexGrow).toBe('0');
    style.value = undefined;
    await nextTick();
    expect(stack.style.gap).toBe('1rem');
    expect(stack.style.color).toBe('');
    gap.value = undefined;
    fill.value = undefined;
    await nextTick();
    expect(stack.style.gap).toBe('');
    expect(getComputedStyle(stack).flexGrow).toBe('0');
  },
);

test('renders a flex root with stable styling hooks', () => {
  render({
    components: { Stack },
    template:
      '<Stack data-part="custom" data-scope="custom" data-slot="custom" data-testid="stack" />',
  });

  const stack = screen.getByTestId('stack');

  expect(stack.getAttribute('data-scope')).toBe('stack');
  expect(stack.getAttribute('data-part')).toBe('root');
  expect(stack.getAttribute('data-slot')).toBe('stack-root');
  expect(getComputedStyle(stack).display).toBe('flex');
  expect(getComputedStyle(stack).flexDirection).toBe('column');
});

test('writes flex props and reverse directions as root styles', () => {
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

  expect(stack.style).toMatchObject({
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '12px',
    justifyContent: 'space-between',
  });
  expect(getComputedStyle(stack)).toMatchObject({
    display: 'flex',
    flexDirection: isDesktop() ? 'row-reverse' : 'column-reverse',
    flexGrow: '1',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '12px',
  });
});

test('does not pass direction or fill to nested roots', () => {
  render({
    components: { Stack },
    template: `
      <Stack direction="row" fill data-testid="outer">
        <Stack data-testid="inner" />
      </Stack>
    `,
  });

  const inner = screen.getByTestId('inner');

  expect(getComputedStyle(inner).flexDirection).toBe('column');
  expect(getComputedStyle(inner).flexGrow).toBe('0');
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

  expect(defaults.style.length).toBe(0);
  expect(getComputedStyle(defaults).flex).toBe('0 1 auto');
  expect(overridden.style).toMatchObject({ flexWrap: 'nowrap', gap: '2rem' });
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