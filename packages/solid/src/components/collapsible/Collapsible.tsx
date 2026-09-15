import {
  Collapsible as CollapsiblePrimitive,
  useCollapsible,
  useCollapsibleContext,
} from '@ark-ui/solid/collapsible';
import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { clsx } from 'clsx';
import type { ComponentProps } from 'solid-js';
import { children, splitProps } from 'solid-js';
import { ChevronDownIcon } from '@/lib/moduix/icons/ui/Icons';
import styles from './Collapsible.module.css';

function CollapsibleRoot(props: ComponentProps<typeof CollapsiblePrimitive.Root>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <CollapsiblePrimitive.Root
      class={clsx(styles.root, local.class)}
      {...others}
      data-slot="collapsible-root"
    />
  );
}

function CollapsibleRootProvider(props: ComponentProps<typeof CollapsiblePrimitive.RootProvider>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <CollapsiblePrimitive.RootProvider
      class={clsx(styles.root, local.class)}
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
      class={clsx(!local.asChild && styles.trigger, local.class)}
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
      class={clsx(styles.indicator, local.class)}
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
      class={clsx(styles.content, local.class)}
      {...others}
      data-slot="collapsible-content"
    />
  );
}

function CollapsibleBody(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.div class={clsx(styles.body, local.class)} {...others} data-slot="collapsible-body" />
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