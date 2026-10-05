import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage, AvatarRootProvider, useAvatar } from '../src';

const imageUrl = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"/>')}`;

test('renders the Ark anatomy with moduix hooks and explicit fallback content', () => {
  const rootRef = createRef<HTMLDivElement>();
  const fallbackRef = createRef<HTMLSpanElement>();

  render(
    <Avatar ref={rootRef} size="lg">
      <AvatarFallback ref={fallbackRef}>AT</AvatarFallback>
      <AvatarImage alt="Alex Taylor" />
    </Avatar>,
  );

  const root = rootRef.current!;
  const fallback = screen.getByText('AT');
  const image = screen.getByAltText('Alex Taylor');

  expect(root.getAttribute('data-scope')).toBe('avatar');
  expect(root.getAttribute('data-part')).toBe('root');
  expect(root.getAttribute('data-slot')).toBe('avatar-root');
  expect(root.getAttribute('data-size')).toBe('lg');
  expect(fallbackRef.current).toBe(fallback);
  expect(fallback.getAttribute('data-slot')).toBe('avatar-fallback');
  expect(image.getAttribute('data-slot')).toBe('avatar-image');
});

test('uses md visual styling without a data-size attribute by default', () => {
  const { getByTestId } = render(<Avatar data-testid="avatar" />);

  expect(getByTestId('avatar').hasAttribute('data-size')).toBe(false);
});

test('preserves real image loading, fallback visibility, and callback details', async () => {
  const onStatusChange = rs.fn();
  const { rerender } = render(
    <Avatar onStatusChange={onStatusChange}>
      <AvatarFallback>AT</AvatarFallback>
      <AvatarImage alt="Alex Taylor" />
    </Avatar>,
  );
  const fallback = page.getByText('AT');
  const image = page.getByAltText('Alex Taylor');
  await expect.element(fallback).toHaveAttribute('data-state', 'visible');
  await expect.element(image).toHaveAttribute('data-state', 'hidden');

  rerender(
    <Avatar onStatusChange={onStatusChange}>
      <AvatarFallback>AT</AvatarFallback>
      <AvatarImage src={imageUrl} alt="Alex Taylor" />
    </Avatar>,
  );
  await expect.element(image).toHaveAttribute('data-state', 'visible');
  await expect.element(fallback).toHaveAttribute('data-state', 'hidden');
  await expect
    .poll(() => onStatusChange.mock.calls.filter(([details]) => details.status === 'loaded'))
    .toEqual([[{ status: 'loaded' }]]);
  expect((screen.getByAltText('Alex Taylor') as HTMLImageElement).naturalWidth).toBe(64);
});
test('keeps the fallback visible when a real image fails', async () => {
  const onStatusChange = rs.fn();
  render(
    <Avatar onStatusChange={onStatusChange}>
      <AvatarFallback>AT</AvatarFallback>
      <AvatarImage src="data:image/png;base64,invalid" alt="Alex Taylor" />
    </Avatar>,
  );
  await expect.poll(() => onStatusChange.mock.calls.at(-1)).toEqual([{ status: 'error' }]);
  await expect.element(page.getByText('AT')).toHaveAttribute('data-state', 'visible');
  await expect.element(page.getByAltText('Alex Taylor')).toHaveAttribute('data-state', 'hidden');
});
test('preserves semantic root composition with asChild', () => {
  render(
    <Avatar asChild>
      <a href="mailto:alex@example.com" aria-label="Email Alex" />
    </Avatar>,
  );

  const root = screen.getByRole('link', { name: 'Email Alex' });

  expect(root.getAttribute('data-slot')).toBe('avatar-root');
  expect(root.getAttribute('data-scope')).toBe('avatar');
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
  render(<ProviderAvatar />);

  const root = screen.getByTestId('avatar-provider');

  expect(root.getAttribute('data-slot')).toBe('avatar-root-provider');
  expect(root.getAttribute('data-size')).toBe('sm');
});