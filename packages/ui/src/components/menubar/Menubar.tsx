import type { ComponentProps } from 'react';
import { Menu as MenuPrimitive } from '@base-ui/react/menu';
import { Menubar as MenubarPrimitive } from '@base-ui/react/menubar';
import { clsx } from 'clsx';
import { CheckIcon, ChevronRightIcon, PopupArrowIcon } from '@/lib/moduix/icons/ui';
import { mergeClassName } from '@/lib/moduix/mergeClassName';
import styles from './Menubar.module.css';

export type MenubarPositionerProps = Pick<
  MenuPrimitive.Positioner.Props,
  | 'side'
  | 'sideOffset'
  | 'align'
  | 'alignOffset'
  | 'arrowPadding'
  | 'collisionAvoidance'
  | 'collisionBoundary'
  | 'collisionPadding'
>;

export type MenubarIndicatorPosition = 'start' | 'end' | 'none';
export type MenubarContentProps = MenuPrimitive.Popup.Props &
  MenubarPositionerProps & {
    showArrow?: boolean;
  };
export type MenubarRadioItemProps = MenuPrimitive.RadioItem.Props & {
  indicator?: MenubarIndicatorPosition;
};
export type MenubarCheckboxItemProps = MenuPrimitive.CheckboxItem.Props & {
  indicator?: MenubarIndicatorPosition;
};

const MENUBAR_CONTENT_SIDE_OFFSET = 6;
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
      {children ?? <ArrowSvg className={styles.arrowSvg} />}
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
  children,
  showArrow = false,
  side,
  sideOffset = MENUBAR_CONTENT_SIDE_OFFSET,
  align,
  alignOffset,
  arrowPadding,
  collisionAvoidance,
  collisionBoundary,
  collisionPadding,
  ...props
}: MenubarContentProps) {
  return (
    <MenubarPortal>
      <MenubarPositioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        arrowPadding={arrowPadding}
        collisionAvoidance={collisionAvoidance}
        collisionBoundary={collisionBoundary}
        collisionPadding={collisionPadding}
      >
        <MenubarPopup className={className} {...props}>
          {showArrow ? <MenubarArrow /> : null}
          <MenubarViewport>{children}</MenubarViewport>
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

function MenubarSubmenuTriggerIcon({ className, children, ...props }: ComponentProps<'span'>) {
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

function MenubarItemText({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span data-slot="menubar-item-text" className={clsx(styles.itemText, className)} {...props} />
  );
}

function MenubarItemTextContent({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      data-slot="menubar-item-text-content"
      className={clsx(styles.itemTextContent, className)}
      {...props}
    />
  );
}

function MenubarItemTextIcon({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      data-slot="menubar-item-text-icon"
      className={clsx(styles.itemTextIcon, className)}
      {...props}
    />
  );
}

function MenubarItemTextLabel({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      data-slot="menubar-item-text-label"
      className={clsx(styles.itemTextLabel, className)}
      {...props}
    />
  );
}

function MenubarItemShortcut({ className, ...props }: ComponentProps<'span'>) {
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

function ArrowSvg(props: ComponentProps<'svg'>) {
  return (
    <PopupArrowIcon
      fillClassName={styles.arrowFill}
      outerStrokeClassName={styles.arrowOuterStroke}
      innerStrokeClassName={styles.arrowInnerStroke}
      {...props}
    />
  );
}

export {
  Menubar,
  MenubarMenu,
  MenubarSubmenu,
  createMenubarMenuHandle,
  MenubarTrigger,
  MenubarPortal,
  MenubarBackdrop,
  MenubarPositioner,
  MenubarPopup,
  MenubarArrow,
  MenubarViewport,
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