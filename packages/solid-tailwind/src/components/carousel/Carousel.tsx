import {
  Carousel as CarouselPrimitive,
  useCarousel,
  useCarouselContext,
} from '@ark-ui/solid/carousel';
import type { ComponentProps } from 'solid-js';
import { children, Index, splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';
import { ChevronLeftIcon, ChevronRightIcon } from '@/lib/moduix/icons/ui';

const rootClass =
  'flex w-full min-w-0 flex-col gap-3 data-[orientation=vertical]:h-96 data-[orientation=vertical]:flex-row';
const triggerClass =
  'group/carousel-trigger inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm outline-0 transition-[background-color,color] duration-fast ease-in-out focus-visible:outline-focus focus-visible:outline-offset-focus focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-disabled data-disabled:cursor-not-allowed data-disabled:opacity-disabled data-pressed:bg-accent data-pressed:text-accent-foreground [&_svg]:size-4 [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):hover]:bg-accent [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):hover]:text-accent-foreground';
// Default chevrons point along the paging axis.
const iconClass =
  'group-data-[orientation=vertical]/carousel-trigger:rotate-90 group-data-[orientation=horizontal]/carousel-trigger:rtl:rotate-180';

function Carousel(props: ComponentProps<typeof CarouselPrimitive.Root>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <CarouselPrimitive.Root
      class={cn(rootClass, local.class)}
      {...others}
      data-slot="carousel-root"
    />
  );
}

function CarouselRootProvider(props: ComponentProps<typeof CarouselPrimitive.RootProvider>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <CarouselPrimitive.RootProvider
      class={cn(rootClass, local.class)}
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
        'flex min-w-0 items-center justify-center gap-3 data-[orientation=vertical]:flex-col data-[orientation=vertical]:justify-between',
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
        'min-h-0 min-w-0 flex-1 rounded-xl outline-0 focus-visible:outline-focus-inset focus-visible:outline-offset-focus-inset focus-visible:outline-ring data-dragging:cursor-grabbing data-dragging:select-none data-[orientation=vertical]:h-full data-[orientation=vertical]:overscroll-y-contain',
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
      class={cn('min-h-0 min-w-0', local.class)}
      {...others}
      data-slot="carousel-item"
    />
  );
}

function CarouselPrevTrigger(props: ComponentProps<typeof CarouselPrimitive.PrevTrigger>) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <CarouselPrimitive.PrevTrigger
      class={cn(triggerClass, 'size-control-md', local.class)}
      {...others}
      data-slot="carousel-prev-trigger"
    >
      {resolvedChildren() ?? <ChevronLeftIcon class={iconClass} />}
    </CarouselPrimitive.PrevTrigger>
  );
}

function CarouselNextTrigger(props: ComponentProps<typeof CarouselPrimitive.NextTrigger>) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <CarouselPrimitive.NextTrigger
      class={cn(triggerClass, 'size-control-md', local.class)}
      {...others}
      data-slot="carousel-next-trigger"
    >
      {resolvedChildren() ?? <ChevronRightIcon class={iconClass} />}
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
        'size-2 cursor-pointer rounded-full border-0 bg-muted-foreground/50 p-0 transition-[width,height,background-color] duration-fast focus-visible:outline-focus focus-visible:outline-offset-focus focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-disabled data-current:w-6 data-current:bg-primary data-disabled:cursor-not-allowed data-disabled:opacity-disabled data-readonly:cursor-not-allowed data-readonly:opacity-disabled data-[orientation=vertical]:data-current:h-6 data-[orientation=vertical]:data-current:w-2 forced-colors:bg-[ButtonText] forced-colors:data-current:bg-[Highlight] [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):not([data-readonly]):not([data-current]):hover]:bg-muted-foreground',
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
          <Index each={api().pageSnapPoints}>
            {(_, index) => <CarouselIndicator index={index} class={local.indicatorClassName} />}
          </Index>
        </CarouselIndicatorGroup>
      )}
    </CarouselPrimitive.Context>
  );
}

function CarouselAutoplayTrigger(props: ComponentProps<typeof CarouselPrimitive.AutoplayTrigger>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <CarouselPrimitive.AutoplayTrigger
      class={cn(triggerClass, 'h-control-md min-w-control-md px-2', local.class)}
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
      class={cn('text-xs font-medium', local.class)}
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