import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import TagOverride from './TagOverride.svelte';

test('lets consumer Tailwind classes override conflicting defaults', () => {
  render(TagOverride);

  const tag = screen.getByTestId('tag');

  expect([...tag.classList]).toEqual(
    expect.arrayContaining(['gap-3', 'px-4', 'bg-card', 'text-card-foreground']),
  );
});