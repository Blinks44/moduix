'use client';

import {
  Steps as StepsPrimitive,
  useSteps,
  useStepsContext,
  useStepsItemContext,
} from '@ark-ui/react/steps';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { CheckIcon } from '@/lib/moduix/icons/ui';
import styles from './Steps.module.css';

const Steps = forwardRef<
  ComponentRef<typeof StepsPrimitive.Root>,
  ComponentProps<typeof StepsPrimitive.Root>
>(function Steps({ className, ...props }, ref) {
  return (
    <StepsPrimitive.Root
      ref={ref}
      className={clsx(styles.root, className)}
      {...props}
      data-slot="steps-root"
    />
  );
});

const StepsRootProvider = forwardRef<
  ComponentRef<typeof StepsPrimitive.RootProvider>,
  ComponentProps<typeof StepsPrimitive.RootProvider>
>(function StepsRootProvider({ className, ...props }, ref) {
  return (
    <StepsPrimitive.RootProvider
      ref={ref}
      className={clsx(styles.root, className)}
      {...props}
      data-slot="steps-root-provider"
    />
  );
});

const StepsList = forwardRef<
  ComponentRef<typeof StepsPrimitive.List>,
  ComponentProps<typeof StepsPrimitive.List>
>(function StepsList({ className, ...props }, ref) {
  return (
    <StepsPrimitive.List
      ref={ref}
      className={clsx(styles.list, className)}
      {...props}
      data-slot="steps-list"
    />
  );
});

const StepsItem = forwardRef<
  ComponentRef<typeof StepsPrimitive.Item>,
  ComponentProps<typeof StepsPrimitive.Item>
>(function StepsItem({ className, ...props }, ref) {
  return (
    <StepsPrimitive.Item
      ref={ref}
      className={clsx(styles.item, className)}
      {...props}
      data-slot="steps-item"
    />
  );
});

const StepsTrigger = forwardRef<
  ComponentRef<typeof StepsPrimitive.Trigger>,
  ComponentProps<typeof StepsPrimitive.Trigger>
>(function StepsTrigger({ className, ...props }, ref) {
  return (
    <StepsPrimitive.Trigger
      ref={ref}
      className={clsx(styles.trigger, className)}
      {...props}
      data-slot="steps-trigger"
    />
  );
});

const StepsIndicator = forwardRef<
  ComponentRef<typeof StepsPrimitive.Indicator>,
  ComponentProps<typeof StepsPrimitive.Indicator>
>(function StepsIndicator({ className, children, ...props }, ref) {
  const item = useStepsItemContext();

  return (
    <StepsPrimitive.Indicator
      ref={ref}
      className={clsx(styles.indicator, className)}
      {...props}
      data-slot="steps-indicator"
    >
      {children ?? (item.completed ? <CheckIcon /> : item.index + 1)}
    </StepsPrimitive.Indicator>
  );
});

const StepsSeparator = forwardRef<
  ComponentRef<typeof StepsPrimitive.Separator>,
  ComponentProps<typeof StepsPrimitive.Separator>
>(function StepsSeparator({ className, ...props }, ref) {
  return (
    <StepsPrimitive.Separator
      ref={ref}
      className={clsx(styles.separator, className)}
      {...props}
      data-slot="steps-separator"
    />
  );
});

const StepsContent = forwardRef<
  ComponentRef<typeof StepsPrimitive.Content>,
  ComponentProps<typeof StepsPrimitive.Content>
>(function StepsContent({ className, ...props }, ref) {
  return (
    <StepsPrimitive.Content
      ref={ref}
      className={clsx(styles.content, className)}
      {...props}
      data-slot="steps-content"
    />
  );
});

const StepsCompletedContent = forwardRef<
  ComponentRef<typeof StepsPrimitive.CompletedContent>,
  ComponentProps<typeof StepsPrimitive.CompletedContent>
>(function StepsCompletedContent({ className, ...props }, ref) {
  return (
    <StepsPrimitive.CompletedContent
      ref={ref}
      className={clsx(styles.completedContent, className)}
      {...props}
      data-slot="steps-completed-content"
    />
  );
});

const StepsPrevTrigger = forwardRef<
  ComponentRef<typeof StepsPrimitive.PrevTrigger>,
  ComponentProps<typeof StepsPrimitive.PrevTrigger>
>(function StepsPrevTrigger({ className, ...props }, ref) {
  return (
    <StepsPrimitive.PrevTrigger
      ref={ref}
      className={clsx(styles.prevTrigger, className)}
      {...props}
      data-slot="steps-prev-trigger"
    />
  );
});

const StepsNextTrigger = forwardRef<
  ComponentRef<typeof StepsPrimitive.NextTrigger>,
  ComponentProps<typeof StepsPrimitive.NextTrigger>
>(function StepsNextTrigger({ className, ...props }, ref) {
  return (
    <StepsPrimitive.NextTrigger
      ref={ref}
      className={clsx(styles.nextTrigger, className)}
      {...props}
      data-slot="steps-next-trigger"
    />
  );
});

const StepsProgress = forwardRef<
  ComponentRef<typeof StepsPrimitive.Progress>,
  ComponentProps<typeof StepsPrimitive.Progress>
>(function StepsProgress({ className, ...props }, ref) {
  return (
    <StepsPrimitive.Progress
      ref={ref}
      className={clsx(styles.progress, className)}
      {...props}
      data-slot="steps-progress"
    />
  );
});

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
