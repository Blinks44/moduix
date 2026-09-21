'use client';

import { Dialog as DialogPrimitive, useDialog, useDialogContext } from '@ark-ui/react/dialog';
import { ark, type HTMLArkProps } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef, RefObject } from 'react';
import { forwardRef, useEffect } from 'react';
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
  selector: string;
  rootRef?: RefObject<HTMLElement | null>;
  rootSelector?: string;
};

function preloadImage(src?: string) {
  if (!src || typeof Image === 'undefined') {
    return;
  }

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
>(function LightboxCloseTrigger({ className, ...props }, ref) {
  return (
    <DialogPrimitive.CloseTrigger
      ref={ref}
      className={className}
      {...props}
      data-slot="lightbox-close-trigger"
    />
  );
});

const LightboxCloseIcon = forwardRef<
  ComponentRef<typeof CloseButton>,
  Omit<ComponentProps<typeof DialogPrimitive.CloseTrigger>, 'asChild'>
>(function LightboxCloseIcon(
  { className, children, 'aria-label': ariaLabel = DEFAULT_CLOSE_LABEL, ...props },
  ref,
) {
  const dialog = useDialogContext();

  return (
    <DialogPrimitive.CloseTrigger asChild {...props}>
      <CloseButton
        ref={ref}
        data-slot="lightbox-close-icon"
        data-state={dialog.open ? 'open' : 'closed'}
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

function LightboxBind({ onImageSelect, selector, rootRef, rootSelector }: LightboxBindProps) {
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
  useDialog as useLightbox,
  useDialogContext as useLightboxContext,
};
export type { LightboxBindProps, LightboxImageSelectDetails };