import { Marquee as MarqueePrimitive, useMarquee, useMarqueeContext } from '@ark-ui/solid/marquee';
import { cva } from 'class-variance-authority';
import type { ComponentProps } from 'solid-js';
import { splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';

const marqueeEdgeVariants = cva('z-1 from-background to-transparent', {
  variants: {
    side: {
      start: 'w-1/5 bg-linear-to-r rtl:bg-linear-to-l',
      end: 'w-1/5 bg-linear-to-l rtl:bg-linear-to-r',
      top: 'h-1/5 bg-linear-to-b',
      bottom: 'h-1/5 bg-linear-to-t',
    },
  },
});

function Marquee(props: ComponentProps<typeof MarqueePrimitive.Root>) {
  const [local, others] = splitProps(props, ['class', 'side']);

  return (
    <MarqueePrimitive.Root
      side={local.side}
      class={cn(
        'group w-full',
        (local.side === 'top' || local.side === 'bottom') && 'h-60',
        local.class,
      )}
      {...others}
      data-slot="marquee-root"
    />
  );
}

function MarqueeRootProvider(props: ComponentProps<typeof MarqueePrimitive.RootProvider>) {
  const [local, others] = splitProps(props, ['class', 'value']);

  return (
    <MarqueePrimitive.RootProvider
      value={local.value}
      class={cn('group w-full', local.value().orientation === 'vertical' && 'h-60', local.class)}
      {...others}
      data-slot="marquee-root-provider"
    />
  );
}

function MarqueeViewport(props: ComponentProps<typeof MarqueePrimitive.Viewport>) {
  return <MarqueePrimitive.Viewport {...props} data-slot="marquee-viewport" />;
}

function MarqueeContent(props: ComponentProps<typeof MarqueePrimitive.Content>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <MarqueePrimitive.Content
      class={cn(
        'animate-moduix-marquee-x group-data-paused:[animation-play-state:paused] data-reverse:[animation-direction:reverse] data-[orientation=vertical]:animate-moduix-marquee-y motion-reduce:data-[orientation]:animate-none',
        local.class,
      )}
      {...others}
      data-slot="marquee-content"
    />
  );
}

function MarqueeItem(props: ComponentProps<typeof MarqueePrimitive.Item>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <MarqueePrimitive.Item
      class={cn('shrink-0', local.class)}
      {...others}
      data-slot="marquee-item"
    />
  );
}

function MarqueeEdge(props: ComponentProps<typeof MarqueePrimitive.Edge>) {
  const [local, others] = splitProps(props, ['class', 'side']);

  return (
    <MarqueePrimitive.Edge
      side={local.side}
      class={cn(marqueeEdgeVariants({ side: local.side }), local.class)}
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

export type {
  MarqueeContentBaseProps,
  MarqueeContentProps,
  MarqueeContextProps,
  MarqueeEdgeBaseProps,
  MarqueeEdgeProps,
  MarqueeItemBaseProps,
  MarqueeItemProps,
  MarqueePauseStatusDetails,
  MarqueeRootBaseProps,
  MarqueeRootProps,
  MarqueeRootProviderBaseProps,
  MarqueeRootProviderProps,
  MarqueeSide,
  MarqueeViewportBaseProps,
  MarqueeViewportProps,
  UseMarqueeContext,
  UseMarqueeProps,
  UseMarqueeReturn,
} from '@ark-ui/solid/marquee';