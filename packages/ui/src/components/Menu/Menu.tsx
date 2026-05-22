import { Menu as MenuPrimitive } from '@base-ui/react/menu';
import { clsx } from 'clsx';
import * as React from 'react';
import {
  CheckSmallIcon,
  ChevronDownIcon,
  ChevronRightLargeIcon,
  PopupArrowIcon,
} from '@/primitives';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Menu.module.css';

type MenuContentClassNames = {
  portal?: MenuPrimitive.Portal.Props['className'];
  backdrop?: MenuPrimitive.Backdrop.Props['className'];
  positioner?: MenuPrimitive.Positioner.Props['className'];
  arrow?: MenuPrimitive.Arrow.Props['className'];
  viewport?: MenuPrimitive.Viewport.Props['className'];
};

type MenuContentSlotProps = {
  portal?: Omit<MenuPrimitive.Portal.Props, 'className' | 'children'>;
  backdrop?: Omit<MenuPrimitive.Backdrop.Props, 'className'>;
  positioner?: Omit<MenuPrimitive.Positioner.Props, 'className' | 'children'>;
  arrow?: Omit<MenuPrimitive.Arrow.Props, 'className' | 'children'>;
  viewport?: Omit<MenuPrimitive.Viewport.Props, 'className' | 'children'>;
};

type MenuContentProps = MenuPrimitive.Popup.Props &
  Pick<
    MenuPrimitive.Positioner.Props,
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
    classNames?: MenuContentClassNames;
    slotProps?: MenuContentSlotProps;
    container?: MenuPrimitive.Portal.Props['container'];
    withArrow?: boolean;
    arrow?: boolean | React.ReactNode;
    withBackdrop?: boolean;
    withViewport?: boolean;
  };

type MenuPositionerControlProps = Pick<
  MenuPrimitive.Positioner.Props,
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
>;

type IndicatorPosition = 'start' | 'end';
type MenuRadioItemProps = MenuPrimitive.RadioItem.Props & {
  indicator?: IndicatorPosition;
};
type MenuCheckboxItemProps = MenuPrimitive.CheckboxItem.Props & {
  indicator?: IndicatorPosition;
};

const Menu = MenuPrimitive.Root;
const MenuSubmenu = MenuPrimitive.SubmenuRoot;
const createMenuHandle = MenuPrimitive.createHandle;

function MenuTrigger({ className, render, ...props }: MenuPrimitive.Trigger.Props) {
  const triggerClassName = render ? className : mergeClassName(className, styles.trigger);

  return (
    <MenuPrimitive.Trigger
      data-slot="menu-trigger"
      render={render}
      className={triggerClassName}
      {...props}
    />
  );
}

function MenuTriggerIcon({ className, children, ...props }: React.ComponentProps<'span'>) {
  return (
    <span data-slot="menu-trigger-icon" className={clsx(styles.triggerIcon, className)} {...props}>
      {children ?? <ChevronDownIcon className={styles.iconSvg} />}
    </span>
  );
}

function MenuPortal({ className, ...props }: MenuPrimitive.Portal.Props) {
  return <MenuPrimitive.Portal data-slot="menu-portal" className={className} {...props} />;
}

function MenuBackdrop({ className, ...props }: MenuPrimitive.Backdrop.Props) {
  return (
    <MenuPrimitive.Backdrop
      data-slot="menu-backdrop"
      className={mergeClassName(className, styles.backdrop)}
      {...props}
    />
  );
}

function MenuPositioner({ className, ...props }: MenuPrimitive.Positioner.Props) {
  return (
    <MenuPrimitive.Positioner
      data-slot="menu-positioner"
      className={mergeClassName(className, styles.positioner)}
      {...props}
    />
  );
}

function MenuPopup({ className, ...props }: MenuPrimitive.Popup.Props) {
  return (
    <MenuPrimitive.Popup
      data-slot="menu-popup"
      className={mergeClassName(className, styles.popup)}
      {...props}
    />
  );
}

function MenuArrow({ className, children, ...props }: MenuPrimitive.Arrow.Props) {
  return (
    <MenuPrimitive.Arrow
      data-slot="menu-arrow"
      className={mergeClassName(className, styles.arrow)}
      {...props}
    >
      {children ?? <ArrowSvg className={styles.arrowSvg} />}
    </MenuPrimitive.Arrow>
  );
}

function MenuViewport({ className, ...props }: MenuPrimitive.Viewport.Props) {
  return (
    <MenuPrimitive.Viewport
      data-slot="menu-viewport"
      className={mergeClassName(className, styles.viewport)}
      {...props}
    />
  );
}

