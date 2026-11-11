import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import AsChildAvatar from './avatar/AsChildAvatar.svelte';
import ProviderAvatar from './avatar/ProviderAvatar.svelte';
import RefsAvatar from './avatar/RefsAvatar.svelte';
import StatusAvatar from './avatar/StatusAvatar.svelte';

const imageUrl = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"/>')}`;

test('preserves Ark anatomy, attrs, consumer classes, size, and Svelte refs', () => {
  const { component } = render(RefsAvatar);
  const { fallbackRef, imageRef, rootRef } = component.getRefs();

  const root = screen.getByLabelText('Alex T.', { selector: '[data-slot="avatar-root"]' });
  const fallback = screen.getByText('AT').closest('[data-part="fallback"]') as HTMLElement;
  const image = screen.getByAltText('Alex T.') as HTMLImageElement;

  expect(root.getAttribute('data-slot')).toBe('avatar-root');
  expect(root.getAttribute('data-scope')).toBe('avatar');
  expect(root.getAttribute('data-part')).toBe('root');
  expect(root.getAttribute('id')).toBe('avatar:profile');
  expect(root.getAttribute('aria-label')).toBe('Alex T.');
  expect(root.getAttribute('data-probe')).toBe('root');
  expect(root.getAttribute('data-size')).toBe('lg');
  expect(root.className.endsWith('consumer-root')).toBe(true);
  expect(fallback.getAttribute('data-slot')).toBe('avatar-fallback');
  expect(fallback.getAttribute('data-state')).toBe('visible');
  expect(fallback.className.endsWith('consumer-fallback')).toBe(true);
  expect(image.getAttribute('data-slot')).toBe('avatar-image');
  expect(image.getAttribute('data-state')).toBe('hidden');
  expect(image.className.endsWith('consumer-image')).toBe(true);
  expect(rootRef).toBe(root);
  expect(fallbackRef).toBe(fallback);
  expect(imageRef).toBe(image);
});

test('keeps image status, fallback, snippet context, and hook reactive after real loading', async () => {
  const onStatusChange = rs.fn((_details: { status: string }) => {});
  const { rerender } = render(StatusAvatar, { props: { onStatusChange } });
  const image = page.getByAltText('Alex T.');
  const fallback = page.locator('[data-part="fallback"]');

  await expect.element(image).toHaveAttribute('data-state', 'hidden');
  await expect.element(fallback).toHaveAttribute('data-state', 'visible');
  await expect.element(page.getByText('Slot: loading')).toBeVisible();
  await expect.element(page.getByText('Hook: loading')).toBeVisible();

  await rerender({ src: imageUrl });
  await expect.element(image).toHaveAttribute('data-state', 'visible');
  await expect.element(fallback).toHaveAttribute('data-state', 'hidden');
  await expect.element(page.getByText('Slot: loaded')).toBeVisible();
  await expect.element(page.getByText('Hook: loaded')).toBeVisible();
  await expect
    .poll(() => onStatusChange.mock.calls.filter(([details]) => details.status === 'loaded'))
    .toEqual([[{ status: 'loaded' }]]);
  expect((screen.getByAltText('Alex T.') as HTMLImageElement).naturalWidth).toBe(64);
});

test('keeps the fallback visible when a real image fails', async () => {
  const onStatusChange = rs.fn((_details: { status: string }) => {});
  render(StatusAvatar, { props: { onStatusChange, src: 'data:image/png;base64,invalid' } });

  await expect.poll(() => onStatusChange.mock.calls.at(-1)).toEqual([{ status: 'error' }]);
  await expect
    .element(page.locator('[data-part="fallback"]'))
    .toHaveAttribute('data-state', 'visible');
  await expect.element(page.getByAltText('Alex T.')).toHaveAttribute('data-state', 'hidden');
});

test('connects useAvatar state through AvatarRootProvider', () => {
  const { component } = render(ProviderAvatar);
  const root = component.getRefs().rootRef!;

  expect(root.getAttribute('data-slot')).toBe('avatar-root-provider');
  expect(root.getAttribute('data-scope')).toBe('avatar');
  expect(root.getAttribute('data-size')).toBe('sm');
  expect(root.className.endsWith('consumer-provider')).toBe(true);
  expect(screen.getByAltText('Alex T.')?.isConnected).toBe(true);
});

test('preserves root and fallback asChild hosts and refs', () => {
  const { component } = render(AsChildAvatar);
  const { fallbackRef, rootRef } = component.getRefs();
  const root = screen.getByRole('link', { name: 'Alex T.' });
  const fallback = screen.getByText('AT');

  expect(root.tagName).toBe('A');
  expect(root.getAttribute('data-slot')).toBe('avatar-root');
  expect(root.getAttribute('id')).toBe('avatar:avatar-link');
  expect(rootRef).toBe(root);
  expect(fallback.tagName).toBe('SPAN');
  expect(fallback.getAttribute('data-slot')).toBe('avatar-fallback');
  expect(fallbackRef).toBe(fallback);
});

test('forwards the replacement image snippet to Ark asChild', async () => {
  const statuses: string[] = [];
  const { component, rerender } = render(AsChildAvatar, {
    props: { onStatusChange: (details: { status: string }) => statuses.push(details.status) },
  });
  const image = screen.getByAltText('Alex T. photo') as HTMLImageElement;

  expect(image.getAttribute('data-replacement')).toBe('image');
  expect(image.getAttribute('data-slot')).toBe('avatar-image');
  expect(image.getAttribute('data-part')).toBe('image');
  expect(image.getAttribute('data-state')).toBe('hidden');
  expect(image.className.endsWith('consumer-image')).toBe(true);
  expect(component.getRefs().imageRef).toBe(image);

  await rerender({ src: imageUrl });

  await expect.element(page.getByAltText('Alex T. photo')).toHaveAttribute('data-state', 'visible');
  expect(screen.getByText('AT').closest('[data-part="fallback"]')?.getAttribute('data-state')).toBe(
    'hidden',
  );
  expect(statuses.filter((status) => status === 'loaded')).toEqual(['loaded']);
});