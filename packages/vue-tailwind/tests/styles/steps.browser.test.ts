import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/vue';
import { defineComponent } from 'vue';
import {
  Steps,
  StepsCompletedContent,
  StepsContent,
  StepsContext,
  StepsIndicator,
  StepsItem,
  StepsItemContext,
  StepsList,
  StepsNextTrigger,
  StepsPrevTrigger,
  StepsProgress,
  StepsRootProvider,
  StepsSeparator,
  StepsTrigger,
} from '@/index';

const stepsComponents = {
  Steps,
  StepsCompletedContent,
  StepsContent,
  StepsContext,
  StepsIndicator,
  StepsItem,
  StepsItemContext,
  StepsList,
  StepsNextTrigger,
  StepsPrevTrigger,
  StepsProgress,
  StepsRootProvider,
  StepsSeparator,
  StepsTrigger,
};

test('styles empty visual parts and lets consumer utilities override defaults', async () => {
  render(
    defineComponent({
      components: stepsComponents,
      template: `
      <Steps :count="2">
        <StepsProgress />
        <StepsList>
          <StepsItem :index="0">
            <StepsTrigger><StepsIndicator />Account</StepsTrigger><StepsSeparator />
          </StepsItem>
          <StepsItem :index="1"><StepsTrigger><StepsIndicator class="size-6" />Profile</StepsTrigger></StepsItem>
        </StepsList>
      </Steps>
    `,
    }),
  );
  const indicators = document.querySelectorAll('[data-slot="steps-indicator"]');
  expect([...indicators[1]!.classList]).toEqual(expect.arrayContaining(['size-6']));
  await expect
    .element(page.locator('[data-slot="steps-indicator"]').nth(1))
    .toHaveCSS('width', '24px');
  await expect
    .element(page.locator('[data-slot="steps-indicator"]').nth(1))
    .toHaveCSS('height', '24px');
});