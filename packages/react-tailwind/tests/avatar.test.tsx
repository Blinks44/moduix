import { expect, rs, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage, AvatarRootProvider, useAvatar } from '../src';

test('renders the Ark anatomy with moduix hooks and explicit fallback content', () => {
  const rootRef = createRef<HTMLDivElement>();
  const fallbackRef = createRef<HTMLSpanElement>();

  render(
    <Avatar ref={rootRef} size="lg">
      <AvatarFallback ref={fallbackRef}>AT</AvatarFallback>
      <AvatarImage src="/alex.jpg" alt="Alex Taylor" />
    </Avatar>,
  );

  const root = rootRef.current!;
  const fallback = screen.getByText('AT');
  const image = screen.getByAltText('Alex Taylor');

  expect(root).toHaveAttribute('data-scope', 'avatar');
  expect(root).toHaveAttribute('data-part', 'root');
  expect(root).toHaveAttribute('data-slot', 'avatar-root');
  expect(root).toHaveAttribute('data-size', 'lg');
  expect(root).toHaveClass('size-control-lg', 'text-lg');
  expect(fallbackRef.current).toBe(fallback);
  expect(fallback).toHaveAttribute('data-slot', 'avatar-fallback');
  expect(image).toHaveAttribute('data-slot', 'avatar-image');
});

test('uses md visual styling without a data-size attribute by default', () => {
  const { getByTestId } = render(<Avatar data-testid="avatar" />);

  expect(getByTestId('avatar')).not.toHaveAttribute('data-size');
  expect(getByTestId('avatar')).toHaveClass('size-control-md', 'text-md');
});

test('renders explicit fallback children', () => {
  render(
    <Avatar>
      <AvatarFallback>Custom fallback</AvatarFallback>
    </Avatar>,
  );

  expect(screen.getByText('Custom fallback')).toBeTruthy();
});

test('preserves the Ark image loading lifecycle and callback details', async () => {
  const onStatusChange = rs.fn();

  render(
    <Avatar onStatusChange={onStatusChange}>
      <AvatarFallback>AT</AvatarFallback>
      <AvatarImage src="/alex.jpg" alt="Alex Taylor" />
    </Avatar>,
  );

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

  render(
    <Avatar onStatusChange={onStatusChange}>
      <AvatarFallback>AT</AvatarFallback>
      <AvatarImage src="/missing.jpg" alt="Alex Taylor" />
    </Avatar>,
  );

  const fallback = screen.getByText('AT');
  const image = screen.getByAltText('Alex Taylor');

  fireEvent.error(image);

  await waitFor(() => {
    expect(onStatusChange).toHaveBeenLastCalledWith({ status: 'error' });
    expect(fallback).toHaveAttribute('data-state', 'visible');
    expect(image).toHaveAttribute('data-state', 'hidden');
  });
});

test('preserves semantic root composition with asChild', () => {
  render(
    <Avatar asChild>
      <a href="mailto:alex@example.com" aria-label="Email Alex" />
    </Avatar>,
  );

  const root = screen.getByRole('link', { name: 'Email Alex' });

  expect(root).toHaveAttribute('data-slot', 'avatar-root');
  expect(root).toHaveAttribute('data-scope', 'avatar');
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

  expect(root).toHaveAttribute('data-slot', 'avatar-root-provider');
  expect(root).toHaveAttribute('data-size', 'sm');
});

test('lets consumer Tailwind classes override conflicting defaults', () => {
  render(
    <Avatar className="size-control-xl bg-primary" data-testid="avatar">
      <AvatarFallback>AT</AvatarFallback>
    </Avatar>,
  );

  const root = screen.getByTestId('avatar');
  expect(root).toHaveClass('bg-primary');
  expect(root).toHaveClass('size-control-xl');
  expect(root).not.toHaveClass('bg-muted');
  expect(root).not.toHaveClass('size-control-md');
});