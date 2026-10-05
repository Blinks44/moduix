import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { Avatar, AvatarFallback, AvatarImage, AvatarRootProvider, useAvatar } from '../src';

const imageUrl = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"/>')}`;

test('renders the Ark anatomy with moduix hooks and explicit fallback content', () => {
  let rootRef!: HTMLDivElement;
  let fallbackRef!: HTMLSpanElement;

  render(() => (
    <Avatar ref={(element) => (rootRef = element)} size="lg">
      <AvatarFallback ref={(element) => (fallbackRef = element)}>AT</AvatarFallback>
      <AvatarImage alt="Alex Taylor" />
    </Avatar>
  ));

  const root = rootRef;
  const fallback = screen.getByText('AT');
  const image = screen.getByAltText('Alex Taylor');

  expect(root.getAttribute('data-scope')).toBe('avatar');
  expect(root.getAttribute('data-part')).toBe('root');
  expect(root.getAttribute('data-slot')).toBe('avatar-root');
  expect(root.getAttribute('data-size')).toBe('lg');
  expect(fallbackRef).toBe(fallback);
  expect(fallback.getAttribute('data-slot')).toBe('avatar-fallback');
  expect(image.getAttribute('data-slot')).toBe('avatar-image');
});

test('uses md visual styling without a data-size attribute by default', () => {
  render(() => <Avatar data-testid="avatar" />);

  expect(screen.getByTestId('avatar').hasAttribute('data-size')).toBe(false);
});

test('preserves real image loading, fallback visibility, and callback details', async () => {
  const onStatusChange = rs.fn();
  const [src, setSrc] = createSignal<string>();
  render(() => (
    <Avatar onStatusChange={onStatusChange}>
      <AvatarFallback>AT</AvatarFallback>
      <AvatarImage src={src()} alt="Alex Taylor" />
    </Avatar>
  ));
  const fallback = page.getByText('AT');
  const image = page.getByAltText('Alex Taylor');
  await expect.element(fallback).toHaveAttribute('data-state', 'visible');
  await expect.element(image).toHaveAttribute('data-state', 'hidden');

  setSrc(imageUrl);
  await expect.element(image).toHaveAttribute('data-state', 'visible');
  await expect.element(fallback).toHaveAttribute('data-state', 'hidden');
  await expect
    .poll(() => onStatusChange.mock.calls.filter(([details]) => details.status === 'loaded'))
    .toEqual([[{ status: 'loaded' }]]);
  expect((screen.getByAltText('Alex Taylor') as HTMLImageElement).naturalWidth).toBe(64);
});
test('keeps the fallback visible when a real image fails', async () => {
  const onStatusChange = rs.fn();
  render(() => (
    <Avatar onStatusChange={onStatusChange}>
      <AvatarFallback>AT</AvatarFallback>
      <AvatarImage src="data:image/png;base64,invalid" alt="Alex Taylor" />
    </Avatar>
  ));
  await expect.poll(() => onStatusChange.mock.calls.at(-1)).toEqual([{ status: 'error' }]);
  await expect.element(page.getByText('AT')).toHaveAttribute('data-state', 'visible');
  await expect.element(page.getByAltText('Alex Taylor')).toHaveAttribute('data-state', 'hidden');
});
test('preserves semantic root composition with native Ark Solid asChild', () => {
  render(() => (
    <Avatar
      asChild={(props) => <a {...props()} href="mailto:alex@example.com" aria-label="Email Alex" />}
    />
  ));

  const root = screen.getByRole('link', { name: 'Email Alex' });

  expect(root.getAttribute('data-slot')).toBe('avatar-root');
  expect(root.getAttribute('data-scope')).toBe('avatar');
});

test('does not forward refs through native Ark Solid asChild composition', () => {
  let ref: HTMLDivElement | undefined;

  render(() => (
    <Avatar
      ref={(element) => (ref = element)}
      asChild={(props) => <a {...props()} href="mailto:alex@example.com" aria-label="Email Alex" />}
    />
  ));

  expect(ref).toBeUndefined();
});

function ProviderAvatar() {
  const avatar = useAvatar();

  return (
    <AvatarRootProvider value={avatar} size="sm" data-testid="avatar-provider">
      <AvatarFallback>AT</AvatarFallback>
    </AvatarRootProvider>
  );
}

test('styles externally owned Ark state through RootProvider', () => {
  render(() => <ProviderAvatar />);

  const root = screen.getByTestId('avatar-provider');

  expect(root.getAttribute('data-slot')).toBe('avatar-root-provider');
  expect(root.getAttribute('data-size')).toBe('sm');
});