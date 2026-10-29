import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { Highlight } from '@/index';

test('lets consumer utilities replace conflicting defaults', async () => {
  render(
    <Highlight
      className="rounded-none bg-primary px-4 py-2 font-bold text-primary"
      data-testid="highlight"
      query="text"
      text="Highlight text"
    />,
  );

  const mark = screen.getByTestId('highlight');

  expect([...mark.classList]).toEqual(
    expect.arrayContaining([
      'px-4',
      'py-2',
      'rounded-none',
      'bg-primary',
      'font-bold',
      'text-primary',
    ]),
  );
  await expect.element(page.getByTestId('highlight')).toHaveCSS('padding', '8px 16px');
  await expect.element(page.getByTestId('highlight')).toHaveCSS('border-radius', '0px');
  await expect.element(page.getByTestId('highlight')).toHaveCSS('font-weight', '700');
});