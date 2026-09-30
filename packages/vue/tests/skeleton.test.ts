import { expect, rs, test } from '@rstest/core';
import { fireEvent, render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, nextTick, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { Skeleton } from '../src';

test('exports a flat root without compound aliases', () => {
  expect(Skeleton).not.toHaveProperty('Root');
});

test('owns stable loading hooks even when passthrough attrs conflict', () => {
  render({
    components: { Skeleton },
    template: `<Skeleton data-testid="skeleton" data-scope="custom" data-part="custom"
      data-slot="custom" data-state="loaded" data-variant="none" />`,
  });
  const skeleton = screen.getByTestId('skeleton');
  expect(skeleton.tagName).toBe('DIV');
  expect(skeleton).toHaveAttribute('aria-hidden', 'true');
  expect(skeleton).toHaveAttribute('data-scope', 'skeleton');
  expect(skeleton).toHaveAttribute('data-part', 'root');
  expect(skeleton).toHaveAttribute('data-slot', 'skeleton-root');
  expect(skeleton).toHaveAttribute('data-state', 'loading');
  expect(skeleton).toHaveAttribute('data-loading');
  expect(skeleton).toHaveAttribute('data-variant', 'pulse');
});

test('preserves an explicit accessibility override and the static variant', () => {
  render({
    components: { Skeleton },
    template: '<Skeleton :aria-hidden="false" data-testid="skeleton" variant="none" />',
  });
  const skeleton = screen.getByTestId('skeleton');
  expect(skeleton).toHaveAttribute('aria-hidden', 'false');
  expect(skeleton).toHaveAttribute('data-state', 'loading');
  expect(skeleton).toHaveAttribute('data-loading');
  expect(skeleton).toHaveAttribute('data-variant', 'none');
});

test('reveals content and preserves the custom host when loading finishes', () => {
  const rootRef = ref<ComponentPublicInstance | null>(null);
  render(
    defineComponent({
      components: { Skeleton },
      setup: () => ({ rootRef }),
      template: `<Skeleton ref="rootRef" as-child :loading="false">
      <section aria-label="Profile"><strong>Ada Lovelace</strong></section>
    </Skeleton>`,
    }),
  );
  const skeleton = screen.getByRole('region', { name: 'Profile' });
  expect(rootRef.value?.$el).toBe(skeleton);
  expect(skeleton).not.toHaveAttribute('aria-hidden');
  expect(skeleton).toHaveAttribute('data-state', 'loaded');
  expect(skeleton).not.toHaveAttribute('data-loading');
  expect(skeleton).toHaveAttribute('data-slot', 'skeleton-root');
  expect(skeleton).toHaveTextContent('Ada Lovelace');
});

test('forwards ordinary refs, consumer classes, styles, attrs and native listeners', async () => {
  const rootRef = ref<ComponentPublicInstance | null>(null);
  const handleClick = rs.fn();
  render(
    defineComponent({
      components: { Skeleton },
      setup: () => ({ rootRef, handleClick }),
      template: `<Skeleton ref="rootRef" :loading="false" id="profile" data-testid="skeleton"
      :class="['custom', { active: true }]" style="color: red" @click="handleClick">
      <span>Profile</span>
    </Skeleton>`,
    }),
  );
  const skeleton = screen.getByTestId('skeleton');
  expect(rootRef.value?.$el).toBe(skeleton);
  expect(skeleton).toHaveAttribute('id', 'profile');
  expect(skeleton).toHaveClass('custom', 'active');
  expect(skeleton.className).toMatch(/custom active$/);
  expect(skeleton).toHaveStyle({ color: 'red' });
  await fireEvent.click(skeleton);
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test('converts numeric dimensions to CSS pixels', () => {
  render(Skeleton, {
    props: { boxSize: 48, borderRadius: 8 },
    attrs: { 'data-testid': 'skeleton' },
  });
  expect(screen.getByTestId('skeleton')).toHaveStyle({
    borderRadius: '8px',
    height: '48px',
    width: '48px',
  });
});

test('lets explicit dimensions precede boxSize and preserves CSS lengths', () => {
  render(Skeleton, {
    props: { boxSize: 48, width: '70%', height: 0, borderRadius: 'var(--moduix-radius-full)' },
    attrs: { 'data-testid': 'skeleton' },
  });
  expect(screen.getByTestId('skeleton')).toHaveStyle({
    width: '70%',
    height: '0px',
  });
  expect(screen.getByTestId('skeleton').style.borderRadius).toBe('var(--moduix-radius-full)');
});

test('lets object, string and nested array styles override generated dimensions', () => {
  render({
    components: { Skeleton },
    template: `<div>
      <Skeleton data-testid="object" :box-size="48" :border-radius="8"
        :style="{ width: '20px', height: '30px', borderRadius: '12px' }" />
      <Skeleton data-testid="string" :box-size="48" :border-radius="8"
        style="width: 20px; height: 30px; border-radius: 12px" />
      <Skeleton data-testid="array" :box-size="48" :border-radius="8"
        :style="[{ width: '10px' }, [{ width: '20px', height: '30px' }], 'border-radius: 12px']" />
    </div>`,
  });
  for (const id of ['object', 'string', 'array']) {
    expect(screen.getByTestId(id)).toHaveStyle({
      borderRadius: '12px',
      height: '30px',
      width: '20px',
    });
  }
});

test('updates loading, slots, dimensions, variant and aria attrs without replacing the host', async () => {
  const loading = ref(true);
  const width = ref<number | string>(48);
  const variant = ref<'pulse' | 'none'>('pulse');
  const name = ref('Loading profile');
  const ariaHidden = ref<boolean | undefined>(undefined);
  render(
    defineComponent({
      components: { Skeleton },
      setup: () => ({ loading, width, variant, name, ariaHidden }),
      template: `<Skeleton data-testid="skeleton" :loading="loading" :width="width"
      :variant="variant" :aria-hidden="ariaHidden"><strong>{{ name }}</strong></Skeleton>`,
    }),
  );
  const skeleton = screen.getByTestId('skeleton');
  expect(skeleton).toHaveAttribute('aria-hidden', 'true');
  loading.value = false;
  width.value = '50%';
  variant.value = 'none';
  name.value = 'Ada Lovelace';
  await nextTick();
  expect(screen.getByTestId('skeleton')).toBe(skeleton);
  expect(skeleton).toHaveAttribute('data-state', 'loaded');
  expect(skeleton).not.toHaveAttribute('data-loading');
  expect(skeleton).not.toHaveAttribute('aria-hidden');
  expect(skeleton).toHaveAttribute('data-variant', 'none');
  expect(skeleton).toHaveStyle({ width: '50%' });
  expect(skeleton.style.height).toBe('');
  expect(skeleton).toHaveTextContent('Ada Lovelace');
  loading.value = true;
  ariaHidden.value = false;
  await nextTick();
  expect(skeleton).toHaveAttribute('data-loading');
  expect(skeleton).toHaveAttribute('aria-hidden', 'false');
});

test('renders and hydrates asChild with stable host, refs, styles and reactive content', async () => {
  const loading = ref(true);
  const rootRef = ref<ComponentPublicInstance | null>(null);
  const App = defineComponent({
    components: { Skeleton },
    setup: () => ({ loading, rootRef }),
    template: `<Skeleton ref="rootRef" as-child :loading="loading" :box-size="48"
      class="hydrated-skeleton" :style="[{ width: '60px' }, 'border-radius: 12px']">
      <section aria-label="Profile"><strong>Ada Lovelace</strong></section>
    </Skeleton>`,
  });
  const html = await renderToString(createSSRApp(App));
  expect(html).toContain('<section');
  expect(html).toContain('data-state="loading"');
  expect(html).toContain('aria-hidden="true"');
  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const section = host.querySelector('section');
  const app = createSSRApp(App);
  const warnings: string[] = [];
  app.config.warnHandler = (message) => warnings.push(message);
  try {
    app.mount(host);
    await nextTick();
    expect(warnings).toEqual([]);
    expect(rootRef.value?.$el).toBe(section);
    expect(host.querySelectorAll('section')).toHaveLength(1);
    expect(section).toHaveClass('hydrated-skeleton');
    expect(section).toHaveStyle({ width: '60px', height: '48px', borderRadius: '12px' });
    loading.value = false;
    await nextTick();
    expect(host.querySelector('section')).toBe(section);
    expect(section).toHaveAttribute('data-state', 'loaded');
    expect(section).not.toHaveAttribute('aria-hidden');
    expect(section).not.toHaveAttribute('data-loading');
  } finally {
    app.unmount();
    host.remove();
  }
});