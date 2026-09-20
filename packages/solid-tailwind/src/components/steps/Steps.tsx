import {
  Steps as StepsPrimitive,
  useSteps,
  useStepsContext,
  useStepsItemContext,
} from '@ark-ui/solid/steps';
import type { ComponentProps } from 'solid-js';
import { children, splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';
import { CheckIcon } from '@/lib/moduix/icons/ui';

function StepsRoot(props: ComponentProps<typeof StepsPrimitive.Root>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <StepsPrimitive.Root
      class={cn(
        'box-border flex w-full max-w-[52rem] min-w-0 text-foreground data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:gap-4 data-[orientation=vertical]:flex-row data-[orientation=vertical]:items-stretch data-[orientation=vertical]:gap-6 max-[40rem]:data-[orientation=vertical]:flex-col max-[40rem]:data-[orientation=vertical]:gap-4',
        local.class,
      )}
      {...others}
      data-slot="steps-root"
    />
  );
}

function StepsRootProvider(props: ComponentProps<typeof StepsPrimitive.RootProvider>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <StepsPrimitive.RootProvider
      class={cn(
        'box-border flex w-full max-w-[52rem] min-w-0 text-foreground data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:gap-4 data-[orientation=vertical]:flex-row data-[orientation=vertical]:items-stretch data-[orientation=vertical]:gap-6 max-[40rem]:data-[orientation=vertical]:flex-col max-[40rem]:data-[orientation=vertical]:gap-4',
        local.class,
      )}
      {...others}
      data-slot="steps-root-provider"
    />
  );
}

function StepsList(props: ComponentProps<typeof StepsPrimitive.List>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <StepsPrimitive.List
      class={cn(
        'flex w-full min-w-0 data-[orientation=horizontal]:flex-row data-[orientation=horizontal]:items-center data-[orientation=vertical]:w-fit data-[orientation=vertical]:flex-none data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start data-[orientation=vertical]:gap-4 max-[40rem]:data-[orientation=horizontal]:[scrollbar-width:thin] max-[40rem]:data-[orientation=horizontal]:overflow-x-auto',
        local.class,
      )}
      {...others}
      data-slot="steps-list"
    />
  );
}

function StepsItem(props: ComponentProps<typeof StepsPrimitive.Item>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <StepsPrimitive.Item
      class={cn(
        'group/steps-item relative flex min-w-0 flex-1 items-center gap-3 last:flex-none data-[orientation=vertical]:min-h-16 data-[orientation=vertical]:flex-none data-[orientation=vertical]:items-start max-[40rem]:data-[orientation=horizontal]:flex-none',
        local.class,
      )}
      {...others}
      data-slot="steps-item"
    />
  );
}

function StepsTrigger(props: ComponentProps<typeof StepsPrimitive.Trigger>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <StepsPrimitive.Trigger
      class={cn(
        'group/steps-trigger relative z-1 inline-flex min-w-0 cursor-pointer items-center gap-3 rounded-md border-0 bg-transparent p-0 text-left text-inherit no-underline outline-none select-none [font:inherit] focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-ring data-[orientation=vertical]:items-start',
        local.class,
      )}
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
      class={cn(
        'box-border inline-flex size-8 flex-none items-center justify-center rounded-full border border-border bg-background text-sm leading-none font-semibold text-muted-foreground transition-[background-color,border-color,color,opacity] duration-200 ease-in-out data-complete:border-foreground data-complete:bg-foreground data-complete:text-background data-current:border-foreground data-current:bg-background data-current:text-foreground motion-reduce:transition-none [&_svg]:size-3.5 [@media(hover:hover)]:group-hover/steps-trigger:data-incomplete:border-foreground [@media(hover:hover)]:group-hover/steps-trigger:data-incomplete:text-foreground',
        local.class,
      )}
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
      class={cn(
        'pointer-events-none mx-2 h-px min-w-8 flex-auto bg-border group-last/steps-item:hidden data-complete:bg-foreground data-[orientation=vertical]:absolute data-[orientation=vertical]:start-[15.5px] data-[orientation=vertical]:top-10 data-[orientation=vertical]:-bottom-4 data-[orientation=vertical]:m-0 data-[orientation=vertical]:h-auto data-[orientation=vertical]:w-px data-[orientation=vertical]:min-w-0',
        local.class,
      )}
      {...others}
      data-slot="steps-separator"
    />
  );
}

function StepsContent(props: ComponentProps<typeof StepsPrimitive.Content>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <StepsPrimitive.Content
      class={cn(
        "box-border grid min-h-40 min-w-0 place-items-center rounded-md bg-muted px-4 py-4 text-sm leading-5 text-foreground outline-none focus-visible:outline-1 focus-visible:-outline-offset-2 focus-visible:outline-ring data-[orientation=vertical]:flex-auto [&[hidden]:not([hidden='until-found'])]:hidden",
        local.class,
      )}
      {...others}
      data-slot="steps-content"
    />
  );
}

function StepsCompletedContent(props: ComponentProps<typeof StepsPrimitive.CompletedContent>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <StepsPrimitive.CompletedContent
      class={cn(
        "box-border grid min-h-40 min-w-0 place-items-center rounded-md bg-muted px-4 py-4 text-center text-sm leading-5 font-medium text-foreground outline-none focus-visible:outline-1 focus-visible:-outline-offset-2 focus-visible:outline-ring data-[orientation=vertical]:flex-auto [&[hidden]:not([hidden='until-found'])]:hidden",
        local.class,
      )}
      {...others}
      data-slot="steps-completed-content"
    />
  );
}

function StepsPrevTrigger(props: ComponentProps<typeof StepsPrimitive.PrevTrigger>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <StepsPrimitive.PrevTrigger
      class={cn(
        'box-border inline-flex min-h-control-sm cursor-pointer items-center justify-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-sm leading-5 text-foreground transition-[background-color,border-color,color,opacity] duration-200 ease-in-out outline-none focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-default disabled:opacity-50 motion-reduce:transition-none [@media(hover:hover)]:[&:not(:disabled):not([data-disabled])]:hover:bg-accent',
        local.class,
      )}
      {...others}
      data-slot="steps-prev-trigger"
    />
  );
}

function StepsNextTrigger(props: ComponentProps<typeof StepsPrimitive.NextTrigger>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <StepsPrimitive.NextTrigger
      class={cn(
        'box-border inline-flex min-h-control-sm cursor-pointer items-center justify-center gap-2 rounded-md border border-foreground bg-foreground px-3 py-1.5 text-sm leading-5 text-background transition-[background-color,border-color,color,opacity] duration-200 ease-in-out outline-none focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-default disabled:opacity-50 motion-reduce:transition-none [@media(hover:hover)]:[&:not(:disabled):not([data-disabled])]:hover:bg-foreground',
        local.class,
      )}
      {...others}
      data-slot="steps-next-trigger"
    />
  );
}

function StepsProgress(props: ComponentProps<typeof StepsPrimitive.Progress>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <StepsPrimitive.Progress
      class={cn(
        "relative block h-0.5 w-full overflow-hidden rounded-full bg-border before:absolute before:inset-y-0 before:start-0 before:w-[var(--percent,0%)] before:rounded-[inherit] before:bg-foreground before:transition-[width] before:duration-200 before:ease-in-out before:content-[''] motion-reduce:before:transition-none",
        local.class,
      )}
      {...others}
      data-slot="steps-progress"
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