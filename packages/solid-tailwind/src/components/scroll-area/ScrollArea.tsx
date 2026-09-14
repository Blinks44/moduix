import {
  ScrollArea as ScrollAreaPrimitive,
  useScrollArea,
  useScrollAreaContext,
} from '@ark-ui/solid/scroll-area';
import type { ComponentProps } from 'solid-js';
import { splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';

type ModuixScrollAreaRootProps = ComponentProps<typeof ScrollAreaPrimitive.Root> & {
  fade?: boolean;
  variant?: 'hover' | 'always';
};
type ModuixScrollAreaRootProviderProps = ComponentProps<typeof ScrollAreaPrimitive.RootProvider> & {
  fade?: boolean;
  variant?: 'hover' | 'always';
};

function ScrollAreaRoot(props: ModuixScrollAreaRootProps) {
  const [local, others] = splitProps(props, ['class', 'fade', 'variant']);

  return (
    <ScrollAreaPrimitive.Root
      {...others}
      data-slot="scroll-area-root"
      data-fade={local.fade ? '' : undefined}
      data-variant={local.variant ?? 'hover'}
      class={cn(
        'group/scroll-area relative h-full min-h-0 w-full min-w-0 text-foreground',
        local.class,
      )}
    />
  );
}

function ScrollAreaRootProvider(props: ModuixScrollAreaRootProviderProps) {
  const [local, others] = splitProps(props, ['class', 'fade', 'variant']);

  return (
    <ScrollAreaPrimitive.RootProvider
      {...others}
      data-slot="scroll-area-root-provider"
      data-fade={local.fade ? '' : undefined}
      data-variant={local.variant ?? 'hover'}
      class={cn(
        'group/scroll-area relative h-full min-h-0 w-full min-w-0 text-foreground',
        local.class,
      )}
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
        'h-full min-h-0 w-full min-w-0 [scrollbar-width:none] rounded-md bg-transparent outline-0 group-data-[fade]/scroll-area:[mask-image:linear-gradient(to_bottom,transparent_0,black_min(40px,var(--scroll-area-overflow-y-start,0px)),black_calc(100%_-_min(40px,var(--scroll-area-overflow-y-end,0px))),transparent_100%)] group-data-[fade]/scroll-area:mask-no-repeat focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring forced-colors:mask-none forced-colors:focus-visible:outline-[Highlight] [&::-webkit-scrollbar]:hidden',
        local.class,
      )}
    />
  );
}

function ScrollAreaContent(props: ComponentProps<typeof ScrollAreaPrimitive.Content>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ScrollAreaPrimitive.Content
      {...others}
      data-slot="scroll-area-content"
      class={cn('block', local.class)}
    />
  );
}

function ScrollAreaScrollbar(props: ComponentProps<typeof ScrollAreaPrimitive.Scrollbar>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ScrollAreaPrimitive.Scrollbar
      {...others}
      data-slot="scroll-area-scrollbar"
      class={cn(
        "pointer-events-none absolute hidden touch-none justify-center rounded-md bg-transparent opacity-0 transition-[opacity,width,height] duration-200 ease-in-out select-none group-data-[variant=always]/scroll-area:pointer-events-auto group-data-[variant=always]/scroll-area:opacity-100 before:absolute before:content-[''] data-dragging:pointer-events-auto data-hover:pointer-events-auto data-hover:opacity-100 data-scrolling:pointer-events-auto data-scrolling:opacity-100 data-scrolling:duration-0 data-[orientation=horizontal]:start-0 data-[orientation=horizontal]:end-[var(--corner-width,0px)] data-[orientation=horizontal]:bottom-0 data-[orientation=horizontal]:mx-1 data-[orientation=horizontal]:mb-1 data-[orientation=horizontal]:h-1 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:before:right-0 data-[orientation=horizontal]:before:bottom-1/2 data-[orientation=horizontal]:before:left-0 data-[orientation=horizontal]:before:h-5 data-[orientation=horizontal]:before:w-full data-[orientation=horizontal]:before:translate-y-1/2 data-[orientation=horizontal]:hover:h-1.5 data-[orientation=horizontal]:data-dragging:h-1.5 data-[orientation=horizontal]:data-overflow-x:flex data-[orientation=vertical]:end-0 data-[orientation=vertical]:top-0 data-[orientation=vertical]:bottom-[var(--corner-height,0px)] data-[orientation=vertical]:my-1 data-[orientation=vertical]:me-1 data-[orientation=vertical]:w-1 data-[orientation=vertical]:before:left-1/2 data-[orientation=vertical]:before:h-full data-[orientation=vertical]:before:w-5 data-[orientation=vertical]:before:-translate-x-1/2 data-[orientation=vertical]:hover:w-1.5 data-[orientation=vertical]:data-dragging:w-1.5 data-[orientation=vertical]:data-overflow-y:flex motion-reduce:transition-none",
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
  const [local, others] = splitProps(props, ['class']);

  return (
    <ScrollAreaPrimitive.Corner
      {...others}
      data-slot="scroll-area-corner"
      class={cn('bg-transparent', local.class)}
    />
  );
}

const ScrollArea = Object.assign(ScrollAreaRoot, {
  Root: ScrollAreaRoot,
  RootProvider: ScrollAreaRootProvider,
  Context: ScrollAreaPrimitive.Context,
  Viewport: ScrollAreaViewport,
  Content: ScrollAreaContent,
  Scrollbar: ScrollAreaScrollbar,
  Thumb: ScrollAreaThumb,
  Corner: ScrollAreaCorner,
  useScrollArea,
});

export { ScrollArea, useScrollArea, useScrollAreaContext };
export type { ModuixScrollAreaRootProps, ModuixScrollAreaRootProviderProps };