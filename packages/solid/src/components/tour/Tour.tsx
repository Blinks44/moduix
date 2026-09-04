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
import {
  OverlayPortal,
  OverlayPortalProvider,
  type OverlayPortalProps,
} from '@/lib/moduix/overlayPortal';
import { CloseButton } from '../close-button';
import styles from './Tour.module.css';

const DEFAULT_CLOSE_BUTTON_LABEL = 'Close tour';

type TourRootProps = ComponentProps<typeof TourPrimitive.Root> & OverlayPortalProps;
type TourCloseIconProps = Omit<ComponentProps<typeof TourPrimitive.CloseTrigger>, 'asChild'>;

function TourRoot(props: TourRootProps) {
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
        data-slot="tour-backdrop"
        class={clsx(styles.backdrop, local.class)}
        {...others}
      />
    </OverlayPortal>
  );
}

function TourSpotlight(props: ComponentProps<typeof TourPrimitive.Spotlight>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <OverlayPortal>
      <TourPrimitive.Spotlight
        data-slot="tour-spotlight"
        class={clsx(styles.spotlight, local.class)}
        {...others}
      />
    </OverlayPortal>
  );
}

function TourPositioner(props: ComponentProps<typeof TourPrimitive.Positioner>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <OverlayPortal>
      <TourPrimitive.Positioner
        data-slot="tour-positioner"
        class={clsx(styles.positioner, local.class)}
        {...others}
      />
    </OverlayPortal>
  );
}

function TourContent(props: ComponentProps<typeof TourPrimitive.Content>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TourPrimitive.Content
      data-slot="tour-content"
      class={clsx(styles.content, local.class)}
      {...others}
    />
  );
}

function TourArrow(props: ComponentProps<typeof TourPrimitive.Arrow>) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <TourPrimitive.Arrow data-slot="tour-arrow" class={clsx(styles.arrow, local.class)} {...others}>
      {resolvedChildren() ?? <TourArrowTip />}
    </TourPrimitive.Arrow>
  );
}

function TourArrowTip(props: ComponentProps<typeof TourPrimitive.ArrowTip>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TourPrimitive.ArrowTip
      data-slot="tour-arrow-tip"
      class={clsx(styles.arrowTip, local.class)}
      {...others}
    />
  );
}

function TourTitle(props: ComponentProps<typeof TourPrimitive.Title>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TourPrimitive.Title
      data-slot="tour-title"
      class={clsx(styles.title, local.class)}
      {...others}
    />
  );
}

function TourDescription(props: ComponentProps<typeof TourPrimitive.Description>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TourPrimitive.Description
      data-slot="tour-description"
      class={clsx(styles.description, local.class)}
      {...others}
    />
  );
}

function TourProgressText(props: ComponentProps<typeof TourPrimitive.ProgressText>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TourPrimitive.ProgressText
      data-slot="tour-progress-text"
      class={clsx(styles.progressText, local.class)}
      {...others}
    />
  );
}

function TourBody(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return <ark.div data-slot="tour-body" class={clsx(styles.body, local.class)} {...others} />;
}

function TourCloseTrigger(props: ComponentProps<typeof TourPrimitive.CloseTrigger>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <TourPrimitive.CloseTrigger
      asChild={local.asChild}
      data-slot="tour-close-trigger"
      class={clsx(!local.asChild && styles.closeTrigger, local.class)}
      {...others}
    />
  );
}

function TourCloseIcon(props: TourCloseIconProps) {
  const [local, others] = splitProps(props, ['aria-label', 'aria-labelledby', 'children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <TourPrimitive.CloseTrigger
      asChild={(triggerProps) => (
        <CloseButton.Root
          {...triggerProps()}
          data-slot="tour-close-icon"
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

function TourControl(props: ComponentProps<typeof TourPrimitive.Control>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TourPrimitive.Control
      data-slot="tour-control"
      class={clsx(styles.control, local.class)}
      {...others}
    />
  );
}

function TourActionTrigger(props: ComponentProps<typeof TourPrimitive.ActionTrigger>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <TourPrimitive.ActionTrigger
      asChild={local.asChild}
      data-slot="tour-action-trigger"
      class={clsx(!local.asChild && styles.actionTrigger, local.class)}
      {...others}
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

const Tour = Object.assign(TourRoot, {
  Root: TourRoot,
  Context: TourPrimitive.Context,
  Backdrop: TourBackdrop,
  Spotlight: TourSpotlight,
  Positioner: TourPositioner,
  Content: TourContent,
  Arrow: TourArrow,
  ArrowTip: TourArrowTip,
  Title: TourTitle,
  Description: TourDescription,
  ProgressText: TourProgressText,
  Body: TourBody,
  CloseTrigger: TourCloseTrigger,
  CloseIcon: TourCloseIcon,
  Control: TourControl,
  Actions: TourActions,
  ActionList: TourActionList,
  ActionTrigger: TourActionTrigger,
});

export {
  Tour,
  useTour,
  useTourContext,
  waitForElement,
  waitForElementValue,
  waitForEvent,
  waitForPromise,
};
export type { TourCloseIconProps, TourRootProps };