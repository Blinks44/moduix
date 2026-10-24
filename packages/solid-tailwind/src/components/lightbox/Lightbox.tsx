import { Dialog as DialogPrimitive, useDialog, useDialogContext } from '@ark-ui/solid/dialog';
import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import type { ComponentProps, JSX } from 'solid-js';
import { createEffect, onCleanup, splitProps } from 'solid-js';
import { a11yLabels } from '@/lib/moduix/a11yLabels';
import { callEventHandler } from '@/lib/moduix/callEventHandler';
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
      class={cn(
        'cursor-zoom-in focus-visible:outline-focus focus-visible:outline-offset-focus focus-visible:outline-ring',
        local.class,
      )}
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
        class={cn(
          'fixed inset-0 z-[calc(var(--z-index,var(--moduix-z-popup))-1)] bg-overlay backdrop-blur-[4px] data-[state=closed]:animate-moduix-dialog-backdrop-out data-[state=open]:animate-moduix-dialog-backdrop-in motion-reduce:data-[state]:animate-none',
          local.class,
        )}
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
        class={cn(
          'fixed inset-0 z-[var(--z-index,var(--moduix-z-popup))] grid place-items-center overflow-auto overscroll-contain p-4',
          local.class,
        )}
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
      class={cn(
        'group/lightbox relative z-[calc(var(--moduix-z-popup)+var(--layer-index,0))] grid max-h-[min(80dvh,calc(100dvh-2rem))] w-fit max-w-[min(80vw,calc(100vw-2rem))] gap-3 outline-0 data-[state=closed]:animate-moduix-lightbox-content-out data-[state=open]:animate-moduix-lightbox-content-in motion-reduce:data-[state]:animate-none',
        local.class,
      )}
      {...others}
      data-slot="lightbox-content"
    />
  );
}

function LightboxTitle(props: ComponentProps<typeof DialogPrimitive.Title>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DialogPrimitive.Title
      class={cn('m-0 text-md leading-6 font-semibold text-foreground', local.class)}
      {...others}
      data-slot="lightbox-title"
    />
  );
}

function LightboxDescription(props: ComponentProps<typeof DialogPrimitive.Description>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DialogPrimitive.Description
      class={cn('m-0 text-sm leading-5 text-muted-foreground', local.class)}
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
          class={cn(
            'fixed end-4 top-4 z-[calc(var(--moduix-z-popup)+var(--layer-index,0)+1)] size-8 bg-background text-foreground',
            local.class,
          )}
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
      class={cn(
        'block max-h-[min(80dvh,100%)] max-w-[min(80vw,100%)] rounded-md object-contain shadow-lg select-none data-[close-on-click]:cursor-zoom-out',
        local.class,
      )}
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
    <ark.div
      class={cn(
        'max-w-[min(72rem,calc(100vw-2rem))] justify-self-center [&_[data-slot=carousel-control]]:items-center [&_[data-slot=carousel-indicator-group]]:mx-auto [&_[data-slot=carousel-indicator-group]]:w-fit [&_[data-slot=carousel-indicator-group]]:max-w-full [&_[data-slot=carousel-indicator-group]]:flex-wrap [&_[data-slot=carousel-indicator]:has(img)]:h-control-xl [&_[data-slot=carousel-indicator]:has(img)]:w-20 [&_[data-slot=carousel-indicator]:has(img)]:overflow-hidden [&_[data-slot=carousel-indicator]:has(img)]:rounded-md [&_[data-slot=carousel-indicator]:has(img)]:border [&_[data-slot=carousel-indicator]:has(img)]:border-transparent [&_[data-slot=carousel-indicator]:has(img)]:bg-transparent [&_[data-slot=carousel-indicator]:has(img)]:opacity-[0.65] [&_[data-slot=carousel-indicator]:has(img)]:transition [&_[data-slot=carousel-indicator]:has(img)]:duration-fast [&_[data-slot=carousel-indicator]:has(img)]:ease-in-out [&_[data-slot=carousel-indicator]:has(img)_img]:block [&_[data-slot=carousel-indicator]:has(img)_img]:size-full [&_[data-slot=carousel-indicator]:has(img)_img]:object-cover [&_[data-slot=carousel-indicator]:has(img)[data-current]]:-translate-y-px [&_[data-slot=carousel-indicator]:has(img)[data-current]]:border-primary [&_[data-slot=carousel-indicator]:has(img)[data-current]]:opacity-100 [&_[data-slot=carousel-item-group]]:aspect-[16/10] [&_[data-slot=carousel-item-group]]:max-h-[68dvh] [&_[data-slot=carousel-item-group]]:bg-black/90 [&_[data-slot=carousel-item]]:grid [&_[data-slot=carousel-item]]:h-full [&_[data-slot=carousel-item]]:place-items-center [&_[data-slot=carousel-item]_img]:block [&_[data-slot=carousel-item]_img]:size-full [&_[data-slot=carousel-item]_img]:rounded-md [&_[data-slot=carousel-item]_img]:object-contain [&_[data-slot=carousel-item]_img]:select-none [&_[data-slot=carousel-item]_video]:block [&_[data-slot=carousel-item]_video]:size-full [&_[data-slot=carousel-item]_video]:rounded-md [&_[data-slot=carousel-item]_video]:object-contain [&_[data-slot=carousel-item]_video]:select-none [@media(hover:hover)]:[&_[data-slot=carousel-indicator]:has(img):hover]:opacity-90',
        local.class,
      )}
      {...others}
      data-slot="lightbox-gallery"
    />
  );
}

function LightboxHeader(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return <ark.div class={cn('grid gap-1', local.class)} {...others} data-slot="lightbox-header" />;
}

function LightboxBody(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.div
      class={cn(
        'grid gap-3 group-data-[state]/lightbox:[animation:inherit] group-data-[state=closed]/lightbox:[animation-name:moduix-lightbox-body-out] group-data-[state=open]/lightbox:[animation-name:moduix-lightbox-body-in]',
        local.class,
      )}
      {...others}
      data-slot="lightbox-body"
    />
  );
}

function LightboxFooter(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.div
      class={cn(
        'flex items-center justify-end gap-2 text-sm leading-5 text-muted-foreground',
        local.class,
      )}
      {...others}
      data-slot="lightbox-footer"
    />
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