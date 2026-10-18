import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { Popover as PopoverPrimitive, usePopover, usePopoverContext } from '@ark-ui/solid/popover';
import { clsx } from 'clsx';
import type { ComponentProps } from 'solid-js';
import { children, splitProps } from 'solid-js';
import { a11yLabels } from '@/lib/moduix/a11yLabels';
import {
  OverlayPortal,
  OverlayPortalProvider,
  type OverlayPortalProps,
} from '@/lib/moduix/overlayPortal';
import { CloseButton } from '../close-button';
import styles from './Popover.module.css';

type PopoverRootProps = ComponentProps<typeof PopoverPrimitive.Root> & OverlayPortalProps;
type PopoverRootProviderProps = ComponentProps<typeof PopoverPrimitive.RootProvider> &
  Pick<OverlayPortalProps, 'portalRef'>;
type PopoverCloseIconProps = Omit<ComponentProps<typeof PopoverPrimitive.CloseTrigger>, 'asChild'>;

function Popover(props: PopoverRootProps) {
  const [local, others] = splitProps(props, [
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
      />
    </OverlayPortalProvider>
  );
}

function PopoverRootProvider(props: PopoverRootProviderProps) {
  const [local, others] = splitProps(props, ['lazyMount', 'portalRef', 'unmountOnExit', 'value']);

  return (
    <OverlayPortalProvider portalled={local.value().portalled} portalRef={local.portalRef}>
      <PopoverPrimitive.RootProvider
        value={local.value}
        lazyMount={local.lazyMount ?? true}
        unmountOnExit={local.unmountOnExit ?? true}
        {...others}
      />
    </OverlayPortalProvider>
  );
}

function PopoverAnchor(props: ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor {...props} data-slot="popover-anchor" />;
}

function PopoverTrigger(props: ComponentProps<typeof PopoverPrimitive.Trigger>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <PopoverPrimitive.Trigger
      asChild={local.asChild}
      class={clsx(!local.asChild && styles.trigger, local.class)}
      {...others}
      data-slot="popover-trigger"
    />
  );
}

function PopoverIndicator(props: ComponentProps<typeof PopoverPrimitive.Indicator>) {
  return <PopoverPrimitive.Indicator {...props} data-slot="popover-indicator" />;
}

function PopoverPositioner(props: ComponentProps<typeof PopoverPrimitive.Positioner>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <OverlayPortal>
      <PopoverPrimitive.Positioner
        class={clsx(styles.positioner, local.class)}
        {...others}
        data-slot="popover-positioner"
      />
    </OverlayPortal>
  );
}

function PopoverContent(props: ComponentProps<typeof PopoverPrimitive.Content>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <PopoverPrimitive.Content
      class={clsx(styles.content, local.class)}
      {...others}
      data-slot="popover-content"
    />
  );
}

function PopoverArrow(props: ComponentProps<typeof PopoverPrimitive.Arrow>) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <PopoverPrimitive.Arrow
      class={clsx(styles.arrow, local.class)}
      {...others}
      data-slot="popover-arrow"
    >
      {resolvedChildren() ?? <PopoverArrowTip />}
    </PopoverPrimitive.Arrow>
  );
}

function PopoverArrowTip(props: ComponentProps<typeof PopoverPrimitive.ArrowTip>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <PopoverPrimitive.ArrowTip
      class={clsx(styles.arrowTip, local.class)}
      {...others}
      data-slot="popover-arrow-tip"
    />
  );
}

function PopoverTitle(props: ComponentProps<typeof PopoverPrimitive.Title>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <PopoverPrimitive.Title
      class={clsx(styles.title, local.class)}
      {...others}
      data-slot="popover-title"
    />
  );
}

function PopoverDescription(props: ComponentProps<typeof PopoverPrimitive.Description>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <PopoverPrimitive.Description
      class={clsx(styles.description, local.class)}
      {...others}
      data-slot="popover-description"
    />
  );
}

function PopoverCloseTrigger(props: ComponentProps<typeof PopoverPrimitive.CloseTrigger>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <PopoverPrimitive.CloseTrigger
      asChild={local.asChild}
      class={clsx(!local.asChild && styles.closeTrigger, local.class)}
      {...others}
      data-slot="popover-close-trigger"
    />
  );
}

function PopoverCloseIcon(props: PopoverCloseIconProps) {
  const [local, others] = splitProps(props, ['aria-label', 'children', 'class']);

  return (
    <PopoverPrimitive.CloseTrigger
      asChild={(triggerProps) => (
        <CloseButton
          {...triggerProps()}
          data-slot="popover-close-icon"
          aria-label={local['aria-label'] ?? a11yLabels.closePopover}
          class={clsx(styles.closeIcon, local.class)}
        >
          {local.children}
        </CloseButton>
      )}
      {...others}
    />
  );
}

function PopoverHeader(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.div class={clsx(styles.header, local.class)} {...others} data-slot="popover-header" />
  );
}

function PopoverBody(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return <ark.div class={clsx(styles.body, local.class)} {...others} data-slot="popover-body" />;
}

function PopoverFooter(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.div class={clsx(styles.footer, local.class)} {...others} data-slot="popover-footer" />
  );
}

const PopoverContext = PopoverPrimitive.Context;

export {
  Popover,
  PopoverAnchor,
  PopoverArrow,
  PopoverArrowTip,
  PopoverBody,
  PopoverCloseIcon,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverContext,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverIndicator,
  PopoverPositioner,
  PopoverRootProvider,
  PopoverTitle,
  PopoverTrigger,
  usePopover,
  usePopoverContext,
};
export type { PopoverRootProps, PopoverRootProviderProps };

export type {
  PopoverAnchorProps,
  PopoverArrowProps,
  PopoverArrowTipProps,
  PopoverCloseTriggerProps,
  PopoverContentProps,
  PopoverContextProps,
  PopoverDescriptionProps,
  PopoverFocusOutsideEvent,
  PopoverIndicatorProps,
  PopoverInteractOutsideEvent,
  PopoverOpenChangeDetails,
  PopoverPointerDownOutsideEvent,
  PopoverPositionerProps,
  PopoverTitleProps,
  PopoverTriggerProps,
  PopoverTriggerValueChangeDetails,
  UsePopoverContext,
  UsePopoverProps,
  UsePopoverReturn,
} from '@ark-ui/solid/popover';