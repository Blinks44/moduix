import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Kbd, KbdGroup } from '../src';

test('renders semantic keycaps and a labelled shortcut group with stable hooks', () => {
  const groupRef = createRef<HTMLSpanElement>();

  render(
    <KbdGroup
      ref={groupRef}
      aria-label="Command K"
      data-testid="group"
      data-scope="consumer"
      data-part="consumer"
      role="presentation"
    >
      <Kbd data-testid="key" data-scope="consumer" data-part="consumer">
        Cmd
      </Kbd>
      +<Kbd>K</Kbd>
    </KbdGroup>,
  );

  const group = screen.getByRole('group', { name: 'Command K' });
  const key = screen.getByTestId('key');

  expect(group.tagName).toBe('SPAN');
  expect(groupRef.current).toBe(group);
  expect(group.getAttribute('data-scope')).toBe('kbd');
  expect(group.getAttribute('data-part')).toBe('group');
  expect(group.getAttribute('data-slot')).toBe('kbd-group');
  expect(group.getAttribute('aria-label')).toBe('Command K');
  expect(key.tagName).toBe('KBD');
  expect(key.getAttribute('data-slot')).toBe('kbd-root');
  expect(key.dataset).toMatchObject({ scope: 'kbd', part: 'root' });
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
  expect(group.getAttribute('data-part')).toBe('group');
  expect(group.getAttribute('data-slot')).toBe('kbd-group');
  expect(key.getAttribute('data-part')).toBe('root');
  expect(key.getAttribute('data-slot')).toBe('kbd-root');
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

  expect([...group.classList]).toEqual(
    expect.arrayContaining(['gap-3', 'p-2', 'bg-card', 'text-foreground']),
  );
  expect([...key.classList]).toEqual(
    expect.arrayContaining([
      'min-h-8',
      'min-w-8',
      'rounded-md',
      'px-3',
      'bg-card',
      'text-card-foreground',
      'shadow-none',
    ]),
  );
  expect(getComputedStyle(group)).toMatchObject({ gap: '12px', padding: '8px' });
  expect(getComputedStyle(key)).toMatchObject({
    minHeight: '32px',
    minWidth: '32px',
    paddingInlineStart: '12px',
  });
});