function MenuContent({
  className,
  classNames,
  slotProps,
  children,
  container,
  withArrow,
  arrow,
  withBackdrop = false,
  withViewport = false,
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
}: MenuContentProps) {
  const positionerSlotProps = slotProps?.positioner;
  const resolvedPositionerProps: MenuPositionerControlProps = {
    side: side ?? positionerSlotProps?.side,
    sideOffset: sideOffset ?? positionerSlotProps?.sideOffset ?? 8,
    align: align ?? positionerSlotProps?.align,
    alignOffset: alignOffset ?? positionerSlotProps?.alignOffset,
    arrowPadding: arrowPadding ?? positionerSlotProps?.arrowPadding,
    anchor: anchor ?? positionerSlotProps?.anchor,
    collisionAvoidance: collisionAvoidance ?? positionerSlotProps?.collisionAvoidance,
    collisionBoundary: collisionBoundary ?? positionerSlotProps?.collisionBoundary,
    collisionPadding: collisionPadding ?? positionerSlotProps?.collisionPadding,
    sticky: sticky ?? positionerSlotProps?.sticky,
    positionMethod: positionMethod ?? positionerSlotProps?.positionMethod,
    disableAnchorTracking: disableAnchorTracking ?? positionerSlotProps?.disableAnchorTracking,
  };
  const { container: slotPropsContainer, ...portalSlotProps } = slotProps?.portal ?? {};
  const portalContainer = container ?? slotPropsContainer;
  const { arrowChild, viewportChildren } = splitArrowChild(children);
  const showArrow = withArrow ?? (typeof arrow === 'boolean' ? arrow : true);
  const arrowContent = typeof arrow === 'boolean' ? undefined : arrow;
  const resolvedArrow =
    arrowChild ??
    (showArrow ? (
      <MenuArrow className={classNames?.arrow} {...slotProps?.arrow}>
        {arrowContent}
      </MenuArrow>
    ) : null);

  return (
    <MenuPortal className={classNames?.portal} container={portalContainer} {...portalSlotProps}>
      {withBackdrop ? (
        <MenuBackdrop className={classNames?.backdrop} {...slotProps?.backdrop} />
      ) : null}
      <MenuPositioner
        {...positionerSlotProps}
        {...resolvedPositionerProps}
        className={classNames?.positioner}
      >
        <MenuPopup className={className} {...props}>
          {resolvedArrow}
          {withViewport ? (
            <MenuViewport className={classNames?.viewport} {...slotProps?.viewport}>
              {viewportChildren}
            </MenuViewport>
          ) : (
            viewportChildren
          )}
        </MenuPopup>
      </MenuPositioner>
    </MenuPortal>
  );
}

function MenuSubmenuContent({
  withArrow = false,
  arrow,
  sideOffset = getSubmenuOffset,
  alignOffset = getSubmenuOffset,
  ...props
}: MenuContentProps) {
  return (
    <MenuContent
      withArrow={withArrow}
      arrow={arrow}
      sideOffset={sideOffset}
      alignOffset={alignOffset}
      {...props}
    />
  );
}

function MenuItem({ className, ...props }: MenuPrimitive.Item.Props) {
  return (
    <MenuPrimitive.Item
      data-slot="menu-item"
      className={mergeClassName(className, styles.item)}
      {...props}
    />
  );
}

function MenuLinkItem({ className, ...props }: MenuPrimitive.LinkItem.Props) {
  return (
    <MenuPrimitive.LinkItem
      data-slot="menu-link-item"
      className={mergeClassName(className, styles.linkItem)}
      {...props}
    />
  );
}

function MenuSeparator({ className, ...props }: MenuPrimitive.Separator.Props) {
  return (
    <MenuPrimitive.Separator
      data-slot="menu-separator"
      className={mergeClassName(className, styles.separator)}
      {...props}
    />
  );
}

function MenuGroup({ className, ...props }: MenuPrimitive.Group.Props) {
  return (
    <MenuPrimitive.Group
      data-slot="menu-group"
      className={mergeClassName(className, styles.group)}
      {...props}
    />
  );
}

function MenuGroupLabel({ className, ...props }: MenuPrimitive.GroupLabel.Props) {
  return (
    <MenuPrimitive.GroupLabel
      data-slot="menu-group-label"
      className={mergeClassName(className, styles.groupLabel)}
      {...props}
    />
  );
}

function MenuSubmenuTrigger({ className, ...props }: MenuPrimitive.SubmenuTrigger.Props) {
  return (
    <MenuPrimitive.SubmenuTrigger
      data-slot="menu-submenu-trigger"
      className={mergeClassName(className, styles.submenuTrigger)}
      {...props}
    />
  );
}

function MenuSubmenuTriggerIcon({ className, children, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="menu-submenu-trigger-icon"
      className={clsx(styles.submenuTriggerIcon, className)}
      {...props}
    >
      {children ?? <ChevronRightIcon className={styles.iconSvg} />}
    </span>
  );
}

function MenuRadioGroup({ className, ...props }: MenuPrimitive.RadioGroup.Props) {
  return (
    <MenuPrimitive.RadioGroup
      data-slot="menu-radio-group"
      className={mergeClassName(className, styles.radioGroup)}
      {...props}
    />
  );
}

