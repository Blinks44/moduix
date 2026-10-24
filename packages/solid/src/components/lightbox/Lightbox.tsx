import { Dialog as DialogPrimitive, useDialog, useDialogContext } from '@ark-ui/solid/dialog';
import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { clsx } from 'clsx';
import type { ComponentProps, JSX } from 'solid-js';
import { createEffect, onCleanup, splitProps } from 'solid-js';
import { a11yLabels } from '@/lib/moduix/a11yLabels';
import { callEventHandler } from '@/lib/moduix/callEventHandler';
import {
  OverlayPortal,
  OverlayPortalProvider,
  type OverlayPortalProps,
} from '@/lib/moduix/overlayPortal';
import { CloseButton } from '../close-button';
import styles from './Lightbox.module.css';

type LightboxImageSelectDetails = {
  alt?: string;
  element: HTMLImageElement;
  src: string;
};

type LightboxImageProps = ComponentProps<'img'> & {
  closeOnClick?: boolean;
  'data-close-on-click'?: string;
};

type LightboxRootProps = ComponentProps<typeof DialogPrimitive.Root> & OverlayPortalProps;
type LightboxRootProviderProps = ComponentProps<typeof DialogPrimitive.RootProvider> &
  OverlayPortalProps;

type LightboxBindProps = {
  onImageSelect: (details: LightboxImageSelectDetails) => void;
  selector: string;
  rootRef?: HTMLElement | (() => HTMLElement | null | undefined);
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

function resolveRootNode(
  rootRef: LightboxBindProps['rootRef'],
  rootSelector: string | undefined,
): HTMLElement | null {
  const rootNode = typeof rootRef === 'function' ? rootRef() : rootRef;
  return rootNode ?? (rootSelector ? document.querySelector<HTMLElement>(rootSelector) : null);
}

function Lightbox(props: LightboxRootProps) {
  const [local, others] = splitProps(props, [
    'children',
    'lazyMount',
    'portalled',
    'portalRef',
    'unmountOnExit',
  ]);

  return (
    <OverlayPortalProvider portalled={local.portalled} portalRef={local.portalRef}>
      <DialogPrimitive.Root
        lazyMount={local.lazyMount ?? true}
        unmountOnExit={local.unmountOnExit ?? true}
        {...others}
      >
        {local.children}
      </DialogPrimitive.Root>
    </OverlayPortalProvider>
  );
}

function LightboxRootProvider(props: LightboxRootProviderProps) {
  const [local, others] = splitProps(props, [
    'children',
    'lazyMount',
    'portalled',
    'portalRef',
    'unmountOnExit',
  ]);

  return (
    <OverlayPortalProvider portalled={local.portalled} portalRef={local.portalRef}>
      <DialogPrimitive.RootProvider
        lazyMount={local.lazyMount ?? true}
        unmountOnExit={local.unmountOnExit ?? true}
        {...others}
      >
        {local.children}
      </DialogPrimitive.RootProvider>
    </OverlayPortalProvider>
  );
}

function LightboxTrigger(props: ComponentProps<typeof DialogPrimitive.Trigger>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DialogPrimitive.Trigger
      class={clsx(styles.trigger, local.class)}
      {...others}
      data-slot="lightbox-trigger"
    />
  );
}

function LightboxBackdrop(props: ComponentProps<typeof DialogPrimitive.Backdrop>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <OverlayPortal>
      <DialogPrimitive.Backdrop
        class={clsx(styles.backdrop, local.class)}
        {...others}
        data-slot="lightbox-backdrop"
      />
    </OverlayPortal>
  );
}

function LightboxPositioner(props: ComponentProps<typeof DialogPrimitive.Positioner>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <OverlayPortal>
      <DialogPrimitive.Positioner
        class={clsx(styles.positioner, local.class)}
        {...others}
        data-slot="lightbox-positioner"
      />
    </OverlayPortal>
  );
}

