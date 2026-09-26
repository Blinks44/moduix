'use client';

import { Dialog as DialogPrimitive, useDialog, useDialogContext } from '@ark-ui/react/dialog';
import { ark, type HTMLArkProps } from '@ark-ui/react/factory';
import type { ComponentProps, ComponentRef, RefObject } from 'react';
import { forwardRef, useEffect } from 'react';
import { cn } from '@/lib/moduix/cn';
import {
  OverlayPortal,
  OverlayPortalProvider,
  type OverlayPortalProps,
} from '@/lib/moduix/overlayPortal';
import { CloseButton } from '../close-button';

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
          'fixed inset-0 z-[calc(40+var(--layer-index,0))] min-h-dvh bg-overlay backdrop-blur-xs data-[state=closed]:animate-[moduix-fade-out_200ms_ease-in-out_forwards] data-[state=open]:animate-[moduix-fade-in_200ms_ease-in-out] motion-reduce:[animation-delay:0ms] motion-reduce:[animation-duration:1ms]',
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
          'fixed inset-0 z-[calc(50+var(--layer-index,0))] box-border grid place-items-center overflow-auto overscroll-contain p-4',
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
        'relative box-border grid max-h-[min(80dvh,calc(100dvh-2rem))] w-fit max-w-[min(80vw,calc(100vw-2rem))] gap-3 border-0 bg-transparent outline-0 data-[state=closed]:animate-moduix-menu-closed data-[state=open]:animate-moduix-menu-open motion-reduce:[animation-delay:0ms] motion-reduce:[animation-duration:1ms]',
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
        className={cn(
          'pointer-events-none invisible fixed end-4 top-4 z-[calc(51+var(--layer-index,0))] size-8 rounded-sm border-0 bg-background p-0 text-foreground opacity-0 transition-[background-color,color,opacity] duration-200 ease-in-out select-none focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring data-[state=open]:pointer-events-auto data-[state=open]:visible data-[state=open]:opacity-100 motion-reduce:transition-none [&>svg]:size-3.5 [&>svg]:shrink-0 [@media(hover:hover)]:[&:not([data-disabled]):hover]:bg-muted',
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
          '[&_[data-slot=carousel-indicator-group]]:mx-auto',
          'max-w-[min(72rem,calc(100vw-2rem))] justify-self-center [&_[data-slot=carousel-control]]:items-center [&_[data-slot=carousel-indicator-group]]:w-fit [&_[data-slot=carousel-indicator-group]]:max-w-full [&_[data-slot=carousel-indicator-group]]:flex-wrap [&_[data-slot=carousel-indicator]:has(img)]:h-control-xl [&_[data-slot=carousel-indicator]:has(img)]:w-20 [&_[data-slot=carousel-indicator]:has(img)]:overflow-hidden [&_[data-slot=carousel-indicator]:has(img)]:rounded-md [&_[data-slot=carousel-indicator]:has(img)]:border [&_[data-slot=carousel-indicator]:has(img)]:border-transparent [&_[data-slot=carousel-indicator]:has(img)]:bg-transparent [&_[data-slot=carousel-indicator]:has(img)]:opacity-[0.65] [&_[data-slot=carousel-indicator]:has(img)]:transition [&_[data-slot=carousel-indicator]:has(img)]:duration-150 [&_[data-slot=carousel-indicator]:has(img)]:ease-in-out [&_[data-slot=carousel-indicator]:has(img)_img]:block [&_[data-slot=carousel-indicator]:has(img)_img]:size-full [&_[data-slot=carousel-indicator]:has(img)_img]:object-cover [&_[data-slot=carousel-indicator]:has(img):hover]:opacity-90 [&_[data-slot=carousel-indicator]:has(img)[data-current]]:-translate-y-px [&_[data-slot=carousel-indicator]:has(img)[data-current]]:border-primary [&_[data-slot=carousel-indicator]:has(img)[data-current]]:opacity-100 [&_[data-slot=carousel-item-group]]:aspect-[16/10] [&_[data-slot=carousel-item-group]]:max-h-[68dvh] [&_[data-slot=carousel-item-group]]:bg-black/90 [&_[data-slot=carousel-item]]:grid [&_[data-slot=carousel-item]]:h-full [&_[data-slot=carousel-item]]:place-items-center [&_[data-slot=carousel-item]_img]:block [&_[data-slot=carousel-item]_img]:size-full [&_[data-slot=carousel-item]_img]:rounded-md [&_[data-slot=carousel-item]_img]:object-contain [&_[data-slot=carousel-item]_img]:select-none [&_[data-slot=carousel-item]_video]:block [&_[data-slot=carousel-item]_video]:size-full [&_[data-slot=carousel-item]_video]:rounded-md [&_[data-slot=carousel-item]_video]:object-contain [&_[data-slot=carousel-item]_video]:select-none',
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
        className={cn('grid gap-3', className)}
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