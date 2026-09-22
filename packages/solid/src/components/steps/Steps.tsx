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

function Steps(props: ComponentProps<typeof StepsPrimitive.Root>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <StepsPrimitive.Root
      class={clsx(styles.root, local.class)}
      {...others}
      data-slot="steps-root"
    />
  );
}

function StepsRootProvider(props: ComponentProps<typeof StepsPrimitive.RootProvider>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <StepsPrimitive.RootProvider
      class={clsx(styles.root, local.class)}
      {...others}
      data-slot="steps-root-provider"
    />
  );
}

function StepsList(props: ComponentProps<typeof StepsPrimitive.List>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <StepsPrimitive.List
      class={clsx(styles.list, local.class)}
      {...others}
      data-slot="steps-list"
    />
  );
}

function StepsItem(props: ComponentProps<typeof StepsPrimitive.Item>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <StepsPrimitive.Item
      class={clsx(styles.item, local.class)}
      {...others}
      data-slot="steps-item"
    />
  );
}

function StepsTrigger(props: ComponentProps<typeof StepsPrimitive.Trigger>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <StepsPrimitive.Trigger
      class={clsx(styles.trigger, local.class)}
      {...others}
      data-slot="steps-trigger"
    />
  );
}

function StepsIndicator(props: ComponentProps<typeof StepsPrimitive.Indicator>) {
  const [local, others] = splitProps(props, ['class', 'children']);
  const resolvedChildren = children(() => local.children);
  const item = useStepsItemContext();

  return (
    <StepsPrimitive.Indicator
      class={clsx(styles.indicator, local.class)}
      {...others}
      data-slot="steps-indicator"
    >
      {resolvedChildren() ?? (item().completed ? <CheckIcon /> : item().index + 1)}
    </StepsPrimitive.Indicator>
  );
}

function StepsSeparator(props: ComponentProps<typeof StepsPrimitive.Separator>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <StepsPrimitive.Separator
      class={clsx(styles.separator, local.class)}
      {...others}
      data-slot="steps-separator"
    />
  );
}

function StepsContent(props: ComponentProps<typeof StepsPrimitive.Content>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <StepsPrimitive.Content
      class={clsx(styles.content, local.class)}
      {...others}
      data-slot="steps-content"
    />
  );
}

function StepsCompletedContent(props: ComponentProps<typeof StepsPrimitive.CompletedContent>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <StepsPrimitive.CompletedContent
      class={clsx(styles.completedContent, local.class)}
      {...others}
      data-slot="steps-completed-content"
    />
  );
}

function StepsPrevTrigger(props: ComponentProps<typeof StepsPrimitive.PrevTrigger>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <StepsPrimitive.PrevTrigger
      class={clsx(styles.prevTrigger, local.class)}
      {...others}
      data-slot="steps-prev-trigger"
    />
  );
}

function StepsNextTrigger(props: ComponentProps<typeof StepsPrimitive.NextTrigger>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <StepsPrimitive.NextTrigger
      class={clsx(styles.nextTrigger, local.class)}
      {...others}
      data-slot="steps-next-trigger"
    />
  );
}

function StepsProgress(props: ComponentProps<typeof StepsPrimitive.Progress>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <StepsPrimitive.Progress
      class={clsx(styles.progress, local.class)}
      {...others}
      data-slot="steps-progress"
    />
  );
}

const StepsContext = StepsPrimitive.Context;
const StepsItemContext = StepsPrimitive.ItemContext;

export {
  Steps,
  StepsCompletedContent,
  StepsContext,
  StepsContent,
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
};