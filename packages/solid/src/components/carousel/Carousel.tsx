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

function Carousel(props: ComponentProps<typeof CarouselPrimitive.Root>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <CarouselPrimitive.Root
      class={clsx(styles.root, local.class)}
      {...others}
      data-slot="carousel-root"
    />
  );
}

function CarouselRootProvider(props: ComponentProps<typeof CarouselPrimitive.RootProvider>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <CarouselPrimitive.RootProvider
      class={clsx(styles.root, local.class)}
      {...others}
      data-slot="carousel-root-provider"
    />
  );
}

function CarouselControl(props: ComponentProps<typeof CarouselPrimitive.Control>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <CarouselPrimitive.Control
      class={clsx(styles.control, local.class)}
      {...others}
      data-slot="carousel-control"
    />
  );
}

function CarouselItemGroup(props: ComponentProps<typeof CarouselPrimitive.ItemGroup>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <CarouselPrimitive.ItemGroup
      class={clsx(styles.itemGroup, local.class)}
      {...others}
      data-slot="carousel-item-group"
    />
  );
}

function CarouselItem(props: ComponentProps<typeof CarouselPrimitive.Item>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <CarouselPrimitive.Item
      class={clsx(styles.item, local.class)}
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
      class={clsx(styles.prevTrigger, local.class)}
      {...others}
      data-slot="carousel-prev-trigger"
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
      class={clsx(styles.nextTrigger, local.class)}
      {...others}
      data-slot="carousel-next-trigger"
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
      class={clsx(styles.indicatorGroup, local.class)}
      {...others}
      data-slot="carousel-indicator-group"
    />
  );
}

function CarouselIndicator(props: ComponentProps<typeof CarouselPrimitive.Indicator>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <CarouselPrimitive.Indicator
      class={clsx(styles.indicator, local.class)}
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
      class={clsx(styles.autoplayTrigger, local.class)}
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
      class={clsx(styles.autoplayIndicator, local.class)}
      {...others}
      data-slot="carousel-autoplay-indicator"
    />
  );
}

function CarouselProgressText(props: ComponentProps<typeof CarouselPrimitive.ProgressText>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <CarouselPrimitive.ProgressText
      class={clsx(styles.progressText, local.class)}
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