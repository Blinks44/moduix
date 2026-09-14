import {
  Carousel as CarouselPrimitive,
  useCarousel,
  useCarouselContext,
} from '@ark-ui/solid/carousel';
import { clsx } from 'clsx';
import type { ComponentProps } from 'solid-js';
import { children, For, splitProps } from 'solid-js';
import { ChevronLeftIcon, ChevronRightIcon } from '@/lib/moduix/icons/ui/Icons';
import styles from './Carousel.module.css';

function CarouselRoot(props: ComponentProps<typeof CarouselPrimitive.Root>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <CarouselPrimitive.Root
      data-slot="carousel-root"
      class={clsx(styles.root, local.class)}
      {...others}
    />
  );
}

function CarouselRootProvider(props: ComponentProps<typeof CarouselPrimitive.RootProvider>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <CarouselPrimitive.RootProvider
      data-slot="carousel-root-provider"
      class={clsx(styles.root, local.class)}
      {...others}
    />
  );
}

function CarouselControl(props: ComponentProps<typeof CarouselPrimitive.Control>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <CarouselPrimitive.Control
      data-slot="carousel-control"
      class={clsx(styles.control, local.class)}
      {...others}
    />
  );
}

function CarouselItemGroup(props: ComponentProps<typeof CarouselPrimitive.ItemGroup>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <CarouselPrimitive.ItemGroup
      data-slot="carousel-item-group"
      class={clsx(styles.itemGroup, local.class)}
      {...others}
    />
  );
}

function CarouselItem(props: ComponentProps<typeof CarouselPrimitive.Item>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <CarouselPrimitive.Item
      data-slot="carousel-item"
      class={clsx(styles.item, local.class)}
      {...others}
    />
  );
}

function CarouselPrevTrigger(props: ComponentProps<typeof CarouselPrimitive.PrevTrigger>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <CarouselPrimitive.PrevTrigger
      asChild={local.asChild}
      data-slot="carousel-prev-trigger"
      class={clsx(styles.prevTrigger, local.class)}
      {...others}
    >
      {resolvedChildren() ?? (
        <span class={styles.defaultIcon}>
          <ChevronLeftIcon />
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
      data-slot="carousel-next-trigger"
      class={clsx(styles.nextTrigger, local.class)}
      {...others}
    >
      {resolvedChildren() ?? (
        <span class={styles.defaultIcon}>
          <ChevronRightIcon />
        </span>
      )}
    </CarouselPrimitive.NextTrigger>
  );
}

function CarouselIndicatorGroup(props: ComponentProps<typeof CarouselPrimitive.IndicatorGroup>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <CarouselPrimitive.IndicatorGroup
      data-slot="carousel-indicator-group"
      class={clsx(styles.indicatorGroup, local.class)}
      {...others}
    />
  );
}

function CarouselIndicator(props: ComponentProps<typeof CarouselPrimitive.Indicator>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <CarouselPrimitive.Indicator
      data-slot="carousel-indicator"
      class={clsx(styles.indicator, local.class)}
      {...others}
    />
  );
}

type CarouselIndicatorsProps = ComponentProps<typeof CarouselPrimitive.IndicatorGroup> & {
  indicatorClassName?: string;
};

function CarouselIndicators(props: CarouselIndicatorsProps) {
  const [local, others] = splitProps(props, ['class', 'children', 'indicatorClassName']);

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
      data-slot="carousel-autoplay-trigger"
      class={clsx(styles.autoplayTrigger, local.class)}
      {...others}
    />
  );
}

function CarouselAutoplayIndicator(
  props: ComponentProps<typeof CarouselPrimitive.AutoplayIndicator>,
) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <CarouselPrimitive.AutoplayIndicator
      data-slot="carousel-autoplay-indicator"
      class={clsx(styles.autoplayIndicator, local.class)}
      {...others}
    />
  );
}

function CarouselProgressText(props: ComponentProps<typeof CarouselPrimitive.ProgressText>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <CarouselPrimitive.ProgressText
      data-slot="carousel-progress-text"
      class={clsx(styles.progressText, local.class)}
      {...others}
    />
  );
}

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