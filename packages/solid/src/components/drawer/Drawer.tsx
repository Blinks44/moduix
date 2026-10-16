import {
  Drawer as DrawerPrimitive,
  useDrawer,
  useDrawerContext,
  useDrawerStackContext,
} from '@ark-ui/solid/drawer';
import { ark, type HTMLArkProps } from '@ark-ui/solid/factory';
import { clsx } from 'clsx';
import type { ComponentProps } from 'solid-js';
import { splitProps } from 'solid-js';
import { a11yLabels } from '@/lib/moduix/a11yLabels';
import {
  OverlayPortal,
  OverlayPortalProvider,
  type OverlayPortalProps,
} from '@/lib/moduix/overlayPortal';
import { CloseButton } from '../close-button';
import styles from './Drawer.module.css';

type DrawerVariant = 'island';
type DrawerSize = 'sm' | 'md' | 'lg' | 'xl';
type DrawerRootProps = ComponentProps<typeof DrawerPrimitive.Root> & OverlayPortalProps;
type DrawerRootProviderProps = ComponentProps<typeof DrawerPrimitive.RootProvider> &
  OverlayPortalProps;
type DrawerContentProps = ComponentProps<typeof DrawerPrimitive.Content> & {
  /** Width preset for `start` and `end` drawers: 18rem, 22rem, 28rem, or 36rem. */
  size?: DrawerSize;
  /** `island` insets the surface from the viewport edges and rounds every corner. */
  variant?: DrawerVariant;
};
type DrawerCloseIconProps = Omit<ComponentProps<typeof DrawerPrimitive.CloseTrigger>, 'asChild'>;

const DrawerStack = DrawerPrimitive.Stack;

function Drawer(props: DrawerRootProps) {
  const [local, others] = splitProps(props, [
    'children',
    'lazyMount',
    'portalled',
    'portalRef',
    'unmountOnExit',
  ]);

  return (
    <OverlayPortalProvider portalled={local.portalled} portalRef={local.portalRef}>
      <DrawerPrimitive.Root
        lazyMount={local.lazyMount ?? true}
        unmountOnExit={local.unmountOnExit ?? true}
        {...others}
      >
        {local.children}
      </DrawerPrimitive.Root>
    </OverlayPortalProvider>
  );
}

function DrawerRootProvider(props: DrawerRootProviderProps) {
  const [local, others] = splitProps(props, [
    'children',
    'lazyMount',
    'portalled',
    'portalRef',
    'unmountOnExit',
  ]);

  return (
    <OverlayPortalProvider portalled={local.portalled} portalRef={local.portalRef}>
      <DrawerPrimitive.RootProvider
        lazyMount={local.lazyMount ?? true}
        unmountOnExit={local.unmountOnExit ?? true}
        {...others}
      >
        {local.children}
      </DrawerPrimitive.RootProvider>
    </OverlayPortalProvider>
  );
}

function DrawerTrigger(props: ComponentProps<typeof DrawerPrimitive.Trigger>) {
  return <DrawerPrimitive.Trigger {...props} data-slot="drawer-trigger" />;
}

function DrawerBackdrop(props: ComponentProps<typeof DrawerPrimitive.Backdrop>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <OverlayPortal>
      <DrawerPrimitive.Backdrop
        class={clsx(styles.backdrop, local.class)}
        {...others}
        data-slot="drawer-backdrop"
      />
    </OverlayPortal>
  );
}

function DrawerPositioner(props: ComponentProps<typeof DrawerPrimitive.Positioner>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <OverlayPortal>
      <DrawerPrimitive.Positioner
        class={clsx(styles.positioner, local.class)}
        {...others}
        data-slot="drawer-positioner"
      />
    </OverlayPortal>
  );
}

