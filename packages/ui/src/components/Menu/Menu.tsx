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
  viewport?: MenuPrimitive.Viewport.Props['className'];
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
    container?: MenuPrimitive.Portal.Props['container'];
    withBackdrop?: boolean;
    withViewport?: boolean;
    portalProps?: Omit<MenuPrimitive.Portal.Props, 'className' | 'children'>;
    backdropProps?: Omit<MenuPrimitive.Backdrop.Props, 'className'>;
    positionerProps?: Omit<MenuPrimitive.Positioner.Props, 'className' | 'children'>;
    viewportProps?: Omit<MenuPrimitive.Viewport.Props, 'className' | 'children'>;
  };

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
  children,
  container,
  withBackdrop = false,
  withViewport = false,
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
}: MenuContentProps) {
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
  const { arrowChildren, viewportChildren } = withViewport
    ? splitArrowChildren(children)
    : { arrowChildren: null, viewportChildren: children };

  return (
    <MenuPortal className={classNames?.portal} container={portalContainer} {...restPortalProps}>
      {withBackdrop ? <MenuBackdrop className={classNames?.backdrop} {...backdropProps} /> : null}
      <MenuPositioner
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
        <MenuPopup className={className} {...props}>
          {withViewport ? (
            <React.Fragment>
              {arrowChildren}
              <MenuViewport className={classNames?.viewport} {...viewportProps}>
                {viewportChildren}
              </MenuViewport>
            </React.Fragment>
          ) : (
            children
          )}
        </MenuPopup>
      </MenuPositioner>
    </MenuPortal>
  );
}

function MenuSubmenuContent({
  sideOffset = getSubmenuOffset,
  alignOffset = getSubmenuOffset,
  ...props
}: MenuContentProps) {
  return <MenuContent sideOffset={sideOffset} alignOffset={alignOffset} {...props} />;
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

function splitArrowChildren(children: React.ReactNode) {
  const arrowChildren: React.ReactNode[] = [];
  const viewportChildren: React.ReactNode[] = [];

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.type === MenuArrow) {
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
  MenuTriggerProps,
  MenuItemProps,
  MenuLinkItemProps,
  MenuRadioItemPropsPublic as MenuRadioItemProps,
  MenuCheckboxItemPropsPublic as MenuCheckboxItemProps,
  MenuSubmenuTriggerProps,
  MenuItemShortcutProps,
};