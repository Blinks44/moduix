import {
  Collapsible as CollapsiblePrimitive,
  useCollapsible,
  useCollapsibleContext,
} from '@ark-ui/solid/collapsible';
import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import type { ComponentProps } from 'solid-js';
import { children, splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';
import { ChevronDownIcon } from '@/lib/moduix/icons/ui/Icons';

function CollapsibleRoot(props: ComponentProps<typeof CollapsiblePrimitive.Root>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <CollapsiblePrimitive.Root
      class={cn('box-border flex w-full max-w-full min-w-0 flex-col text-foreground', local.class)}
      {...others}
      data-slot="collapsible-root"
    />
  );
}

function CollapsibleRootProvider(props: ComponentProps<typeof CollapsiblePrimitive.RootProvider>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <CollapsiblePrimitive.RootProvider
      class={cn('box-border flex w-full max-w-full min-w-0 flex-col text-foreground', local.class)}
      {...others}
      data-slot="collapsible-root-provider"
    />
  );
}

function CollapsibleTrigger(props: ComponentProps<typeof CollapsiblePrimitive.Trigger>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <CollapsiblePrimitive.Trigger
      asChild={local.asChild}
      class={cn(
        !local.asChild &&
          'box-border flex w-full cursor-pointer items-center justify-between gap-2 bg-transparent px-0 py-1 text-start text-sm outline-0 transition-colors duration-200 select-none focus-visible:relative focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-ring disabled:cursor-default disabled:opacity-50 data-disabled:cursor-default data-disabled:opacity-50 motion-reduce:transition-none',
        local.class,
      )}
      {...others}
      data-slot="collapsible-trigger"
    />
  );
}

function CollapsibleIndicator(props: ComponentProps<typeof CollapsiblePrimitive.Indicator>) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <CollapsiblePrimitive.Indicator
      class={cn(
        'inline-flex size-3 shrink-0 items-center justify-center transition-transform duration-200 data-disabled:opacity-50 data-[state=open]:rotate-180 motion-reduce:transition-none [&_svg]:size-full',
        local.class,
      )}
      {...others}
      data-slot="collapsible-indicator"
    >
      {resolvedChildren() ?? <ChevronDownIcon />}
    </CollapsiblePrimitive.Indicator>
  );
}

function CollapsibleContent(props: ComponentProps<typeof CollapsiblePrimitive.Content>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <CollapsiblePrimitive.Content
      class={cn(
        'box-border overflow-hidden text-sm text-muted-foreground data-[state=closed]:animate-moduix-collapsible-closed data-[has-collapsed-size]:data-[state=closed]:animate-moduix-collapsible-closed-partial data-[state=open]:animate-moduix-collapsible-open data-[has-collapsed-size]:data-[state=open]:animate-moduix-collapsible-open-partial motion-reduce:[animation-delay:0ms] motion-reduce:[animation-duration:1ms]',
        local.class,
      )}
      {...others}
      data-slot="collapsible-content"
    />
  );
}

function CollapsibleBody(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.div
      class={cn('grid min-w-0 gap-2', local.class)}
      {...others}
      data-slot="collapsible-body"
    />
  );
}

const Collapsible = Object.assign(CollapsibleRoot, {
  Root: CollapsibleRoot,
  RootProvider: CollapsibleRootProvider,
  Context: CollapsiblePrimitive.Context,
  Trigger: CollapsibleTrigger,
  Indicator: CollapsibleIndicator,
  Content: CollapsibleContent,
  Body: CollapsibleBody,
});

export { Collapsible, useCollapsible, useCollapsibleContext };