import type { ComponentProps, ComponentRef } from 'react';
import { Carousel as CarouselPrimitive } from '@ark-ui/react/carousel';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@/lib/moduix/icons/ui';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './Carousel.module.css';

const CarouselRoot = forwardRef<
  ComponentRef<typeof CarouselPrimitive.Root>,
  ComponentProps<typeof CarouselPrimitive.Root>
>(function CarouselRoot({ className, ...props }, ref) {
  return (
    <CarouselPrimitive.Root
      ref={ref}
      data-slot="carousel-root"
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
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
      data-slot="carousel-root-provider"
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
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
      data-slot="carousel-control"
      className={clsx(styles.control, normalizeClassName(className))}
      {...props}
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
      data-slot="carousel-item-group"
      className={clsx(styles.itemGroup, normalizeClassName(className))}
      {...props}
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
      data-slot="carousel-item"
      className={clsx(styles.item, normalizeClassName(className))}
      {...props}
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
      data-slot="carousel-prev-trigger"
      className={clsx(styles.prevTrigger, normalizeClassName(className))}
      {...props}
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
      data-slot="carousel-next-trigger"
      className={clsx(styles.nextTrigger, normalizeClassName(className))}
      {...props}
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
      data-slot="carousel-indicator-group"
      className={clsx(styles.indicatorGroup, normalizeClassName(className))}
      {...props}
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
      data-slot="carousel-indicator"
      className={clsx(styles.indicator, normalizeClassName(className))}
      {...props}
    />
  );
});

const CarouselAutoplayTrigger = forwardRef<
  ComponentRef<typeof CarouselPrimitive.AutoplayTrigger>,
  ComponentProps<typeof CarouselPrimitive.AutoplayTrigger>
>(function CarouselAutoplayTrigger({ className, ...props }, ref) {
  return (
    <CarouselPrimitive.AutoplayTrigger
      ref={ref}
      data-slot="carousel-autoplay-trigger"
      className={clsx(styles.autoplayTrigger, normalizeClassName(className))}
      {...props}
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
      data-slot="carousel-autoplay-indicator"
      className={clsx(styles.autoplayIndicator, normalizeClassName(className))}
      {...props}
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
      data-slot="carousel-progress-text"
      className={clsx(styles.progressText, normalizeClassName(className))}
      {...props}
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
  AutoplayTrigger: CarouselAutoplayTrigger,
  AutoplayIndicator: CarouselAutoplayIndicator,
  ProgressText: CarouselProgressText,
});

export { Carousel };