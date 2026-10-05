import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { Kbd, KbdGroup } from '../src';

test('renders semantic keycaps and a labelled shortcut group with stable hooks', () => {
  let groupRef!: HTMLSpanElement;

  render(() => (
    <KbdGroup
      ref={(element) => (groupRef = element)}
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
    </KbdGroup>
  ));

  const group = screen.getByRole('group', { name: 'Command K' });
  const key = screen.getByTestId('key');

  expect(group.tagName).toBe('SPAN');
  expect(groupRef).toBe(group);
  expect(group.getAttribute('data-scope')).toBe('kbd');
  expect(group.getAttribute('data-part')).toBe('group');
  expect(group.getAttribute('data-slot')).toBe('kbd-group');
  expect(group.getAttribute('aria-label')).toBe('Command K');
  expect(key.tagName).toBe('KBD');
  expect(key.getAttribute('data-slot')).toBe('kbd-root');
  expect(key.dataset).toMatchObject({ scope: 'kbd', part: 'root' });
  expect(getComputedStyle(key)).toMatchObject({
    display: 'flex',
    minHeight: '24px',
    minWidth: '24px',
    fontSize: '12px',
    fontWeight: '500',
    userSelect: 'none',
    fontVariantNumeric: 'tabular-nums',
  });
  expect(getComputedStyle(group)).toMatchObject({
    display: 'inline-flex',
    flexWrap: 'wrap',
    gap: '4px',
    padding: '0px',
    borderWidth: '0px',
  });
  expect([...group.classList]).toContain('shadow-none');
});

test('preserves semantic children and stable hooks with native Ark Solid asChild', () => {
  let keyRef: HTMLElement | undefined;
  let groupRef: HTMLElement | undefined;

  render(() => (
    <KbdGroup
      ref={(element) => (groupRef = element)}
      asChild={(props) => <span {...props()} />}
      aria-label="Command K"
    >
      <Kbd
        ref={(element) => (keyRef = element)}
        asChild={(props) => <kbd {...props()} title="Escape" />}
      >
        Esc
      </Kbd>
    </KbdGroup>
  ));

  const group = screen.getByRole('group', { name: 'Command K' });
  const key = screen.getByTitle('Escape');

  expect(groupRef).toBeUndefined();
  expect(keyRef).toBeUndefined();
  expect(group.getAttribute('data-part')).toBe('group');
  expect(group.getAttribute('data-slot')).toBe('kbd-group');
  expect(key.getAttribute('data-part')).toBe('root');
  expect(key.getAttribute('data-slot')).toBe('kbd-root');
});

test('lets consumer Tailwind classes override conflicting defaults', () => {
  render(() => (
    <KbdGroup class="gap-3 bg-card p-2 text-foreground" data-testid="group" aria-label="Command K">
      <Kbd
        class="min-h-8 min-w-8 rounded-md bg-card px-3 text-card-foreground shadow-none"
        data-testid="key"
      >
        Cmd
      </Kbd>
    </KbdGroup>
  ));

  const group = screen.getByTestId('group');
  const key = screen.getByTestId('key');

  expect([...group.classList]).toEqual(
    expect.arrayContaining(['gap-3', 'p-2', 'bg-card', 'text-foreground']),
  );
  expect([...group.classList]).not.toContain('gap-1');
  expect([...group.classList]).not.toContain('p-0');
  expect([...group.classList]).not.toContain('bg-transparent');
  expect([...group.classList]).not.toContain('text-muted-foreground');
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
  expect([...key.classList]).not.toContain('min-h-control-xs');
  expect([...key.classList]).not.toContain('min-w-control-xs');
  expect([...key.classList]).not.toContain('rounded-sm');
  expect([...key.classList]).not.toContain('px-2');
  expect([...key.classList]).not.toContain('bg-muted');
  expect([...key.classList]).not.toContain('text-foreground');
  expect(getComputedStyle(group)).toMatchObject({ gap: '12px', padding: '8px' });
  expect(getComputedStyle(key)).toMatchObject({
    minHeight: '32px',
    minWidth: '32px',
    paddingInlineStart: '12px',
  });
});