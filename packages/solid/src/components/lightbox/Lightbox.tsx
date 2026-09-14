import { Dialog as DialogPrimitive, useDialog, useDialogContext } from '@ark-ui/solid/dialog';
import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { clsx } from 'clsx';
import type { ComponentProps } from 'solid-js';
import { children, createEffect, onCleanup, splitProps } from 'solid-js';
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
  rootRef?: HTMLElement | (() => HTMLElement | null | undefined);
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

function resolveRootNode(
  rootRef: LightboxBindProps['rootRef'],
  rootSelector: string | undefined,
): HTMLElement | null {
  const rootNode = typeof rootRef === 'function' ? rootRef() : rootRef;
  return rootNode ?? (rootSelector ? document.querySelector<HTMLElement>(rootSelector) : null);
}

function LightboxRoot(props: LightboxRootProps) {
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
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <DialogPrimitive.Trigger
      asChild={local.asChild}
      data-slot="lightbox-trigger"
      class={clsx(styles.trigger, local.class)}
      {...others}
    />
  );
}

function LightboxBackdrop(props: ComponentProps<typeof DialogPrimitive.Backdrop>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <OverlayPortal>
      <DialogPrimitive.Backdrop
        data-slot="lightbox-backdrop"
        class={clsx(styles.backdrop, local.class)}
        {...others}
      />
    </OverlayPortal>
  );
}

function LightboxPositioner(props: ComponentProps<typeof DialogPrimitive.Positioner>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <OverlayPortal>
      <DialogPrimitive.Positioner
        data-slot="lightbox-positioner"
        class={clsx(styles.positioner, local.class)}
        {...others}
      />
    </OverlayPortal>
  );
}

function LightboxContent(props: ComponentProps<typeof DialogPrimitive.Content>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DialogPrimitive.Content
      data-slot="lightbox-content"
      class={clsx(styles.content, local.class)}
      {...others}
    />
  );
}

function LightboxTitle(props: ComponentProps<typeof DialogPrimitive.Title>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DialogPrimitive.Title
      data-slot="lightbox-title"
      class={clsx(styles.title, local.class)}
      {...others}
    />
  );
}

function LightboxDescription(props: ComponentProps<typeof DialogPrimitive.Description>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DialogPrimitive.Description
      data-slot="lightbox-description"
      class={clsx(styles.description, local.class)}
      {...others}
    />
  );
}

function LightboxCloseTrigger(props: ComponentProps<typeof DialogPrimitive.CloseTrigger>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <DialogPrimitive.CloseTrigger
      asChild={local.asChild}
      data-slot="lightbox-close-trigger"
      class={local.class}
      {...others}
    />
  );
}

type LightboxCloseIconProps = Omit<ComponentProps<typeof DialogPrimitive.CloseTrigger>, 'asChild'>;

function LightboxCloseIcon(props: LightboxCloseIconProps) {
  const [local, others] = splitProps(props, ['aria-label', 'aria-labelledby', 'children', 'class']);
  const dialog = useDialogContext();
  const resolvedChildren = children(() => local.children);

  return (
    <DialogPrimitive.CloseTrigger
      asChild={(triggerProps) => (
        <CloseButton.Root
          {...triggerProps()}
          data-slot="lightbox-close-icon"
          data-state={dialog().open ? 'open' : 'closed'}
          aria-label={local['aria-label'] ?? DEFAULT_CLOSE_LABEL}
          aria-labelledby={local['aria-labelledby']}
          class={clsx(styles.closeIcon, local.class)}
        >
          {resolvedChildren()}
        </CloseButton.Root>
      )}
      {...others}
    />
  );
}

function LightboxImage(props: LightboxImageProps) {
  const [local, others] = splitProps(props, ['class', 'closeOnClick', 'onClick']);
  const dialog = useDialogContext();

  const handleClick = (event: MouseEvent) => {
    (local.onClick as ((event: MouseEvent) => void) | undefined)?.(event);

    if (local.closeOnClick && !event.defaultPrevented) {
      dialog().setOpen(false);
    }
  };

  return (
    <img
      data-slot="lightbox-image"
      data-close-on-click={local.closeOnClick ? '' : undefined}
      class={clsx(styles.image, local.class)}
      onClick={handleClick}
      {...others}
    />
  );
}

function LightboxGallery(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.div data-slot="lightbox-gallery" class={clsx(styles.gallery, local.class)} {...others} />
  );
}

function LightboxHeader(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.div data-slot="lightbox-header" class={clsx(styles.header, local.class)} {...others} />
  );
}

function LightboxBody(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return <ark.div data-slot="lightbox-body" class={clsx(styles.body, local.class)} {...others} />;
}

function LightboxFooter(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.div data-slot="lightbox-footer" class={clsx(styles.footer, local.class)} {...others} />
  );
}

function LightboxBind(props: LightboxBindProps) {
  const [local] = splitProps(props, ['onImageSelect', 'rootRef', 'rootSelector', 'selector']);
  const dialog = useDialogContext();

  createEffect(() => {
    const rootNode = resolveRootNode(local.rootRef, local.rootSelector);
    const selector = local.selector;
    const onImageSelect = local.onImageSelect;

    if (!rootNode) {
      return;
    }

    const handleClick = (event: MouseEvent) => {
      const nextImage = resolveImage(event.target, selector, rootNode);
      if (!nextImage) {
        return;
      }

      onImageSelect(nextImage);
      dialog().setOpen(true);
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

    onCleanup(() => {
      rootNode.removeEventListener('click', handleClick);
      rootNode.removeEventListener('pointerenter', handlePointerEnter, true);
      rootNode.removeEventListener('focusin', handleFocusIn);
    });
  });

  return <></>;
}

type LightboxComponent = typeof LightboxRoot & {
  Root: typeof LightboxRoot;
  RootProvider: typeof LightboxRootProvider;
  Trigger: typeof LightboxTrigger;
  Backdrop: typeof LightboxBackdrop;
  Positioner: typeof LightboxPositioner;
  Content: typeof LightboxContent;
  Title: typeof LightboxTitle;
  Description: typeof LightboxDescription;
  CloseTrigger: typeof LightboxCloseTrigger;
  CloseIcon: typeof LightboxCloseIcon;
  Header: typeof LightboxHeader;
  Body: typeof LightboxBody;
  Footer: typeof LightboxFooter;
  Image: typeof LightboxImage;
  Gallery: typeof LightboxGallery;
  Bind: typeof LightboxBind;
  useLightbox: typeof useDialog;
  useLightboxContext: typeof useDialogContext;
};

const Lightbox: LightboxComponent = Object.assign(LightboxRoot, {
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
  Header: LightboxHeader,
  Body: LightboxBody,
  Footer: LightboxFooter,
  Image: LightboxImage,
  Gallery: LightboxGallery,
  Bind: LightboxBind,
  useLightbox: useDialog,
  useLightboxContext: useDialogContext,
});

export {
  Lightbox,
  LightboxBind,
  LightboxGallery,
  LightboxImage,
  useDialog as useLightbox,
  useDialogContext as useLightboxContext,
};
export type { LightboxBindProps, LightboxImageSelectDetails };