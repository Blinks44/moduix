import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import {
  SegmentGroup,
  SegmentGroupIndicator,
  SegmentGroupItem,
  SegmentGroupItemHiddenInput,
  SegmentGroupItemText,
} from '@/index';

test('lets consumer Tailwind classes override conflicting defaults', async () => {
  render(() => (
    <SegmentGroup class="gap-4 text-primary" data-testid="root">
      <SegmentGroupIndicator class="rounded-full bg-primary" data-testid="indicator" />
      <SegmentGroupItem value="React" class="gap-4 text-primary">
        <SegmentGroupItemText>React</SegmentGroupItemText>
        <SegmentGroupItemHiddenInput />
      </SegmentGroupItem>
    </SegmentGroup>
  ));

  const root = screen.getByTestId('root');
  const indicator = screen.getByTestId('indicator');
  const item = screen.getByRole('radio', { name: 'React' }).parentElement!;

  expect([...root.classList]).toEqual(expect.arrayContaining(['gap-4', 'text-primary']));
  expect([...indicator!.classList]).toEqual(expect.arrayContaining(['rounded-full', 'bg-primary']));
  expect([...item!.classList]).toEqual(expect.arrayContaining(['gap-4', 'text-primary']));
  await expect.element(page.getByTestId('root')).toHaveCSS('gap', '16px');
  await expect.element(page.locator('[data-slot="segment-group-item"]')).toHaveCSS('gap', '16px');
});