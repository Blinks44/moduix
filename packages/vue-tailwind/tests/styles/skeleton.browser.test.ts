import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { nextTick, ref } from 'vue';
import { Skeleton } from '@/index';

test('owns stable loading hooks even when passthrough attrs conflict', async () => {
  expect(Skeleton).not.toHaveProperty('Root');
  render({
    components: { Skeleton },
    template: `<Skeleton data-testid="skeleton" data-scope="custom" data-part="custom"
      data-slot="custom" data-state="loaded" data-variant="none"><span>Loading profile</span></Skeleton>`,
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
  await expect.element(page.getByTestId('skeleton')).toHaveCSS('display', 'block');
  await expect.element(page.getByTestId('skeleton')).toHaveCSS('height', '16px');
  await expect.element(page.getByTestId('skeleton')).toHaveCSS('overflow', 'hidden');
  await expect.element(page.getByTestId('skeleton')).toHaveCSS('animation-name', 'moduix-pulse');
  await expect.element(page.getByTestId('skeleton')).toHaveCSS('border-radius', '8px');
  await expect.element(page.getByTestId('skeleton')).toHaveCSS('pointer-events', 'none');
  await expect.element(page.getByTestId('skeleton')).toHaveCSS('user-select', 'none');
  await expect.element(page.getByTestId('skeleton')).toHaveCSS('color', 'rgba(0, 0, 0, 0)');
  expect(skeleton.getBoundingClientRect().width).toBe(skeleton.parentElement!.clientWidth);
  expect(getComputedStyle(skeleton, '::before').visibility).toBe('hidden');
  expect(getComputedStyle(skeleton, '::after').visibility).toBe('hidden');
  await expect.element(page.getByText('Loading profile')).toHaveCSS('visibility', 'hidden');
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
  await expect.element(page.getByTestId('skeleton')).toHaveCSS('animation-name', 'none');
  await expect.element(page.getByTestId('skeleton')).toHaveCSS('pointer-events', 'auto');
  await expect.element(page.getByText('Ada Lovelace')).toBeVisible();
  loading.value = true;
  ariaHidden.value = false;
  await nextTick();
  expect(skeleton.hasAttribute('data-loading')).toBe(true);
  expect(skeleton.getAttribute('aria-hidden')).toBe('false');
});

test('lets consumer utilities override loading defaults', async () => {
  render(Skeleton, {
    props: { class: 'h-8 w-1/2 animate-none rounded-lg bg-primary' },
    attrs: { 'data-testid': 'skeleton' },
  });
  await expect.element(page.getByTestId('skeleton')).toHaveCount(1);
  const skeleton = screen.getByTestId('skeleton');
  expect([...skeleton.classList]).toEqual(
    expect.arrayContaining(['h-8', 'w-1/2', 'rounded-lg', 'bg-primary', 'animate-none']),
  );
  await expect.element(page.getByTestId('skeleton')).toHaveCSS('height', '32px');
  await expect.element(page.getByTestId('skeleton')).toHaveCSS('animation-name', 'none');
});