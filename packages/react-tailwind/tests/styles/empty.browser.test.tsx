import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { Empty } from '@/index';

test('lets consumer utilities override default classes', () => {
  render(<Empty className="w-auto bg-background p-2" data-testid="empty" />);

  const root = screen.getByTestId('empty');
  expect([...root.classList]).toEqual(expect.arrayContaining(['w-auto', 'bg-background', 'p-2']));
  expect(getComputedStyle(root)).toMatchObject({
    paddingTop: '8px',
    paddingRight: '8px',
    paddingBottom: '8px',
    paddingLeft: '8px',
  });
});