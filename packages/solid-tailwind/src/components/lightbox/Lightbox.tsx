import { Dialog as DialogPrimitive, useDialog, useDialogContext } from '@ark-ui/solid/dialog';
import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import type { ComponentProps } from 'solid-js';
import { children, createEffect, onCleanup, splitProps } from 'solid-js';
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
      class={cn(
        'cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
        local.class,
      )}
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
        class={cn(
          'fixed inset-0 z-[calc(40+var(--layer-index,0))] min-h-dvh bg-overlay backdrop-blur-xs data-[state=closed]:animate-[moduix-fade-out_200ms_ease-in-out_forwards] data-[state=open]:animate-[moduix-fade-in_200ms_ease-in-out] motion-reduce:[animation-delay:0ms] motion-reduce:[animation-duration:1ms]',
          local.class,
        )}
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
        class={cn(
          'fixed inset-0 z-[calc(50+var(--layer-index,0))] box-border grid place-items-center overflow-auto overscroll-contain p-4',
          local.class,
        )}
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
      class={cn(
        'relative box-border grid max-h-[min(80dvh,calc(100dvh-2rem))] w-fit max-w-[min(80vw,calc(100vw-2rem))] gap-3 border-0 bg-transparent outline-0 data-[state=closed]:animate-moduix-menu-closed data-[state=open]:animate-moduix-menu-open motion-reduce:[animation-delay:0ms] motion-reduce:[animation-duration:1ms]',
        local.class,
      )}
      {...others}
    />
  );
}

function LightboxTitle(props: ComponentProps<typeof DialogPrimitive.Title>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DialogPrimitive.Title
      data-slot="lightbox-title"
      class={cn('m-0 text-md leading-6 font-semibold text-foreground', local.class)}
      {...others}
    />
  );
}

function LightboxDescription(props: ComponentProps<typeof DialogPrimitive.Description>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DialogPrimitive.Description
      data-slot="lightbox-description"
      class={cn('m-0 text-sm leading-5 text-muted-foreground', local.class)}
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
          class={cn(
            'pointer-events-none invisible fixed end-4 top-4 z-[calc(51+var(--layer-index,0))] size-8 rounded-sm border-0 bg-background p-0 text-foreground opacity-0 transition-[background-color,color,opacity] duration-200 ease-in-out select-none focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring data-[state=open]:pointer-events-auto data-[state=open]:visible data-[state=open]:opacity-100 motion-reduce:transition-none [&>svg]:size-3.5 [&>svg]:shrink-0 [@media(hover:hover)]:[&:not([data-disabled]):hover]:bg-muted',
            local.class,
          )}
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
      class={cn(
        'block max-h-[min(80dvh,100%)] max-w-[min(80vw,100%)] rounded-md object-contain shadow-lg select-none data-[close-on-click]:cursor-zoom-out',
        local.class,
      )}
      onClick={handleClick}
      {...others}
    />
  );
}

function LightboxGallery(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.div
      data-slot="lightbox-gallery"
      class={cn(
        '[&_[data-slot=carousel-indicator-group]]:mx-auto',
        'max-w-[min(72rem,calc(100vw-2rem))] justify-self-center [&_[data-slot=carousel-control]]:items-center [&_[data-slot=carousel-indicator-group]]:w-fit [&_[data-slot=carousel-indicator-group]]:max-w-full [&_[data-slot=carousel-indicator-group]]:flex-wrap [&_[data-slot=carousel-indicator]:has(img)]:h-control-xl [&_[data-slot=carousel-indicator]:has(img)]:w-20 [&_[data-slot=carousel-indicator]:has(img)]:overflow-hidden [&_[data-slot=carousel-indicator]:has(img)]:rounded-md [&_[data-slot=carousel-indicator]:has(img)]:border [&_[data-slot=carousel-indicator]:has(img)]:border-transparent [&_[data-slot=carousel-indicator]:has(img)]:bg-transparent [&_[data-slot=carousel-indicator]:has(img)]:opacity-[0.65] [&_[data-slot=carousel-indicator]:has(img)]:transition [&_[data-slot=carousel-indicator]:has(img)]:duration-150 [&_[data-slot=carousel-indicator]:has(img)]:ease-in-out [&_[data-slot=carousel-indicator]:has(img)_img]:block [&_[data-slot=carousel-indicator]:has(img)_img]:size-full [&_[data-slot=carousel-indicator]:has(img)_img]:object-cover [&_[data-slot=carousel-indicator]:has(img):hover]:opacity-90 [&_[data-slot=carousel-indicator]:has(img)[data-current]]:-translate-y-px [&_[data-slot=carousel-indicator]:has(img)[data-current]]:border-primary [&_[data-slot=carousel-indicator]:has(img)[data-current]]:opacity-100 [&_[data-slot=carousel-item-group]]:aspect-[16/10] [&_[data-slot=carousel-item-group]]:max-h-[68dvh] [&_[data-slot=carousel-item-group]]:bg-black/90 [&_[data-slot=carousel-item]]:grid [&_[data-slot=carousel-item]]:h-full [&_[data-slot=carousel-item]]:place-items-center [&_[data-slot=carousel-item]_img]:block [&_[data-slot=carousel-item]_img]:size-full [&_[data-slot=carousel-item]_img]:rounded-md [&_[data-slot=carousel-item]_img]:object-contain [&_[data-slot=carousel-item]_img]:select-none [&_[data-slot=carousel-item]_video]:block [&_[data-slot=carousel-item]_video]:size-full [&_[data-slot=carousel-item]_video]:rounded-md [&_[data-slot=carousel-item]_video]:object-contain [&_[data-slot=carousel-item]_video]:select-none',
        local.class,
      )}
      {...others}
    />
  );
}

function LightboxHeader(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return <ark.div data-slot="lightbox-header" class={cn('grid gap-1', local.class)} {...others} />;
}

function LightboxBody(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return <ark.div data-slot="lightbox-body" class={cn('grid gap-3', local.class)} {...others} />;
}

function LightboxFooter(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.div
      data-slot="lightbox-footer"
      class={cn(
        'flex items-center justify-end gap-2 text-sm leading-5 text-muted-foreground',
        local.class,
      )}
      {...others}
    />
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