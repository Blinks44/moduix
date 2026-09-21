import {
  Carousel as CarouselPrimitive,
  useCarousel,
  useCarouselContext,
} from '@ark-ui/solid/carousel';
import type { ComponentProps } from 'solid-js';
import { children, For, splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';
import { ChevronLeftIcon, ChevronRightIcon } from '@/lib/moduix/icons/ui/Icons';

function Carousel(props: ComponentProps<typeof CarouselPrimitive.Root>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <CarouselPrimitive.Root
      class={cn(
        'group/carousel flex w-full min-w-0 flex-col gap-3 data-[orientation=vertical]:h-96 data-[orientation=vertical]:flex-row data-[orientation=vertical]:items-stretch',
        local.class,
      )}
      {...others}
      data-slot="carousel-root"
    />
  );
}

function CarouselRootProvider(props: ComponentProps<typeof CarouselPrimitive.RootProvider>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <CarouselPrimitive.RootProvider
      class={cn(
        'group/carousel flex w-full min-w-0 flex-col gap-3 data-[orientation=vertical]:h-96 data-[orientation=vertical]:flex-row data-[orientation=vertical]:items-stretch',
        local.class,
      )}
      {...others}
      data-slot="carousel-root-provider"
    />
  );
}

function CarouselControl(props: ComponentProps<typeof CarouselPrimitive.Control>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <CarouselPrimitive.Control
      class={cn(
        'flex min-w-0 items-center gap-3 data-[orientation=vertical]:flex-col data-[orientation=vertical]:justify-between',
        local.class,
      )}
      {...others}
      data-slot="carousel-control"
    />
  );
}

function CarouselItemGroup(props: ComponentProps<typeof CarouselPrimitive.ItemGroup>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <CarouselPrimitive.ItemGroup
      class={cn(
        'flex min-h-0 min-w-0 flex-1 [scrollbar-width:none] overscroll-x-contain overscroll-y-auto scroll-smooth rounded-xl outline-0 focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring data-dragging:cursor-grabbing data-dragging:select-none data-[orientation=vertical]:h-full data-[orientation=vertical]:overscroll-x-auto data-[orientation=vertical]:overscroll-y-contain motion-reduce:scroll-auto [&::-webkit-scrollbar]:hidden',
        local.class,
      )}
      {...others}
      data-slot="carousel-item-group"
    />
  );
}

function CarouselItem(props: ComponentProps<typeof CarouselPrimitive.Item>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <CarouselPrimitive.Item
      class={cn('box-border min-h-0 min-w-0', local.class)}
      {...others}
      data-slot="carousel-item"
    />
  );
}

function CarouselPrevTrigger(props: ComponentProps<typeof CarouselPrimitive.PrevTrigger>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <CarouselPrimitive.PrevTrigger
      asChild={local.asChild}
      class={cn(
        'focus-visible:outline-offset-0.5 inline-flex size-control-md shrink-0 cursor-pointer items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm outline-0 transition-[background-color,border-color,color,box-shadow,transform] duration-150 ease-in-out focus-visible:outline-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50 data-disabled:cursor-not-allowed data-disabled:opacity-50 data-pressed:border-ring data-pressed:bg-accent data-pressed:text-accent-foreground motion-reduce:transition-none [&_svg]:size-4 [&:not(:disabled):not([data-disabled]):hover]:border-ring [&:not(:disabled):not([data-disabled]):hover]:bg-accent [&:not(:disabled):not([data-disabled]):hover]:text-accent-foreground [&:not(:disabled):not([data-disabled]):hover]:shadow-md',
        local.class,
      )}
      {...others}
      data-slot="carousel-prev-trigger"
    >
      {resolvedChildren() ?? (
        <span class="inline-flex items-center justify-center">
          <ChevronLeftIcon class="group-data-[orientation=vertical]/carousel:rotate-90 group-data-[orientation=horizontal]/carousel:rtl:rotate-180" />
        </span>
      )}
    </CarouselPrimitive.PrevTrigger>
  );
}

function CarouselNextTrigger(props: ComponentProps<typeof CarouselPrimitive.NextTrigger>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <CarouselPrimitive.NextTrigger
      asChild={local.asChild}
      class={cn(
        'focus-visible:outline-offset-0.5 inline-flex size-control-md shrink-0 cursor-pointer items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm outline-0 transition-[background-color,border-color,color,box-shadow,transform] duration-150 ease-in-out focus-visible:outline-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50 data-disabled:cursor-not-allowed data-disabled:opacity-50 data-pressed:border-ring data-pressed:bg-accent data-pressed:text-accent-foreground motion-reduce:transition-none [&_svg]:size-4 [&:not(:disabled):not([data-disabled]):hover]:border-ring [&:not(:disabled):not([data-disabled]):hover]:bg-accent [&:not(:disabled):not([data-disabled]):hover]:text-accent-foreground [&:not(:disabled):not([data-disabled]):hover]:shadow-md',
        local.class,
      )}
      {...others}
      data-slot="carousel-next-trigger"
    >
      {resolvedChildren() ?? (
        <span class="inline-flex items-center justify-center">
          <ChevronRightIcon class="group-data-[orientation=vertical]/carousel:rotate-90 group-data-[orientation=horizontal]/carousel:rtl:rotate-180" />
        </span>
      )}
    </CarouselPrimitive.NextTrigger>
  );
}

