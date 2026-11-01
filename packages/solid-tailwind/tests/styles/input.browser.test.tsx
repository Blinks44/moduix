import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { Input } from '@/index';

test('lets consumer utilities replace component defaults', () => {
  render(() => (
    <Input
      size="lg"
      htmlSize={8}
      aria-label="Project key"
      class="min-h-20 w-80 max-w-sm rounded-lg bg-muted px-0 py-0 leading-5"
    />
  ));

  const input = screen.getByRole('textbox', { name: 'Project key' });
  expect([...input.classList]).toEqual(
    expect.arrayContaining([
      'w-80',
      'max-w-sm',
      'min-h-20',
      'rounded-lg',
      'bg-muted',
      'px-0',
      'py-0',
      'leading-5',
    ]),
  );
  expect(getComputedStyle(input)).toMatchObject({
    minHeight: '80px',
    width: '320px',
    paddingLeft: '0px',
    paddingRight: '0px',
    paddingTop: '0px',
    paddingBottom: '0px',
    lineHeight: '20px',
  });
});