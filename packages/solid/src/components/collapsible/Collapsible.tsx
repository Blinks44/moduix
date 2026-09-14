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
      data-slot="collapsible-root"
      class={clsx(styles.root, local.class)}
      {...others}
    />
  );
}

function CollapsibleRootProvider(props: ComponentProps<typeof CollapsiblePrimitive.RootProvider>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <CollapsiblePrimitive.RootProvider
      data-slot="collapsible-root-provider"
      class={clsx(styles.root, local.class)}
      {...others}
    />
  );
}

function CollapsibleTrigger(props: ComponentProps<typeof CollapsiblePrimitive.Trigger>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <CollapsiblePrimitive.Trigger
      asChild={local.asChild}
      data-slot="collapsible-trigger"
      class={clsx(!local.asChild && styles.trigger, local.class)}
      {...others}
    />
  );
}

function CollapsibleIndicator(props: ComponentProps<typeof CollapsiblePrimitive.Indicator>) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <CollapsiblePrimitive.Indicator
      data-slot="collapsible-indicator"
      class={clsx(styles.indicator, local.class)}
      {...others}
    >
      {resolvedChildren() ?? <ChevronDownIcon />}
    </CollapsiblePrimitive.Indicator>
  );
}

function CollapsibleContent(props: ComponentProps<typeof CollapsiblePrimitive.Content>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <CollapsiblePrimitive.Content
      data-slot="collapsible-content"
      class={clsx(styles.content, local.class)}
      {...others}
    />
  );
}

function CollapsibleBody(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.div data-slot="collapsible-body" class={clsx(styles.body, local.class)} {...others} />
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