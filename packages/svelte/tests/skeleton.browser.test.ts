import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import TestSkeleton from './skeleton/TestSkeleton.svelte';

test('preserves an explicit accessibility override and the static variant', async () => {
  render(TestSkeleton, {
    props: { 'aria-hidden': false, 'data-testid': 'skeleton', variant: 'none' },
  });
  await expect.element(page.getByTestId('skeleton')).toHaveCount(1);
  const skeleton = screen.getByTestId('skeleton');
  expect(skeleton.getAttribute('aria-hidden')).toBe('false');
  expect(skeleton.getAttribute('data-state')).toBe('loading');
  expect(skeleton.hasAttribute('data-loading')).toBe(true);
  expect(skeleton.getAttribute('data-variant')).toBe('none');
});

test('reveals content and preserves the custom host when loading finishes', async () => {
  const { component } = render(TestSkeleton, { props: { asChild: true, loading: false } });
  await expect.element(page.getByRole('region', { name: 'Profile' })).toHaveCount(1);
  const skeleton = screen.getByRole('region', { name: 'Profile' });
  expect(component.getRef()).toBe(skeleton);
  expect(skeleton.hasAttribute('aria-hidden')).toBe(false);
  expect(skeleton.getAttribute('data-state')).toBe('loaded');
  expect(skeleton.hasAttribute('data-loading')).toBe(false);
  expect(skeleton.getAttribute('data-slot')).toBe('skeleton-root');
  expect(skeleton.textContent).toContain('Ada Lovelace');
});

test('forwards ordinary refs, consumer classes, styles, attrs and native listeners', async () => {
  const handleClick = rs.fn();
  const { component } = render(TestSkeleton, {
    props: {
      loading: false,
      id: 'profile',
      'data-testid': 'skeleton',
      class: ['custom', { active: true }],
      style: 'color: red',
      onclick: handleClick,
    },
  });
  await expect.element(page.getByTestId('skeleton')).toHaveCount(1);
  const skeleton = screen.getByTestId('skeleton');
  expect(component.getRef()).toBe(skeleton);
  expect(skeleton.getAttribute('id')).toBe('profile');
  expect([...skeleton.classList]).toEqual(expect.arrayContaining(['custom', 'active']));
  expect(skeleton.style).toMatchObject({ color: 'red' });
  await page.getByTestId('skeleton').click();
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test('converts numeric dimensions to CSS pixels', async () => {
  render(TestSkeleton, {
    props: { boxSize: 48, borderRadius: 8, 'data-testid': 'skeleton' },
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
  render(TestSkeleton, {
    props: {
      boxSize: 48,
      width: '70%',
      height: 0,
      borderRadius: 'var(--moduix-radius-full)',
      'data-testid': 'skeleton',
    },
  });
  await expect.element(page.getByTestId('skeleton')).toHaveCount(1);
  expect(screen.getByTestId('skeleton').style).toMatchObject({
    width: '70%',
    height: '0px',
  });
  expect(screen.getByTestId('skeleton').style.borderRadius).toBe('var(--moduix-radius-full)');
});

test('lets a style string override generated dimensions', async () => {
  render(TestSkeleton, {
    props: {
      boxSize: 48,
      borderRadius: 8,
      style: 'width: 20px; height: 30px; border-radius: 12px',
      'data-testid': 'string',
    },
  });
  await expect.element(page.getByTestId('string')).toHaveCount(1);
  expect(screen.getByTestId('string').style).toMatchObject({
    borderRadius: '12px',
    height: '30px',
    width: '20px',
  });
});

test('keeps the server-rendered style contract and remains reactive', async () => {
  const { component, rerender } = render(TestSkeleton, {
    props: {
      asChild: true,
      boxSize: 48,
      class: 'hydrated-skeleton',
      style: 'width: 60px; border-radius: 12px',
    },
  });
  const section = screen.getByTestId('profile');
  expect(component.getRef()).toBe(section);
  expect(section.getAttribute('data-state')).toBe('loading');
  expect(section.style).toMatchObject({ width: '60px', height: '48px', borderRadius: '12px' });
  await rerender({ loading: false });
  await expect
    .element(page.getByRole('region', { name: 'Profile' }))
    .toHaveAttribute('data-state', 'loaded');
  expect(screen.getByRole('region', { name: 'Profile' })).toBe(section);
  expect(section.hasAttribute('aria-hidden')).toBe(false);
  expect(section.hasAttribute('data-loading')).toBe(false);
});

test('clips overflow only while loading', async () => {
  const { rerender } = render(TestSkeleton, {
    props: { loading: true, 'data-testid': 'skeleton' },
  });
  await expect.element(page.getByTestId('skeleton')).toHaveCSS('overflow', 'hidden');

  await rerender({ loading: false });
  await expect.element(page.getByTestId('skeleton')).toHaveCSS('overflow', 'visible');
});