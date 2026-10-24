import {
  ScrollArea as ScrollAreaPrimitive,
  useScrollArea,
  useScrollAreaContext,
} from '@ark-ui/solid/scroll-area';
import type { ComponentProps } from 'solid-js';
import { splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';

type ScrollAreaVariant = 'hover' | 'always';
type ScrollAreaRootProps = ComponentProps<typeof ScrollAreaPrimitive.Root> & {
  fade?: boolean;
  variant?: ScrollAreaVariant;
};
type ScrollAreaRootProviderProps = ComponentProps<typeof ScrollAreaPrimitive.RootProvider> & {
  fade?: boolean;
  variant?: ScrollAreaVariant;
};

function ScrollArea(props: ScrollAreaRootProps) {
  const [local, others] = splitProps(props, ['class', 'fade', 'variant']);

  return (
    <ScrollAreaPrimitive.Root
      {...others}
      data-slot="scroll-area-root"
      data-fade={local.fade ? '' : undefined}
      data-variant={local.variant ?? 'hover'}
      class={cn('group/scroll-area h-full min-h-0 w-full min-w-0', local.class)}
    />
  );
}

function ScrollAreaRootProvider(props: ScrollAreaRootProviderProps) {
  const [local, others] = splitProps(props, ['class', 'fade', 'variant']);

  return (
    <ScrollAreaPrimitive.RootProvider
      {...others}
      data-slot="scroll-area-root-provider"
      data-fade={local.fade ? '' : undefined}
      data-variant={local.variant ?? 'hover'}
      class={cn('group/scroll-area h-full min-h-0 w-full min-w-0', local.class)}
    />
  );
}

function ScrollAreaViewport(props: ComponentProps<typeof ScrollAreaPrimitive.Viewport>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ScrollAreaPrimitive.Viewport
      {...others}
      data-slot="scroll-area-viewport"
      class={cn(
        'h-full min-h-0 w-full min-w-0 [scrollbar-width:none] rounded-[inherit] outline-0 group-data-[fade]/scroll-area:not-forced-colors:[mask-image:linear-gradient(to_bottom,transparent_0,black_min(var(--spacing-10),var(--scroll-area-overflow-y-start,0px)),black_calc(100%_-_min(var(--spacing-10),var(--scroll-area-overflow-y-end,0px))),transparent_100%)] group-data-[fade]/scroll-area:not-forced-colors:mask-no-repeat focus-visible:outline-focus-inset focus-visible:outline-offset-focus-inset focus-visible:outline-ring forced-colors:focus-visible:outline-[Highlight] [&::-webkit-scrollbar]:hidden',
        local.class,
      )}
    />
  );
}

function ScrollAreaContent(props: ComponentProps<typeof ScrollAreaPrimitive.Content>) {
  return <ScrollAreaPrimitive.Content {...props} data-slot="scroll-area-content" />;
}

function ScrollAreaScrollbar(props: ComponentProps<typeof ScrollAreaPrimitive.Scrollbar>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ScrollAreaPrimitive.Scrollbar
      {...others}
      data-slot="scroll-area-scrollbar"
      class={cn(
        "pointer-events-none hidden opacity-0 transition-[opacity,width,height] duration-[var(--moduix-duration-normal),var(--moduix-duration-fast),var(--moduix-duration-fast)] ease-in-out group-data-[variant=always]/scroll-area:pointer-events-auto group-data-[variant=always]/scroll-area:opacity-100 before:absolute before:content-[''] data-hover:pointer-events-auto data-hover:opacity-100 data-scrolling:pointer-events-auto data-scrolling:opacity-100 data-scrolling:duration-0 data-[orientation=horizontal]:mx-1 data-[orientation=horizontal]:mb-1 data-[orientation=horizontal]:h-1 data-[orientation=horizontal]:before:inset-x-0 data-[orientation=horizontal]:before:-inset-y-2 data-[orientation=horizontal]:hover:h-1.5 data-[orientation=horizontal]:data-dragging:h-1.5 data-[orientation=horizontal]:data-overflow-x:block data-[orientation=vertical]:my-1 data-[orientation=vertical]:me-1 data-[orientation=vertical]:w-1 data-[orientation=vertical]:before:-inset-x-2 data-[orientation=vertical]:before:inset-y-0 data-[orientation=vertical]:hover:w-1.5 data-[orientation=vertical]:data-dragging:w-1.5 data-[orientation=vertical]:data-overflow-y:block",
        local.class,
      )}
    />
  );
}

function ScrollAreaThumb(props: ComponentProps<typeof ScrollAreaPrimitive.Thumb>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ScrollAreaPrimitive.Thumb
      {...others}
      data-slot="scroll-area-thumb"
      class={cn(
        'rounded-full bg-border data-[orientation=horizontal]:h-full data-[orientation=horizontal]:min-w-control-xs data-[orientation=vertical]:min-h-control-xs data-[orientation=vertical]:w-full forced-colors:bg-[ButtonText]',
        local.class,
      )}
    />
  );
}

function ScrollAreaCorner(props: ComponentProps<typeof ScrollAreaPrimitive.Corner>) {
  return <ScrollAreaPrimitive.Corner {...props} data-slot="scroll-area-corner" />;
}

const ScrollAreaContext = ScrollAreaPrimitive.Context;

export {
  ScrollArea,
  ScrollAreaContext,
  ScrollAreaContent,
  ScrollAreaCorner,
  ScrollAreaRootProvider,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
  useScrollArea,
  useScrollAreaContext,
};
export type { ScrollAreaRootProps, ScrollAreaRootProviderProps, ScrollAreaVariant };