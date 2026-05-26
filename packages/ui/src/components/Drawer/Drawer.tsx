import { Drawer as DrawerPrimitive } from '@base-ui/react/drawer';
import { clsx } from 'clsx';
import * as React from 'react';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Drawer.module.css';

const DrawerModalContext = React.createContext<DrawerPrimitive.Root.Props['modal']>(true);

function useMountReady(disableInitialAnimation: boolean) {
  const [mountReady, setMountReady] = React.useState(!disableInitialAnimation);

  React.useEffect(() => {
    if (!disableInitialAnimation) {
      setMountReady(true);
      return;
    }

    setMountReady(false);
    let frame = window.requestAnimationFrame(() => {
      setMountReady(true);
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [disableInitialAnimation]);

  return mountReady;
}

function Drawer<Payload = unknown>({
  modal = true,
  ...props
}: DrawerPrimitive.Root.Props<Payload>) {
  return (
    <DrawerModalContext.Provider value={modal}>
      <DrawerPrimitive.Root modal={modal} {...props} />
    </DrawerModalContext.Provider>
  );
}

const DrawerProvider = DrawerPrimitive.Provider;
const createDrawerHandle = DrawerPrimitive.createHandle;

function DrawerIndent({ className, ...props }: DrawerPrimitive.Indent.Props) {
  return (
    <DrawerPrimitive.Indent
      data-slot="drawer-indent"
      className={mergeClassName(className, styles.indent)}
      {...props}
    />
  );
}

function DrawerIndentBackground({ className, ...props }: DrawerPrimitive.IndentBackground.Props) {
  return (
    <DrawerPrimitive.IndentBackground
      data-slot="drawer-indent-background"
      className={mergeClassName(className, styles.indentBackground)}
      {...props}
    />
  );
}

function DrawerTrigger({ className, render, ...props }: DrawerPrimitive.Trigger.Props) {
  return (
    <DrawerPrimitive.Trigger
      data-slot="drawer-trigger"
      render={render}
      className={render ? className : mergeClassName(className, styles.trigger)}
      {...props}
    />
  );
}

function DrawerSwipeArea({ className, ...props }: DrawerPrimitive.SwipeArea.Props) {
  return (
    <DrawerPrimitive.SwipeArea
      data-slot="drawer-swipe-area"
      className={mergeClassName(className, styles.swipeArea)}
      {...props}
    />
  );
}

function DrawerPortal({ className, ...props }: DrawerPrimitive.Portal.Props) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" className={className} {...props} />;
}

function DrawerBackdrop({ className, ...props }: DrawerPrimitive.Backdrop.Props) {
  return (
    <DrawerPrimitive.Backdrop
      data-slot="drawer-backdrop"
      className={mergeClassName(className, styles.backdrop)}
      {...props}
    />
  );
}

function DrawerViewport({ className, ...props }: DrawerPrimitive.Viewport.Props) {
  return (
    <DrawerPrimitive.Viewport
      data-slot="drawer-viewport"
      className={mergeClassName(className, styles.viewport)}
      {...props}
    />
  );
}

function DrawerPopup({ className, ...props }: DrawerPrimitive.Popup.Props) {
  return (
    <DrawerPrimitive.Popup
      data-slot="drawer-popup"
      className={mergeClassName(className, styles.popup)}
      {...props}
    />
  );
}

function DrawerHandle({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="drawer-handle" className={clsx(styles.handle, className)} {...props} />;
}

function DrawerContentInner({ className, ...props }: DrawerPrimitive.Content.Props) {
  return (
    <DrawerPrimitive.Content
      data-slot="drawer-content"
      className={mergeClassName(className, styles.content)}
      {...props}
    />
  );
}

function DrawerTitle({ className, ...props }: DrawerPrimitive.Title.Props) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={mergeClassName(className, styles.title)}
      {...props}
    />
  );
}

function DrawerDescription({ className, ...props }: DrawerPrimitive.Description.Props) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={mergeClassName(className, styles.description)}
      {...props}
    />
  );
}

function DrawerClose({ className, ...props }: DrawerPrimitive.Close.Props) {
  return (
    <DrawerPrimitive.Close
      data-slot="drawer-close"
      className={mergeClassName(className, styles.close)}
      {...props}
    />
  );
}

function DrawerHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="drawer-header" className={clsx(styles.header, className)} {...props} />;
}

function DrawerBody({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="drawer-body" className={clsx(styles.body, className)} {...props} />;
}

function DrawerFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="drawer-footer" className={clsx(styles.footer, className)} {...props} />;
}

function DrawerContent({
  snapLayout = false,
  disableInitialAnimation = false,
  className,
  children,
  ...props
}: DrawerPrimitive.Popup.Props & {
  snapLayout?: boolean;
  disableInitialAnimation?: boolean;
}) {
  const modal = React.useContext(DrawerModalContext);
  const mountReady = useMountReady(disableInitialAnimation);

  return (
    <DrawerPortal>
      {modal === true ? <DrawerBackdrop /> : null}
      <DrawerViewport className={modal === true ? undefined : styles.viewportNonModal}>
        <DrawerPopup
          data-snap-layout={snapLayout ? '' : undefined}
          data-disable-initial-animation={disableInitialAnimation ? 'true' : undefined}
          data-mount-ready={mountReady ? 'true' : 'false'}
          className={className}
          {...props}
        >
          <DrawerHandle />
          <DrawerContentInner>{children}</DrawerContentInner>
        </DrawerPopup>
      </DrawerViewport>
    </DrawerPortal>
  );
}

export {
  Drawer,
  DrawerProvider,
  createDrawerHandle,
  DrawerIndent,
  DrawerIndentBackground,
  DrawerTrigger,
  DrawerSwipeArea,
  DrawerPortal,
  DrawerBackdrop,
  DrawerViewport,
  DrawerPopup,
  DrawerHandle,
  DrawerContentInner,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerContent,
};