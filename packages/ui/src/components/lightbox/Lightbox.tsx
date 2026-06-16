import { Dialog as DialogPrimitive } from '@base-ui/react/dialog';
import { clsx } from 'clsx';
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ComponentProps,
  type RefObject,
} from 'react';
import { mergeClassName } from '@/lib/moduix/mergeClassName';
import { CloseButton } from '../close-button';
import styles from './Lightbox.module.css';

const DEFAULT_CLOSE_LABEL = 'Close image';
const createLightboxHandle = DialogPrimitive.createHandle;
const preloadedImageSources = new Set<string>();

type LightboxImageData = {
  alt?: string;
  fullSrc?: string;
  src: string;
};

type LightboxContextValue = {
  image: LightboxImageData | null;
  setImage: (image: LightboxImageData | null) => void;
};

type LightboxImageProps = ComponentProps<'img'> & {
  fullSrc?: string;
  src: string;
};

type LightboxContentProps = DialogPrimitive.Popup.Props & {
  showCloseButton?: boolean;
  closeLabel?: string;
  closeOnContentClick?: boolean;
};

type LightboxGalleryProps = {
  selector?: string;
  rootRef?: RefObject<HTMLElement | null>;
  rootSelector?: string;
  className?: DialogPrimitive.Popup.Props['className'];
  closeLabel?: string;
  showCloseButton?: boolean;
  closeOnContentClick?: boolean;
};

const LightboxContext = createContext<LightboxContextValue | null>(null);

const preloadImage = (src?: string) => {
  if (!src || typeof Image === 'undefined' || preloadedImageSources.has(src)) {
    return;
  }

  preloadedImageSources.add(src);
  const image = new Image();
  image.src = src;
};

const getGalleryImage = (
  target: EventTarget | null,
  selector: string,
): { src: string; alt?: string } | null => {
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
    alt: imageNode.alt,
  };
};

function Lightbox<Payload = unknown>(props: DialogPrimitive.Root.Props<Payload>) {
  const [image, setImage] = useState<LightboxImageData | null>(null);

  return (
    <LightboxContext.Provider value={{ image, setImage }}>
      <DialogPrimitive.Root {...props} />
    </LightboxContext.Provider>
  );
}

function LightboxTrigger({ className, render, ...props }: DialogPrimitive.Trigger.Props) {
  const triggerClassName = render ? className : mergeClassName(className, styles.trigger);

  return (
    <DialogPrimitive.Trigger
      data-slot="lightbox-trigger"
      className={triggerClassName}
      render={render}
      {...props}
    />
  );
}

function LightboxPortal({ className, ...props }: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="lightbox-portal" className={className} {...props} />;
}

function LightboxBackdrop({ className, ...props }: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="lightbox-backdrop"
      className={mergeClassName(className, styles.backdrop)}
      {...props}
    />
  );
}

function LightboxViewport({ className, ...props }: DialogPrimitive.Viewport.Props) {
  return (
    <DialogPrimitive.Viewport
      data-slot="lightbox-viewport"
      className={mergeClassName(className, styles.viewport)}
      {...props}
    />
  );
}

function LightboxPopup({ className, ...props }: DialogPrimitive.Popup.Props) {
  return (
    <DialogPrimitive.Popup
      data-slot="lightbox-popup"
      className={mergeClassName(className, styles.popup)}
      {...props}
    />
  );
}

function LightboxClose({ className, ...props }: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="lightbox-close" className={className} {...props} />;
}

function LightboxCloseButton({
  className,
  children,
  'aria-label': ariaLabel = DEFAULT_CLOSE_LABEL,
  render,
  ...props
}: DialogPrimitive.Close.Props) {
  return (
    <DialogPrimitive.Close
      data-slot="lightbox-close-button"
      render={render ?? <CloseButton aria-label={ariaLabel}>{children}</CloseButton>}
      className={mergeClassName(className, styles.closeButton)}
      {...props}
    />
  );
}

function LightboxFrame({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="lightbox-frame" className={clsx(styles.frame, className)} {...props} />;
}

function LightboxImage({
  src,
  fullSrc,
  alt,
  className,
  onClick,
  onFocus,
  onPointerEnter,
  ...props
}: LightboxImageProps) {
  const lightbox = useContext(LightboxContext);

  return (
    <LightboxTrigger
      nativeButton={false}
      render={
        <img
          data-slot="lightbox-image"
          src={src}
          alt={alt}
          className={clsx(styles.trigger, className)}
          data-lightbox-src={fullSrc}
          onPointerEnter={(event) => {
            onPointerEnter?.(event);

            if (!event.defaultPrevented) {
              preloadImage(fullSrc);
            }
          }}
          onFocus={(event) => {
            onFocus?.(event);

            if (!event.defaultPrevented) {
              preloadImage(fullSrc);
            }
          }}
          onClick={(event) => {
            onClick?.(event);

            if (!event.defaultPrevented) {
              lightbox?.setImage({ src, fullSrc, alt });
            }
          }}
          {...props}
        />
      }
    />
  );
}

function LightboxContent({
  className,
  showCloseButton = true,
  closeOnContentClick = true,
  closeLabel = DEFAULT_CLOSE_LABEL,
  children,
  ...props
}: LightboxContentProps) {
  const lightbox = useContext(LightboxContext);
  let content = children;

  if (!content && lightbox?.image) {
    content = (
      <img
        data-slot="lightbox-content-image"
        src={lightbox.image.fullSrc ?? lightbox.image.src}
        alt={lightbox.image.alt ?? ''}
      />
    );
  }

  if (closeOnContentClick && content) {
    content = (
      <LightboxClose className={styles.contentClose} nativeButton={false} render={<div />}>
        {content}
      </LightboxClose>
    );
  }

  return (
    <LightboxPortal>
      <LightboxBackdrop />
      <LightboxViewport>
        {showCloseButton ? <LightboxCloseButton aria-label={closeLabel} /> : null}
        <LightboxPopup className={className} {...props}>
          <LightboxFrame>{content}</LightboxFrame>
        </LightboxPopup>
      </LightboxViewport>
    </LightboxPortal>
  );
}

function LightboxGallery({
  selector = 'img',
  rootRef,
  rootSelector,
  className,
  closeLabel,
  showCloseButton,
  closeOnContentClick,
}: LightboxGalleryProps) {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<LightboxImageData | null>(null);

  useEffect(() => {
    const rootNode =
      rootRef?.current ?? (rootSelector ? document.querySelector(rootSelector) : null);
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
    <Lightbox
      open={open}
      onOpenChange={setOpen}
      onOpenChangeComplete={(nextOpen) => {
        if (!nextOpen) {
          setImage(null);
        }
      }}
    >
      <LightboxContent
        className={className}
        closeLabel={closeLabel}
        showCloseButton={showCloseButton}
        closeOnContentClick={closeOnContentClick}
      >
        {image ? (
          <img data-slot="lightbox-content-image" src={image.src} alt={image.alt ?? ''} />
        ) : null}
      </LightboxContent>
    </Lightbox>
  );
}

export {
  Lightbox,
  createLightboxHandle,
  LightboxTrigger,
  LightboxPortal,
  LightboxBackdrop,
  LightboxViewport,
  LightboxPopup,
  LightboxContent,
  LightboxClose,
  LightboxCloseButton,
  LightboxFrame,
  LightboxImage,
  LightboxGallery,
};