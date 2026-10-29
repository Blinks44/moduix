import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { List, ListItem } from '@/index';

test('lets consumer utilities override conflicting defaults', () => {
  render(
    <List className="gap-6 ps-0 text-lg text-primary" data-testid="list">
      <ListItem>Ready</ListItem>
    </List>,
  );

  const list = screen.getByTestId('list');
  expect([...list.classList]).toEqual(
    expect.arrayContaining(['gap-6', 'ps-0', 'text-lg', 'text-primary']),
  );
  expect(getComputedStyle(list)).toMatchObject({
    rowGap: '24px',
    paddingInlineStart: '0px',
    fontSize: '18px',
  });
});