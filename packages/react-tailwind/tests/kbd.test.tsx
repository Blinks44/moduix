import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Kbd, KbdGroup } from '../src';

test('renders semantic keycaps and a labelled shortcut group with stable hooks', () => {
  const groupRef = createRef<HTMLSpanElement>();

  render(
    <KbdGroup ref={groupRef} aria-label="Command K" data-testid="group">
      <Kbd data-testid="key">Cmd</Kbd>+<Kbd>K</Kbd>
    </KbdGroup>,
  );

  const group = screen.getByRole('group', { name: 'Command K' });
  const key = screen.getByTestId('key');

  expect(group.tagName).toBe('SPAN');
  expect(groupRef.current).toBe(group);
  expect(group).toHaveAttribute('data-scope', 'kbd');
  expect(group).toHaveAttribute('data-part', 'group');
  expect(group).toHaveAttribute('data-slot', 'kbd-group');
  expect(group).toHaveAttribute('aria-label', 'Command K');
  expect(key.tagName).toBe('KBD');
  expect(key).toHaveAttribute('data-slot', 'kbd-root');
});

test('preserves semantic children and refs with asChild', () => {
  const keyRef = createRef<HTMLElement>();
  const groupRef = createRef<HTMLElement>();

  render(
    <KbdGroup ref={groupRef} asChild aria-label="Command K">
      <span title="Command K">
        <Kbd ref={keyRef} asChild>
          <kbd title="Escape">Esc</kbd>
        </Kbd>
      </span>
    </KbdGroup>,
  );

  const group = screen.getByRole('group', { name: 'Command K' });
  const key = screen.getByTitle('Escape');

  expect(groupRef.current).toBe(group);
  expect(keyRef.current).toBe(key);
  expect(group).toHaveAttribute('data-part', 'group');
  expect(group).toHaveAttribute('data-slot', 'kbd-group');
  expect(key).toHaveAttribute('data-part', 'root');
  expect(key).toHaveAttribute('data-slot', 'kbd-root');
});

test('applies Tailwind utilities to the root and group parts', () => {
  render(
    <KbdGroup data-testid="group">
      <Kbd data-testid="key">Cmd</Kbd>
    </KbdGroup>,
  );

  expect(screen.getByTestId('key')).toHaveClass(
    'box-border',
    'inline-flex',
    'flex-none',
    'min-h-control-xs',
    'min-w-control-xs',
    'rounded-sm',
    'border',
    'border-border',
    'bg-muted',
    'px-2',
    'font-mono',
    'text-xs',
    'font-medium',
    'tabular-nums',
    'align-middle',
    'text-foreground',
    'wrap-anywhere',
    'select-none',
  );
  expect(screen.getByTestId('group')).toHaveClass(
    'box-border',
    'inline-flex',
    'flex-wrap',
    'items-center',
    'gap-1',
    'border-0',
    'bg-transparent',
    'p-0',
    'text-muted-foreground',
    'shadow-none',
    'align-middle',
  );
});

test('lets consumer Tailwind classes override conflicting defaults', () => {
  render(
    <KbdGroup
      className="gap-3 bg-card p-2 text-foreground"
      data-testid="group"
      aria-label="Command K"
    >
      <Kbd
        className="min-h-8 min-w-8 rounded-md bg-card px-3 text-card-foreground shadow-none"
        data-testid="key"
      >
        Cmd
      </Kbd>
    </KbdGroup>,
  );

  const group = screen.getByTestId('group');
  const key = screen.getByTestId('key');

  expect(group).toHaveClass('gap-3', 'p-2', 'bg-card', 'text-foreground');
  expect(group).not.toHaveClass('gap-1', 'p-0', 'bg-transparent', 'text-muted-foreground');
  expect(key).toHaveClass(
    'min-h-8',
    'min-w-8',
    'rounded-md',
    'px-3',
    'bg-card',
    'text-card-foreground',
    'shadow-none',
  );
  expect(key).not.toHaveClass(
    'min-h-control-xs',
    'min-w-control-xs',
    'rounded-sm',
    'px-2',
    'bg-muted',
    'text-foreground',
  );
});
