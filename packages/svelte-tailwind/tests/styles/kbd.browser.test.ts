import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import KbdOverride from './KbdOverride.svelte';

test('lets consumer Tailwind classes override conflicting defaults', () => {
  render(KbdOverride);

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