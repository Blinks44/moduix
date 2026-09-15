'use client';

import {
  Carousel as CarouselPrimitive,
  useCarousel,
  useCarouselContext,
} from '@ark-ui/react/carousel';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@/lib/moduix/icons/ui';
import styles from './Carousel.module.css';

const CarouselRoot = forwardRef<
  ComponentRef<typeof CarouselPrimitive.Root>,
  ComponentProps<typeof CarouselPrimitive.Root>
>(function CarouselRoot({ className, ...props }, ref) {
  return (
    <CarouselPrimitive.Root
      ref={ref}
      className={clsx(styles.root, className)}
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
      className={clsx(styles.root, className)}
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
      className={clsx(styles.control, className)}
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
      className={clsx(styles.itemGroup, className)}
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
      className={clsx(styles.item, className)}
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
      className={clsx(styles.prevTrigger, className)}
      {...props}
      data-slot="carousel-prev-trigger"
    >
      {children ?? (
        <span className={styles.defaultIcon}>
          <ChevronLeftIcon />
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
      className={clsx(styles.nextTrigger, className)}
      {...props}
      data-slot="carousel-next-trigger"
    >
      {children ?? (
        <span className={styles.defaultIcon}>
          <ChevronRightIcon />
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
      className={clsx(styles.indicatorGroup, className)}
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
      className={clsx(styles.indicator, className)}
      {...props}
      data-slot="carousel-indicator"
    />
  );
});

const CarouselIndicators = forwardRef<
  ComponentRef<typeof CarouselPrimitive.IndicatorGroup>,
  ComponentProps<typeof CarouselPrimitive.IndicatorGroup> & {
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
      className={clsx(styles.autoplayTrigger, className)}
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
      className={clsx(styles.autoplayIndicator, className)}
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
      className={clsx(styles.progressText, className)}
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