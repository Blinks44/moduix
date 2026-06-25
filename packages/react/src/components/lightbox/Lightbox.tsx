import type { HTMLArkProps } from '@ark-ui/react/factory';
import type { ComponentProps, ComponentRef, RefObject } from 'react';
import { Dialog as DialogPrimitive, useDialog, useDialogContext } from '@ark-ui/react/dialog';
import { ark } from '@ark-ui/react/factory';
import { Portal as PortalPrimitive } from '@ark-ui/react/portal';
import { clsx } from 'clsx';
import { forwardRef, useEffect, useState } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import { CloseButton } from '../close-button';
import styles from './Lightbox.module.css';

const DEFAULT_CLOSE_LABEL = 'Close image';
const DEFAULT_PREVIEW_LABEL = 'Image preview';

type LightboxImageData = {
  alt?: string;
  src: string;
};

type LightboxFrameProps = HTMLArkProps<'div'> & {
  closeOnClick?: boolean;
};

type LightboxGalleryProps = {
  selector?: string;
  rootRef?: RefObject<HTMLElement | null>;
  rootSelector?: string;
  closeOnClick?: boolean;
  className?: ComponentProps<typeof DialogPrimitive.Content>['className'];
  closeLabel?: string;
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

function getGalleryImage(target: EventTarget | null, selector: string): LightboxImageData | null {
  if (!(target instanceof Element)) {
    return null;
  }

  const matchedNode = target.closest(selector);
  if (!matchedNode) {
    return null;
  }

  const imageNode =
    matchedNode instanceof HTMLImageElement ? matchedNode : matchedNode.querySelector('img');
  if (!(imageNode instanceof HTMLImageElement)) {
    return null;
  }

  const source = imageNode.dataset.lightboxSrc ?? imageNode.currentSrc ?? imageNode.src;
  if (!source) {
    return null;
  }

  return {
    src: source,
    alt: imageNode.alt || undefined,
  };
}

function LightboxRoot(props: ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root {...props} />;
}

function LightboxRootProvider(props: ComponentProps<typeof DialogPrimitive.RootProvider>) {
  return <DialogPrimitive.RootProvider {...props} />;
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
    <DialogPrimitive.Backdrop
      ref={ref}
      data-slot="lightbox-backdrop"
      className={clsx(styles.backdrop, normalizeClassName(className))}
      {...props}
    />
  );
});

const LightboxPositioner = forwardRef<
  ComponentRef<typeof DialogPrimitive.Positioner>,
  ComponentProps<typeof DialogPrimitive.Positioner>
>(function LightboxPositioner({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Positioner
      ref={ref}
      data-slot="lightbox-positioner"
      className={clsx(styles.positioner, normalizeClassName(className))}
      {...props}
    />
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
      className={normalizeClassName(className)}
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
      className={normalizeClassName(className)}
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

const LightboxFrame = forwardRef<HTMLDivElement, LightboxFrameProps>(function LightboxFrame(
  { className, closeOnClick = false, onClick, ...props },
  ref,
) {
  if (closeOnClick) {
    return (
      <DialogPrimitive.CloseTrigger asChild>
        <ark.div
          ref={ref}
          data-scope="lightbox"
          data-part="frame"
          data-slot="lightbox-frame"
          data-close-on-click=""
          className={clsx(styles.frame, normalizeClassName(className))}
          onClick={onClick}
          {...props}
        />
      </DialogPrimitive.CloseTrigger>
    );
  }

  return (
    <ark.div
      ref={ref}
      data-scope="lightbox"
      data-part="frame"
      data-slot="lightbox-frame"
      className={clsx(styles.frame, normalizeClassName(className))}
      onClick={onClick}
      {...props}
    />
  );
});

function LightboxGallery({
  selector = 'img',
  rootRef,
  rootSelector,
  closeOnClick = false,
  className,
  closeLabel = DEFAULT_CLOSE_LABEL,
}: LightboxGalleryProps) {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<LightboxImageData | null>(null);

  useEffect(() => {
    const rootNode =
      rootRef?.current ?? (rootSelector ? document.querySelector<HTMLElement>(rootSelector) : null);
    if (!rootNode) {
      return;
    }

    const handleOpen = (target: EventTarget | null) => {
      const nextImage = getGalleryImage(target, selector);
      if (!nextImage) {
        return false;
      }

      setImage(nextImage);
      setOpen(true);
      return true;
    };

    const handlePreload = (target: EventTarget | null) => {
      const nextImage = getGalleryImage(target, selector);
      if (!nextImage) {
        return;
      }

      preloadImage(nextImage.src);
    };

    const handleClick = (event: MouseEvent) => {
      handleOpen(event.target);
    };

    const handlePointerEnter = (event: PointerEvent) => {
      handlePreload(event.target);
    };

    const handleFocusIn = (event: FocusEvent) => {
      handlePreload(event.target);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.defaultPrevented ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        (event.key !== 'Enter' && event.key !== ' ')
      ) {
        return;
      }

      if (handleOpen(event.target)) {
        event.preventDefault();
      }
    };

    rootNode.addEventListener('click', handleClick);
    rootNode.addEventListener('pointerenter', handlePointerEnter, true);
    rootNode.addEventListener('focusin', handleFocusIn);
    rootNode.addEventListener('keydown', handleKeyDown);

    return () => {
      rootNode.removeEventListener('click', handleClick);
      rootNode.removeEventListener('pointerenter', handlePointerEnter, true);
      rootNode.removeEventListener('focusin', handleFocusIn);
      rootNode.removeEventListener('keydown', handleKeyDown);
    };
  }, [rootRef, rootSelector, selector]);

  return (
    <DialogPrimitive.Root
      open={open}
      onOpenChange={(details) => {
        setOpen(details.open);
      }}
      onExitComplete={() => {
        if (!open) {
          setImage(null);
        }
      }}
      lazyMount
      unmountOnExit
    >
      <PortalPrimitive>
        <LightboxBackdrop />
        <LightboxPositioner>
          <LightboxCloseIcon aria-label={closeLabel} />
          <LightboxContent aria-label={image?.alt ?? DEFAULT_PREVIEW_LABEL} className={className}>
            {image ? (
              <LightboxFrame closeOnClick={closeOnClick}>
                <img src={image.src} alt={image.alt ?? ''} />
              </LightboxFrame>
            ) : null}
          </LightboxContent>
        </LightboxPositioner>
      </PortalPrimitive>
    </DialogPrimitive.Root>
  );
}

const LightboxContext = DialogPrimitive.Context;

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
  Frame: LightboxFrame,
  Gallery: LightboxGallery,
  Context: LightboxContext,
});

export {
  Lightbox,
  LightboxGallery,
  useDialog as useLightbox,
  useDialogContext as useLightboxContext,
};
export type { LightboxGalleryProps };
export type {
  DialogFocusOutsideEvent as LightboxFocusOutsideEvent,
  DialogInteractOutsideEvent as LightboxInteractOutsideEvent,
  DialogOpenChangeDetails as LightboxOpenChangeDetails,
  DialogPointerDownOutsideEvent as LightboxPointerDownOutsideEvent,
  DialogTriggerValueChangeDetails as LightboxTriggerValueChangeDetails,
  UseDialogContext as UseLightboxContext,
  UseDialogProps as UseLightboxProps,
  UseDialogReturn as UseLightboxReturn,
} from '@ark-ui/react/dialog';