import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, nextTick, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { Skeleton } from '../src';
import TestSkeleton from './fixtures/TestSkeleton.vue';

test('owns stable loading hooks even when passthrough attrs conflict', async () => {
  expect(Skeleton).not.toHaveProperty('Root');
  render({
    components: { Skeleton },
    template: `<Skeleton data-testid="skeleton" data-scope="custom" data-part="custom"
      data-slot="custom" data-state="loaded" data-variant="none" />`,
  });
  await expect.element(page.getByTestId('skeleton')).toHaveCount(1);
  const skeleton = screen.getByTestId('skeleton');
  expect(skeleton.tagName).toBe('DIV');
  expect(skeleton.getAttribute('aria-hidden')).toBe('true');
  expect(skeleton.dataset).toMatchObject({
    scope: 'skeleton',
    part: 'root',
    slot: 'skeleton-root',
    state: 'loading',
  });
  expect(skeleton.hasAttribute('data-loading')).toBe(true);
  expect(skeleton.getAttribute('data-variant')).toBe('pulse');
});

test('preserves an explicit accessibility override and the static variant', async () => {
  render({
    components: { Skeleton },
    template: '<Skeleton :aria-hidden="false" data-testid="skeleton" variant="none" />',
  });
  await expect.element(page.getByTestId('skeleton')).toHaveCount(1);
  const skeleton = screen.getByTestId('skeleton');
  expect(skeleton.getAttribute('aria-hidden')).toBe('false');
  expect(skeleton.getAttribute('data-state')).toBe('loading');
  expect(skeleton.hasAttribute('data-loading')).toBe(true);
  expect(skeleton.getAttribute('data-variant')).toBe('none');
});

test('reveals content and preserves the custom host when loading finishes', async () => {
  const rootRef = ref<ComponentPublicInstance | null>(null);
  render({
    components: { Skeleton },
    setup: () => ({ rootRef }),
    template: `<Skeleton ref="rootRef" as-child :loading="false">
      <section aria-label="Profile"><strong>Ada Lovelace</strong></section>
    </Skeleton>`,
  });
  await expect.element(page.getByRole('region', { name: 'Profile' })).toHaveCount(1);
  const skeleton = screen.getByRole('region', { name: 'Profile' });
  expect(rootRef.value?.$el).toBe(skeleton);
  expect(skeleton.hasAttribute('aria-hidden')).toBe(false);
  expect(skeleton.getAttribute('data-state')).toBe('loaded');
  expect(skeleton.hasAttribute('data-loading')).toBe(false);
  expect(skeleton.getAttribute('data-slot')).toBe('skeleton-root');
  expect(skeleton.textContent).toContain('Ada Lovelace');
});

