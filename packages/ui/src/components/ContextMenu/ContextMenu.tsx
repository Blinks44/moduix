import { ContextMenu as ContextMenuPrimitive } from '@base-ui/react/context-menu';
import { clsx } from 'clsx';
import * as React from 'react';
import { CheckSmallIcon, ChevronRightLargeIcon, PopupArrowIcon } from '@/primitives';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './ContextMenu.module.css';

type ContextMenuContentClassNames = {
  portal?: ContextMenuPrimitive.Portal.Props['className'];
  backdrop?: ContextMenuPrimitive.Backdrop.Props['className'];
  positioner?: ContextMenuPrimitive.Positioner.Props['className'];
};

type ContextMenuContentProps = ContextMenuPrimitive.Popup.Props &
  Pick<
    ContextMenuPrimitive.Positioner.Props,
    | 'side'
    | 'sideOffset'
    | 'align'
    | 'alignOffset'
    | 'arrowPadding'
    | 'anchor'
    | 'collisionAvoidance'
    | 'collisionBoundary'
    | 'collisionPadding'
    | 'sticky'
    | 'positionMethod'
    | 'disableAnchorTracking'
  > & {
    classNames?: ContextMenuContentClassNames;
    container?: ContextMenuPrimitive.Portal.Props['container'];
    withBackdrop?: boolean;
    portalProps?: Omit<ContextMenuPrimitive.Portal.Props, 'className' | 'children'>;
    backdropProps?: Omit<ContextMenuPrimitive.Backdrop.Props, 'className'>;
    positionerProps?: Omit<ContextMenuPrimitive.Positioner.Props, 'className' | 'children'>;
  };

type IndicatorPosition = 'start' | 'end';
type ContextMenuRadioItemProps = ContextMenuPrimitive.RadioItem.Props & {
  indicator?: IndicatorPosition;
};
type ContextMenuCheckboxItemProps = ContextMenuPrimitive.CheckboxItem.Props & {
  indicator?: IndicatorPosition;
};

const ContextMenu = ContextMenuPrimitive.Root;
const ContextMenuSubmenu = ContextMenuPrimitive.SubmenuRoot;

function ContextMenuTrigger({ className, ...props }: ContextMenuPrimitive.Trigger.Props) {
  return (
    <ContextMenuPrimitive.Trigger
      data-slot="context-menu-trigger"
      className={mergeClassName(className, styles.trigger)}
      {...props}
    />
  );
}

function ContextMenuPortal({ className, ...props }: ContextMenuPrimitive.Portal.Props) {
  return (
    <ContextMenuPrimitive.Portal data-slot="context-menu-portal" className={className} {...props} />
  );
}

function ContextMenuBackdrop({ className, ...props }: ContextMenuPrimitive.Backdrop.Props) {
  return (
    <ContextMenuPrimitive.Backdrop
      data-slot="context-menu-backdrop"
      className={mergeClassName(className, styles.backdrop)}
      {...props}
    />
  );
}

function ContextMenuPositioner({ className, ...props }: ContextMenuPrimitive.Positioner.Props) {
  return (
    <ContextMenuPrimitive.Positioner
      data-slot="context-menu-positioner"
      className={mergeClassName(className, styles.positioner)}
      {...props}
    />
  );
}

function ContextMenuPopup({ className, ...props }: ContextMenuPrimitive.Popup.Props) {
  return (
    <ContextMenuPrimitive.Popup
      data-slot="context-menu-popup"
      className={mergeClassName(className, styles.popup)}
      {...props}
    />
  );
}

function ContextMenuArrow({ className, children, ...props }: ContextMenuPrimitive.Arrow.Props) {
  return (
    <ContextMenuPrimitive.Arrow
      data-slot="context-menu-arrow"
      className={mergeClassName(className, styles.arrow)}
      {...props}
    >
      {children ?? <ArrowSvg />}
    </ContextMenuPrimitive.Arrow>
  );
}

