import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/react';
import {
  HoverCard,
  HoverCardArrow,
  HoverCardArrowTip,
  HoverCardBody,
  HoverCardContent,
  HoverCardPositioner,
  HoverCardTrigger,
} from '@/index';

test('lets consumer classes override defaults and keeps visual parts styled', async () => {
  render(
    <HoverCard open portalled={false}>
      <HoverCardTrigger className="gap-2 text-destructive">Profile</HoverCardTrigger>
      <HoverCardPositioner className="max-w-none">
        <HoverCardContent data-testid="content" className="bg-card p-4">
          <HoverCardArrow className="[--arrow-size:1rem]">
            <HoverCardArrowTip className="border-primary" />
          </HoverCardArrow>
          <HoverCardBody className="overflow-hidden">Profile details</HoverCardBody>
        </HoverCardContent>
      </HoverCardPositioner>
    </HoverCard>,
  );

  const trigger = document.querySelector('[data-slot="hover-card-trigger"]')!;
  const content = document.querySelector('[data-slot="hover-card-content"]')!;
  const positioner = document.querySelector('[data-slot="hover-card-positioner"]')!;
  const arrow = document.querySelector('[data-slot="hover-card-arrow"]')!;
  const arrowTip = document.querySelector('[data-slot="hover-card-arrow-tip"]')!;
  expect(Array.from(trigger.classList)).toEqual(
    expect.arrayContaining(['gap-2', 'text-destructive']),
  );
  expect(Array.from(positioner.classList)).toContain('max-w-none');
  expect(Array.from(content.classList)).toEqual(expect.arrayContaining(['bg-card', 'p-4']));
  expect(Array.from(arrow.classList)).toContain('[--arrow-size:1rem]');
  expect(Array.from(arrowTip.classList)).toContain('border-primary');
  await expect.element(page.getByRole('button', { name: 'Profile' })).toHaveCSS('gap', '8px');
  await expect.element(page.getByTestId('content')).toHaveCSS('padding', '16px');
});