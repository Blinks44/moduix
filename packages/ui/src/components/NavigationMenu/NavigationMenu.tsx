import { NavigationMenu as NavigationMenuPrimitive } from '@base-ui/react/navigation-menu';
import * as React from 'react';
import { ChevronDownSmallIcon, PopupArrowIcon } from '@/primitives';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './NavigationMenu.module.css';

type NavigationMenuPopupClassNames = {
  portal?: NavigationMenuPrimitive.Portal.Props['className'];
  backdrop?: NavigationMenuPrimitive.Backdrop.Props['className'];
  positioner?: NavigationMenuPrimitive.Positioner.Props['className'];
  arrow?: NavigationMenuPrimitive.Arrow.Props['className'];
  viewport?: NavigationMenuPrimitive.Viewport.Props['className'];
};

type NavigationMenuPopupSlotProps = {
  portal?: Omit<NavigationMenuPrimitive.Portal.Props, 'className' | 'children'>;
  backdrop?: Omit<NavigationMenuPrimitive.Backdrop.Props, 'className'>;
  positioner?: Omit<NavigationMenuPrimitive.Positioner.Props, 'className' | 'children'>;
  arrow?: Omit<NavigationMenuPrimitive.Arrow.Props, 'className' | 'children'>;
  viewport?: Omit<NavigationMenuPrimitive.Viewport.Props, 'className'>;
};

type NavigationMenuPopupOptions = NavigationMenuPrimitive.Popup.Props & {
  side?: NavigationMenuPrimitive.Positioner.Props['side'];
  sideOffset?: NavigationMenuPrimitive.Positioner.Props['sideOffset'];
  align?: NavigationMenuPrimitive.Positioner.Props['align'];
  alignOffset?: NavigationMenuPrimitive.Positioner.Props['alignOffset'];
  arrowPadding?: NavigationMenuPrimitive.Positioner.Props['arrowPadding'];
  anchor?: NavigationMenuPrimitive.Positioner.Props['anchor'];
  collisionAvoidance?: NavigationMenuPrimitive.Positioner.Props['collisionAvoidance'];
  collisionBoundary?: NavigationMenuPrimitive.Positioner.Props['collisionBoundary'];
  collisionPadding?: NavigationMenuPrimitive.Positioner.Props['collisionPadding'];
  sticky?: NavigationMenuPrimitive.Positioner.Props['sticky'];
  positionMethod?: NavigationMenuPrimitive.Positioner.Props['positionMethod'];
  disableAnchorTracking?: NavigationMenuPrimitive.Positioner.Props['disableAnchorTracking'];
  classNames?: NavigationMenuPopupClassNames;
  slotProps?: NavigationMenuPopupSlotProps;
  container?: NavigationMenuPrimitive.Portal.Props['container'];
  arrow?: React.ReactNode;
  showArrow?: boolean;
  withBackdrop?: boolean;
};

type NavigationMenuClassNames = {
  viewport?: NavigationMenuPrimitive.Viewport.Props['className'];
};

type NavigationMenuSlotProps = {
  viewport?: Omit<NavigationMenuPrimitive.Viewport.Props, 'className'>;
};

type NavigationMenuTriggerClassNames = {
  icon?: NavigationMenuIconProps['className'];
};

type NavigationMenuTriggerSlotProps = {
  icon?: Omit<NavigationMenuIconProps, 'children' | 'className'>;
};

function NavigationMenu<Value = unknown>({
  className,
  children,
  classNames,
  slotProps,
  popupContent = {},
  withViewport = false,
  ...props
}: NavigationMenuProps<Value>) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu-root"
      className={mergeClassName(className, styles.root)}
      {...props}
    >
      {children}
      {withViewport ? (
        <NavigationMenuViewport className={classNames?.viewport} {...slotProps?.viewport} />
      ) : null}
      {popupContent ? <NavigationMenuPopupContent {...popupContent} /> : null}
    </NavigationMenuPrimitive.Root>
  );
}

function NavigationMenuList({ className, ...props }: NavigationMenuPrimitive.List.Props) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={mergeClassName(className, styles.list)}
      {...props}
    />
  );
}

function NavigationMenuItem(props: NavigationMenuPrimitive.Item.Props) {
  return <NavigationMenuPrimitive.Item data-slot="navigation-menu-item" {...props} />;
}

