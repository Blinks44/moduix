import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { ToggleGroup, ToggleGroupItem } from '@/index';

test('lets consumer Tailwind classes override conflicting defaults', () => {
  render(() => (
    <ToggleGroup
      class="gap-4 rounded-none border-primary bg-card p-4"
      variant="outline"
      size="lg"
      aria-label="Custom alignment"
    >
      <ToggleGroupItem value="left" class="border-primary bg-card p-0 text-xs">
        Left
      </ToggleGroupItem>
    </ToggleGroup>
  ));

  const root = screen.getByRole('radiogroup');
  const item = screen.getByRole('radio', { name: 'Left' });

  expect([...root!.classList]).toEqual(
    expect.arrayContaining(['gap-4', 'rounded-none', 'border-primary', 'bg-card', 'p-4']),
  );
  expect([...item!.classList]).toEqual(
    expect.arrayContaining(['border-primary', 'bg-card', 'p-0', 'text-xs']),
  );
  expect(getComputedStyle(root)).toMatchObject({
    gap: '16px',
    borderRadius: '0px',
    paddingTop: '16px',
  });
  expect(getComputedStyle(item)).toMatchObject({
    minHeight: '40px',
    paddingTop: '0px',
    paddingRight: '0px',
    paddingBottom: '0px',
    paddingLeft: '0px',
    fontSize: '12px',
  });
});