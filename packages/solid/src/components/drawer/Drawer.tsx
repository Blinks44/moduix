import {
  Drawer as DrawerPrimitive,
  useDrawer,
  useDrawerContext,
  useDrawerStackContext,
} from '@ark-ui/solid/drawer';
import { ark, type HTMLArkProps } from '@ark-ui/solid/factory';
import { clsx } from 'clsx';
import type { ComponentProps } from 'solid-js';
import { children as resolveChildren, createContext, splitProps, useContext } from 'solid-js';
import {
  OverlayPortal,
  OverlayPortalProvider,
  type OverlayPortalProps,
} from '@/lib/moduix/overlayPortal';
import { CloseButton } from '../close-button';
import styles from './Drawer.module.css';

const DEFAULT_CLOSE_BUTTON_LABEL = 'Close drawer';
type DrawerVariant = 'island';
const DrawerVariantContext = createContext<DrawerVariant>();

type DrawerRootProps = ComponentProps<typeof DrawerPrimitive.Root> &
  OverlayPortalProps & { variant?: DrawerVariant };
type DrawerRootProviderProps = ComponentProps<typeof DrawerPrimitive.RootProvider> &
  OverlayPortalProps;
type DrawerContentProps = ComponentProps<typeof DrawerPrimitive.Content> & {
  variant?: 'island';
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
    'variant',
    'swipeDirection',
    'snapPoints',
    'defaultSnapPoint',
  ]);

  return (
    <OverlayPortalProvider portalled={local.portalled} portalRef={local.portalRef}>
      <DrawerVariantContext.Provider value={local.variant}>
        <DrawerPrimitive.Root
          lazyMount={local.lazyMount ?? true}
          unmountOnExit={local.unmountOnExit ?? true}
          swipeDirection={local.swipeDirection}
          snapPoints={local.snapPoints ?? (local.variant === 'island' ? [1] : undefined)}
          defaultSnapPoint={
            local.defaultSnapPoint !== undefined
              ? local.defaultSnapPoint
              : local.variant === 'island'
                ? 1
                : undefined
          }
          {...others}
        >
          {local.children}
        </DrawerPrimitive.Root>
      </DrawerVariantContext.Provider>
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
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <DrawerPrimitive.Trigger
      asChild={local.asChild}
      class={clsx(!local.asChild && styles.trigger, local.class)}
      {...others}
      data-slot="drawer-trigger"
    />
  );
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
  const [local, others] = splitProps(props, ['class', 'draggable', 'variant']);
  const rootVariant = useContext(DrawerVariantContext);

  return (
    <DrawerPrimitive.Content
      class={clsx(styles.content, local.class)}
      draggable={local.draggable ?? true}
      {...others}
      data-variant={local.variant ?? rootVariant}
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
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <DrawerPrimitive.CloseTrigger
      asChild={local.asChild}
      class={clsx(!local.asChild && styles.closeTrigger, local.class)}
      {...others}
      data-slot="drawer-close-trigger"
    />
  );
}

function DrawerCloseIcon(props: DrawerCloseIconProps) {
  const [local, others] = splitProps(props, ['aria-label', 'aria-labelledby', 'children', 'class']);
  const resolvedChildren = resolveChildren(() => local.children);

  return (
    <DrawerPrimitive.CloseTrigger
      asChild={(triggerProps) => (
        <CloseButton
          {...triggerProps()}
          data-slot="drawer-close-icon"
          aria-label={
            local['aria-label'] ??
            (local['aria-labelledby'] == null ? DEFAULT_CLOSE_BUTTON_LABEL : undefined)
          }
          aria-labelledby={local['aria-labelledby']}
          class={clsx(styles.closeIcon, local.class)}
        >
          {resolvedChildren()}
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