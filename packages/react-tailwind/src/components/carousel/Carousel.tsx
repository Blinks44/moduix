'use client';

import {
  Carousel as CarouselPrimitive,
  useCarousel,
  useCarouselContext,
} from '@ark-ui/react/carousel';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';
import { ChevronLeftIcon, ChevronRightIcon } from '@/lib/moduix/icons/ui';

const rootClass =
  'flex w-full min-w-0 flex-col gap-3 data-[orientation=vertical]:h-96 data-[orientation=vertical]:flex-row';
const triggerClass =
  'group/carousel-trigger inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm outline-0 transition-[background-color,color] duration-fast ease-in-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50 data-disabled:cursor-not-allowed data-disabled:opacity-50 data-pressed:bg-accent data-pressed:text-accent-foreground [&_svg]:size-4 [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):hover]:bg-accent [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):hover]:text-accent-foreground';
// Default chevrons point along the paging axis.
const iconClass =
  'group-data-[orientation=vertical]/carousel-trigger:rotate-90 group-data-[orientation=horizontal]/carousel-trigger:rtl:rotate-180';

const Carousel = forwardRef<
  ComponentRef<typeof CarouselPrimitive.Root>,
  ComponentProps<typeof CarouselPrimitive.Root>
>(function Carousel({ className, ...props }, ref) {
  return (
    <CarouselPrimitive.Root
      ref={ref}
      className={cn(rootClass, className)}
      {...props}
      data-slot="carousel-root"
    />
  );
});

const CarouselRootProvider = forwardRef<
  ComponentRef<typeof CarouselPrimitive.RootProvider>,
  ComponentProps<typeof CarouselPrimitive.RootProvider>
>(function CarouselRootProvider({ className, ...props }, ref) {
  return (
    <CarouselPrimitive.RootProvider
      ref={ref}
      className={cn(rootClass, className)}
      {...props}
      data-slot="carousel-root-provider"
    />
  );
});

const CarouselControl = forwardRef<
  ComponentRef<typeof CarouselPrimitive.Control>,
  ComponentProps<typeof CarouselPrimitive.Control>
>(function CarouselControl({ className, ...props }, ref) {
  return (
    <CarouselPrimitive.Control
      ref={ref}
      className={cn(
        'flex min-w-0 items-center justify-center gap-3 data-[orientation=vertical]:flex-col data-[orientation=vertical]:justify-between',
        className,
      )}
      {...props}
      data-slot="carousel-control"
    />
  );
});

const CarouselItemGroup = forwardRef<
  ComponentRef<typeof CarouselPrimitive.ItemGroup>,
  ComponentProps<typeof CarouselPrimitive.ItemGroup>
>(function CarouselItemGroup({ className, ...props }, ref) {
  return (
    <CarouselPrimitive.ItemGroup
      ref={ref}
      className={cn(
        'min-h-0 min-w-0 flex-1 rounded-xl outline-0 focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring data-dragging:cursor-grabbing data-dragging:select-none data-[orientation=vertical]:h-full data-[orientation=vertical]:overscroll-y-contain',
        className,
      )}
      {...props}
      data-slot="carousel-item-group"
    />
  );
});

const CarouselItem = forwardRef<
  ComponentRef<typeof CarouselPrimitive.Item>,
  ComponentProps<typeof CarouselPrimitive.Item>
>(function CarouselItem({ className, ...props }, ref) {
  return (
    <CarouselPrimitive.Item
      ref={ref}
      className={cn('min-h-0 min-w-0', className)}
      {...props}
      data-slot="carousel-item"
    />
  );
});

const CarouselPrevTrigger = forwardRef<
  ComponentRef<typeof CarouselPrimitive.PrevTrigger>,
  ComponentProps<typeof CarouselPrimitive.PrevTrigger>
>(function CarouselPrevTrigger({ className, children, ...props }, ref) {
  return (
    <CarouselPrimitive.PrevTrigger
      ref={ref}
      className={cn(triggerClass, 'size-control-md', className)}
      {...props}
      data-slot="carousel-prev-trigger"
    >
      {children ?? <ChevronLeftIcon className={iconClass} />}
    </CarouselPrimitive.PrevTrigger>
  );
});

const CarouselNextTrigger = forwardRef<
  ComponentRef<typeof CarouselPrimitive.NextTrigger>,
  ComponentProps<typeof CarouselPrimitive.NextTrigger>
