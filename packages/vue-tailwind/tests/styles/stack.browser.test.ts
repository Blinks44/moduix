import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { nextTick, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { Stack } from '@/index';

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
      ['row', 'row', undefined],
      [{ desktop: 'row-reverse' }, 'column', 'row-reverse'],
      [{ mobile: 'column-reverse' }, 'column-reverse', undefined],
      [{ mobile: 'column', desktop: 'row' }, 'column', 'row'],
      [undefined, 'column', undefined],
    ] as const) {
      direction.value = value;
      await nextTick();
      expect(getComputedStyle(stack).flexDirection).toBe(
        isDesktop() ? (desktop ?? mobile) : mobile,
      );
      expect(screen.getByTestId('stack')).toBe(stack);
      expect(rootRef.value?.$el).toBe(stack);
    }
    gap.value = 0;
    fill.value = true;
    await nextTick();
    expect(stack.style.gap).toBe('0px');
    expect(getComputedStyle(stack).flexGrow).toBe('1');
    gap.value = '1.5';
    await nextTick();
    expect(stack.style.gap).toBe('var(--moduix-spacing-1-5)');
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
  },
);

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
  expect(overridden.style).toMatchObject({ flexWrap: 'nowrap', gap: '2rem' });
});

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

test('lets consumer Tailwind utilities override fixed defaults', () => {
  render({
    components: { Stack },
    template: '<Stack direction="row" fill class="flex-none flex-col" data-testid="stack" />',
  });
  const stack = screen.getByTestId('stack');

  expect([...stack.classList]).toEqual(expect.arrayContaining(['flex-none', 'flex-col']));
  expect(getComputedStyle(stack).flex).toBe('0 0 auto');
  expect(getComputedStyle(stack).flexDirection).toBe('column');
});