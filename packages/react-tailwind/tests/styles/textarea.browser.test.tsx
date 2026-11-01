import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { Textarea } from '@/index';

test('lets consumer utilities replace component defaults', () => {
  render(
    <Textarea
      aria-label="Project summary"
      className="min-h-20 w-80 max-w-sm resize-none rounded-lg bg-muted px-0 py-0 leading-5"
    />,
  );

  const textarea = screen.getByRole('textbox', { name: 'Project summary' });
  expect([...textarea.classList]).toEqual(
    expect.arrayContaining([
      'w-80',
      'max-w-sm',
      'min-h-20',
      'rounded-lg',
      'bg-muted',
      'px-0',
      'py-0',
      'leading-5',
      'resize-none',
    ]),
  );
  expect(getComputedStyle(textarea)).toMatchObject({
    width: '320px',
    minHeight: '80px',
    padding: '0px',
    resize: 'none',
  });
});