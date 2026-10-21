import {
  ScrollArea as ScrollAreaPrimitive,
  useScrollArea,
  useScrollAreaContext,
} from '@ark-ui/solid/scroll-area';
import { clsx } from 'clsx';
import type { ComponentProps } from 'solid-js';
import { splitProps } from 'solid-js';
import styles from './ScrollArea.module.css';

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
      class={clsx(styles.root, local.class)}
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
      class={clsx(styles.root, local.class)}
    />
  );
}

function ScrollAreaViewport(props: ComponentProps<typeof ScrollAreaPrimitive.Viewport>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ScrollAreaPrimitive.Viewport
      {...others}
      data-slot="scroll-area-viewport"
      class={clsx(styles.viewport, local.class)}
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
      class={clsx(styles.scrollbar, local.class)}
    />
  );
}

function ScrollAreaThumb(props: ComponentProps<typeof ScrollAreaPrimitive.Thumb>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ScrollAreaPrimitive.Thumb
      {...others}
      data-slot="scroll-area-thumb"
      class={clsx(styles.thumb, local.class)}
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