test('forwards ordinary refs, consumer classes, styles, attrs and native listeners', async () => {
  const rootRef = ref<ComponentPublicInstance | null>(null);
  const handleClick = rs.fn();
  render({
    components: { Skeleton },
    setup: () => ({ rootRef, handleClick }),
    template: `<Skeleton ref="rootRef" :loading="false" id="profile" data-testid="skeleton"
      :class="['custom', { active: true }]" style="color: red" @click="handleClick">
      <span>Profile</span>
    </Skeleton>`,
  });
  await expect.element(page.getByTestId('skeleton')).toHaveCount(1);
  const skeleton = screen.getByTestId('skeleton');
  expect(rootRef.value?.$el).toBe(skeleton);
  expect(skeleton.getAttribute('id')).toBe('profile');
  expect([...skeleton.classList]).toEqual(expect.arrayContaining(['custom', 'active']));
  expect(skeleton.className).toMatch(/custom active$/);
  expect(skeleton.style).toMatchObject({ color: 'red' });
  await page.getByTestId('skeleton').click();
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test('converts numeric dimensions to CSS pixels', async () => {
  render(Skeleton, {
    props: { boxSize: 48, borderRadius: 8 },
    attrs: { 'data-testid': 'skeleton' },
  });
  await expect.element(page.getByTestId('skeleton')).toHaveCount(1);
  expect(screen.getByTestId('skeleton').style).toMatchObject({
    borderRadius: '8px',
    height: '48px',
    width: '48px',
  });
  await expect.element(page.getByTestId('skeleton')).toHaveCSS('width', '48px');
  await expect.element(page.getByTestId('skeleton')).toHaveCSS('height', '48px');
  await expect.element(page.getByTestId('skeleton')).toHaveCSS('border-radius', '8px');
});

test('lets explicit dimensions precede boxSize and preserves CSS lengths', async () => {
  render(Skeleton, {
    props: { boxSize: 48, width: '70%', height: 0, borderRadius: 'var(--moduix-radius-full)' },
    attrs: { 'data-testid': 'skeleton' },
  });
  await expect.element(page.getByTestId('skeleton')).toHaveCount(1);
  expect(screen.getByTestId('skeleton').style).toMatchObject({
    width: '70%',
    height: '0px',
  });
  expect(screen.getByTestId('skeleton').style.borderRadius).toBe('var(--moduix-radius-full)');
});

test('lets object, string and nested array styles override generated dimensions', async () => {
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
    await expect.element(page.getByTestId(id)).toHaveCount(1);
    expect(screen.getByTestId(id).style).toMatchObject({
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
  render({
    components: { Skeleton },
    setup: () => ({ loading, width, variant, name, ariaHidden }),
    template: `<Skeleton data-testid="skeleton" :loading="loading" :width="width"
      :variant="variant" :aria-hidden="ariaHidden"><strong>{{ name }}</strong></Skeleton>`,
  });
  await expect.element(page.getByTestId('skeleton')).toHaveCount(1);
  const skeleton = screen.getByTestId('skeleton');
  expect(skeleton.getAttribute('aria-hidden')).toBe('true');
  loading.value = false;
  width.value = '50%';
  variant.value = 'none';
  name.value = 'Ada Lovelace';
  await nextTick();
  expect(screen.getByTestId('skeleton')).toBe(skeleton);
  expect(skeleton.getAttribute('data-state')).toBe('loaded');
  expect(skeleton.hasAttribute('data-loading')).toBe(false);
  expect(skeleton.hasAttribute('aria-hidden')).toBe(false);
  expect(skeleton.getAttribute('data-variant')).toBe('none');
  expect(skeleton.style).toMatchObject({ width: '50%' });
  expect(skeleton.style.height).toBe('');
  expect(skeleton.textContent).toContain('Ada Lovelace');
  loading.value = true;
  ariaHidden.value = false;
  await nextTick();
  expect(skeleton.hasAttribute('data-loading')).toBe(true);
  expect(skeleton.getAttribute('aria-hidden')).toBe('false');
});

test('hydrates skeleton without replacing the server host and remains reactive', async () => {
  const host = document.createElement('div');
  host.innerHTML = await renderToString(createSSRApp(TestSkeleton));
  document.body.append(host);
  const serverRoot = host.querySelector<HTMLElement>('[data-slot="skeleton-root"]')!;
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  const app = createSSRApp(TestSkeleton);
  try {
    const instance = app.mount(host) as InstanceType<typeof TestSkeleton>;
    await expect
      .element(page.getByTestId('hydrated-skeleton'))
      .toHaveAttribute('data-state', 'loading');
    expect(instance.rootRef?.$el).toBe(serverRoot);
    expect(host.querySelectorAll('section')).toHaveLength(1);
    expect([...serverRoot.classList]).toContain('hydrated-skeleton');
    expect(serverRoot.style).toMatchObject({ width: '60px', height: '48px', borderRadius: '12px' });
    instance.loading = false;
    await expect
      .element(page.getByRole('region', { name: 'Profile' }))
      .toHaveAttribute('data-state', 'loaded');
    expect(host.querySelector('section')).toBe(serverRoot);
    expect(serverRoot.hasAttribute('aria-hidden')).toBe(false);
    expect(serverRoot.hasAttribute('data-loading')).toBe(false);
    expect(warn).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
  } finally {
    app.unmount();
    host.remove();
    warn.mockRestore();
    error.mockRestore();
  }
});