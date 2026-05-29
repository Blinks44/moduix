import { Dialog as DialogPrimitive } from '@base-ui/react/dialog';
import { clsx } from 'clsx';
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ComponentProps,
  type RefObject,
} from 'react';
import { CloseButton } from '@/components/CloseButton';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Lightbox.module.css';

const DEFAULT_CLOSE_LABEL = 'Close image';
const createLightboxHandle = DialogPrimitive.createHandle;

type LightboxImageData = {
  alt?: string;
  previewSrc?: string;
  src: string;
};

const LightboxImageContext = createContext<{
  image: LightboxImageData | null;
  setImage: (image: LightboxImageData | null) => void;
} | null>(null);

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

  const imageNode = target.closest(selector);
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
  const value = useMemo(() => ({ image, setImage }), [image]);

  return (
    <LightboxImageContext.Provider value={value}>
      <DialogPrimitive.Root {...props} />
    </LightboxImageContext.Provider>
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
  previewSrc,
  alt,
  className,
  ...props
}: Omit<ComponentProps<'img'>, 'src'> & {
  src: string;
  previewSrc?: string;
}) {
  const context = useContext(LightboxImageContext);

  useEffect(() => {
    context?.setImage({ src, previewSrc, alt });

    return () => {
      context?.setImage(null);
    };
  }, [alt, context, previewSrc, src]);

  return (
    <LightboxTrigger
      render={
        <img
          data-slot="lightbox-image"
          src={src}
          alt={alt}
          className={className}
          data-lightbox-src={previewSrc}
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
  const context = useContext(LightboxImageContext);
  const contentChildren =
    children ??
    (context?.image ? (
      <img
        data-slot="lightbox-content-image"
        src={context.image.previewSrc ?? context.image.src}
        alt={context.image.alt ?? ''}
      />
    ) : null);

  const content = closeOnContentClick ? (
    <LightboxClose
      className={styles.contentClose}
      aria-label={closeLabel}
      nativeButton={false}
      render={<div />}
    >
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

    const handleClick = (event: MouseEvent) => {
      const nextImage = getGalleryImage(event.target, selector);
      if (!nextImage) {
        return;
      }

      setImage(nextImage);
      setOpen(true);
    };

    rootNode.addEventListener('click', handleClick);
    return () => rootNode.removeEventListener('click', handleClick);
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