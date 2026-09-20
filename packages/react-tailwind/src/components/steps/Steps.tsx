'use client';

import {
  Steps as StepsPrimitive,
  useSteps,
  useStepsContext,
  useStepsItemContext,
} from '@ark-ui/react/steps';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';
import { CheckIcon } from '@/lib/moduix/icons/ui';

const StepsRoot = forwardRef<
  ComponentRef<typeof StepsPrimitive.Root>,
  ComponentProps<typeof StepsPrimitive.Root>
>(function StepsRoot({ className, ...props }, ref) {
  return (
    <StepsPrimitive.Root
      ref={ref}
      className={cn(
        'box-border flex w-full max-w-[52rem] min-w-0 text-foreground data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:gap-4 data-[orientation=vertical]:flex-row data-[orientation=vertical]:items-stretch data-[orientation=vertical]:gap-6 max-[40rem]:data-[orientation=vertical]:flex-col max-[40rem]:data-[orientation=vertical]:gap-4',
        className,
      )}
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
      className={cn(
        'box-border flex w-full max-w-[52rem] min-w-0 text-foreground data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:gap-4 data-[orientation=vertical]:flex-row data-[orientation=vertical]:items-stretch data-[orientation=vertical]:gap-6 max-[40rem]:data-[orientation=vertical]:flex-col max-[40rem]:data-[orientation=vertical]:gap-4',
        className,
      )}
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
      className={cn(
        'flex w-full min-w-0 data-[orientation=horizontal]:flex-row data-[orientation=horizontal]:items-center data-[orientation=vertical]:w-fit data-[orientation=vertical]:flex-none data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start data-[orientation=vertical]:gap-4 max-[40rem]:data-[orientation=horizontal]:[scrollbar-width:thin] max-[40rem]:data-[orientation=horizontal]:overflow-x-auto',
        className,
      )}
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
      className={cn(
        'group/steps-item relative flex min-w-0 flex-1 items-center gap-3 last:flex-none data-[orientation=vertical]:min-h-16 data-[orientation=vertical]:flex-none data-[orientation=vertical]:items-start max-[40rem]:data-[orientation=horizontal]:flex-none',
        className,
      )}
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
      className={cn(
        'group/steps-trigger relative z-1 inline-flex min-w-0 cursor-pointer items-center gap-3 rounded-md border-0 bg-transparent p-0 text-left text-inherit no-underline outline-none select-none [font:inherit] focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-ring data-[orientation=vertical]:items-start',
        className,
      )}
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
      className={cn(
        'box-border inline-flex size-8 flex-none items-center justify-center rounded-full border border-border bg-background text-sm leading-none font-semibold text-muted-foreground transition-[background-color,border-color,color,opacity] duration-200 ease-in-out data-complete:border-foreground data-complete:bg-foreground data-complete:text-background data-current:border-foreground data-current:bg-background data-current:text-foreground motion-reduce:transition-none [&_svg]:size-3.5 [@media(hover:hover)]:group-hover/steps-trigger:data-incomplete:border-foreground [@media(hover:hover)]:group-hover/steps-trigger:data-incomplete:text-foreground',
        className,
      )}
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
      className={cn(
        'pointer-events-none mx-2 h-px min-w-8 flex-auto bg-border group-last/steps-item:hidden data-complete:bg-foreground data-[orientation=vertical]:absolute data-[orientation=vertical]:start-[15.5px] data-[orientation=vertical]:top-10 data-[orientation=vertical]:-bottom-4 data-[orientation=vertical]:m-0 data-[orientation=vertical]:h-auto data-[orientation=vertical]:w-px data-[orientation=vertical]:min-w-0',
        className,
      )}
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
      className={cn(
        "box-border grid min-h-40 min-w-0 place-items-center rounded-md bg-muted px-4 py-4 text-sm leading-5 text-foreground outline-none focus-visible:outline-1 focus-visible:-outline-offset-2 focus-visible:outline-ring data-[orientation=vertical]:flex-auto [&[hidden]:not([hidden='until-found'])]:hidden",
        className,
      )}
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
      className={cn(
        "box-border grid min-h-40 min-w-0 place-items-center rounded-md bg-muted px-4 py-4 text-center text-sm leading-5 font-medium text-foreground outline-none focus-visible:outline-1 focus-visible:-outline-offset-2 focus-visible:outline-ring data-[orientation=vertical]:flex-auto [&[hidden]:not([hidden='until-found'])]:hidden",
        className,
      )}
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
      className={cn(
        'box-border inline-flex min-h-control-sm cursor-pointer items-center justify-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-sm leading-5 text-foreground transition-[background-color,border-color,color,opacity] duration-200 ease-in-out outline-none focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-default disabled:opacity-50 motion-reduce:transition-none [@media(hover:hover)]:[&:not(:disabled):not([data-disabled])]:hover:bg-accent',
        className,
      )}
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
      className={cn(
        'box-border inline-flex min-h-control-sm cursor-pointer items-center justify-center gap-2 rounded-md border border-foreground bg-foreground px-3 py-1.5 text-sm leading-5 text-background transition-[background-color,border-color,color,opacity] duration-200 ease-in-out outline-none focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-default disabled:opacity-50 motion-reduce:transition-none [@media(hover:hover)]:[&:not(:disabled):not([data-disabled])]:hover:bg-foreground',
        className,
      )}
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
      className={cn(
        "relative block h-0.5 w-full overflow-hidden rounded-full bg-border before:absolute before:inset-y-0 before:start-0 before:w-[var(--percent,0%)] before:rounded-[inherit] before:bg-foreground before:transition-[width] before:duration-200 before:ease-in-out before:content-[''] motion-reduce:before:transition-none",
        className,
      )}
      {...props}
      data-slot="steps-progress"
    />
  );
});

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