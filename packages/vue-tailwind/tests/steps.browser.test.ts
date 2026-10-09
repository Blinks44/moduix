import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, nextTick, defineComponent, ref } from 'vue';
import type { ComponentPublicInstance, PropType } from 'vue';
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
  useSteps,
  useStepsContext,
  useStepsItemContext,
} from '../src';
import type { StepChangeDetails } from '../src';
import SsrSteps from './fixtures/SsrSteps.vue';

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

const items = [
  { title: 'Account', content: 'Account content' },
  { title: 'Profile', content: 'Profile content' },
];

const TestSteps = defineComponent({
  components: stepsComponents,
  emits: ['update:step'],
  props: {
    isStepValid: {
      type: Function as PropType<(index: number) => boolean>,
      default: undefined,
    },
    linear: { type: Boolean, default: undefined },
    onStepChange: {
      type: Function as PropType<(details: StepChangeDetails) => void>,
      default: undefined,
    },
    onStepInvalid: {
      type: Function as PropType<
        (details: { step: number; action: 'next' | 'set'; targetStep?: number }) => void
      >,
      default: undefined,
    },
    step: { type: Number, default: undefined },
  },
  setup: () => ({ items }),
  template: `
    <Steps
      :count="items.length"
      :is-step-valid="isStepValid"
      :linear="linear"
      :step="step"
      @update:step="$emit('update:step', $event)"
      @step-change="onStepChange"
      @step-invalid="onStepInvalid"
    >
      <StepsList>
        <StepsItem v-for="(item, index) in items" :key="item.title" :index="index">
          <StepsTrigger>
            <StepsIndicator />
            {{ item.title }}
          </StepsTrigger>
          <StepsSeparator />
        </StepsItem>
      </StepsList>
      <StepsContent v-for="(item, index) in items" :key="item.title" :index="index">
        {{ item.content }}
      </StepsContent>
      <StepsCompletedContent>Complete</StepsCompletedContent>
      <StepsPrevTrigger>Back</StepsPrevTrigger>
      <StepsNextTrigger>Next</StepsNextTrigger>
    </Steps>
  `,
});

test('preserves Ark semantics, refs, anatomy, classes, and default indicators', async () => {
  const rootRef = ref<ComponentPublicInstance>();
  const triggerRef = ref<ComponentPublicInstance>();
  const changes: number[] = [];
  const Harness = defineComponent({
    components: stepsComponents,
    setup: () => ({
      changes,
      handleStepChange: (details: StepChangeDetails) => changes.push(details.step),
      rootRef,
      triggerRef,
    }),
    template: `
      <Steps
        ref="rootRef"
        :count="2"
        class="consumer-root"
        data-probe="root"
        @step-change="handleStepChange"
      >
        <StepsList>
          <StepsItem :index="0">
            <StepsTrigger ref="triggerRef" class="consumer-trigger">
              <StepsIndicator />
              Account
            </StepsTrigger>
            <StepsSeparator />
          </StepsItem>
          <StepsItem :index="1">
            <StepsTrigger><StepsIndicator />Profile</StepsTrigger>
            <StepsSeparator />
          </StepsItem>
        </StepsList>
        <StepsContent :index="0">Account content</StepsContent>
        <StepsContent :index="1">Profile content</StepsContent>
        <StepsPrevTrigger>Back</StepsPrevTrigger>
        <StepsNextTrigger>Next</StepsNextTrigger>
      </Steps>
    `,
  });

  render(Harness);

  const account = screen.getByRole('tab', { name: /Account/ });

  const indicators = document.querySelectorAll('[data-slot="steps-indicator"]');
  const root = rootRef.value?.$el as HTMLElement;

  expect(root!.getAttribute('data-slot')).toBe('steps-root');
  expect(root!.getAttribute('data-scope')).toBe('steps');
  expect(root!.getAttribute('data-part')).toBe('root');
  expect(root!.getAttribute('data-probe')).toBe('root');
  expect([...root!.classList]).toEqual(expect.arrayContaining(['consumer-root']));
  expect([...root!.classList]).toEqual(expect.arrayContaining(['max-w-[52rem]']));
  expect([...account!.classList]).toEqual(expect.arrayContaining(['consumer-trigger']));
  await expect
    .element(page.getByRole('tab', { name: /Account/, exact: true }))
    .toHaveAttribute('aria-controls');
  await expect
    .element(page.getByRole('tab', { name: /Profile/, exact: true }))
    .toHaveAttribute('aria-controls');
  expect(triggerRef.value?.$el).toBe(account);
  expect(indicators[0]!.textContent).toContain('1');
  await expect.element(page.getByRole('button', { name: 'Back', exact: true })).toBeDisabled();

  await page.getByRole('button', { name: 'Next', exact: true }).click();

  await expect.poll(() => changes).toEqual([1]);
  expect(indicators[0]!.hasAttribute('data-complete')).toBe(true);
  expect(Boolean(indicators[0]?.querySelector('svg')?.isConnected)).toBe(true);
});

