import { Menu as MenuPrimitive } from '@base-ui/react/menu';
import { Menubar as MenubarPrimitive } from '@base-ui/react/menubar';
import { clsx } from 'clsx';
import * as React from 'react';
import { CheckSmallIcon, ChevronRightLargeIcon, PopupArrowIcon } from '@/primitives';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Menubar.module.css';

type MenubarContentClassNames = {
  portal?: MenuPrimitive.Portal.Props['className'];
  backdrop?: MenuPrimitive.Backdrop.Props['className'];
  positioner?: MenuPrimitive.Positioner.Props['className'];
  viewport?: MenuPrimitive.Viewport.Props['className'];
};

type MenubarContentProps = MenuPrimitive.Popup.Props &
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
    classNames?: MenubarContentClassNames;
    container?: MenuPrimitive.Portal.Props['container'];
    withBackdrop?: boolean;
    portalProps?: Omit<MenuPrimitive.Portal.Props, 'className' | 'children'>;
    backdropProps?: Omit<MenuPrimitive.Backdrop.Props, 'className'>;
    positionerProps?: Omit<MenuPrimitive.Positioner.Props, 'className' | 'children'>;
    viewportProps?: Omit<MenuPrimitive.Viewport.Props, 'className' | 'children'>;
  };

type IndicatorPosition = 'start' | 'end';
type MenubarRadioItemProps = MenuPrimitive.RadioItem.Props & {
  indicator?: IndicatorPosition;
};
type MenubarCheckboxItemProps = MenuPrimitive.CheckboxItem.Props & {
  indicator?: IndicatorPosition;
};

const MenubarMenu = MenuPrimitive.Root;
const MenubarSubmenu = MenuPrimitive.SubmenuRoot;
const createMenubarMenuHandle = MenuPrimitive.createHandle;

function Menubar({ className, ...props }: MenubarPrimitive.Props) {
  return (
    <MenubarPrimitive
      data-slot="menubar-root"
      className={mergeClassName(className, styles.root)}
      {...props}
    />
  );
}

function MenubarTrigger({ className, render, ...props }: MenuPrimitive.Trigger.Props) {
  const triggerClassName = render ? className : mergeClassName(className, styles.trigger);

  return (
    <MenuPrimitive.Trigger
      data-slot="menubar-trigger"
      render={render}
      className={triggerClassName}
      {...props}
    />
  );
}

function MenubarPortal({ className, ...props }: MenuPrimitive.Portal.Props) {
  return <MenuPrimitive.Portal data-slot="menubar-portal" className={className} {...props} />;
}

function MenubarBackdrop({ className, ...props }: MenuPrimitive.Backdrop.Props) {
  return (
    <MenuPrimitive.Backdrop
      data-slot="menubar-backdrop"
      className={mergeClassName(className, styles.backdrop)}
      {...props}
    />
  );
}

function MenubarPositioner({ className, ...props }: MenuPrimitive.Positioner.Props) {
  return (
    <MenuPrimitive.Positioner
      data-slot="menubar-positioner"
      className={mergeClassName(className, styles.positioner)}
      {...props}
    />
  );
}

function MenubarPopup({ className, ...props }: MenuPrimitive.Popup.Props) {
  return (
    <MenuPrimitive.Popup
      data-slot="menubar-popup"
      className={mergeClassName(className, styles.popup)}
      {...props}
    />
  );
}

function MenubarArrow({ className, children, ...props }: MenuPrimitive.Arrow.Props) {
  return (
    <MenuPrimitive.Arrow
      data-slot="menubar-arrow"
      className={mergeClassName(className, styles.arrow)}
      {...props}
    >
      {children ?? <ArrowSvg />}
    </MenuPrimitive.Arrow>
  );
}

function MenubarViewport({ className, ...props }: MenuPrimitive.Viewport.Props) {
  return (
    <MenuPrimitive.Viewport
      data-slot="menubar-viewport"
      className={mergeClassName(className, styles.viewport)}
      {...props}
    />
  );
}

function MenubarContent({
  className,
  classNames,
  children,
  container,
  withBackdrop = false,
  portalProps,
  backdropProps,
  positionerProps,
  viewportProps,
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
}: MenubarContentProps) {
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
  const { arrowChildren, viewportChildren } = splitArrowChildren(children);

  return (
    <MenubarPortal className={classNames?.portal} container={portalContainer} {...restPortalProps}>
      {withBackdrop ? (
        <MenubarBackdrop className={classNames?.backdrop} {...backdropProps} />
      ) : null}
      <MenubarPositioner
        side={side ?? positionerPropsSide}
        sideOffset={sideOffset ?? positionerPropsSideOffset ?? 6}
        align={align ?? positionerPropsAlign}
        alignOffset={alignOffset ?? positionerPropsAlignOffset ?? -2}
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
        <MenubarPopup className={className} {...props}>
          {arrowChildren}
          <MenubarViewport className={classNames?.viewport} {...viewportProps}>
            {viewportChildren}
          </MenubarViewport>
        </MenubarPopup>
      </MenubarPositioner>
    </MenubarPortal>
  );
}