function MenuRadioItem({ className, indicator, ...props }: MenuRadioItemProps) {
  return (
    <MenuPrimitive.RadioItem
      data-slot="menu-radio-item"
      data-indicator-position={indicator}
      className={mergeClassName(className, styles.radioItem)}
      {...props}
    />
  );
}

function MenuRadioItemIndicator({
  className,
  children,
  ...props
}: MenuPrimitive.RadioItemIndicator.Props) {
  return (
    <MenuPrimitive.RadioItemIndicator
      data-slot="menu-radio-item-indicator"
      className={mergeClassName(className, styles.radioItemIndicator)}
      {...props}
    >
      {children ?? <CheckIcon className={styles.itemIndicatorIcon} />}
    </MenuPrimitive.RadioItemIndicator>
  );
}

function MenuCheckboxItem({ className, indicator, ...props }: MenuCheckboxItemProps) {
  return (
    <MenuPrimitive.CheckboxItem
      data-slot="menu-checkbox-item"
      data-indicator-position={indicator}
      className={mergeClassName(className, styles.checkboxItem)}
      {...props}
    />
  );
}

function MenuCheckboxItemIndicator({
  className,
  children,
  ...props
}: MenuPrimitive.CheckboxItemIndicator.Props) {
  return (
    <MenuPrimitive.CheckboxItemIndicator
      data-slot="menu-checkbox-item-indicator"
      className={mergeClassName(className, styles.checkboxItemIndicator)}
      {...props}
    >
      {children ?? <CheckIcon className={styles.itemIndicatorIcon} />}
    </MenuPrimitive.CheckboxItemIndicator>
  );
}

function MenuItemText({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span data-slot="menu-item-text" className={clsx(styles.itemText, className)} {...props} />
  );
}

function MenuItemTextContent({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="menu-item-text-content"
      className={clsx(styles.itemTextContent, className)}
      {...props}
    />
  );
}

function MenuItemTextIcon({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="menu-item-text-icon"
      className={clsx(styles.itemTextIcon, className)}
      {...props}
    />
  );
}

function MenuItemTextLabel({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="menu-item-text-label"
      className={clsx(styles.itemTextLabel, className)}
      {...props}
    />
  );
}

function MenuItemShortcut({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="menu-item-shortcut"
      className={clsx(styles.itemShortcut, className)}
      {...props}
    />
  );
}

function getSubmenuOffset({ side }: { side: MenuPrimitive.Positioner.Props['side'] }) {
  return side === 'top' || side === 'bottom' ? 4 : -4;
}

function splitArrowChild(children: React.ReactNode) {
  let arrowChild: React.ReactNode = null;
  const viewportChildren: React.ReactNode[] = [];

  React.Children.forEach(children, (child) => {
    if (!arrowChild && React.isValidElement(child) && child.type === MenuArrow) {
      arrowChild = child;
      return;
    }

    viewportChildren.push(child);
  });

  return { arrowChild, viewportChildren };
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

type MenuProps<Payload = unknown> = MenuPrimitive.Root.Props<Payload>;
type MenuHandle<Payload = unknown> = MenuPrimitive.Handle<Payload>;
type MenuTriggerProps = MenuPrimitive.Trigger.Props;
type MenuItemProps = MenuPrimitive.Item.Props;
type MenuLinkItemProps = MenuPrimitive.LinkItem.Props;
type MenuRadioItemPropsPublic = MenuRadioItemProps;
type MenuCheckboxItemPropsPublic = MenuCheckboxItemProps;
type MenuSubmenuTriggerProps = MenuPrimitive.SubmenuTrigger.Props;
type MenuItemShortcutProps = React.ComponentProps<'span'>;

export {
  Menu,
  MenuSubmenu,
  createMenuHandle,
  MenuTrigger,
  MenuTriggerIcon,
  MenuArrow,
  MenuContent,
  MenuSubmenuContent,
  MenuItem,
  MenuLinkItem,
  MenuSeparator,
  MenuGroup,
  MenuGroupLabel,
  MenuSubmenuTrigger,
  MenuSubmenuTriggerIcon,
  MenuRadioGroup,
  MenuRadioItem,
  MenuRadioItemIndicator,
  MenuCheckboxItem,
  MenuCheckboxItemIndicator,
  MenuItemText,
  MenuItemTextContent,
  MenuItemTextIcon,
  MenuItemTextLabel,
  MenuItemShortcut,
};

export type {
  MenuProps,
  MenuHandle,
  MenuContentProps,
  MenuContentClassNames,
  MenuContentSlotProps,
  MenuTriggerProps,
  MenuItemProps,
  MenuLinkItemProps,
  MenuRadioItemPropsPublic as MenuRadioItemProps,
  MenuCheckboxItemPropsPublic as MenuCheckboxItemProps,
  MenuSubmenuTriggerProps,
  MenuItemShortcutProps,
};