function NavigationMenuTrigger({
  className,
  children,
  icon,
  hideIcon = false,
  classNames,
  slotProps,
  ...props
}: NavigationMenuTriggerProps) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={mergeClassName(className, styles.trigger)}
      {...props}
    >
      {children}
      {!hideIcon && (
        <NavigationMenuIcon {...slotProps?.icon} className={classNames?.icon}>
          {icon}
        </NavigationMenuIcon>
      )}
    </NavigationMenuPrimitive.Trigger>
  );
}

function NavigationMenuIcon({ className, children, ...props }: NavigationMenuPrimitive.Icon.Props) {
  return (
    <NavigationMenuPrimitive.Icon
      data-slot="navigation-menu-icon"
      className={mergeClassName(className, styles.icon)}
      {...props}
    >
      {children ?? <ChevronDownSmallIcon />}
    </NavigationMenuPrimitive.Icon>
  );
}

function NavigationMenuContent({ className, ...props }: NavigationMenuPrimitive.Content.Props) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={mergeClassName(className, styles.content)}
      {...props}
    />
  );
}

function NavigationMenuLink({ className, ...props }: NavigationMenuPrimitive.Link.Props) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={mergeClassName(className, styles.link)}
      {...props}
    />
  );
}

function NavigationMenuPortal({ className, ...props }: NavigationMenuPrimitive.Portal.Props) {
  return (
    <NavigationMenuPrimitive.Portal
      data-slot="navigation-menu-portal"
      className={mergeClassName(className, styles.portal)}
      {...props}
    />
  );
}

function NavigationMenuBackdrop({ className, ...props }: NavigationMenuPrimitive.Backdrop.Props) {
  return (
    <NavigationMenuPrimitive.Backdrop
      data-slot="navigation-menu-backdrop"
      className={mergeClassName(className, styles.backdrop)}
      {...props}
    />
  );
}

function NavigationMenuPositioner({
  className,
  ...props
}: NavigationMenuPrimitive.Positioner.Props) {
  return (
    <NavigationMenuPrimitive.Positioner
      data-slot="navigation-menu-positioner"
      className={mergeClassName(className, styles.positioner)}
      {...props}
    />
  );
}

function NavigationMenuPopup({ className, ...props }: NavigationMenuPrimitive.Popup.Props) {
  return (
    <NavigationMenuPrimitive.Popup
      data-slot="navigation-menu-popup"
      className={mergeClassName(className, styles.popup)}
      {...props}
    />
  );
}

function NavigationMenuArrow({
  className,
  children,
  ...props
}: NavigationMenuPrimitive.Arrow.Props) {
  return (
    <NavigationMenuPrimitive.Arrow
      data-slot="navigation-menu-arrow"
      className={mergeClassName(className, styles.arrow)}
      {...props}
    >
      {children ?? <ArrowSvg />}
    </NavigationMenuPrimitive.Arrow>
  );
}

function NavigationMenuViewport({ className, ...props }: NavigationMenuPrimitive.Viewport.Props) {
  return (
    <NavigationMenuPrimitive.Viewport
      data-slot="navigation-menu-viewport"
      className={mergeClassName(className, styles.viewport)}
      {...props}
    />
  );
}

