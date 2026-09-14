import { Marquee as MarqueePrimitive, useMarquee, useMarqueeContext } from '@ark-ui/solid/marquee';
import { clsx } from 'clsx';
import type { ComponentProps } from 'solid-js';
import { splitProps } from 'solid-js';
import styles from './Marquee.module.css';

function MarqueeRoot(props: ComponentProps<typeof MarqueePrimitive.Root>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <MarqueePrimitive.Root
      data-slot="marquee-root"
      class={clsx(styles.root, local.class)}
      {...others}
    />
  );
}

function MarqueeRootProvider(props: ComponentProps<typeof MarqueePrimitive.RootProvider>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <MarqueePrimitive.RootProvider
      data-slot="marquee-root-provider"
      class={clsx(styles.root, local.class)}
      {...others}
    />
  );
}

function MarqueeViewport(props: ComponentProps<typeof MarqueePrimitive.Viewport>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <MarqueePrimitive.Viewport
      data-slot="marquee-viewport"
      class={clsx(styles.viewport, local.class)}
      {...others}
    />
  );
}

function MarqueeContent(props: ComponentProps<typeof MarqueePrimitive.Content>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <MarqueePrimitive.Content
      data-slot="marquee-content"
      class={clsx(styles.content, local.class)}
      {...others}
    />
  );
}

function MarqueeItem(props: ComponentProps<typeof MarqueePrimitive.Item>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <MarqueePrimitive.Item
      data-slot="marquee-item"
      class={clsx(styles.item, local.class)}
      {...others}
    />
  );
}

function MarqueeEdge(props: ComponentProps<typeof MarqueePrimitive.Edge>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <MarqueePrimitive.Edge
      data-slot="marquee-edge"
      class={clsx(styles.edge, local.class)}
      {...others}
    />
  );
}

const Marquee = Object.assign(MarqueeRoot, {
  Root: MarqueeRoot,
  RootProvider: MarqueeRootProvider,
  Context: MarqueePrimitive.Context,
  Viewport: MarqueeViewport,
  Content: MarqueeContent,
  Item: MarqueeItem,
  Edge: MarqueeEdge,
});

export { Marquee, useMarquee, useMarqueeContext };