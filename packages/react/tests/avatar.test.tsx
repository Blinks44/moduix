import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Avatar, useAvatar } from '../src';

test('renders the Ark anatomy with moduix hooks and initials', () => {
  const rootRef = createRef<HTMLDivElement>();
  const fallbackRef = createRef<HTMLSpanElement>();

  render(
    <Avatar ref={rootRef} size="lg">
      <Avatar.Fallback ref={fallbackRef} name="Alex Taylor" />
      <Avatar.Image src="/alex.jpg" alt="Alex Taylor" />
    </Avatar>,
  );

  const root = rootRef.current!;
  const fallback = screen.getByText('AT');
  const image = screen.getByAltText('Alex Taylor');

  expect(root).toHaveAttribute('data-scope', 'avatar');
  expect(root).toHaveAttribute('data-part', 'root');
  expect(root).toHaveAttribute('data-slot', 'avatar-root');
  expect(root).toHaveAttribute('data-size', 'lg');
  expect(fallbackRef.current).toBe(fallback);
  expect(fallback).toHaveAttribute('data-slot', 'avatar-fallback');
  expect(image).toHaveAttribute('data-slot', 'avatar-image');
});

test('uses md visual styling without a data-size attribute by default', () => {
  const { getByTestId } = render(<Avatar data-testid="avatar" />);

  expect(getByTestId('avatar')).not.toHaveAttribute('data-size');
});

test('prioritizes explicit fallback children over initials', () => {
  render(
    <Avatar>
      <Avatar.Fallback name="Alex Taylor">Custom fallback</Avatar.Fallback>
    </Avatar>,
  );

  expect(screen.getByText('Custom fallback')).toBeTruthy();
  expect(screen.queryByText('AT')).toBeNull();
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
    <Avatar.RootProvider value={avatar} size="sm" data-testid="avatar-provider">
      <Avatar.Fallback name="Alex Taylor" />
    </Avatar.RootProvider>
  );
}

test('styles externally owned Ark state through RootProvider', () => {
  render(<ProviderAvatar />);

  const root = screen.getByTestId('avatar-provider');

  expect(root).toHaveAttribute('data-slot', 'avatar-root-provider');
  expect(root).toHaveAttribute('data-size', 'sm');
});