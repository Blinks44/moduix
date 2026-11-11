import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import ToggleIcons from './ToggleIcons.svelte';
import ToggleOverride from './ToggleOverride.svelte';

test('lets consumer Tailwind classes override conflicting defaults', () => {
  render(ToggleOverride);

  const toggle = screen.getByRole('button', { name: 'Save changes' });

  expect([...toggle.classList]).toEqual(
    expect.arrayContaining(['border-primary', 'bg-secondary', 'p-0', 'text-xs']),
  );
  expect(getComputedStyle(toggle)).toMatchObject({
    minHeight: '40px',
    paddingTop: '0px',
    paddingRight: '0px',
    paddingBottom: '0px',
    paddingLeft: '0px',
    fontSize: '12px',
  });
});

test('lets size utilities on icons override the default icon size', () => {
  render(ToggleIcons);

  expect(screen.getByTestId('root-icon').getBoundingClientRect().width).toBe(20);
  expect(screen.getByTestId('indicator-icon').getBoundingClientRect().width).toBe(24);
});