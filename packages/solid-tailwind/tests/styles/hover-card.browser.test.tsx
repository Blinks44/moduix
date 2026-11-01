import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@solidjs/testing-library';
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
  render(() => (
    <HoverCard open portalled={false}>
      <HoverCardTrigger class="gap-2 text-destructive">Profile</HoverCardTrigger>
      <HoverCardPositioner class="max-w-none">
        <HoverCardContent data-testid="content" class="bg-card p-4">
          <HoverCardArrow class="[--arrow-size:1rem]">
            <HoverCardArrowTip class="border-primary" />
          </HoverCardArrow>
          <HoverCardBody class="overflow-hidden">Profile details</HoverCardBody>
        </HoverCardContent>
      </HoverCardPositioner>
    </HoverCard>
  ));

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