function NavigationMenuPopupContent({
  className,
  classNames,
  slotProps,
  arrow,
  showArrow = true,
  withBackdrop = false,
  side,
  sideOffset,
  align,
  alignOffset,
  arrowPadding,
  anchor,
  collisionAvoidance,
  collisionBoundary,
  collisionPadding,
  sticky,
  positionMethod,
  disableAnchorTracking,
  container,
  children,
  ...props
}: NavigationMenuPopupOptions) {
  const positionerProps = slotProps?.positioner;
  const resolvedSide = side ?? positionerProps?.side;
  const resolvedSideOffset = sideOffset ?? positionerProps?.sideOffset ?? 10;
  const resolvedAlign = align ?? positionerProps?.align;
  const resolvedAlignOffset = alignOffset ?? positionerProps?.alignOffset;
  const resolvedArrowPadding = arrowPadding ?? positionerProps?.arrowPadding;
  const resolvedAnchor = anchor ?? positionerProps?.anchor;
  const resolvedCollisionAvoidance = collisionAvoidance ?? positionerProps?.collisionAvoidance;
  const resolvedCollisionBoundary = collisionBoundary ?? positionerProps?.collisionBoundary;
  const resolvedCollisionPadding = collisionPadding ??
    positionerProps?.collisionPadding ?? { top: 5, bottom: 5, left: 20, right: 20 };
  const resolvedSticky = sticky ?? positionerProps?.sticky;
  const resolvedPositionMethod = positionMethod ?? positionerProps?.positionMethod;
  const resolvedDisableAnchorTracking =
    disableAnchorTracking ?? positionerProps?.disableAnchorTracking;
  const { container: slotPropsContainer, ...portalSlotProps } = slotProps?.portal ?? {};
  const portalContainer = container ?? slotPropsContainer;

  return (
    <NavigationMenuPortal
      className={classNames?.portal}
      container={portalContainer}
      {...portalSlotProps}
    >
      {withBackdrop ? (
        <NavigationMenuBackdrop className={classNames?.backdrop} {...slotProps?.backdrop} />
      ) : null}
      <NavigationMenuPositioner
        {...positionerProps}
        side={resolvedSide}
        sideOffset={resolvedSideOffset}
        align={resolvedAlign}
        alignOffset={resolvedAlignOffset}
        arrowPadding={resolvedArrowPadding}
        anchor={resolvedAnchor}
        collisionAvoidance={resolvedCollisionAvoidance}
        collisionBoundary={resolvedCollisionBoundary}
        collisionPadding={resolvedCollisionPadding}
        sticky={resolvedSticky}
        positionMethod={resolvedPositionMethod}
        disableAnchorTracking={resolvedDisableAnchorTracking}
        className={classNames?.positioner}
      >
        <NavigationMenuPopup className={className} {...props}>
          {showArrow ? (
            <NavigationMenuArrow className={classNames?.arrow} {...slotProps?.arrow}>
              {arrow}
            </NavigationMenuArrow>
          ) : null}
          {children}
          <NavigationMenuViewport className={classNames?.viewport} {...slotProps?.viewport} />
        </NavigationMenuPopup>
      </NavigationMenuPositioner>
    </NavigationMenuPortal>
  );
}

function ArrowSvg(props: React.ComponentProps<'svg'>) {
  return (
    <PopupArrowIcon
      fillClassName={styles.arrowFill}
      outerStrokeClassName={styles.arrowOuterStroke}
      innerStrokeClassName={styles.arrowInnerStroke}
      {...props}
    />
  );
}

type NavigationMenuProps<Value = unknown> = NavigationMenuPrimitive.Root.Props<Value> & {
  classNames?: NavigationMenuClassNames;
  slotProps?: NavigationMenuSlotProps;
  popupContent?: false | NavigationMenuPopupOptions;
  withViewport?: boolean;
};
type NavigationMenuValue<Value = unknown> = NavigationMenuPrimitive.Root.Value<Value>;
type NavigationMenuListProps = NavigationMenuPrimitive.List.Props;
type NavigationMenuItemProps = NavigationMenuPrimitive.Item.Props;
type NavigationMenuContentProps = NavigationMenuPrimitive.Content.Props;
type NavigationMenuTriggerProps = NavigationMenuPrimitive.Trigger.Props & {
  /**
   * Icon rendered at the end of the trigger. Pass `hideIcon` to remove it.
   */
  icon?: React.ReactNode;
  /**
   * Removes the default trigger icon.
   */
  hideIcon?: boolean;
  /**
   * Classes for internal slots rendered by the trigger.
   */
  classNames?: NavigationMenuTriggerClassNames;
  /**
   * Props for internal slots rendered by the trigger.
   */
  slotProps?: NavigationMenuTriggerSlotProps;
};
type NavigationMenuIconProps = NavigationMenuPrimitive.Icon.Props;
type NavigationMenuLinkProps = NavigationMenuPrimitive.Link.Props;

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuIcon,
  NavigationMenuContent,
  NavigationMenuLink,
};

export type {
  NavigationMenuValue,
  NavigationMenuProps,
  NavigationMenuListProps,
  NavigationMenuItemProps,
  NavigationMenuTriggerProps,
  NavigationMenuIconProps,
  NavigationMenuContentProps,
  NavigationMenuLinkProps,
  NavigationMenuClassNames,
  NavigationMenuSlotProps,
  NavigationMenuTriggerClassNames,
  NavigationMenuTriggerSlotProps,
  NavigationMenuPopupClassNames,
  NavigationMenuPopupSlotProps,
  NavigationMenuPopupOptions,
};