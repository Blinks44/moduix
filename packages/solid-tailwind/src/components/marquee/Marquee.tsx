import { Marquee as MarqueePrimitive, useMarquee, useMarqueeContext } from '@ark-ui/solid/marquee';
import { cva } from 'class-variance-authority';
import type { ComponentProps } from 'solid-js';
import { splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';

const marqueeEdgeVariants = cva('pointer-events-none z-1', {
  variants: {
    side: {
      start: 'w-1/5 bg-linear-to-r from-background to-transparent rtl:bg-linear-to-l',
      end: 'w-1/5 bg-linear-to-l from-background to-transparent rtl:bg-linear-to-r',
      top: 'h-1/5 bg-linear-to-b from-background to-transparent',
      bottom: 'h-1/5 bg-linear-to-t from-background to-transparent',
    },
  },
});

const marqueeRootVariants = cva('group relative w-full overflow-hidden text-foreground', {
  variants: {
    orientation: {
      horizontal: '',
      vertical: 'h-60',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

function MarqueeRoot(props: ComponentProps<typeof MarqueePrimitive.Root>) {
  const [local, others] = splitProps(props, ['class', 'side']);

  return (
    <MarqueePrimitive.Root
      data-slot="marquee-root"
      side={local.side}
      class={cn(
        marqueeRootVariants({
          orientation: local.side === 'top' || local.side === 'bottom' ? 'vertical' : 'horizontal',
        }),
        local.class,
      )}
      {...others}
    />
  );
}

function MarqueeRootProvider(props: ComponentProps<typeof MarqueePrimitive.RootProvider>) {
  const [local, others] = splitProps(props, ['class', 'value']);

  return (
    <MarqueePrimitive.RootProvider
      data-slot="marquee-root-provider"
      value={local.value}
      class={cn(marqueeRootVariants({ orientation: local.value().orientation }), local.class)}
      {...others}
    />
  );
}

function MarqueeViewport(props: ComponentProps<typeof MarqueePrimitive.Viewport>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <MarqueePrimitive.Viewport
      data-slot="marquee-viewport"
      class={cn('size-full', local.class)}
      {...others}
    />
  );
}

function MarqueeContent(props: ComponentProps<typeof MarqueePrimitive.Content>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <MarqueePrimitive.Content
      data-slot="marquee-content"
      class={cn(
        'animate-moduix-marquee-x group-data-paused:[animation-play-state:paused] data-reverse:[animation-direction:reverse] data-[side=bottom]:animate-moduix-marquee-y data-[side=top]:animate-moduix-marquee-y motion-reduce:animate-none',
        local.class,
      )}
      {...others}
    />
  );
}

function MarqueeItem(props: ComponentProps<typeof MarqueePrimitive.Item>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <MarqueePrimitive.Item
      data-slot="marquee-item"
      class={cn('shrink-0', local.class)}
      {...others}
    />
  );
}

function MarqueeEdge(props: ComponentProps<typeof MarqueePrimitive.Edge>) {
  const [local, others] = splitProps(props, ['class', 'side']);

  return (
    <MarqueePrimitive.Edge
      data-slot="marquee-edge"
      side={local.side}
      class={cn(marqueeEdgeVariants({ side: local.side }), local.class)}
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