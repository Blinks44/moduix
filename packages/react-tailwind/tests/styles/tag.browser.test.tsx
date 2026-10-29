import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { Tag, TagLabel } from '@/index';

test('lets consumer Tailwind classes override conflicting defaults', () => {
  render(
    <Tag className="gap-3 bg-card px-4 text-card-foreground" data-testid="tag">
      <TagLabel>TypeScript</TagLabel>
    </Tag>,
  );

  const tag = screen.getByTestId('tag');

  expect([...tag!.classList]).toEqual(
    expect.arrayContaining(['gap-3', 'px-4', 'bg-card', 'text-card-foreground']),
  );
});