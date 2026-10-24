'use client';

import { Dialog as DialogPrimitive, useDialog, useDialogContext } from '@ark-ui/react/dialog';
import { ark, type HTMLArkProps } from '@ark-ui/react/factory';
import type { ComponentProps, ComponentRef, RefObject } from 'react';
import { forwardRef, useEffect } from 'react';
import { a11yLabels } from '@/lib/moduix/a11yLabels';
import { cn } from '@/lib/moduix/cn';
import {
  OverlayPortal,
  OverlayPortalProvider,
  type OverlayPortalProps,
} from '@/lib/moduix/overlayPortal';
import { CloseButton } from '../close-button';

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
      className={cn(
        'cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
        className,
      )}
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
        className={cn(
          'fixed inset-0 z-[calc(var(--z-index,var(--moduix-z-popup))-1)] bg-overlay backdrop-blur-[4px] data-[state=closed]:animate-moduix-dialog-backdrop-out data-[state=open]:animate-moduix-dialog-backdrop-in motion-reduce:data-[state]:animate-none',
          className,
        )}
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
        className={cn(
          'fixed inset-0 z-[var(--z-index,var(--moduix-z-popup))] box-border grid place-items-center overflow-auto overscroll-contain p-4',
          className,
        )}
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
      className={cn(
        'group/lightbox relative z-[calc(var(--moduix-z-popup)+var(--layer-index,0))] box-border grid max-h-[min(80dvh,calc(100dvh-2rem))] w-fit max-w-[min(80vw,calc(100vw-2rem))] gap-3 outline-0 data-[state=closed]:animate-moduix-lightbox-content-out data-[state=open]:animate-moduix-lightbox-content-in motion-reduce:data-[state]:animate-none',
        className,
      )}
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
      className={cn('m-0 text-md leading-6 font-semibold text-foreground', className)}
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
      className={cn('m-0 text-sm leading-5 text-muted-foreground', className)}
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
        className={cn(
          'fixed end-4 top-4 z-[calc(var(--moduix-z-popup)+var(--layer-index,0)+1)] size-8 bg-background text-foreground',
          className,
        )}
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
    // oxlint-disable-next-line jsx-a11y/alt-text, jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions -- `alt` arrives through props; click-to-close is a pointer shortcut for the Escape-dismissible dialog.
    <img
      ref={ref}
      className={cn(
        'block max-h-[min(80dvh,100%)] max-w-[min(80vw,100%)] rounded-md object-contain shadow-lg select-none data-[close-on-click]:cursor-zoom-out',
        className,
      )}
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
        className={cn(
          'max-w-[min(72rem,calc(100vw-2rem))] justify-self-center [&_[data-slot=carousel-control]]:items-center [&_[data-slot=carousel-indicator-group]]:mx-auto [&_[data-slot=carousel-indicator-group]]:w-fit [&_[data-slot=carousel-indicator-group]]:max-w-full [&_[data-slot=carousel-indicator-group]]:flex-wrap [&_[data-slot=carousel-indicator]:has(img)]:h-control-xl [&_[data-slot=carousel-indicator]:has(img)]:w-20 [&_[data-slot=carousel-indicator]:has(img)]:overflow-hidden [&_[data-slot=carousel-indicator]:has(img)]:rounded-md [&_[data-slot=carousel-indicator]:has(img)]:border [&_[data-slot=carousel-indicator]:has(img)]:border-transparent [&_[data-slot=carousel-indicator]:has(img)]:bg-transparent [&_[data-slot=carousel-indicator]:has(img)]:opacity-[0.65] [&_[data-slot=carousel-indicator]:has(img)]:transition [&_[data-slot=carousel-indicator]:has(img)]:duration-fast [&_[data-slot=carousel-indicator]:has(img)]:ease-in-out [&_[data-slot=carousel-indicator]:has(img)_img]:block [&_[data-slot=carousel-indicator]:has(img)_img]:size-full [&_[data-slot=carousel-indicator]:has(img)_img]:object-cover [&_[data-slot=carousel-indicator]:has(img)[data-current]]:-translate-y-px [&_[data-slot=carousel-indicator]:has(img)[data-current]]:border-primary [&_[data-slot=carousel-indicator]:has(img)[data-current]]:opacity-100 [&_[data-slot=carousel-item-group]]:aspect-[16/10] [&_[data-slot=carousel-item-group]]:max-h-[68dvh] [&_[data-slot=carousel-item-group]]:bg-black/90 [&_[data-slot=carousel-item]]:grid [&_[data-slot=carousel-item]]:h-full [&_[data-slot=carousel-item]]:place-items-center [&_[data-slot=carousel-item]_img]:block [&_[data-slot=carousel-item]_img]:size-full [&_[data-slot=carousel-item]_img]:rounded-md [&_[data-slot=carousel-item]_img]:object-contain [&_[data-slot=carousel-item]_img]:select-none [&_[data-slot=carousel-item]_video]:block [&_[data-slot=carousel-item]_video]:size-full [&_[data-slot=carousel-item]_video]:rounded-md [&_[data-slot=carousel-item]_video]:object-contain [&_[data-slot=carousel-item]_video]:select-none [@media(hover:hover)]:[&_[data-slot=carousel-indicator]:has(img):hover]:opacity-90',
          className,
        )}
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
        className={cn('grid gap-1', className)}
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
        className={cn(
          'grid gap-3 group-data-[state]/lightbox:[animation:inherit] group-data-[state=closed]/lightbox:[animation-name:moduix-lightbox-body-out] group-data-[state=open]/lightbox:[animation-name:moduix-lightbox-body-in]',
          className,
        )}
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
        className={cn(
          'flex items-center justify-end gap-2 text-sm leading-5 text-muted-foreground',
          className,
        )}
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