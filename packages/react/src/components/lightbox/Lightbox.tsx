'use client';

import { Dialog as DialogPrimitive, useDialog, useDialogContext } from '@ark-ui/react/dialog';
import { ark, type HTMLArkProps } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef, RefObject } from 'react';
import { forwardRef, useEffect } from 'react';
import { a11yLabels } from '@/lib/moduix/a11yLabels';
import {
  OverlayPortal,
  OverlayPortalProvider,
  type OverlayPortalProps,
} from '@/lib/moduix/overlayPortal';
import { CloseButton } from '../close-button';
import styles from './Lightbox.module.css';

type LightboxImageSelectDetails = {
  alt?: string;
  element: HTMLImageElement;
  src: string;
};

type LightboxImageProps = ComponentProps<'img'> & {
  closeOnClick?: boolean;
};

type LightboxRootProps = ComponentProps<typeof DialogPrimitive.Root> & OverlayPortalProps;
type LightboxRootProviderProps = ComponentProps<typeof DialogPrimitive.RootProvider> &
  OverlayPortalProps;

type LightboxBindProps = {
  onImageSelect: (details: LightboxImageSelectDetails) => void;
  selector: string;
  rootRef?: RefObject<HTMLElement | null>;
  rootSelector?: string;
};

function resolveImage(
  target: EventTarget | null,
  selector: string,
  rootNode: HTMLElement,
): LightboxImageSelectDetails | null {
  const matchedNode = target instanceof Element ? target.closest(selector) : null;
  if (!matchedNode || !rootNode.contains(matchedNode)) {
    return null;
  }

  const imageNode =
    matchedNode instanceof HTMLImageElement ? matchedNode : matchedNode.querySelector('img');
  if (!imageNode) {
    return null;
  }

  // An explicitly empty data-lightbox-src excludes the image.
  const src = imageNode.dataset.lightboxSrc ?? (imageNode.currentSrc || imageNode.src);
  return src ? { src, alt: imageNode.alt || undefined, element: imageNode } : null;
}

function Lightbox({
  lazyMount = true,
  portalled,
  portalRef,
  unmountOnExit = true,
  ...props
}: LightboxRootProps) {
  return (
    <OverlayPortalProvider portalled={portalled} portalRef={portalRef}>
      <DialogPrimitive.Root lazyMount={lazyMount} unmountOnExit={unmountOnExit} {...props} />
    </OverlayPortalProvider>
  );
}

function LightboxRootProvider({
  lazyMount = true,
  portalled,
  portalRef,
  unmountOnExit = true,
  ...props
}: LightboxRootProviderProps) {
  return (
    <OverlayPortalProvider portalled={portalled} portalRef={portalRef}>
      <DialogPrimitive.RootProvider
        lazyMount={lazyMount}
        unmountOnExit={unmountOnExit}
        {...props}
      />
    </OverlayPortalProvider>
  );
}

const LightboxTrigger = forwardRef<
  ComponentRef<typeof DialogPrimitive.Trigger>,
  ComponentProps<typeof DialogPrimitive.Trigger>
>(function LightboxTrigger({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Trigger
      ref={ref}
      className={clsx(styles.trigger, className)}
      {...props}
      data-slot="lightbox-trigger"
    />
  );
});

const LightboxBackdrop = forwardRef<
  ComponentRef<typeof DialogPrimitive.Backdrop>,
  ComponentProps<typeof DialogPrimitive.Backdrop>
>(function LightboxBackdrop({ className, ...props }, ref) {
  return (
    <OverlayPortal>
      <DialogPrimitive.Backdrop
        ref={ref}
        className={clsx(styles.backdrop, className)}
        {...props}
        data-slot="lightbox-backdrop"
      />
    </OverlayPortal>
  );
});

const LightboxPositioner = forwardRef<
  ComponentRef<typeof DialogPrimitive.Positioner>,
  ComponentProps<typeof DialogPrimitive.Positioner>
>(function LightboxPositioner({ className, ...props }, ref) {
  return (
    <OverlayPortal>
      <DialogPrimitive.Positioner
        ref={ref}
        className={clsx(styles.positioner, className)}
        {...props}
        data-slot="lightbox-positioner"
      />
    </OverlayPortal>
  );
});

const LightboxContent = forwardRef<
  ComponentRef<typeof DialogPrimitive.Content>,
  ComponentProps<typeof DialogPrimitive.Content>
>(function LightboxContent({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Content
      ref={ref}
      className={clsx(styles.content, className)}
      {...props}
      data-slot="lightbox-content"
    />
  );
});

const LightboxTitle = forwardRef<
  ComponentRef<typeof DialogPrimitive.Title>,
  ComponentProps<typeof DialogPrimitive.Title>
>(function LightboxTitle({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Title
      ref={ref}
      className={clsx(styles.title, className)}
      {...props}
      data-slot="lightbox-title"
    />
  );
});

const LightboxDescription = forwardRef<
  ComponentRef<typeof DialogPrimitive.Description>,
  ComponentProps<typeof DialogPrimitive.Description>
>(function LightboxDescription({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Description
      ref={ref}
      className={clsx(styles.description, className)}
      {...props}
      data-slot="lightbox-description"
    />
  );
});