function MenubarSubmenuContent({
  sideOffset = getSubmenuOffset,
  alignOffset = getSubmenuOffset,
  ...props
}: MenubarContentProps) {
  return <MenubarContent sideOffset={sideOffset} alignOffset={alignOffset} {...props} />;
}

function MenubarItem({ className, ...props }: MenuPrimitive.Item.Props) {
  return (
    <MenuPrimitive.Item
      data-slot="menubar-item"
      className={mergeClassName(className, styles.item)}
      {...props}
    />
  );
}

function MenubarLinkItem({ className, ...props }: MenuPrimitive.LinkItem.Props) {
  return (
    <MenuPrimitive.LinkItem
      data-slot="menubar-link-item"
      className={mergeClassName(className, styles.linkItem)}
      {...props}
    />
  );
}

function MenubarSeparator({ className, ...props }: MenuPrimitive.Separator.Props) {
  return (
    <MenuPrimitive.Separator
      data-slot="menubar-separator"
      className={mergeClassName(className, styles.separator)}
      {...props}
    />
  );
}

function MenubarGroup({ className, ...props }: MenuPrimitive.Group.Props) {
  return (
    <MenuPrimitive.Group
      data-slot="menubar-group"
      className={mergeClassName(className, styles.group)}
      {...props}
    />
  );
}

function MenubarGroupLabel({ className, ...props }: MenuPrimitive.GroupLabel.Props) {
  return (
    <MenuPrimitive.GroupLabel
      data-slot="menubar-group-label"
      className={mergeClassName(className, styles.groupLabel)}
      {...props}
    />
  );
}

function MenubarSubmenuTrigger({ className, ...props }: MenuPrimitive.SubmenuTrigger.Props) {
  return (
    <MenuPrimitive.SubmenuTrigger
      data-slot="menubar-submenu-trigger"
      className={mergeClassName(className, styles.submenuTrigger)}
      {...props}
    />
  );
}

function MenubarSubmenuTriggerIcon({
  className,
  children,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="menubar-submenu-trigger-icon"
      className={clsx(styles.submenuTriggerIcon, className)}
      {...props}
    >
      {children ?? <ChevronRightIcon className={styles.iconSvg} />}
    </span>
  );
}

function MenubarRadioGroup({ className, ...props }: MenuPrimitive.RadioGroup.Props) {
  return (
    <MenuPrimitive.RadioGroup
      data-slot="menubar-radio-group"
      className={mergeClassName(className, styles.radioGroup)}
      {...props}
    />
  );
}

function MenubarRadioItem({ className, indicator, ...props }: MenubarRadioItemProps) {
  return (
    <MenuPrimitive.RadioItem
      data-slot="menubar-radio-item"
      data-indicator-position={indicator}
      className={mergeClassName(className, styles.radioItem)}
      {...props}
    />
  );
}

function MenubarRadioItemIndicator({
  className,
  children,
  ...props
}: MenuPrimitive.RadioItemIndicator.Props) {
  return (
    <MenuPrimitive.RadioItemIndicator
      data-slot="menubar-radio-item-indicator"
      className={mergeClassName(className, styles.radioItemIndicator)}
      {...props}
    >
      {children ?? <CheckIcon className={styles.itemIndicatorIcon} />}
    </MenuPrimitive.RadioItemIndicator>
  );
}

function MenubarCheckboxItem({ className, indicator, ...props }: MenubarCheckboxItemProps) {
  return (
    <MenuPrimitive.CheckboxItem
      data-slot="menubar-checkbox-item"
      data-indicator-position={indicator}
      className={mergeClassName(className, styles.checkboxItem)}
      {...props}
    />
  );
}

function MenubarCheckboxItemIndicator({
  className,
  children,
  ...props
}: MenuPrimitive.CheckboxItemIndicator.Props) {
  return (
    <MenuPrimitive.CheckboxItemIndicator
      data-slot="menubar-checkbox-item-indicator"
      className={mergeClassName(className, styles.checkboxItemIndicator)}
      {...props}
    >
      {children ?? <CheckIcon className={styles.itemIndicatorIcon} />}
    </MenuPrimitive.CheckboxItemIndicator>
  );
}