function DrawerContent(props: DrawerContentProps) {
  const [local, others] = splitProps(props, ['class', 'draggable', 'size', 'variant']);

  return (
    <DrawerPrimitive.Content
      class={clsx(styles.content, local.class)}
      draggable={local.draggable ?? true}
      {...others}
      data-size={local.size ?? 'md'}
      data-variant={local.variant}
      data-slot="drawer-content"
    />
  );
}

function DrawerGrabber(props: ComponentProps<typeof DrawerPrimitive.Grabber>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DrawerPrimitive.Grabber
      class={clsx(styles.grabber, local.class)}
      {...others}
      data-slot="drawer-grabber"
    />
  );
}

function DrawerGrabberIndicator(props: ComponentProps<typeof DrawerPrimitive.GrabberIndicator>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DrawerPrimitive.GrabberIndicator
      class={clsx(styles.grabberIndicator, local.class)}
      {...others}
      data-slot="drawer-grabber-indicator"
    />
  );
}

function DrawerTitle(props: ComponentProps<typeof DrawerPrimitive.Title>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DrawerPrimitive.Title
      class={clsx(styles.title, local.class)}
      {...others}
      data-slot="drawer-title"
    />
  );
}

function DrawerDescription(props: ComponentProps<typeof DrawerPrimitive.Description>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DrawerPrimitive.Description
      class={clsx(styles.description, local.class)}
      {...others}
      data-slot="drawer-description"
    />
  );
}

function DrawerCloseTrigger(props: ComponentProps<typeof DrawerPrimitive.CloseTrigger>) {
  return <DrawerPrimitive.CloseTrigger {...props} data-slot="drawer-close-trigger" />;
}

function DrawerCloseIcon(props: DrawerCloseIconProps) {
  const [local, others] = splitProps(props, ['aria-label', 'children', 'class']);

  return (
    <DrawerPrimitive.CloseTrigger
      asChild={(triggerProps) => (
        <CloseButton
          {...triggerProps()}
          data-slot="drawer-close-icon"
          aria-label={local['aria-label'] ?? a11yLabels.closeDrawer}
          class={clsx(styles.closeIcon, local.class)}
        >
          {local.children}
        </CloseButton>
      )}
      {...others}
    />
  );
}

function DrawerSwipeArea(props: ComponentProps<typeof DrawerPrimitive.SwipeArea>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DrawerPrimitive.SwipeArea
      class={clsx(styles.swipeArea, local.class)}
      {...others}
      data-slot="drawer-swipe-area"
    />
  );
}

function DrawerIndent(props: ComponentProps<typeof DrawerPrimitive.Indent>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DrawerPrimitive.Indent
      class={clsx(styles.indent, local.class)}
      {...others}
      data-slot="drawer-indent"
    />
  );
}

function DrawerIndentBackground(props: ComponentProps<typeof DrawerPrimitive.IndentBackground>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DrawerPrimitive.IndentBackground
      class={clsx(styles.indentBackground, local.class)}
      {...others}
      data-slot="drawer-indent-background"
    />
  );
}

function DrawerHeader(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return <ark.div class={clsx(styles.header, local.class)} {...others} data-slot="drawer-header" />;
}

function DrawerBody(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return <ark.div class={clsx(styles.body, local.class)} {...others} data-slot="drawer-body" />;
}

function DrawerFooter(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return <ark.div class={clsx(styles.footer, local.class)} {...others} data-slot="drawer-footer" />;
}

const DrawerContext = DrawerPrimitive.Context;

export {
  Drawer,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseIcon,
  DrawerCloseTrigger,
  DrawerContext,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerGrabber,
  DrawerGrabberIndicator,
  DrawerHeader,
  DrawerIndent,
  DrawerIndentBackground,
  DrawerPositioner,
  DrawerRootProvider,
  DrawerStack,
  DrawerSwipeArea,
  DrawerTitle,
  DrawerTrigger,
  useDrawer,
  useDrawerContext,
  useDrawerStackContext,
};
export type {
  DrawerContentProps,
  DrawerRootProps,
  DrawerRootProviderProps,
  DrawerSize,
  DrawerVariant,
};