>(function CarouselNextTrigger({ className, children, ...props }, ref) {
  return (
    <CarouselPrimitive.NextTrigger
      ref={ref}
      className={cn(triggerClass, 'size-control-md', className)}
      {...props}
      data-slot="carousel-next-trigger"
    >
      {children ?? <ChevronRightIcon className={iconClass} />}
    </CarouselPrimitive.NextTrigger>
  );
});

const CarouselIndicatorGroup = forwardRef<
  ComponentRef<typeof CarouselPrimitive.IndicatorGroup>,
  ComponentProps<typeof CarouselPrimitive.IndicatorGroup>
>(function CarouselIndicatorGroup({ className, ...props }, ref) {
  return (
    <CarouselPrimitive.IndicatorGroup
      ref={ref}
      className={cn(
        'flex items-center justify-center gap-2 data-[orientation=vertical]:flex-col',
        className,
      )}
      {...props}
      data-slot="carousel-indicator-group"
    />
  );
});

const CarouselIndicator = forwardRef<
  ComponentRef<typeof CarouselPrimitive.Indicator>,
  ComponentProps<typeof CarouselPrimitive.Indicator>
>(function CarouselIndicator({ className, ...props }, ref) {
  return (
    <CarouselPrimitive.Indicator
      ref={ref}
      className={cn(
        'size-2 cursor-pointer rounded-full border-0 bg-muted-foreground/50 p-0 transition-[width,height,background-color] duration-fast focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50 data-current:w-6 data-current:bg-primary data-disabled:cursor-not-allowed data-disabled:opacity-50 data-readonly:cursor-not-allowed data-readonly:opacity-50 data-[orientation=vertical]:data-current:h-6 data-[orientation=vertical]:data-current:w-2 forced-colors:bg-[ButtonText] forced-colors:data-current:bg-[Highlight] [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):not([data-readonly]):not([data-current]):hover]:bg-muted-foreground',
        className,
      )}
      {...props}
      data-slot="carousel-indicator"
    />
  );
});

const CarouselIndicators = forwardRef<
  ComponentRef<typeof CarouselPrimitive.IndicatorGroup>,
  Omit<ComponentProps<typeof CarouselPrimitive.IndicatorGroup>, 'asChild' | 'children'> & {
    indicatorClassName?: string;
  }
>(function CarouselIndicators({ className, indicatorClassName, ...props }, ref) {
  return (
    <CarouselPrimitive.Context>
      {(api) => (
        <CarouselIndicatorGroup ref={ref} className={className} {...props}>
          {api.pageSnapPoints.map((_, index) => (
            <CarouselIndicator key={index} index={index} className={indicatorClassName} />
          ))}
        </CarouselIndicatorGroup>
      )}
    </CarouselPrimitive.Context>
  );
});

const CarouselAutoplayTrigger = forwardRef<
  ComponentRef<typeof CarouselPrimitive.AutoplayTrigger>,
  ComponentProps<typeof CarouselPrimitive.AutoplayTrigger>
>(function CarouselAutoplayTrigger({ className, ...props }, ref) {
  return (
    <CarouselPrimitive.AutoplayTrigger
      ref={ref}
      className={cn(triggerClass, 'h-control-md min-w-control-md px-2', className)}
      {...props}
      data-slot="carousel-autoplay-trigger"
    />
  );
});

const CarouselAutoplayIndicator = forwardRef<
  ComponentRef<typeof CarouselPrimitive.AutoplayIndicator>,
  ComponentProps<typeof CarouselPrimitive.AutoplayIndicator>
>(function CarouselAutoplayIndicator({ className, ...props }, ref) {
  return (
    <CarouselPrimitive.AutoplayIndicator
      ref={ref}
      className={cn('text-xs font-medium', className)}
      {...props}
      data-slot="carousel-autoplay-indicator"
    />
  );
});

const CarouselProgressText = forwardRef<
  ComponentRef<typeof CarouselPrimitive.ProgressText>,
  ComponentProps<typeof CarouselPrimitive.ProgressText>
>(function CarouselProgressText({ className, ...props }, ref) {
  return (
    <CarouselPrimitive.ProgressText
      ref={ref}
      dir="ltr"
      className={cn('text-sm text-muted-foreground tabular-nums [unicode-bidi:isolate]', className)}
      {...props}
      data-slot="carousel-progress-text"
    />
  );
});

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