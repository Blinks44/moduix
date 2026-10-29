import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { Skeleton } from '@/index';
import TestSkeleton from './fixtures/TestSkeleton.vue';

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

test('clips overflow only while loading', async () => {
  const loading = ref(true);
  render({
    components: { Skeleton },
    setup: () => ({ loading }),
    template: '<Skeleton data-testid="skeleton" :loading="loading" />',
  });
  await expect.element(page.getByTestId('skeleton')).toHaveCSS('overflow', 'hidden');

  loading.value = false;
  await expect.element(page.getByTestId('skeleton')).toHaveCSS('overflow', 'visible');
});