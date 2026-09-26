import { ark, type HTMLArkProps } from '@ark-ui/solid/factory';
import {
  Tour as TourPrimitive,
  useTour,
  useTourContext,
  waitForElement,
  waitForElementValue,
  waitForEvent,
  waitForPromise,
} from '@ark-ui/solid/tour';
import { clsx } from 'clsx';
import { For, children, splitProps } from 'solid-js';
import type { ComponentProps } from 'solid-js';
import { a11yLabels } from '@/lib/moduix/a11yLabels';
import {
  OverlayPortal,
  OverlayPortalProvider,
  type OverlayPortalProps,
} from '@/lib/moduix/overlayPortal';
import { CloseButton } from '../close-button';
import styles from './Tour.module.css';

type TourRootProps = ComponentProps<typeof TourPrimitive.Root> & OverlayPortalProps;
type TourCloseIconProps = Omit<ComponentProps<typeof TourPrimitive.CloseTrigger>, 'asChild'>;

function Tour(props: TourRootProps) {
  const [local, others] = splitProps(props, [
    'children',
    'lazyMount',
    'portalled',
    'portalRef',
    'unmountOnExit',
  ]);

  return (
    <OverlayPortalProvider portalled={local.portalled} portalRef={local.portalRef}>
      <TourPrimitive.Root
        lazyMount={local.lazyMount ?? true}
        unmountOnExit={local.unmountOnExit ?? true}
        {...others}
      >
        {local.children}
      </TourPrimitive.Root>
    </OverlayPortalProvider>
  );
}

function TourBackdrop(props: ComponentProps<typeof TourPrimitive.Backdrop>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <OverlayPortal>
      <TourPrimitive.Backdrop
        class={clsx(styles.backdrop, local.class)}
        {...others}
        data-slot="tour-backdrop"
      />
    </OverlayPortal>
  );
}

function TourSpotlight(props: ComponentProps<typeof TourPrimitive.Spotlight>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <OverlayPortal>
      <TourPrimitive.Spotlight
        class={clsx(styles.spotlight, local.class)}
        {...others}
        data-slot="tour-spotlight"
      />
    </OverlayPortal>
  );
}

function TourPositioner(props: ComponentProps<typeof TourPrimitive.Positioner>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <OverlayPortal>
      <TourPrimitive.Positioner
        class={clsx(styles.positioner, local.class)}
        {...others}
        data-slot="tour-positioner"
      />
    </OverlayPortal>
  );
}

function TourContent(props: ComponentProps<typeof TourPrimitive.Content>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TourPrimitive.Content
      class={clsx(styles.content, local.class)}
      {...others}
      data-slot="tour-content"
    />
  );
}

function TourArrow(props: ComponentProps<typeof TourPrimitive.Arrow>) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <TourPrimitive.Arrow class={clsx(styles.arrow, local.class)} {...others} data-slot="tour-arrow">
      {resolvedChildren() ?? <TourArrowTip />}
    </TourPrimitive.Arrow>
  );
}

function TourArrowTip(props: ComponentProps<typeof TourPrimitive.ArrowTip>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TourPrimitive.ArrowTip
      class={clsx(styles.arrowTip, local.class)}
      {...others}
      data-slot="tour-arrow-tip"
    />
  );
}

function TourTitle(props: ComponentProps<typeof TourPrimitive.Title>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TourPrimitive.Title
      class={clsx(styles.title, local.class)}
      {...others}
      data-slot="tour-title"
    />
  );
}

function TourDescription(props: ComponentProps<typeof TourPrimitive.Description>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TourPrimitive.Description
      class={clsx(styles.description, local.class)}
      {...others}
      data-slot="tour-description"
    />
  );
}

function TourProgressText(props: ComponentProps<typeof TourPrimitive.ProgressText>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TourPrimitive.ProgressText
      class={clsx(styles.progressText, local.class)}
      {...others}
      data-slot="tour-progress-text"
    />
  );
}

function TourBody(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return <ark.div class={clsx(styles.body, local.class)} {...others} data-slot="tour-body" />;
}

function TourCloseTrigger(props: ComponentProps<typeof TourPrimitive.CloseTrigger>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <TourPrimitive.CloseTrigger
      asChild={local.asChild}
      class={clsx(!local.asChild && styles.closeTrigger, local.class)}
      {...others}
      data-slot="tour-close-trigger"
    />
  );
}

function TourCloseIcon(props: TourCloseIconProps) {
  const [local, others] = splitProps(props, ['aria-label', 'aria-labelledby', 'children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <TourPrimitive.CloseTrigger
      asChild={(triggerProps) => (
        <CloseButton
          {...triggerProps()}
          data-slot="tour-close-icon"
          aria-label={local['aria-label'] ?? a11yLabels.closeTour}
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

function TourControl(props: ComponentProps<typeof TourPrimitive.Control>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TourPrimitive.Control
      class={clsx(styles.control, local.class)}
      {...others}
      data-slot="tour-control"
    />
  );
}

function TourActionTrigger(props: ComponentProps<typeof TourPrimitive.ActionTrigger>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <TourPrimitive.ActionTrigger
      asChild={local.asChild}
      class={clsx(!local.asChild && styles.actionTrigger, local.class)}
      {...others}
      data-slot="tour-action-trigger"
    />
  );
}

const TourActions = TourPrimitive.Actions;

function TourActionList(props: { class?: string }) {
  const [local] = splitProps(props, ['class']);

  return (
    <TourPrimitive.Actions>
      {(actions) => (
        <For each={actions()}>
          {(action) => <TourActionTrigger action={action} class={local.class} />}
        </For>
      )}
    </TourPrimitive.Actions>
  );
}

const TourContext = TourPrimitive.Context;

export {
  Tour,
  TourActionList,
  TourActionTrigger,
  TourActions,
  TourArrow,
  TourArrowTip,
  TourBackdrop,
  TourBody,
  TourCloseIcon,
  TourCloseTrigger,
  TourContent,
  TourContext,
  TourControl,
  TourDescription,
  TourPositioner,
  TourProgressText,
  TourSpotlight,
  TourTitle,
  useTour,
  useTourContext,
  waitForElement,
  waitForElementValue,
  waitForEvent,
  waitForPromise,
};
export type { TourCloseIconProps, TourRootProps };