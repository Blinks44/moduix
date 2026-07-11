import type { ComponentProps, ComponentRef } from 'react';
import { Steps as StepsPrimitive, useSteps, useStepsItemContext } from '@ark-ui/react/steps';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { CheckIcon } from '@/lib/moduix/icons/ui';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './Steps.module.css';

const StepsRoot = forwardRef<
  ComponentRef<typeof StepsPrimitive.Root>,
  ComponentProps<typeof StepsPrimitive.Root>
>(function StepsRoot({ className, ...props }, ref) {
  return (
    <StepsPrimitive.Root
      ref={ref}
      data-slot="steps-root"
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
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
      data-slot="steps-root-provider"
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
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
      data-slot="steps-list"
      className={clsx(styles.list, normalizeClassName(className))}
      {...props}
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
      data-slot="steps-item"
      className={clsx(styles.item, normalizeClassName(className))}
      {...props}
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
      data-slot="steps-trigger"
      className={clsx(styles.trigger, normalizeClassName(className))}
      {...props}
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
      data-slot="steps-indicator"
      className={clsx(styles.indicator, normalizeClassName(className))}
      {...props}
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
      data-slot="steps-separator"
      className={clsx(styles.separator, normalizeClassName(className))}
      {...props}
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
      data-slot="steps-content"
      className={clsx(styles.content, normalizeClassName(className))}
      {...props}
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
      data-slot="steps-completed-content"
      className={clsx(styles.completedContent, normalizeClassName(className))}
      {...props}
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
      data-slot="steps-prev-trigger"
      className={clsx(styles.prevTrigger, normalizeClassName(className))}
      {...props}
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
      data-slot="steps-next-trigger"
      className={clsx(styles.nextTrigger, normalizeClassName(className))}
      {...props}
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
      data-slot="steps-progress"
      className={clsx(styles.progress, normalizeClassName(className))}
      {...props}
    />
  );
});

const Steps = Object.assign(StepsRoot, {
  Root: StepsRoot,
  RootProvider: StepsRootProvider,
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

export { Steps };