test('keeps controlled step state synchronized with Ark details and v-model:step', async () => {
  const step = ref(0);
  const changes: number[] = [];
  const Harness = defineComponent({
    components: { TestSteps },
    setup: () => ({
      changes,
      handleStepChange: (details: StepChangeDetails) => changes.push(details.step),
      step,
    }),
    template: `
      <TestSteps v-model:step="step" @step-change="handleStepChange" />
      <output role="status">Current step: {{ step + 1 }}</output>
    `,
  });

  render(Harness);
  await page.getByRole('button', { name: 'Next', exact: true }).click();

  await expect.poll(() => step.value).toBe(1);
  expect(changes).toEqual([1]);
  await expect.element(page.getByRole('status')).toContainText('Current step: 2');
  await expect
    .element(page.getByRole('tab', { name: /Profile/, exact: true }))
    .toHaveAttribute('aria-selected', 'true');
});

test('preserves completion events, progress, and skippable navigation', async () => {
  const complete = rs.fn();
  const change = rs.fn();
  render(
    defineComponent({
      components: stepsComponents,
      setup: () => ({ complete, change, isStepSkippable: (index: number) => index === 1 }),
      template: `
      <Steps :count="3" linear :is-step-valid="index => index !== 1" :is-step-skippable="isStepSkippable"
        @step-complete="complete" @step-change="change">
        <StepsProgress />
        <StepsContent :index="0">First panel</StepsContent>
        <StepsContent :index="2">Last panel</StepsContent>
        <StepsCompletedContent>Finished</StepsCompletedContent>
        <StepsPrevTrigger>Back</StepsPrevTrigger>
        <StepsNextTrigger>Next</StepsNextTrigger>
      </Steps>
    `,
    }),
  );
  const button = page.getByRole('button', { name: 'Next', exact: true });
  await button.click();
  await expect.poll(() => change).toHaveBeenLastCalledWith({ step: 1 });
  await button.click();
  await expect.poll(() => change).toHaveBeenLastCalledWith({ step: 2 });
  await expect.element(page.getByText('Last panel')).toBeVisible();
  expect(
    document
      .querySelector<HTMLElement>('[data-slot="steps-root"]')!
      .style.getPropertyValue('--percent'),
  ).toBe('66.66666666666666%');
  await button.click();
  await expect.poll(() => complete).toHaveBeenCalledTimes(1);
  expect(change).toHaveBeenCalledTimes(3);
  await expect.element(page.getByText('Finished')).toBeVisible();
  await expect.element(button).toBeDisabled();
  await expect
    .element(page.locator('[data-slot="steps-progress"]'))
    .toHaveAttribute('data-complete');
  await page.getByRole('button', { name: 'Back', exact: true }).click();
  await expect.element(page.getByText('Last panel')).toBeVisible();
});

test('preserves Ark linear validation and prevents direct navigation', async () => {
  const invalidSteps: Array<{
    step: number;
    action: 'next' | 'set';
    targetStep?: number;
  }> = [];
  const Harness = defineComponent({
    components: { TestSteps },
    setup: () => ({
      handleInvalid: (details: { step: number; action: 'next' | 'set'; targetStep?: number }) =>
        invalidSteps.push(details),
      isStepValid: (index: number) => index !== 0,
    }),
    template: '<TestSteps linear :is-step-valid="isStepValid" :on-step-invalid="handleInvalid" />',
  });

  render(Harness);
  await page.getByRole('button', { name: 'Next', exact: true }).click();

  await expect.poll(() => invalidSteps).toHaveLength(1);
  expect(invalidSteps[0]).toMatchObject({ step: 0, action: 'next' });

  await page.getByRole('tab', { name: /Profile/, exact: true }).click();
  expect(invalidSteps).toHaveLength(1);
  await expect.element(page.getByRole('tab').nth(0)).toHaveAttribute('aria-selected', 'true');
});

