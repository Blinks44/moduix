import {
  Steps as StepsPrimitive,
  useSteps,
  useStepsContext,
  useStepsItemContext,
} from '@ark-ui/solid/steps';
import { clsx } from 'clsx';
import type { ComponentProps } from 'solid-js';
import { children, splitProps } from 'solid-js';
import { CheckIcon } from '@/lib/moduix/icons/ui/Icons';
import styles from './Steps.module.css';

function StepsRoot(props: ComponentProps<typeof StepsPrimitive.Root>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <StepsPrimitive.Root
      data-slot="steps-root"
      class={clsx(styles.root, local.class)}
      {...others}
    />
  );
}

function StepsRootProvider(props: ComponentProps<typeof StepsPrimitive.RootProvider>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <StepsPrimitive.RootProvider
      data-slot="steps-root-provider"
      class={clsx(styles.root, local.class)}
      {...others}
    />
  );
}

function StepsList(props: ComponentProps<typeof StepsPrimitive.List>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <StepsPrimitive.List
      data-slot="steps-list"
      class={clsx(styles.list, local.class)}
      {...others}
    />
  );
}

function StepsItem(props: ComponentProps<typeof StepsPrimitive.Item>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <StepsPrimitive.Item
      data-slot="steps-item"
      class={clsx(styles.item, local.class)}
      {...others}
    />
  );
}

function StepsTrigger(props: ComponentProps<typeof StepsPrimitive.Trigger>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <StepsPrimitive.Trigger
      data-slot="steps-trigger"
      class={clsx(styles.trigger, local.class)}
      {...others}
    />
  );
}

function StepsIndicator(props: ComponentProps<typeof StepsPrimitive.Indicator>) {
  const [local, others] = splitProps(props, ['class', 'children']);
  const resolvedChildren = children(() => local.children);
  const item = useStepsItemContext();

  return (
    <StepsPrimitive.Indicator
      data-slot="steps-indicator"
      class={clsx(styles.indicator, local.class)}
      {...others}
    >
      {resolvedChildren() ?? (item().completed ? <CheckIcon /> : item().index + 1)}
    </StepsPrimitive.Indicator>
  );
}

function StepsSeparator(props: ComponentProps<typeof StepsPrimitive.Separator>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <StepsPrimitive.Separator
      data-slot="steps-separator"
      class={clsx(styles.separator, local.class)}
      {...others}
    />
  );
}

function StepsContent(props: ComponentProps<typeof StepsPrimitive.Content>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <StepsPrimitive.Content
      data-slot="steps-content"
      class={clsx(styles.content, local.class)}
      {...others}
    />
  );
}

function StepsCompletedContent(props: ComponentProps<typeof StepsPrimitive.CompletedContent>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <StepsPrimitive.CompletedContent
      data-slot="steps-completed-content"
      class={clsx(styles.completedContent, local.class)}
      {...others}
    />
  );
}

function StepsPrevTrigger(props: ComponentProps<typeof StepsPrimitive.PrevTrigger>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <StepsPrimitive.PrevTrigger
      data-slot="steps-prev-trigger"
      class={clsx(styles.prevTrigger, local.class)}
      {...others}
    />
  );
}

function StepsNextTrigger(props: ComponentProps<typeof StepsPrimitive.NextTrigger>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <StepsPrimitive.NextTrigger
      data-slot="steps-next-trigger"
      class={clsx(styles.nextTrigger, local.class)}
      {...others}
    />
  );
}

function StepsProgress(props: ComponentProps<typeof StepsPrimitive.Progress>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <StepsPrimitive.Progress
      data-slot="steps-progress"
      class={clsx(styles.progress, local.class)}
      {...others}
    />
  );
}

const Steps = Object.assign(StepsRoot, {
  Root: StepsRoot,
  RootProvider: StepsRootProvider,
  Context: StepsPrimitive.Context,
  ItemContext: StepsPrimitive.ItemContext,
  List: StepsList,
  Item: StepsItem,
  Trigger: StepsTrigger,
  Indicator: StepsIndicator,
  Separator: StepsSeparator,
  Content: StepsContent,
  CompletedContent: StepsCompletedContent,
  PrevTrigger: StepsPrevTrigger,
  NextTrigger: StepsNextTrigger,
  Progress: StepsProgress,
  useSteps,
});

export { Steps, useSteps, useStepsContext, useStepsItemContext };