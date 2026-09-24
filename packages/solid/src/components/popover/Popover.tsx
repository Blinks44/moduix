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
type PopoverRootProviderProps = ComponentProps<typeof PopoverPrimitive.RootProvider> & {
  portalRef?: OverlayPortalProps['portalRef'];
};
type PopoverCloseIconProps = Omit<ComponentProps<typeof PopoverPrimitive.CloseTrigger>, 'asChild'>;

function Popover(props: PopoverRootProps) {
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

  return <PopoverPrimitive.Anchor class={local.class} {...others} data-slot="popover-anchor" />;
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
  const [local, others] = splitProps(props, ['class']);

  return (
    <PopoverPrimitive.Indicator class={local.class} {...others} data-slot="popover-indicator" />
  );
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
  const [local, others] = splitProps(props, ['aria-label', 'aria-labelledby', 'children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <PopoverPrimitive.CloseTrigger
      asChild={(triggerProps) => (
        <CloseButton
          {...triggerProps()}
          data-slot="popover-close-icon"
          aria-label={local['aria-label'] ?? a11yLabels.closePopover}
          aria-labelledby={local['aria-labelledby']}
          class={clsx(styles.closeIcon, local.class)}
        >
          {resolvedChildren()}
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