const LightboxCloseTrigger = forwardRef<
  ComponentRef<typeof DialogPrimitive.CloseTrigger>,
  ComponentProps<typeof DialogPrimitive.CloseTrigger>
>(function LightboxCloseTrigger(props, ref) {
  return <DialogPrimitive.CloseTrigger ref={ref} {...props} data-slot="lightbox-close-trigger" />;
});

const LightboxCloseIcon = forwardRef<
  ComponentRef<typeof CloseButton>,
  Omit<ComponentProps<typeof DialogPrimitive.CloseTrigger>, 'asChild'>
>(function LightboxCloseIcon(
  { className, children, 'aria-label': ariaLabel = a11yLabels.closeImage, ...props },
  ref,
) {
  return (
    <DialogPrimitive.CloseTrigger asChild {...props}>
      <CloseButton
        ref={ref}
        data-slot="lightbox-close-icon"
        aria-label={ariaLabel}
        className={clsx(styles.closeIcon, className)}
      >
        {children}
      </CloseButton>
    </DialogPrimitive.CloseTrigger>
  );
});

const LightboxImage = forwardRef<HTMLImageElement, LightboxImageProps>(function LightboxImage(
  { className, closeOnClick = false, onClick, ...props },
  ref,
) {
  const dialog = useDialogContext();

  const handleClick: ComponentProps<'img'>['onClick'] = (event) => {
    onClick?.(event);

    if (closeOnClick && !event.defaultPrevented) {
      dialog.setOpen(false);
    }
  };

  return (
    <img
      ref={ref}
      className={clsx(styles.image, className)}
      onClick={handleClick}
      {...props}
      data-close-on-click={closeOnClick ? '' : undefined}
      data-slot="lightbox-image"
    />
  );
});

const LightboxGallery = forwardRef<ComponentRef<typeof ark.div>, HTMLArkProps<'div'>>(
  function LightboxGallery({ className, ...props }, ref) {
    return (
      <ark.div
        ref={ref}
        className={clsx(styles.gallery, className)}
        {...props}
        data-slot="lightbox-gallery"
      />
    );
  },
);

const LightboxHeader = forwardRef<ComponentRef<typeof ark.div>, HTMLArkProps<'div'>>(
  function LightboxHeader({ className, ...props }, ref) {
    return (
      <ark.div
        ref={ref}
        className={clsx(styles.header, className)}
        {...props}
        data-slot="lightbox-header"
      />
    );
  },
);

const LightboxBody = forwardRef<ComponentRef<typeof ark.div>, HTMLArkProps<'div'>>(
  function LightboxBody({ className, ...props }, ref) {
    return (
      <ark.div
        ref={ref}
        className={clsx(styles.body, className)}
        {...props}
        data-slot="lightbox-body"
      />
    );
  },
);

const LightboxFooter = forwardRef<ComponentRef<typeof ark.div>, HTMLArkProps<'div'>>(
  function LightboxFooter({ className, ...props }, ref) {
    return (
      <ark.div
        ref={ref}
        className={clsx(styles.footer, className)}
        {...props}
        data-slot="lightbox-footer"
      />
    );
  },
);

const LightboxContext = DialogPrimitive.Context;

function LightboxBind({ onImageSelect, selector, rootRef, rootSelector }: LightboxBindProps) {
  const { setOpen } = useDialogContext();

  useEffect(() => {
    const rootNode =
      rootRef?.current ?? (rootSelector ? document.querySelector<HTMLElement>(rootSelector) : null);
    if (!rootNode) {
      return;
    }

    const handleClick = (event: MouseEvent) => {
      const image = event.defaultPrevented ? null : resolveImage(event.target, selector, rootNode);
      if (!image) {
        return;
      }

      onImageSelect(image);
      setOpen(true);
    };

    // Warm the cache with the full-size source on hover or keyboard focus.
    const handlePreload = (event: Event) => {
      const image = resolveImage(event.target, selector, rootNode);
      if (image) {
        const preloaded = new Image();
        preloaded.src = image.src;
      }
    };

    rootNode.addEventListener('click', handleClick);
    // pointerenter does not bubble; the capture phase sees it for every descendant.
    rootNode.addEventListener('pointerenter', handlePreload, true);
    rootNode.addEventListener('focusin', handlePreload);

    return () => {
      rootNode.removeEventListener('click', handleClick);
      rootNode.removeEventListener('pointerenter', handlePreload, true);
      rootNode.removeEventListener('focusin', handlePreload);
    };
  }, [onImageSelect, rootRef, rootSelector, selector, setOpen]);

  return null;
}

export {
  Lightbox,
  LightboxRootProvider,
  LightboxTrigger,
  LightboxBackdrop,
  LightboxPositioner,
  LightboxContent,
  LightboxTitle,
  LightboxDescription,
  LightboxCloseTrigger,
  LightboxCloseIcon,
  LightboxHeader,
  LightboxBody,
  LightboxFooter,
  LightboxImage,
  LightboxGallery,
  LightboxBind,
  LightboxContext,
  useDialog as useLightbox,
  useDialogContext as useLightboxContext,
};
export type {
  LightboxBindProps,
  LightboxImageProps,
  LightboxImageSelectDetails,
  LightboxRootProps,
  LightboxRootProviderProps,
};