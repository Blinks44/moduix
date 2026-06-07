import { Dialog as DialogPrimitive } from '@base-ui/react/dialog';
import { clsx } from 'clsx';
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ComponentProps,
  type Dispatch,
  type RefObject,
  type SetStateAction,
} from 'react';
import { mergeClassName } from '@/lib/moduix/mergeClassName';
import { CloseButton } from '../close-button';
import styles from './Lightbox.module.css';

const DEFAULT_CLOSE_LABEL = 'Close image';
const createLightboxHandle = DialogPrimitive.createHandle;

type LightboxImageData = {
  alt?: string;
  fullSrc?: string;
  src: string;
};

const LightboxImageContext = createContext<LightboxImageData | null>(null);
const LightboxSetImageContext = createContext<Dispatch<
  SetStateAction<LightboxImageData | null>
> | null>(null);

const isSameImage = (currentImage: LightboxImageData | null, nextImage: LightboxImageData) => {
  return (
    currentImage?.src === nextImage.src &&
    currentImage?.fullSrc === nextImage.fullSrc &&
    currentImage?.alt === nextImage.alt
  );
};

const getGalleryRoot = (rootRef?: RefObject<HTMLElement | null>, rootSelector?: string) => {
  return rootRef?.current ?? (rootSelector ? document.querySelector(rootSelector) : null);
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
    <LightboxSetImageContext.Provider value={setImage}>
      <LightboxImageContext.Provider value={image}>
        <DialogPrimitive.Root {...props} />
      </LightboxImageContext.Provider>
    </LightboxSetImageContext.Provider>
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
  ...props
}: Omit<ComponentProps<'img'>, 'src'> & {
  src: string;
  fullSrc?: string;
}) {
  const setImage = useContext(LightboxSetImageContext);
  const image = { src, fullSrc, alt };

  useEffect(() => {
    setImage?.(image);

    return () => {
      setImage?.((currentImage) => (isSameImage(currentImage, image) ? null : currentImage));
    };
  }, [alt, fullSrc, setImage, src]);

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
          onClick={(event) => {
            onClick?.(event);

            if (!event.defaultPrevented) {
              setImage?.(image);
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
}: DialogPrimitive.Popup.Props & {
  showCloseButton?: boolean;
  closeLabel?: string;
  closeOnContentClick?: boolean;
}) {
  const image = useContext(LightboxImageContext);
  const contentChildren =
    children ??
    (image ? (
      <img
        data-slot="lightbox-content-image"
        src={image.fullSrc ?? image.src}
        alt={image.alt ?? ''}
      />
    ) : null);

  const content = closeOnContentClick ? (
    <LightboxClose className={styles.contentClose} nativeButton={false} render={<div />}>
      {contentChildren}
    </LightboxClose>
  ) : (
    contentChildren
  );

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
}: {
  selector?: string;
  rootRef?: RefObject<HTMLElement | null>;
  rootSelector?: string;
  className?: DialogPrimitive.Popup.Props['className'];
  closeLabel?: string;
  showCloseButton?: boolean;
  closeOnContentClick?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<{ src: string; alt?: string } | null>(null);

  useEffect(() => {
    const rootNode = getGalleryRoot(rootRef, rootSelector);
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

    const handleClick = (event: MouseEvent) => {
      handleOpen(event.target);
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
    rootNode.addEventListener('keydown', handleKeyDown);
    return () => {
      rootNode.removeEventListener('click', handleClick);
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