function LightboxContent(props: ComponentProps<typeof DialogPrimitive.Content>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DialogPrimitive.Content
      class={clsx(styles.content, local.class)}
      {...others}
      data-slot="lightbox-content"
    />
  );
}

function LightboxTitle(props: ComponentProps<typeof DialogPrimitive.Title>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DialogPrimitive.Title
      class={clsx(styles.title, local.class)}
      {...others}
      data-slot="lightbox-title"
    />
  );
}

function LightboxDescription(props: ComponentProps<typeof DialogPrimitive.Description>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DialogPrimitive.Description
      class={clsx(styles.description, local.class)}
      {...others}
      data-slot="lightbox-description"
    />
  );
}

function LightboxCloseTrigger(props: ComponentProps<typeof DialogPrimitive.CloseTrigger>) {
  return <DialogPrimitive.CloseTrigger {...props} data-slot="lightbox-close-trigger" />;
}

type LightboxCloseIconProps = Omit<ComponentProps<typeof DialogPrimitive.CloseTrigger>, 'asChild'>;

function LightboxCloseIcon(props: LightboxCloseIconProps) {
  const [local, others] = splitProps(props, ['aria-label', 'aria-labelledby', 'children', 'class']);

  return (
    <DialogPrimitive.CloseTrigger
      asChild={(triggerProps) => (
        <CloseButton
          {...triggerProps()}
          data-slot="lightbox-close-icon"
          aria-label={local['aria-label'] ?? a11yLabels.closeImage}
          aria-labelledby={local['aria-labelledby']}
          class={clsx(styles.closeIcon, local.class)}
        >
          {local.children}
        </CloseButton>
      )}
      {...others}
    />
  );
}

function LightboxImage(props: LightboxImageProps) {
  const [local, others] = splitProps(props, [
    'class',
    'closeOnClick',
    'data-close-on-click',
    'onClick',
  ]);
  const dialog = useDialogContext();

  const handleClick: JSX.EventHandler<HTMLImageElement, MouseEvent> = (event) => {
    callEventHandler(local.onClick, event);

    if (local.closeOnClick && !event.defaultPrevented) {
      dialog().setOpen(false);
    }
  };

  return (
    // oxlint-disable-next-line jsx-a11y/alt-text, jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions -- `alt` arrives through props; click-to-close is a pointer shortcut for the Escape-dismissible dialog.
    <img
      class={clsx(styles.image, local.class)}
      onClick={handleClick}
      {...others}
      data-close-on-click={local.closeOnClick ? '' : undefined}
      data-slot="lightbox-image"
    />
  );
}

function LightboxGallery(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.div class={clsx(styles.gallery, local.class)} {...others} data-slot="lightbox-gallery" />
  );
}

function LightboxHeader(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.div class={clsx(styles.header, local.class)} {...others} data-slot="lightbox-header" />
  );
}

function LightboxBody(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return <ark.div class={clsx(styles.body, local.class)} {...others} data-slot="lightbox-body" />;
}

function LightboxFooter(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.div class={clsx(styles.footer, local.class)} {...others} data-slot="lightbox-footer" />
  );
}

const LightboxContext = DialogPrimitive.Context;

function LightboxBind(props: LightboxBindProps) {
  const dialog = useDialogContext();

  createEffect(() => {
    const rootNode = resolveRootNode(props.rootRef, props.rootSelector);
    const { onImageSelect, selector } = props;
    if (!rootNode) {
      return;
    }

    const handleClick = (event: MouseEvent) => {
      const image = event.defaultPrevented ? null : resolveImage(event.target, selector, rootNode);
      if (!image) {
        return;
      }

      onImageSelect(image);
      dialog().setOpen(true);
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

    onCleanup(() => {
      rootNode.removeEventListener('click', handleClick);
      rootNode.removeEventListener('pointerenter', handlePreload, true);
      rootNode.removeEventListener('focusin', handlePreload);
    });
  });

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