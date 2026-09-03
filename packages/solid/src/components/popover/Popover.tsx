import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { Popover as PopoverPrimitive, usePopover, usePopoverContext } from '@ark-ui/solid/popover';
import { clsx } from 'clsx';
import type { ComponentProps } from 'solid-js';
import { children, splitProps } from 'solid-js';
import {
  OverlayPortal,
  OverlayPortalProvider,
  type OverlayPortalProps,
} from '@/lib/moduix/overlayPortal';
import { CloseButton } from '../close-button';
import styles from './Popover.module.css';

const DEFAULT_CLOSE_BUTTON_LABEL = 'Close popover';

type PopoverRootProps = ComponentProps<typeof PopoverPrimitive.Root> & OverlayPortalProps;
type PopoverRootProviderProps = ComponentProps<typeof PopoverPrimitive.RootProvider> & {
  portalRef?: OverlayPortalProps['portalRef'];
};
type PopoverCloseIconProps = Omit<ComponentProps<typeof PopoverPrimitive.CloseTrigger>, 'asChild'>;

function PopoverRoot(props: PopoverRootProps) {
  const [local, others] = splitProps(props, [
    'children',
    'lazyMount',
    'modal',
    'portalled',
    'portalRef',
    'unmountOnExit',
  ]);
  const resolvedPortalled = () => local.modal || local.portalled;

  return (
    <OverlayPortalProvider portalled={resolvedPortalled()} portalRef={local.portalRef}>
      <PopoverPrimitive.Root
        lazyMount={local.lazyMount ?? true}
        modal={local.modal}
        portalled={resolvedPortalled()}
        unmountOnExit={local.unmountOnExit ?? true}
        {...others}
      >
        {local.children}
      </PopoverPrimitive.Root>
    </OverlayPortalProvider>
  );
}

function PopoverRootProvider(props: PopoverRootProviderProps) {
  const [local, others] = splitProps(props, [
    'children',
    'lazyMount',
    'portalRef',
    'unmountOnExit',
    'value',
  ]);
  return (
    <OverlayPortalProvider portalled={props.value().portalled} portalRef={local.portalRef}>
      <PopoverPrimitive.RootProvider
        value={local.value}
        lazyMount={local.lazyMount ?? true}
        unmountOnExit={local.unmountOnExit ?? true}
        {...others}
      >
        {local.children}
      </PopoverPrimitive.RootProvider>
    </OverlayPortalProvider>
  );
}

function PopoverAnchor(props: ComponentProps<typeof PopoverPrimitive.Anchor>) {
  const [local, others] = splitProps(props, ['class']);

  return <PopoverPrimitive.Anchor data-slot="popover-anchor" class={local.class} {...others} />;
}

function PopoverTrigger(props: ComponentProps<typeof PopoverPrimitive.Trigger>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <PopoverPrimitive.Trigger
      asChild={local.asChild}
      data-slot="popover-trigger"
      class={clsx(!local.asChild && styles.trigger, local.class)}
      {...others}
    />
  );
}

function PopoverIndicator(props: ComponentProps<typeof PopoverPrimitive.Indicator>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <PopoverPrimitive.Indicator data-slot="popover-indicator" class={local.class} {...others} />
  );
}

function PopoverPositioner(props: ComponentProps<typeof PopoverPrimitive.Positioner>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <OverlayPortal>
      <PopoverPrimitive.Positioner
        data-slot="popover-positioner"
        class={clsx(styles.positioner, local.class)}
        {...others}
      />
    </OverlayPortal>
  );
}

function PopoverContent(props: ComponentProps<typeof PopoverPrimitive.Content>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <PopoverPrimitive.Content
      data-slot="popover-content"
      class={clsx(styles.content, local.class)}
      {...others}
    />
  );
}

function PopoverArrow(props: ComponentProps<typeof PopoverPrimitive.Arrow>) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <PopoverPrimitive.Arrow
      data-slot="popover-arrow"
      class={clsx(styles.arrow, local.class)}
      {...others}
    >
      {resolvedChildren() ?? <PopoverArrowTip />}
    </PopoverPrimitive.Arrow>
  );
}

function PopoverArrowTip(props: ComponentProps<typeof PopoverPrimitive.ArrowTip>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <PopoverPrimitive.ArrowTip
      data-slot="popover-arrow-tip"
      class={clsx(styles.arrowTip, local.class)}
      {...others}
    />
  );
}

function PopoverTitle(props: ComponentProps<typeof PopoverPrimitive.Title>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <PopoverPrimitive.Title
      data-slot="popover-title"
      class={clsx(styles.title, local.class)}
      {...others}
    />
  );
}

function PopoverDescription(props: ComponentProps<typeof PopoverPrimitive.Description>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <PopoverPrimitive.Description
      data-slot="popover-description"
      class={clsx(styles.description, local.class)}
      {...others}
    />
  );
}

function PopoverCloseTrigger(props: ComponentProps<typeof PopoverPrimitive.CloseTrigger>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <PopoverPrimitive.CloseTrigger
      asChild={local.asChild}
      data-slot="popover-close-trigger"
      class={clsx(!local.asChild && styles.closeTrigger, local.class)}
      {...others}
    />
  );
}

function PopoverCloseIcon(props: PopoverCloseIconProps) {
  const [local, others] = splitProps(props, ['aria-label', 'aria-labelledby', 'children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <PopoverPrimitive.CloseTrigger
      asChild={(triggerProps) => (
        <CloseButton.Root
          {...triggerProps()}
          data-slot="popover-close-icon"
          aria-label={local['aria-label'] ?? DEFAULT_CLOSE_BUTTON_LABEL}
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

function PopoverHeader(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.div data-slot="popover-header" class={clsx(styles.header, local.class)} {...others} />
  );
}

function PopoverBody(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return <ark.div data-slot="popover-body" class={clsx(styles.body, local.class)} {...others} />;
}

function PopoverFooter(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.div data-slot="popover-footer" class={clsx(styles.footer, local.class)} {...others} />
  );
}

const Popover = Object.assign(PopoverRoot, {
  Root: PopoverRoot,
  RootProvider: PopoverRootProvider,
  Context: PopoverPrimitive.Context,
  Anchor: PopoverAnchor,
  Trigger: PopoverTrigger,
  Indicator: PopoverIndicator,
  Positioner: PopoverPositioner,
  Content: PopoverContent,
  Arrow: PopoverArrow,
  ArrowTip: PopoverArrowTip,
  Title: PopoverTitle,
  Description: PopoverDescription,
  CloseTrigger: PopoverCloseTrigger,
  CloseIcon: PopoverCloseIcon,
  Header: PopoverHeader,
  Body: PopoverBody,
  Footer: PopoverFooter,
});

export { Popover, usePopover, usePopoverContext };
export type { PopoverRootProps, PopoverRootProviderProps };