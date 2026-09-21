import { Marquee as MarqueePrimitive, useMarquee, useMarqueeContext } from '@ark-ui/solid/marquee';
import { clsx } from 'clsx';
import type { ComponentProps } from 'solid-js';
import { splitProps } from 'solid-js';
import styles from './Marquee.module.css';

function Marquee(props: ComponentProps<typeof MarqueePrimitive.Root>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <MarqueePrimitive.Root
      class={clsx(styles.root, local.class)}
      {...others}
      data-slot="marquee-root"
    />
  );
}

function MarqueeRootProvider(props: ComponentProps<typeof MarqueePrimitive.RootProvider>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <MarqueePrimitive.RootProvider
      class={clsx(styles.root, local.class)}
      {...others}
      data-slot="marquee-root-provider"
    />
  );
}

function MarqueeViewport(props: ComponentProps<typeof MarqueePrimitive.Viewport>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <MarqueePrimitive.Viewport
      class={clsx(styles.viewport, local.class)}
      {...others}
      data-slot="marquee-viewport"
    />
  );
}

function MarqueeContent(props: ComponentProps<typeof MarqueePrimitive.Content>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <MarqueePrimitive.Content
      class={clsx(styles.content, local.class)}
      {...others}
      data-slot="marquee-content"
    />
  );
}

function MarqueeItem(props: ComponentProps<typeof MarqueePrimitive.Item>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <MarqueePrimitive.Item
      class={clsx(styles.item, local.class)}
      {...others}
      data-slot="marquee-item"
    />
  );
}

function MarqueeEdge(props: ComponentProps<typeof MarqueePrimitive.Edge>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <MarqueePrimitive.Edge
      class={clsx(styles.edge, local.class)}
      {...others}
      data-slot="marquee-edge"
    />
  );
}

const MarqueeContext = MarqueePrimitive.Context;

export {
  Marquee,
  MarqueeContext,
  MarqueeContent,
  MarqueeEdge,
  MarqueeItem,
  MarqueeRootProvider,
  MarqueeViewport,
  useMarquee,
  useMarqueeContext,
};
