import type { ComponentProps } from 'react';
import { ContextMenu as ContextMenuPrimitive } from '@base-ui/react/context-menu';
import { clsx } from 'clsx';
import { CheckIcon, ChevronRightIcon } from '@/lib/moduix/icons/ui';
import { mergeClassName } from '@/lib/moduix/mergeClassName';
import styles from './ContextMenu.module.css';

export type ContextMenuPositionerProps = Pick<
  ContextMenuPrimitive.Positioner.Props,
  | 'side'
  | 'sideOffset'
  | 'align'
  | 'alignOffset'
  | 'collisionAvoidance'
  | 'collisionBoundary'
  | 'collisionPadding'
>;

export type ContextMenuContentProps = ContextMenuPrimitive.Popup.Props & ContextMenuPositionerProps;

const CONTEXT_MENU_CONTENT_SIDE_OFFSET = 8;
const ContextMenu = ContextMenuPrimitive.Root;
const ContextMenuSubmenu = ContextMenuPrimitive.SubmenuRoot;
export type ContextMenuIndicatorPosition = 'start' | 'end' | 'none';
export type ContextMenuRadioItemProps = ContextMenuPrimitive.RadioItem.Props & {
  indicator?: ContextMenuIndicatorPosition;
};
export type ContextMenuCheckboxItemProps = ContextMenuPrimitive.CheckboxItem.Props & {
  indicator?: ContextMenuIndicatorPosition;
};

function ContextMenuTrigger({ className, render, ...props }: ContextMenuPrimitive.Trigger.Props) {
  const triggerClassName = render ? className : mergeClassName(className, styles.trigger);

  return (
    <ContextMenuPrimitive.Trigger
      data-slot="context-menu-trigger"
      render={render}
      className={triggerClassName}
      {...props}
    />
  );
}

function ContextMenuPortal(props: ContextMenuPrimitive.Portal.Props) {
  return <ContextMenuPrimitive.Portal data-slot="context-menu-portal" {...props} />;
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

function ContextMenuContent({
  className,
  children,
  sideOffset = CONTEXT_MENU_CONTENT_SIDE_OFFSET,
  side,
  align,
  alignOffset,
  collisionAvoidance,
  collisionBoundary,
  collisionPadding,
  ...props
}: ContextMenuContentProps) {
  return (
    <ContextMenuPortal>
      <ContextMenuPositioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        collisionAvoidance={collisionAvoidance}
        collisionBoundary={collisionBoundary}
        collisionPadding={collisionPadding}
      >
        <ContextMenuPopup className={className} {...props}>
          {children}
        </ContextMenuPopup>
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

function ContextMenuSubmenuTriggerIcon({ className, children, ...props }: ComponentProps<'span'>) {
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

function ContextMenuItemText({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      data-slot="context-menu-item-text"
      className={clsx(styles.itemText, className)}
      {...props}
    />
  );
}

function ContextMenuItemTextContent({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      data-slot="context-menu-item-text-content"
      className={clsx(styles.itemTextContent, className)}
      {...props}
    />
  );
}

function ContextMenuItemTextIcon({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      data-slot="context-menu-item-text-icon"
      className={clsx(styles.itemTextIcon, className)}
      {...props}
    />
  );
}

function ContextMenuItemTextLabel({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      data-slot="context-menu-item-text-label"
      className={clsx(styles.itemTextLabel, className)}
      {...props}
    />
  );
}

function ContextMenuItemShortcut({ className, ...props }: ComponentProps<'span'>) {
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

export {
  ContextMenu,
  ContextMenuSubmenu,
  ContextMenuTrigger,
  ContextMenuPortal,
  ContextMenuBackdrop,
  ContextMenuPositioner,
  ContextMenuPopup,
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