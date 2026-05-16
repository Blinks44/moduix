import { Dialog as DialogPrimitive } from '@base-ui/react/dialog';
import * as React from 'react';
import { CloseButton } from '@/components/CloseButton';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Lightbox.module.css';

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
  return (
    <DialogPrimitive.Portal
      data-slot="lightbox-portal"
      className={mergeClassName(className)}
      {...props}
    />
  );
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
  return (
    <DialogPrimitive.Close
      data-slot="lightbox-close"
      className={mergeClassName(className, styles.close)}
      {...props}
    />
  );
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
  closeLabel = 'Close image',
  closeButton,
  children,
  ...props
}: LightboxContentProps) {
  const { container: slotPortalContainer, ...restPortalSlotProps } = slotProps?.portal ?? {};
  const portalContainer = container ?? slotPortalContainer;

  return (
    <LightboxPortal
      className={classNames?.portal}
      container={portalContainer}
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
        <LightboxPopup className={className} {...props}>
          <div data-slot="lightbox-frame" className={classNames?.frame ?? styles.frame}>
            {withCloseButton ? (
              <LightboxClose
                className={styles.closeButton}
                aria-label={closeLabel}
                render={closeButton ?? <CloseButton aria-label={closeLabel} />}
              />
            ) : null}
            {closeOnContentClick ? (
              <LightboxClose
                className={styles.contentClose}
                aria-label={closeLabel}
                render={<div />}
              >
                {children}
              </LightboxClose>
            ) : (
              children
            )}
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
    const rootNode =
      rootRef?.current ?? (rootSelector ? document.querySelector(rootSelector) : null);
    if (!rootNode) {
      return;
    }

    const handleClick = (event: MouseEvent) => {
      const eventTarget = event.target;
      if (!(eventTarget instanceof Element)) {
        return;
      }

      const imageNode = eventTarget.closest(selector);
      if (!(imageNode instanceof HTMLImageElement)) {
        return;
      }

      const source = imageNode.dataset.lightboxSrc || imageNode.currentSrc || imageNode.src;
      if (!source) {
        return;
      }

      setImage({
        src: source,
        alt: imageNode.alt,
      });
      setOpen(true);
    };

    rootNode.addEventListener('click', handleClick);
    return () => rootNode.removeEventListener('click', handleClick);
  }, [rootRef, rootSelector, selector]);

  const handleOpenChange = React.useCallback((nextOpen: boolean) => {
    setOpen(nextOpen);
  }, []);

  const handleOpenChangeComplete = React.useCallback((nextOpen: boolean) => {
    if (!nextOpen) {
      setImage(null);
    }
  }, []);

  return (
    <Lightbox
      open={open}
      onOpenChange={handleOpenChange}
      onOpenChangeComplete={handleOpenChangeComplete}
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
          <img
            data-slot="lightbox-content-image"
            className={styles.image}
            src={image.src}
            alt={image.alt ?? ''}
          />
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