function ContextMenuContent({
  className,
  classNames,
  container,
  withBackdrop = false,
  portalProps,
  backdropProps,
  positionerProps,
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
  ...props
}: ContextMenuContentProps) {
  const { container: portalPropsContainer, ...restPortalProps } = portalProps ?? {};
  const {
    side: positionerPropsSide,
    sideOffset: positionerPropsSideOffset,
    align: positionerPropsAlign,
    alignOffset: positionerPropsAlignOffset,
    arrowPadding: positionerPropsArrowPadding,
    anchor: positionerPropsAnchor,
    collisionAvoidance: positionerPropsCollisionAvoidance,
    collisionBoundary: positionerPropsCollisionBoundary,
    collisionPadding: positionerPropsCollisionPadding,
    sticky: positionerPropsSticky,
    positionMethod: positionerPropsPositionMethod,
    disableAnchorTracking: positionerPropsDisableAnchorTracking,
    ...restPositionerProps
  } = positionerProps ?? {};
  const portalContainer = container ?? portalPropsContainer;

  return (
    <ContextMenuPortal
      className={classNames?.portal}
      container={portalContainer}
      {...restPortalProps}
    >
      {withBackdrop ? (
        <ContextMenuBackdrop className={classNames?.backdrop} {...backdropProps} />
      ) : null}
      <ContextMenuPositioner
        side={side ?? positionerPropsSide}
        sideOffset={sideOffset ?? positionerPropsSideOffset ?? 8}
        align={align ?? positionerPropsAlign}
        alignOffset={alignOffset ?? positionerPropsAlignOffset}
        arrowPadding={arrowPadding ?? positionerPropsArrowPadding}
        anchor={anchor ?? positionerPropsAnchor}
        collisionAvoidance={collisionAvoidance ?? positionerPropsCollisionAvoidance}
        collisionBoundary={collisionBoundary ?? positionerPropsCollisionBoundary}
        collisionPadding={collisionPadding ?? positionerPropsCollisionPadding}
        sticky={sticky ?? positionerPropsSticky}
        positionMethod={positionMethod ?? positionerPropsPositionMethod}
        disableAnchorTracking={disableAnchorTracking ?? positionerPropsDisableAnchorTracking}
        className={classNames?.positioner}
        {...restPositionerProps}
      >
        <ContextMenuPopup className={className} {...props} />
      </ContextMenuPositioner>
    </ContextMenuPortal>
  );
}

function ContextMenuSubmenuContent({
  sideOffset = getSubmenuOffset,
  alignOffset = getSubmenuOffset,
  ...props
}: ContextMenuContentProps) {
  return <ContextMenuContent sideOffset={sideOffset} alignOffset={alignOffset} {...props} />;
}

function ContextMenuItem({ className, ...props }: ContextMenuPrimitive.Item.Props) {
  return (
    <ContextMenuPrimitive.Item
      data-slot="context-menu-item"
      className={mergeClassName(className, styles.item)}
      {...props}
    />
  );
}

function ContextMenuLinkItem({ className, ...props }: ContextMenuPrimitive.LinkItem.Props) {
  return (
    <ContextMenuPrimitive.LinkItem
      data-slot="context-menu-link-item"
      className={mergeClassName(className, styles.linkItem)}
      {...props}
    />
  );
}

function ContextMenuSeparator({ className, ...props }: ContextMenuPrimitive.Separator.Props) {
  return (
    <ContextMenuPrimitive.Separator
      data-slot="context-menu-separator"
      className={mergeClassName(className, styles.separator)}
      {...props}
    />
  );
}

function ContextMenuGroup({ className, ...props }: ContextMenuPrimitive.Group.Props) {
  return (
    <ContextMenuPrimitive.Group
      data-slot="context-menu-group"
      className={mergeClassName(className, styles.group)}
      {...props}
    />
  );
}

function ContextMenuGroupLabel({ className, ...props }: ContextMenuPrimitive.GroupLabel.Props) {
  return (
    <ContextMenuPrimitive.GroupLabel
      data-slot="context-menu-group-label"
      className={mergeClassName(className, styles.groupLabel)}
      {...props}
    />
  );
}

function ContextMenuSubmenuTrigger({
  className,
  ...props
}: ContextMenuPrimitive.SubmenuTrigger.Props) {
  return (
    <ContextMenuPrimitive.SubmenuTrigger
      data-slot="context-menu-submenu-trigger"
      className={mergeClassName(className, styles.submenuTrigger)}
      {...props}
    />
  );
}

function ContextMenuSubmenuTriggerIcon({
  className,
  children,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="context-menu-submenu-trigger-icon"
      className={clsx(styles.submenuTriggerIcon, className)}
      {...props}
    >
      {children ?? <ChevronRightIcon className={styles.iconSvg} />}
    </span>
  );
}

function ContextMenuRadioGroup({ className, ...props }: ContextMenuPrimitive.RadioGroup.Props) {
  return (
    <ContextMenuPrimitive.RadioGroup
      data-slot="context-menu-radio-group"
      className={mergeClassName(className, styles.radioGroup)}
      {...props}
    />
  );
}

function ContextMenuRadioItem({ className, indicator, ...props }: ContextMenuRadioItemProps) {
  return (
    <ContextMenuPrimitive.RadioItem
      data-slot="context-menu-radio-item"
      data-indicator-position={indicator}
      className={mergeClassName(className, styles.radioItem)}
      {...props}
    />
  );
}

function ContextMenuRadioItemIndicator({
  className,
  children,
  ...props
}: ContextMenuPrimitive.RadioItemIndicator.Props) {
  return (
    <ContextMenuPrimitive.RadioItemIndicator
      data-slot="context-menu-radio-item-indicator"
      className={mergeClassName(className, styles.radioItemIndicator)}
      {...props}
    >
      {children ?? <CheckIcon className={styles.itemIndicatorIcon} />}
    </ContextMenuPrimitive.RadioItemIndicator>
  );
}

function ContextMenuCheckboxItem({ className, indicator, ...props }: ContextMenuCheckboxItemProps) {
  return (
    <ContextMenuPrimitive.CheckboxItem
      data-slot="context-menu-checkbox-item"
      data-indicator-position={indicator}
      className={mergeClassName(className, styles.checkboxItem)}
      {...props}
    />
  );
}