test('keeps RootProvider stores and context parts connected', async () => {
  const RootContextState = defineComponent({
    setup: () => ({ steps: useStepsContext() }),
    template: '<output>Root step: {{ steps.value + 1 }}</output>',
  });
  const ItemContextState = defineComponent({
    setup: () => ({ item: useStepsItemContext() }),
    template: '<span>First item is {{ item.current ? "current" : "not current" }}</span>',
  });
  const Harness = defineComponent({
    components: {
      ...stepsComponents,
      ItemContextState,
      RootContextState,
    },
    setup: () => ({ steps: useSteps({ count: items.length }) }),
    template: `
      <button type="button" @click="steps.goToNextStep">Advance externally</button>
      <StepsRootProvider :value="steps">
        <RootContextState />
        <StepsContext v-slot="context"><output>Context step: {{ context.value + 1 }}</output></StepsContext>
        <StepsList>
          <StepsItem :index="0">
            <StepsTrigger>Account <ItemContextState /></StepsTrigger>
          </StepsItem>
          <StepsItem :index="1"><StepsTrigger>Profile</StepsTrigger></StepsItem>
        </StepsList>
      </StepsRootProvider>
    `,
  });

  render(Harness);
  await expect.element(page.getByText('Root step: 1')).toBeAttached();
  await expect.element(page.getByText('Context step: 1')).toBeAttached();
  await expect.element(page.getByText('First item is current')).toBeAttached();

  await page.getByRole('button', { name: 'Advance externally', exact: true }).click();
  await expect.element(page.getByText('Root step: 2')).toBeAttached();
  await expect.element(page.getByText('Context step: 2')).toBeAttached();
  await expect.element(page.getByText('First item is not current')).toBeAttached();
});

test('preserves custom indicator slots and semantic asChild hosts', async () => {
  const rootRef = ref<ComponentPublicInstance>();
  const triggerRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
    components: stepsComponents,
    setup: () => ({ rootRef, triggerRef }),
    template: `
      <Steps ref="rootRef" as-child :count="2">
        <section aria-label="Setup steps">
          <StepsList>
            <StepsItem :index="0">
              <StepsTrigger ref="triggerRef" as-child>
                <a href="#account"><StepsIndicator>Start</StepsIndicator>Account</a>
              </StepsTrigger>
              <StepsSeparator />
            </StepsItem>
            <StepsItem :index="1"><StepsTrigger><StepsIndicator />Profile</StepsTrigger></StepsItem>
          </StepsList>
          <StepsContent :index="0">Account content</StepsContent>
          <StepsContent :index="1">Profile content</StepsContent>
        </section>
      </Steps>
    `,
  });

  render(Harness);
  const root = screen.getByRole('region', { name: 'Setup steps' });
  const trigger = screen.getByRole('tab', { name: 'Account' });

  expect(root.tagName).toBe('SECTION');
  expect(rootRef.value?.$el).toBe(root);
  expect(trigger.tagName).toBe('A');
  expect(triggerRef.value?.$el).toBe(trigger);
  await expect
    .element(page.getByRole('tab', { name: 'Account', exact: true }))
    .toHaveAttribute('data-slot', 'steps-trigger');
  await expect.element(page.getByText('Start')).toBeAttached();
});

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
  expect([...indicators[0]!.classList]).toEqual(
    expect.arrayContaining(['size-8', 'border', 'rounded-full', 'bg-background']),
  );
  expect([...indicators[1]!.classList]).toEqual(expect.arrayContaining(['size-6']));
  expect(indicators[1]!.classList.contains('size-8')).toBe(false);
  expect([...document.querySelector('[data-slot="steps-separator"]')!.classList]).toEqual(
    expect.arrayContaining(['h-px', 'min-w-8', 'bg-border']),
  );
  expect([...document.querySelector('[data-slot="steps-progress"]')!.classList]).toEqual(
    expect.arrayContaining(['h-0.5', 'rounded-full', 'bg-border']),
  );
  await expect
    .element(page.locator('[data-slot="steps-indicator"]').nth(1))
    .toHaveCSS('width', '24px');
  await expect
    .element(page.locator('[data-slot="steps-indicator"]').nth(1))
    .toHaveCSS('height', '24px');
});

test('hydrates stable hosts and ids and remains interactive', async () => {
  const html = await renderToString(createSSRApp(SsrSteps));
  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const serverRoot = host.querySelector('[data-slot="steps-root"]');
  const serverNodes = [...host.querySelectorAll('[data-slot]')];
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  expect(serverRoot).not.toBeNull();
  expect(serverIds.length).toBeGreaterThan(0);
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  const app = createSSRApp(SsrSteps);
  try {
    app.mount(host);
    await nextTick();
    expect(warn).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
    expect(host.querySelector('[data-slot="steps-root"]')).toBe(serverRoot);
    expect([...host.querySelectorAll('[data-slot]')]).toEqual(serverNodes);
    expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);
    await page.getByRole('tab', { name: /Account/ }).click();
    await expect.element(page.getByText('Account content', { exact: true })).toBeVisible();
  } finally {
    app.unmount();
    host.remove();
    warn.mockRestore();
    error.mockRestore();
  }
});