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

const CarouselRoot = forwardRef<
  ComponentRef<typeof CarouselPrimitive.Root>,
  ComponentProps<typeof CarouselPrimitive.Root>
>(function CarouselRoot({ className, ...props }, ref) {
  return (
    <CarouselPrimitive.Root
      ref={ref}
      className={cn(
        'group/carousel flex w-full min-w-0 flex-col gap-3 data-[orientation=vertical]:h-96 data-[orientation=vertical]:flex-row data-[orientation=vertical]:items-stretch',
        className,
      )}
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
      className={cn(
        'group/carousel flex w-full min-w-0 flex-col gap-3 data-[orientation=vertical]:h-96 data-[orientation=vertical]:flex-row data-[orientation=vertical]:items-stretch',
        className,
      )}
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
        'flex min-w-0 items-center gap-3 data-[orientation=vertical]:flex-col data-[orientation=vertical]:justify-between',
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
        'flex min-h-0 min-w-0 flex-1 [scrollbar-width:none] overscroll-x-contain overscroll-y-auto scroll-smooth rounded-xl outline-0 focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring data-dragging:cursor-grabbing data-dragging:select-none data-[orientation=vertical]:h-full data-[orientation=vertical]:overscroll-x-auto data-[orientation=vertical]:overscroll-y-contain motion-reduce:scroll-auto [&::-webkit-scrollbar]:hidden',
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
      className={cn('box-border min-h-0 min-w-0', className)}
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
      className={cn(
        'focus-visible:outline-offset-0.5 inline-flex size-control-md shrink-0 cursor-pointer items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm outline-0 transition-[background-color,border-color,color,box-shadow,transform] duration-150 ease-in-out focus-visible:outline-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50 data-disabled:cursor-not-allowed data-disabled:opacity-50 data-pressed:border-foreground data-pressed:bg-accent data-pressed:text-accent-foreground motion-reduce:transition-none [&_svg]:size-4 [&:not(:disabled):not([data-disabled]):hover]:border-foreground [&:not(:disabled):not([data-disabled]):hover]:bg-accent [&:not(:disabled):not([data-disabled]):hover]:text-accent-foreground [&:not(:disabled):not([data-disabled]):hover]:shadow-md',
        className,
      )}
      {...props}
      data-slot="carousel-prev-trigger"
    >
      {children ?? (
        <span className="inline-flex items-center justify-center">
          <ChevronLeftIcon className="group-data-[orientation=vertical]/carousel:rotate-90 group-data-[orientation=horizontal]/carousel:rtl:rotate-180" />
        </span>
      )}
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
      className={cn(
        'focus-visible:outline-offset-0.5 inline-flex size-control-md shrink-0 cursor-pointer items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm outline-0 transition-[background-color,border-color,color,box-shadow,transform] duration-150 ease-in-out focus-visible:outline-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50 data-disabled:cursor-not-allowed data-disabled:opacity-50 data-pressed:border-foreground data-pressed:bg-accent data-pressed:text-accent-foreground motion-reduce:transition-none [&_svg]:size-4 [&:not(:disabled):not([data-disabled]):hover]:border-foreground [&:not(:disabled):not([data-disabled]):hover]:bg-accent [&:not(:disabled):not([data-disabled]):hover]:text-accent-foreground [&:not(:disabled):not([data-disabled]):hover]:shadow-md',
        className,
      )}
      {...props}
      data-slot="carousel-next-trigger"
    >
      {children ?? (
        <span className="inline-flex items-center justify-center">
          <ChevronRightIcon className="group-data-[orientation=vertical]/carousel:rotate-90 group-data-[orientation=horizontal]/carousel:rtl:rotate-180" />
        </span>
      )}
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
        'focus-visible:outline-offset-0.5 size-2 cursor-pointer rounded-full border-0 bg-muted p-0 opacity-90 transition-[width,height,background-color,opacity] duration-150 focus-visible:outline-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50 data-current:w-6 data-current:bg-primary data-current:opacity-100 data-disabled:cursor-not-allowed data-disabled:opacity-50 data-readonly:cursor-not-allowed data-readonly:opacity-50 data-[orientation=vertical]:data-current:h-6 data-[orientation=vertical]:data-current:w-2 motion-reduce:transition-none forced-colors:bg-[ButtonText] forced-colors:data-current:bg-[Highlight] [&:not(:disabled):not([data-disabled]):not([data-readonly]):not([data-current]):hover]:bg-muted-foreground',
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
      className={cn(
        'focus-visible:outline-offset-0.5 inline-flex size-control-md min-w-12 shrink-0 cursor-pointer items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm outline-0 transition-[background-color,border-color,color,box-shadow,transform] duration-150 ease-in-out focus-visible:outline-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50 data-disabled:cursor-not-allowed data-disabled:opacity-50 data-pressed:border-foreground data-pressed:bg-accent data-pressed:text-accent-foreground motion-reduce:transition-none [&_svg]:size-4 [&:not(:disabled):not([data-disabled]):hover]:border-foreground [&:not(:disabled):not([data-disabled]):hover]:bg-accent [&:not(:disabled):not([data-disabled]):hover]:text-accent-foreground [&:not(:disabled):not([data-disabled]):hover]:shadow-md',
        className,
      )}
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
      className={cn(
        'inline-flex min-w-4 items-center justify-center text-xs font-medium uppercase',
        className,
      )}
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

const Carousel = Object.assign(CarouselRoot, {
  Root: CarouselRoot,
  RootProvider: CarouselRootProvider,
  Context: CarouselPrimitive.Context,
  Control: CarouselControl,
  ItemGroup: CarouselItemGroup,
  Item: CarouselItem,
  PrevTrigger: CarouselPrevTrigger,
  NextTrigger: CarouselNextTrigger,
  IndicatorGroup: CarouselIndicatorGroup,
  Indicator: CarouselIndicator,
  Indicators: CarouselIndicators,
  AutoplayTrigger: CarouselAutoplayTrigger,
  AutoplayIndicator: CarouselAutoplayIndicator,
  ProgressText: CarouselProgressText,
});

export { Carousel, useCarousel, useCarouselContext };