function CarouselIndicatorGroup(props: ComponentProps<typeof CarouselPrimitive.IndicatorGroup>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <CarouselPrimitive.IndicatorGroup
      class={cn(
        'flex items-center justify-center gap-2 data-[orientation=vertical]:flex-col',
        local.class,
      )}
      {...others}
      data-slot="carousel-indicator-group"
    />
  );
}

function CarouselIndicator(props: ComponentProps<typeof CarouselPrimitive.Indicator>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <CarouselPrimitive.Indicator
      class={cn(
        'focus-visible:outline-offset-0.5 size-2 cursor-pointer rounded-full border-0 bg-muted p-0 opacity-90 transition-[width,height,background-color,opacity] duration-150 focus-visible:outline-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50 data-current:w-6 data-current:bg-primary data-current:opacity-100 data-disabled:cursor-not-allowed data-disabled:opacity-50 data-readonly:cursor-not-allowed data-readonly:opacity-50 data-[orientation=vertical]:data-current:h-6 data-[orientation=vertical]:data-current:w-2 motion-reduce:transition-none forced-colors:bg-[ButtonText] forced-colors:data-current:bg-[Highlight] [&:not(:disabled):not([data-disabled]):not([data-readonly]):not([data-current]):hover]:bg-muted-foreground',
        local.class,
      )}
      {...others}
      data-slot="carousel-indicator"
    />
  );
}

type CarouselIndicatorsProps = Omit<
  ComponentProps<typeof CarouselPrimitive.IndicatorGroup>,
  'asChild' | 'children'
> & {
  indicatorClassName?: string;
};

function CarouselIndicators(props: CarouselIndicatorsProps) {
  const [local, others] = splitProps(props, ['class', 'indicatorClassName']);

  return (
    <CarouselPrimitive.Context>
      {(api) => (
        <CarouselIndicatorGroup class={local.class} {...others}>
          <For each={api().pageSnapPoints}>
            {(_, index) => <CarouselIndicator index={index()} class={local.indicatorClassName} />}
          </For>
        </CarouselIndicatorGroup>
      )}
    </CarouselPrimitive.Context>
  );
}

function CarouselAutoplayTrigger(props: ComponentProps<typeof CarouselPrimitive.AutoplayTrigger>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <CarouselPrimitive.AutoplayTrigger
      class={cn(
        'focus-visible:outline-offset-0.5 inline-flex size-control-md min-w-12 shrink-0 cursor-pointer items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm outline-0 transition-[background-color,border-color,color,box-shadow,transform] duration-150 ease-in-out focus-visible:outline-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50 data-disabled:cursor-not-allowed data-disabled:opacity-50 data-pressed:border-ring data-pressed:bg-accent data-pressed:text-accent-foreground motion-reduce:transition-none [&_svg]:size-4 [&:not(:disabled):not([data-disabled]):hover]:border-ring [&:not(:disabled):not([data-disabled]):hover]:bg-accent [&:not(:disabled):not([data-disabled]):hover]:text-accent-foreground [&:not(:disabled):not([data-disabled]):hover]:shadow-md',
        local.class,
      )}
      {...others}
      data-slot="carousel-autoplay-trigger"
    />
  );
}

function CarouselAutoplayIndicator(
  props: ComponentProps<typeof CarouselPrimitive.AutoplayIndicator>,
) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <CarouselPrimitive.AutoplayIndicator
      class={cn(
        'inline-flex min-w-4 items-center justify-center text-xs font-medium uppercase',
        local.class,
      )}
      {...others}
      data-slot="carousel-autoplay-indicator"
    />
  );
}

function CarouselProgressText(props: ComponentProps<typeof CarouselPrimitive.ProgressText>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <CarouselPrimitive.ProgressText
      dir="ltr"
      class={cn('text-sm text-muted-foreground tabular-nums [unicode-bidi:isolate]', local.class)}
      {...others}
      data-slot="carousel-progress-text"
    />
  );
}

const CarouselContext = CarouselPrimitive.Context;

export {
  Carousel,
  CarouselAutoplayIndicator,
  CarouselAutoplayTrigger,
  CarouselContext,
  CarouselControl,
  CarouselIndicator,
  CarouselIndicatorGroup,
  CarouselIndicators,
  CarouselItem,
  CarouselItemGroup,
  CarouselNextTrigger,
  CarouselPrevTrigger,
  CarouselProgressText,
  CarouselRootProvider,
  useCarousel,
  useCarouselContext,
};