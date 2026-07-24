'use client';

import { Dialog as DialogPrimitive, useDialog, useDialogContext } from '@ark-ui/react/dialog';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef, RefObject } from 'react';
import { forwardRef, useEffect } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import {
  OverlayPortal,
  OverlayPortalProvider,
  type OverlayPortalProps,
} from '@/lib/moduix/overlayPortal';
import { CloseButton } from '../close-button';
import styles from './Lightbox.module.css';

const DEFAULT_CLOSE_LABEL = 'Close image';

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
  selector?: string;
  rootRef?: RefObject<HTMLElement | null>;
  rootSelector?: string;
};

const preloadedImageSources = new Set<string>();

function preloadImage(src?: string) {
  if (!src || typeof Image === 'undefined' || preloadedImageSources.has(src)) {
    return;
  }

  preloadedImageSources.add(src);
  const image = new Image();
  image.src = src;
}

function resolveImage(
  target: EventTarget | null,
  selector: string,
  rootNode: HTMLElement,
): LightboxImageSelectDetails | null {
  if (!(target instanceof Element)) {
    return null;
  }

  const matchedNode = target.closest(selector);
  if (!matchedNode || !rootNode.contains(matchedNode)) {
    return null;
  }

  const imageNode =
    matchedNode instanceof HTMLImageElement ? matchedNode : matchedNode.querySelector('img');
  if (!(imageNode instanceof HTMLImageElement)) {
    return null;
  }

  const src = imageNode.dataset.lightboxSrc ?? imageNode.currentSrc ?? imageNode.src;
  if (!src) {
    return null;
  }

  return {
    src,
    alt: imageNode.alt || undefined,
    element: imageNode,
  };
}

function LightboxRoot({ portalled, portalRef, ...props }: LightboxRootProps) {
  return (
    <OverlayPortalProvider portalled={portalled} portalRef={portalRef}>
      <DialogPrimitive.Root {...props} />
    </OverlayPortalProvider>
  );
}

function LightboxRootProvider({ portalled, portalRef, ...props }: LightboxRootProviderProps) {
  return (
    <OverlayPortalProvider portalled={portalled} portalRef={portalRef}>
      <DialogPrimitive.RootProvider {...props} />
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
      data-slot="lightbox-trigger"
      className={clsx(styles.trigger, normalizeClassName(className))}
      {...props}
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
        data-slot="lightbox-backdrop"
        className={clsx(styles.backdrop, normalizeClassName(className))}
        {...props}
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
        data-slot="lightbox-positioner"
        className={clsx(styles.positioner, normalizeClassName(className))}
        {...props}
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
      data-slot="lightbox-content"
      className={clsx(styles.content, normalizeClassName(className))}
      {...props}
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
      data-slot="lightbox-title"
      className={clsx(styles.title, normalizeClassName(className))}
      {...props}
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
      data-slot="lightbox-description"
      className={clsx(styles.description, normalizeClassName(className))}
      {...props}
    />
  );
});

const LightboxCloseTrigger = forwardRef<
  ComponentRef<typeof DialogPrimitive.CloseTrigger>,
  ComponentProps<typeof DialogPrimitive.CloseTrigger>
>(function LightboxCloseTrigger({ className, ...props }, ref) {
  return (
    <DialogPrimitive.CloseTrigger
      ref={ref}
      data-slot="lightbox-close-trigger"
      className={normalizeClassName(className)}
      {...props}
    />
  );
});

const LightboxCloseIcon = forwardRef<
  ComponentRef<typeof CloseButton.Root>,
  Omit<ComponentProps<typeof DialogPrimitive.CloseTrigger>, 'asChild'>
>(function LightboxCloseIcon(
  { className, children, 'aria-label': ariaLabel = DEFAULT_CLOSE_LABEL, ...props },
  ref,
) {
  const dialog = useDialogContext();

  return (
    <DialogPrimitive.CloseTrigger asChild {...props}>
      <CloseButton.Root
        ref={ref}
        data-slot="lightbox-close-icon"
        data-state={dialog.open ? 'open' : 'closed'}
        aria-label={ariaLabel}
        className={clsx(styles.closeIcon, normalizeClassName(className))}
      >
        {children}
      </CloseButton.Root>
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
      data-slot="lightbox-image"
      data-close-on-click={closeOnClick ? '' : undefined}
      className={clsx(styles.image, normalizeClassName(className))}
      onClick={handleClick}
      {...props}
    />
  );
});

const LightboxGallery = forwardRef<HTMLDivElement, ComponentProps<'div'>>(function LightboxGallery(
  { className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="lightbox-gallery"
      className={clsx(styles.gallery, normalizeClassName(className))}
      {...props}
    />
  );
});

function LightboxHeader({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="lightbox-header" className={clsx(styles.header, className)} {...props} />;
}

function LightboxBody({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="lightbox-body" className={clsx(styles.body, className)} {...props} />;
}

function LightboxFooter({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="lightbox-footer" className={clsx(styles.footer, className)} {...props} />;
}

function LightboxBind({
  onImageSelect,
  selector = 'img',
  rootRef,
  rootSelector,
}: LightboxBindProps) {
  const { setOpen } = useDialogContext();

  useEffect(() => {
    const rootNode =
      rootRef?.current ?? (rootSelector ? document.querySelector<HTMLElement>(rootSelector) : null);
    if (!rootNode) {
      return;
    }

    const handleClick = (event: MouseEvent) => {
      const nextImage = resolveImage(event.target, selector, rootNode);
      if (!nextImage) {
        return;
      }

      onImageSelect(nextImage);
      setOpen(true);
    };

    const preloadFromTarget = (target: EventTarget | null) => {
      const nextImage = resolveImage(target, selector, rootNode);
      if (!nextImage) {
        return;
      }

      preloadImage(nextImage.src);
    };

    const handlePointerEnter = (event: PointerEvent) => {
      preloadFromTarget(event.target);
    };

    const handleFocusIn = (event: FocusEvent) => {
      preloadFromTarget(event.target);
    };

    rootNode.addEventListener('click', handleClick);
    rootNode.addEventListener('pointerenter', handlePointerEnter, true);
    rootNode.addEventListener('focusin', handleFocusIn);

    return () => {
      rootNode.removeEventListener('click', handleClick);
      rootNode.removeEventListener('pointerenter', handlePointerEnter, true);
      rootNode.removeEventListener('focusin', handleFocusIn);
    };
  }, [onImageSelect, rootRef, rootSelector, selector, setOpen]);

  return null;
}

const Lightbox = Object.assign(LightboxRoot, {
  Root: LightboxRoot,
  RootProvider: LightboxRootProvider,
  Trigger: LightboxTrigger,
  Backdrop: LightboxBackdrop,
  Positioner: LightboxPositioner,
  Content: LightboxContent,
  Title: LightboxTitle,
  Description: LightboxDescription,
  CloseTrigger: LightboxCloseTrigger,
  CloseIcon: LightboxCloseIcon,
  Header: LightboxHeader,
  Body: LightboxBody,
  Footer: LightboxFooter,
  Image: LightboxImage,
  Gallery: LightboxGallery,
  Bind: LightboxBind,
  useLightbox: useDialog,
  useLightboxContext: useDialogContext,
});

export {
  Lightbox,
  LightboxBind,
  LightboxGallery,
  LightboxImage,
  useDialog as useLightbox,
  useDialogContext as useLightboxContext,
};
export type { LightboxBindProps, LightboxImageSelectDetails };