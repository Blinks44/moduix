import { expect, rs, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library';
import { Avatar, AvatarFallback, AvatarImage, AvatarRootProvider, useAvatar } from '../src';

test('renders the Ark anatomy with moduix hooks and explicit fallback content', () => {
  let rootRef!: HTMLDivElement;
  let fallbackRef!: HTMLSpanElement;

  render(() => (
    <Avatar ref={(element) => (rootRef = element)} size="lg">
      <AvatarFallback ref={(element) => (fallbackRef = element)}>AT</AvatarFallback>
      <AvatarImage src="/alex.jpg" alt="Alex Taylor" />
    </Avatar>
  ));

  const root = rootRef;
  const fallback = screen.getByText('AT');
  const image = screen.getByAltText('Alex Taylor');

  expect(root).toHaveAttribute('data-scope', 'avatar');
  expect(root).toHaveAttribute('data-part', 'root');
  expect(root).toHaveAttribute('data-slot', 'avatar-root');
  expect(root).toHaveAttribute('data-size', 'lg');
  expect(fallbackRef).toBe(fallback);
  expect(fallback).toHaveAttribute('data-slot', 'avatar-fallback');
  expect(image).toHaveAttribute('data-slot', 'avatar-image');
});

test('uses md visual styling without a data-size attribute by default', () => {
  render(() => <Avatar data-testid="avatar" />);

  expect(screen.getByTestId('avatar')).not.toHaveAttribute('data-size');
});

test('renders explicit fallback children', () => {
  render(() => (
    <Avatar>
      <AvatarFallback>Custom fallback</AvatarFallback>
    </Avatar>
  ));

  expect(screen.getByText('Custom fallback')).toBeTruthy();
});

test('preserves the Ark image loading lifecycle and callback details', async () => {
  const onStatusChange = rs.fn();

  render(() => (
    <Avatar onStatusChange={onStatusChange}>
      <AvatarFallback>AT</AvatarFallback>
      <AvatarImage src="/alex.jpg" alt="Alex Taylor" />
    </Avatar>
  ));

  const fallback = screen.getByText('AT');
  const image = screen.getByAltText('Alex Taylor');

  expect(fallback).toHaveAttribute('data-state', 'visible');
  expect(image).toHaveAttribute('data-state', 'hidden');

  Object.defineProperties(image, {
    complete: { configurable: true, value: true },
    naturalHeight: { configurable: true, value: 64 },
    naturalWidth: { configurable: true, value: 64 },
  });
  fireEvent.load(image);

  await waitFor(() => {
    expect(onStatusChange).toHaveBeenLastCalledWith({ status: 'loaded' });
    expect(fallback).toHaveAttribute('data-state', 'hidden');
    expect(image).toHaveAttribute('data-state', 'visible');
  });
});

test('keeps the fallback visible when the image fails', async () => {
  const onStatusChange = rs.fn();

  render(() => (
    <Avatar onStatusChange={onStatusChange}>
      <AvatarFallback>AT</AvatarFallback>
      <AvatarImage src="/missing.jpg" alt="Alex Taylor" />
    </Avatar>
  ));

  const fallback = screen.getByText('AT');
  const image = screen.getByAltText('Alex Taylor');

  fireEvent.error(image);

  await waitFor(() => {
    expect(onStatusChange).toHaveBeenLastCalledWith({ status: 'error' });
    expect(fallback).toHaveAttribute('data-state', 'visible');
    expect(image).toHaveAttribute('data-state', 'hidden');
  });
});

test('preserves semantic root composition with native Ark Solid asChild', () => {
  render(() => (
    <Avatar
      asChild={(props) => <a {...props()} href="mailto:alex@example.com" aria-label="Email Alex" />}
    />
  ));

  const root = screen.getByRole('link', { name: 'Email Alex' });

  expect(root).toHaveAttribute('data-slot', 'avatar-root');
  expect(root).toHaveAttribute('data-scope', 'avatar');
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

  expect(root).toHaveAttribute('data-slot', 'avatar-root-provider');
  expect(root).toHaveAttribute('data-size', 'sm');
});