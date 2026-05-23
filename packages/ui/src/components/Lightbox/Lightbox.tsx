import { Dialog as DialogPrimitive } from '@base-ui/react/dialog';
import * as React from 'react';
import { CloseButton } from '@/components/CloseButton';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Lightbox.module.css';

const DEFAULT_CLOSE_LABEL = 'Close image';

type LightboxImageData = {
  src: string;
  alt?: string;
};

type LightboxContentClassNames = {
  portal?: DialogPrimitive.Portal.Props['className'];
  backdrop?: DialogPrimitive.Backdrop.Props['className'];
  viewport?: DialogPrimitive.Viewport.Props['className'];
  frame?: string;
};

type LightboxContentSlotProps = {
  portal?: Omit<DialogPrimitive.Portal.Props, 'className' | 'children'>;
  backdrop?: Omit<DialogPrimitive.Backdrop.Props, 'className'>;
  viewport?: Omit<DialogPrimitive.Viewport.Props, 'className' | 'children'>;
};

type LightboxContentProps = Omit<DialogPrimitive.Popup.Props, 'className'> & {
  className?: DialogPrimitive.Popup.Props['className'];
  classNames?: LightboxContentClassNames;
  slotProps?: LightboxContentSlotProps;
  container?: DialogPrimitive.Portal.Props['container'];
  withBackdrop?: boolean;
  closeLabel?: string;
  closeButton?: DialogPrimitive.Close.Props['render'];
  withCloseButton?: boolean;
  closeOnContentClick?: boolean;
};

type LightboxImageProps = Omit<React.ComponentProps<'img'>, 'src'> & {
  src: string;
  /**
   * Controls image source used in popup. Defaults to `src`.
   */
  previewSrc?: string;
};

type LightboxGalleryProps = {
  selector?: string;
  rootRef?: React.RefObject<HTMLElement | null>;
  rootSelector?: string;
  withBackdrop?: boolean;
  closeLabel?: string;
  className?: DialogPrimitive.Popup.Props['className'];
  classNames?: LightboxContentClassNames;
  slotProps?: LightboxContentSlotProps;
  container?: DialogPrimitive.Portal.Props['container'];
};

const Lightbox = DialogPrimitive.Root;
const createLightboxHandle = DialogPrimitive.createHandle;

const getGalleryRoot = (rootRef?: React.RefObject<HTMLElement | null>, rootSelector?: string) => {
  return rootRef?.current ?? (rootSelector ? document.querySelector(rootSelector) : null);
};

const getGalleryImage = (
  target: EventTarget | null,
  selector: string,
): LightboxImageData | null => {
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

function LightboxImage({ src, previewSrc, alt, className, ...props }: LightboxImageProps) {
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
  classNames,
  slotProps,
  container,
  withBackdrop = true,
  withCloseButton = true,
  closeOnContentClick = true,
  closeLabel = DEFAULT_CLOSE_LABEL,
  closeButton,
  children,
  ...props
}: LightboxContentProps) {
  const { container: slotPortalContainer, ...restPortalSlotProps } = slotProps?.portal ?? {};
  const resolvedContainer = container ?? slotPortalContainer;
  const content = closeOnContentClick ? (
    <LightboxClose className={styles.contentClose} aria-label={closeLabel} render={<div />}>
      {children}
    </LightboxClose>
  ) : (
    children
  );

  return (
    <LightboxPortal
      className={classNames?.portal}
      container={resolvedContainer}
      {...restPortalSlotProps}
    >
      {withBackdrop ? (
        <LightboxBackdrop className={classNames?.backdrop} {...slotProps?.backdrop} />
      ) : null}
      <LightboxViewport
        className={classNames?.viewport}
        data-with-backdrop={withBackdrop ? 'true' : 'false'}
        {...slotProps?.viewport}
      >
        {withCloseButton ? (
          <LightboxClose
            className={styles.closeButton}
            aria-label={closeLabel}
            render={closeButton ?? <CloseButton aria-label={closeLabel} />}
          />
        ) : null}
        <LightboxPopup className={className} {...props}>
          <div data-slot="lightbox-frame" className={classNames?.frame ?? styles.frame}>
            {content}
          </div>
        </LightboxPopup>
      </LightboxViewport>
    </LightboxPortal>
  );
}

function LightboxGallery({
  selector = 'img',
  rootRef,
  rootSelector,
  withBackdrop = true,
  closeLabel,
  className,
  classNames,
  slotProps,
  container,
}: LightboxGalleryProps) {
  const [open, setOpen] = React.useState(false);
  const [image, setImage] = React.useState<LightboxImageData | null>(null);

  React.useEffect(() => {
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
        classNames={classNames}
        slotProps={slotProps}
        withBackdrop={withBackdrop}
        closeLabel={closeLabel}
        container={container}
      >
        {image ? (
          <img data-slot="lightbox-content-image" src={image.src} alt={image.alt ?? ''} />
        ) : null}
      </LightboxContent>
    </Lightbox>
  );
}

type LightboxProps<Payload = unknown> = DialogPrimitive.Root.Props<Payload>;
type LightboxHandle<Payload = unknown> = DialogPrimitive.Handle<Payload>;
type LightboxTriggerProps = DialogPrimitive.Trigger.Props;
type LightboxCloseProps = DialogPrimitive.Close.Props;

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
  LightboxImage,
  LightboxGallery,
};

export type {
  LightboxProps,
  LightboxHandle,
  LightboxTriggerProps,
  LightboxContentProps,
  LightboxCloseProps,
  LightboxImageProps,
  LightboxGalleryProps,
  LightboxContentClassNames,
  LightboxContentSlotProps,
};