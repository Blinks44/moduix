import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { Steps, StepsIndicator, StepsItem, StepsList, StepsTrigger } from '@/index';

const items = [
  { title: 'Account', content: 'Account content' },
  { title: 'Profile', content: 'Profile content' },
];

test('lets consumer Tailwind classes override conflicting defaults', async () => {
  render(
    <Steps count={items.length}>
      <StepsList>
        <StepsItem index={0}>
          <StepsTrigger>
            <StepsIndicator className="size-6" />
            Account
          </StepsTrigger>
        </StepsItem>
      </StepsList>
    </Steps>,
  );

  const indicator = screen.getByText('1');
  expect([...indicator!.classList]).toEqual(expect.arrayContaining(['size-6']));
  await expect.element(page.locator('[data-slot="steps-indicator"]')).toHaveCSS('width', '24px');
  await expect.element(page.locator('[data-slot="steps-indicator"]')).toHaveCSS('height', '24px');
});