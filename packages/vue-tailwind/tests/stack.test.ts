import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, nextTick, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { Stack } from '../src';

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
      expect(stack).toHaveClass(classes[mobile]);
      expect(stack.className.split(' ').filter((name) => name.startsWith('sm:flex-'))).toEqual(
        desktop ? ['sm:' + classes[desktop]] : [],
      );
      expect(screen.getByTestId('stack')).toBe(stack);
      expect(rootRef.value?.$el).toBe(stack);
    }
    gap.value = 0;
    fill.value = true;
    await nextTick();
    expect(stack.style.gap).toBe('0px');
    expect(stack).toHaveClass('flex-1');
    gap.value = '1rem';
    fill.value = false;
    style.value = ['color:red', { gap: '2rem' }];
    await nextTick();
    expect(stack).toHaveStyle({ color: 'red', gap: '2rem' });
    expect(stack).not.toHaveClass('flex-1');
    style.value = undefined;
    await nextTick();
    expect(stack.style.gap).toBe('1rem');
    expect(stack.style.color).toBe('');
    gap.value = undefined;
    fill.value = undefined;
    await nextTick();
    expect(stack.style.gap).toBe('');
    expect(stack).not.toHaveClass('flex-1');
  },
);

test('renders a flex root with stable styling hooks and default utilities', () => {
  render({
    components: { Stack },
    template:
      '<Stack data-part="custom" data-scope="custom" data-slot="custom" data-testid="stack" />',
  });

  const stack = screen.getByTestId('stack');

  expect(stack).toHaveAttribute('data-scope', 'stack');
  expect(stack).toHaveAttribute('data-part', 'root');
  expect(stack).toHaveAttribute('data-slot', 'stack-root');
  expect(stack).toHaveClass('flex', 'flex-col');
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

  expect(stack).toHaveClass('flex', 'flex-col-reverse', 'sm:flex-row-reverse', 'flex-1');
  expect(stack).toHaveStyle({
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '12px',
    justifyContent: 'space-between',
  });
});

test('cross-falls back responsive directions when only one breakpoint is provided', () => {
  render({
    components: { Stack },
    template: `
      <Stack :direction="{ desktop: 'row' }" data-testid="desktop-only" />
      <Stack :direction="{ mobile: 'column-reverse' }" data-testid="mobile-only" />
    `,
  });

  const desktopOnly = screen.getByTestId('desktop-only');
  const mobileOnly = screen.getByTestId('mobile-only');

  expect(desktopOnly).toHaveClass('flex-row', 'sm:flex-row');
  expect(mobileOnly).toHaveClass('flex-col-reverse', 'sm:flex-col-reverse');
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
  expect(overridden).toHaveClass('flex-row', 'sm:flex-row', 'flex-1');
  expect(overridden).toHaveStyle({ flexWrap: 'nowrap', gap: '2rem' });
});

test('lets consumer Tailwind utilities override fixed defaults', () => {
  render({
    components: { Stack },
    template: '<Stack direction="row" fill class="flex-none flex-col" data-testid="stack" />',
  });
  const stack = screen.getByTestId('stack');

  expect(stack).toHaveClass('flex-none', 'flex-col');
  expect(stack).not.toHaveClass('flex-1', 'flex-row');
});

test('preserves semantic hosts and refs with asChild', () => {
  const rootRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
    components: { Stack },
    setup() {
      return { rootRef };
    },
    template: `
      <Stack ref="rootRef" as-child :gap="12" class="stack-class">
        <section aria-label="Project updates" class="section-class" style="color: red" />
      </Stack>
    `,
  });

  render(Harness);

  const section = screen.getByRole('region', { name: 'Project updates' });

  expect(rootRef.value?.$el).toBe(section);
  expect(section.style.gap).toBe('12px');
  expect(section).toHaveClass('section-class', 'stack-class');
  expect(section).toHaveStyle({ color: 'red' });
  expect(section).toHaveAttribute('data-slot', 'stack-root');
});

test('renders and hydrates a semantic asChild root without changing its host', async () => {
  const App = defineComponent({
    components: { Stack },
    template: `
      <Stack as-child direction="row" class="figure">
        <figure aria-label="Project updates">Project updates</figure>
      </Stack>
    `,
  });

  const html = await renderToString(createSSRApp(App));
  expect(html).toContain('<figure');
  expect(html).toContain('data-slot="stack-root"');

  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const app = createSSRApp(App);
  app.mount(host);

  expect(host.querySelectorAll('figure')).toHaveLength(1);
  expect(host.querySelector('figure')).toHaveClass('figure');
  expect(host.querySelector('figure')).toHaveAttribute('data-slot', 'stack-root');

  app.unmount();
  host.remove();
});