function ContextMenuCheckboxItemIndicator({
  className,
  children,
  ...props
}: ContextMenuPrimitive.CheckboxItemIndicator.Props) {
  return (
    <ContextMenuPrimitive.CheckboxItemIndicator
      data-slot="context-menu-checkbox-item-indicator"
      className={mergeClassName(className, styles.checkboxItemIndicator)}
      {...props}
    >
      {children ?? <CheckIcon className={styles.itemIndicatorIcon} />}
    </ContextMenuPrimitive.CheckboxItemIndicator>
  );
}

function ContextMenuItemText({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="context-menu-item-text"
      className={clsx(styles.itemText, className)}
      {...props}
    />
  );
}

function ContextMenuItemTextContent({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="context-menu-item-text-content"
      className={clsx(styles.itemTextContent, className)}
      {...props}
    />
  );
}

function ContextMenuItemTextIcon({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="context-menu-item-text-icon"
      className={clsx(styles.itemTextIcon, className)}
      {...props}
    />
  );
}

function ContextMenuItemTextLabel({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="context-menu-item-text-label"
      className={clsx(styles.itemTextLabel, className)}
      {...props}
    />
  );
}

function ContextMenuItemShortcut({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="context-menu-item-shortcut"
      className={clsx(styles.itemShortcut, className)}
      {...props}
    />
  );
}

function getSubmenuOffset({ side }: { side: ContextMenuPrimitive.Positioner.Props['side'] }) {
  return side === 'top' || side === 'bottom' ? 4 : -4;
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

const ChevronRightIcon = ChevronRightLargeIcon;
const CheckIcon = CheckSmallIcon;

type ContextMenuProps = ContextMenuPrimitive.Root.Props;
type ContextMenuSubmenuProps = ContextMenuPrimitive.SubmenuRoot.Props;
type ContextMenuTriggerProps = ContextMenuPrimitive.Trigger.Props;
type ContextMenuArrowProps = ContextMenuPrimitive.Arrow.Props;
type ContextMenuItemProps = ContextMenuPrimitive.Item.Props;
type ContextMenuLinkItemProps = ContextMenuPrimitive.LinkItem.Props;
type ContextMenuSeparatorProps = ContextMenuPrimitive.Separator.Props;
type ContextMenuGroupProps = ContextMenuPrimitive.Group.Props;
type ContextMenuGroupLabelProps = ContextMenuPrimitive.GroupLabel.Props;
type ContextMenuSubmenuTriggerProps = ContextMenuPrimitive.SubmenuTrigger.Props;
type ContextMenuSubmenuTriggerIconProps = React.ComponentProps<'span'>;
type ContextMenuRadioGroupProps = ContextMenuPrimitive.RadioGroup.Props;
type ContextMenuRadioItemIndicatorProps = ContextMenuPrimitive.RadioItemIndicator.Props;
type ContextMenuCheckboxItemIndicatorProps = ContextMenuPrimitive.CheckboxItemIndicator.Props;
type ContextMenuItemTextProps = React.ComponentProps<'span'>;
type ContextMenuItemTextContentProps = React.ComponentProps<'span'>;
type ContextMenuItemTextIconProps = React.ComponentProps<'span'>;
type ContextMenuItemTextLabelProps = React.ComponentProps<'span'>;
type ContextMenuItemShortcutProps = React.ComponentProps<'span'>;

export {
  ContextMenu,
  ContextMenuSubmenu,
  ContextMenuTrigger,
  ContextMenuArrow,
  ContextMenuContent,
  ContextMenuSubmenuContent,
  ContextMenuItem,
  ContextMenuLinkItem,
  ContextMenuSeparator,
  ContextMenuGroup,
  ContextMenuGroupLabel,
  ContextMenuSubmenuTrigger,
  ContextMenuSubmenuTriggerIcon,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuRadioItemIndicator,
  ContextMenuCheckboxItem,
  ContextMenuCheckboxItemIndicator,
  ContextMenuItemText,
  ContextMenuItemTextContent,
  ContextMenuItemTextIcon,
  ContextMenuItemTextLabel,
  ContextMenuItemShortcut,
};

export type {
  ContextMenuProps,
  ContextMenuSubmenuProps,
  ContextMenuTriggerProps,
  ContextMenuArrowProps,
  ContextMenuContentClassNames,
  ContextMenuContentProps,
  ContextMenuItemProps,
  ContextMenuLinkItemProps,
  ContextMenuSeparatorProps,
  ContextMenuGroupProps,
  ContextMenuGroupLabelProps,
  ContextMenuSubmenuTriggerProps,
  ContextMenuSubmenuTriggerIconProps,
  ContextMenuRadioGroupProps,
  ContextMenuRadioItemProps,
  ContextMenuRadioItemIndicatorProps,
  ContextMenuCheckboxItemProps,
  ContextMenuCheckboxItemIndicatorProps,
  ContextMenuItemTextProps,
  ContextMenuItemTextContentProps,
  ContextMenuItemTextIconProps,
  ContextMenuItemTextLabelProps,
  ContextMenuItemShortcutProps,
};