function MenubarItemText({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span data-slot="menubar-item-text" className={clsx(styles.itemText, className)} {...props} />
  );
}

function MenubarItemTextContent({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="menubar-item-text-content"
      className={clsx(styles.itemTextContent, className)}
      {...props}
    />
  );
}

function MenubarItemTextIcon({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="menubar-item-text-icon"
      className={clsx(styles.itemTextIcon, className)}
      {...props}
    />
  );
}

function MenubarItemTextLabel({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="menubar-item-text-label"
      className={clsx(styles.itemTextLabel, className)}
      {...props}
    />
  );
}

function MenubarItemShortcut({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="menubar-item-shortcut"
      className={clsx(styles.itemShortcut, className)}
      {...props}
    />
  );
}

function getSubmenuOffset({ side }: { side: MenuPrimitive.Positioner.Props['side'] }) {
  return side === 'top' || side === 'bottom' ? 4 : -4;
}

function splitArrowChildren(children: React.ReactNode) {
  const arrowChildren: React.ReactNode[] = [];
  const viewportChildren: React.ReactNode[] = [];

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.type === MenubarArrow) {
      arrowChildren.push(child);
      return;
    }

    viewportChildren.push(child);
  });

  return { arrowChildren, viewportChildren };
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

type MenubarProps = MenubarPrimitive.Props;
type MenubarMenuProps<Payload = unknown> = MenuPrimitive.Root.Props<Payload>;
type MenubarMenuHandle<Payload = unknown> = MenuPrimitive.Handle<Payload>;
type MenubarSubmenuProps = MenuPrimitive.SubmenuRoot.Props;
type MenubarTriggerProps = MenuPrimitive.Trigger.Props;
type MenubarArrowProps = MenuPrimitive.Arrow.Props;
type MenubarItemProps = MenuPrimitive.Item.Props;
type MenubarLinkItemProps = MenuPrimitive.LinkItem.Props;
type MenubarSeparatorProps = MenuPrimitive.Separator.Props;
type MenubarGroupProps = MenuPrimitive.Group.Props;
type MenubarGroupLabelProps = MenuPrimitive.GroupLabel.Props;
type MenubarSubmenuTriggerProps = MenuPrimitive.SubmenuTrigger.Props;
type MenubarSubmenuTriggerIconProps = React.ComponentProps<'span'>;
type MenubarRadioGroupProps = MenuPrimitive.RadioGroup.Props;
type MenubarRadioItemIndicatorProps = MenuPrimitive.RadioItemIndicator.Props;
type MenubarCheckboxItemIndicatorProps = MenuPrimitive.CheckboxItemIndicator.Props;
type MenubarItemTextProps = React.ComponentProps<'span'>;
type MenubarItemTextContentProps = React.ComponentProps<'span'>;
type MenubarItemTextIconProps = React.ComponentProps<'span'>;
type MenubarItemTextLabelProps = React.ComponentProps<'span'>;
type MenubarItemShortcutProps = React.ComponentProps<'span'>;

export {
  Menubar,
  MenubarMenu,
  MenubarSubmenu,
  createMenubarMenuHandle,
  MenubarTrigger,
  MenubarArrow,
  MenubarContent,
  MenubarSubmenuContent,
  MenubarItem,
  MenubarLinkItem,
  MenubarSeparator,
  MenubarGroup,
  MenubarGroupLabel,
  MenubarSubmenuTrigger,
  MenubarSubmenuTriggerIcon,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarRadioItemIndicator,
  MenubarCheckboxItem,
  MenubarCheckboxItemIndicator,
  MenubarItemText,
  MenubarItemTextContent,
  MenubarItemTextIcon,
  MenubarItemTextLabel,
  MenubarItemShortcut,
};

export type {
  MenubarProps,
  MenubarMenuProps,
  MenubarMenuHandle,
  MenubarSubmenuProps,
  MenubarTriggerProps,
  MenubarArrowProps,
  MenubarContentProps,
  MenubarContentClassNames,
  MenubarItemProps,
  MenubarLinkItemProps,
  MenubarSeparatorProps,
  MenubarGroupProps,
  MenubarGroupLabelProps,
  MenubarSubmenuTriggerProps,
  MenubarSubmenuTriggerIconProps,
  MenubarRadioGroupProps,
  MenubarRadioItemProps,
  MenubarRadioItemIndicatorProps,
  MenubarCheckboxItemProps,
  MenubarCheckboxItemIndicatorProps,
  MenubarItemTextProps,
  MenubarItemTextContentProps,
  MenubarItemTextIconProps,
  MenubarItemTextLabelProps,
  MenubarItemShortcutProps,
};