import { expect, rs, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, nextTick, ref } from 'vue';
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
  const profile = screen.getByRole('tab', { name: /Profile/ });
  const indicators = document.querySelectorAll('[data-slot="steps-indicator"]');
  const root = rootRef.value?.$el as HTMLElement;

  expect(root).toHaveAttribute('data-slot', 'steps-root');
  expect(root).toHaveAttribute('data-scope', 'steps');
  expect(root).toHaveAttribute('data-part', 'root');
  expect(root).toHaveAttribute('data-probe', 'root');
  expect(root).toHaveClass('consumer-root');
  expect(root).toHaveClass('max-w-[52rem]');
  expect(account).toHaveClass('consumer-trigger');
  expect(account).toHaveAttribute('aria-controls');
  expect(profile).toHaveAttribute('aria-controls');
  expect(triggerRef.value?.$el).toBe(account);
  expect(indicators[0]).toHaveTextContent('1');
  expect(screen.getByRole('button', { name: 'Back' })).toBeDisabled();

  await fireEvent.click(screen.getByRole('button', { name: 'Next' }));

  await waitFor(() => expect(changes).toEqual([1]));
  expect(indicators[0]).toHaveAttribute('data-complete');
  expect(indicators[0]?.querySelector('svg')).toBeInTheDocument();
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
  await fireEvent.click(screen.getByRole('button', { name: 'Next' }));

  await waitFor(() => expect(step.value).toBe(1));
  expect(changes).toEqual([1]);
  expect(screen.getByRole('status')).toHaveTextContent('Current step: 2');
  expect(screen.getByRole('tab', { name: /Profile/ })).toHaveAttribute('aria-selected', 'true');
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
  await fireEvent.click(screen.getByRole('button', { name: 'Next' }));
  await waitFor(() => expect(change).toHaveBeenLastCalledWith({ step: 1 }));
  await fireEvent.click(screen.getByRole('button', { name: 'Next' }));
  await waitFor(() => expect(change).toHaveBeenLastCalledWith({ step: 2 }));
  expect(screen.getByText('Last panel')).toBeVisible();
  expect(document.querySelector('[data-slot="steps-root"]')).toHaveStyle(
    '--percent: 66.66666666666666%',
  );
  await fireEvent.click(screen.getByRole('button', { name: 'Next' }));
  await waitFor(() => expect(complete).toHaveBeenCalledTimes(1));
  expect(change).toHaveBeenCalledTimes(3);
  expect(screen.getByText('Finished')).toBeVisible();
  expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();
  expect(document.querySelector('[data-slot="steps-progress"]')).toHaveAttribute('data-complete');
  await fireEvent.click(screen.getByRole('button', { name: 'Back' }));
  await waitFor(() => expect(screen.getByText('Last panel')).toBeVisible());
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
  await fireEvent.click(screen.getByRole('button', { name: 'Next' }));

  await waitFor(() => expect(invalidSteps).toHaveLength(1));
  expect(invalidSteps[0]).toMatchObject({ step: 0, action: 'next' });

  const [account] = screen.getAllByRole('tab');
  await fireEvent.click(screen.getByRole('tab', { name: /Profile/ }));
  expect(invalidSteps).toHaveLength(1);
  expect(account).toHaveAttribute('aria-selected', 'true');
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
  expect(screen.getByText('Root step: 1')).toBeInTheDocument();
  expect(screen.getByText('Context step: 1')).toBeInTheDocument();
  expect(screen.getByText('First item is current')).toBeInTheDocument();

  await fireEvent.click(screen.getByRole('button', { name: 'Advance externally' }));
  await waitFor(() => expect(screen.getByText('Root step: 2')).toBeInTheDocument());
  expect(screen.getByText('Context step: 2')).toBeInTheDocument();
  expect(screen.getByText('First item is not current')).toBeInTheDocument();
});

test('preserves custom indicator slots and semantic asChild hosts', () => {
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
  expect(trigger).toHaveAttribute('data-slot', 'steps-trigger');
  expect(screen.getByText('Start')).toBeInTheDocument();
});

test('styles empty visual parts and lets consumer utilities override defaults', () => {
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
  expect(indicators[0]).toHaveClass('size-8', 'border', 'rounded-full', 'bg-background');
  expect(indicators[1]).toHaveClass('size-6');
  expect(indicators[1]).not.toHaveClass('size-8');
  expect(document.querySelector('[data-slot="steps-separator"]')).toHaveClass(
    'h-px',
    'min-w-8',
    'bg-border',
  );
  expect(document.querySelector('[data-slot="steps-progress"]')).toHaveClass(
    'h-0.5',
    'rounded-full',
    'bg-border',
  );
});

test('renders stable anatomy through SSR hydration', async () => {
  const App = defineComponent({
    components: stepsComponents,
    template: `
      <Steps :count="2" :default-step="1">
        <StepsList>
          <StepsItem :index="0"><StepsTrigger><StepsIndicator />Account</StepsTrigger></StepsItem>
          <StepsItem :index="1"><StepsTrigger><StepsIndicator />Profile</StepsTrigger></StepsItem>
        </StepsList>
        <StepsContent :index="0">Account content</StepsContent>
        <StepsContent :index="1">Profile content</StepsContent>
        <StepsCompletedContent>Complete</StepsCompletedContent>
      </Steps>
    `,
  });

  const html = await renderToString(createSSRApp(App));
  expect(html).toContain('data-slot="steps-root"');
  expect(html).toContain('data-slot="steps-trigger"');
  expect(html).toContain('aria-selected="true"');

  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  const serverRoot = host.querySelector('[data-slot="steps-root"]');
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  const app = createSSRApp(App);
  try {
    app.mount(host);
    await nextTick();
    expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);
    expect(host.querySelector('[data-slot="steps-root"]')).toBe(serverRoot);
    expect(warn).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
  } finally {
    app.unmount();
    host.remove();
    warn.mockRestore();
    error.mockRestore();
  }
});