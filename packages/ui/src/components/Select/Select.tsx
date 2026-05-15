import { Select as SelectPrimitive } from '@base-ui/react/select';
import { clsx } from 'clsx';
import * as React from 'react';
import {
  CheckFilledIcon,
  ChevronDownIcon,
  ChevronUpDownIcon,
  ChevronUpIcon,
  PopupArrowIcon,
} from '@/primitives';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Select.module.css';

type SelectAnimation = 'scale';

type SelectPopupProps = SelectPrimitive.Popup.Props & {
  animation?: SelectAnimation;
};

type SelectContentClassNames = {
  portal?: SelectPrimitive.Portal.Props['className'];
  backdrop?: SelectPrimitive.Backdrop.Props['className'];
  positioner?: SelectPrimitive.Positioner.Props['className'];
  arrow?: SelectPrimitive.Arrow.Props['className'];
};

type SelectContentSlotProps = {
  portal?: Omit<SelectPrimitive.Portal.Props, 'className' | 'children'>;
  backdrop?: Omit<SelectPrimitive.Backdrop.Props, 'className'>;
  positioner?: Omit<SelectPrimitive.Positioner.Props, 'className' | 'children'>;
  arrow?: Omit<SelectPrimitive.Arrow.Props, 'className' | 'children'>;
};

type SelectContentProps = SelectPopupProps &
  Pick<
    SelectPrimitive.Positioner.Props,
    | 'alignItemWithTrigger'
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
    classNames?: SelectContentClassNames;
    slotProps?: SelectContentSlotProps;
    container?: SelectPrimitive.Portal.Props['container'];
    withBackdrop?: boolean;
    showArrow?: boolean;
    arrow?: React.ReactNode;
  };

type IndicatorPosition = 'start' | 'end';
type SelectItemProps = SelectPrimitive.Item.Props & {
  indicator?: IndicatorPosition;
};

const Select = SelectPrimitive.Root;

function SelectField({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="select-field" className={clsx(styles.field, className)} {...props} />;
}

function SelectLabel({ className, ...props }: SelectPrimitive.Label.Props) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={mergeClassName(className, styles.label)}
      {...props}
    />
  );
}

function SelectTrigger({ className, ...props }: SelectPrimitive.Trigger.Props) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={mergeClassName(className, styles.trigger)}
      {...props}
    />
  );
}

function SelectValue({ className, ...props }: SelectPrimitive.Value.Props) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={mergeClassName(className, styles.value)}
      {...props}
    />
  );
}

function SelectIcon({ className, children, ...props }: SelectPrimitive.Icon.Props) {
  return (
    <SelectPrimitive.Icon
      data-slot="select-icon"
      className={mergeClassName(className, styles.icon)}
      {...props}
    >
      {children ?? <ChevronUpDownIcon className={styles.iconSvg} />}
    </SelectPrimitive.Icon>
  );
}

function SelectPortal(props: SelectPrimitive.Portal.Props) {
  return <SelectPrimitive.Portal data-slot="select-portal" {...props} />;
}

function SelectBackdrop({ className, ...props }: SelectPrimitive.Backdrop.Props) {
  return (
    <SelectPrimitive.Backdrop
      data-slot="select-backdrop"
      className={mergeClassName(className, styles.backdrop)}
      {...props}
    />
  );
}

function SelectPositioner({ className, ...props }: SelectPrimitive.Positioner.Props) {
  return (
    <SelectPrimitive.Positioner
      data-slot="select-positioner"
      className={mergeClassName(className, styles.positioner)}
      {...props}
    />
  );
}

function SelectPopup({ className, animation, ...props }: SelectPopupProps) {
  return (
    <SelectPrimitive.Popup
      data-slot="select-popup"
      data-animation={animation}
      className={mergeClassName(className, styles.popup)}
      {...props}
    />
  );
}

function SelectArrow({ className, children, ...props }: SelectPrimitive.Arrow.Props) {
  return (
    <SelectPrimitive.Arrow
      data-slot="select-arrow"
      className={mergeClassName(className, styles.arrow)}
      {...props}
    >
      {children ?? <ArrowSvg className={styles.arrowSvg} />}
    </SelectPrimitive.Arrow>
  );
}

function SelectContent({
  className,
  classNames,
  slotProps,
  container,
  withBackdrop = false,
  showArrow = false,
  arrow,
  alignItemWithTrigger,
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
}: SelectContentProps) {
  const portalProps = slotProps?.portal;
  const backdropProps = slotProps?.backdrop;
  const positionerProps = slotProps?.positioner;
  const arrowProps = slotProps?.arrow;
  const { container: portalPropsContainer, ...restPortalProps } = portalProps ?? {};
  const portalContainer = container ?? portalPropsContainer;
  const resolvedAlignItemWithTrigger =
    alignItemWithTrigger ?? positionerProps?.alignItemWithTrigger;
  const resolvedSide = side ?? positionerProps?.side;
  const resolvedSideOffset = sideOffset ?? positionerProps?.sideOffset ?? 8;
  const resolvedAlign = align ?? positionerProps?.align;
  const resolvedAlignOffset = alignOffset ?? positionerProps?.alignOffset;
  const resolvedArrowPadding = arrowPadding ?? positionerProps?.arrowPadding;
  const resolvedAnchor = anchor ?? positionerProps?.anchor;
  const resolvedCollisionAvoidance = collisionAvoidance ?? positionerProps?.collisionAvoidance;
  const resolvedCollisionBoundary = collisionBoundary ?? positionerProps?.collisionBoundary;
  const resolvedCollisionPadding = collisionPadding ?? positionerProps?.collisionPadding;
  const resolvedSticky = sticky ?? positionerProps?.sticky;
  const resolvedPositionMethod = positionMethod ?? positionerProps?.positionMethod;
  const resolvedDisableAnchorTracking =
    disableAnchorTracking ?? positionerProps?.disableAnchorTracking;

  return (
    <SelectPortal className={classNames?.portal} container={portalContainer} {...restPortalProps}>
      {withBackdrop ? <SelectBackdrop className={classNames?.backdrop} {...backdropProps} /> : null}
      <SelectPositioner
        {...positionerProps}
        alignItemWithTrigger={resolvedAlignItemWithTrigger}
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
        <SelectPopup className={className} {...props}>
          {showArrow ? (
            <SelectArrow className={classNames?.arrow} {...arrowProps}>
              {arrow}
            </SelectArrow>
          ) : null}
          {props.children}
        </SelectPopup>
      </SelectPositioner>
    </SelectPortal>
  );
}

function SelectScrollUpArrow({
  className,
  children,
  ...props
}: SelectPrimitive.ScrollUpArrow.Props) {
  return (
    <SelectPrimitive.ScrollUpArrow
      data-slot="select-scroll-up-arrow"
      className={mergeClassName(className, styles.scrollArrow)}
      {...props}
    >
      {children ?? <ChevronUpIcon className={styles.scrollArrowIcon} />}
    </SelectPrimitive.ScrollUpArrow>
  );
}

function SelectScrollDownArrow({
  className,
  children,
  ...props
}: SelectPrimitive.ScrollDownArrow.Props) {
  return (
    <SelectPrimitive.ScrollDownArrow
      data-slot="select-scroll-down-arrow"
      className={mergeClassName(className, styles.scrollArrow)}
      {...props}
    >
      {children ?? <ChevronDownIcon className={styles.scrollArrowIcon} />}
    </SelectPrimitive.ScrollDownArrow>
  );
}

function SelectList({ className, ...props }: SelectPrimitive.List.Props) {
  return (
    <SelectPrimitive.List
      data-slot="select-list"
      className={mergeClassName(className, styles.list)}
      {...props}
    />
  );
}

function SelectItem({ className, indicator, ...props }: SelectItemProps) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      data-indicator-position={indicator}
      className={mergeClassName(className, styles.item)}
      {...props}
    />
  );
}

function SelectItemIndicator({
  className,
  children,
  ...props
}: SelectPrimitive.ItemIndicator.Props) {
  return (
    <SelectPrimitive.ItemIndicator
      data-slot="select-item-indicator"
      className={mergeClassName(className, styles.itemIndicator)}
      {...props}
    >
      {children ?? <CheckIcon className={styles.itemIndicatorIcon} />}
    </SelectPrimitive.ItemIndicator>
  );
}

function SelectItemText({ className, ...props }: SelectPrimitive.ItemText.Props) {
  return (
    <SelectPrimitive.ItemText
      data-slot="select-item-text"
      className={mergeClassName(className, styles.itemText)}
      {...props}
    />
  );
}

function SelectItemTextContent({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="select-item-text-content"
      className={clsx(styles.itemTextContent, className)}
      {...props}
    />
  );
}

function SelectItemTextIcon({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="select-item-text-icon"
      className={clsx(styles.itemTextIcon, className)}
      {...props}
    />
  );
}

function SelectItemTextLabel({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="select-item-text-label"
      className={clsx(styles.itemTextLabel, className)}
      {...props}
    />
  );
}

function SelectSeparator({ className, ...props }: SelectPrimitive.Separator.Props) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={mergeClassName(className, styles.separator)}
      {...props}
    />
  );
}

function SelectGroup({ className, ...props }: SelectPrimitive.Group.Props) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={mergeClassName(className, styles.group)}
      {...props}
    />
  );
}

function SelectGroupLabel({ className, ...props }: SelectPrimitive.GroupLabel.Props) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-group-label"
      className={mergeClassName(className, styles.groupLabel)}
      {...props}
    />
  );
}

const CheckIcon = CheckFilledIcon;

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

type SelectProps<
  Value = unknown,
  Multiple extends boolean | undefined = false,
> = SelectPrimitive.Root.Props<Value, Multiple>;
type SelectValueType<Value = unknown, Multiple extends boolean | undefined = false> = SelectProps<
  Value,
  Multiple
>['value'];
type SelectFieldProps = React.ComponentProps<'div'>;
type SelectLabelProps = SelectPrimitive.Label.Props;
type SelectTriggerProps = SelectPrimitive.Trigger.Props;
type SelectValueProps = SelectPrimitive.Value.Props;
type SelectIconProps = SelectPrimitive.Icon.Props;
type SelectScrollUpArrowProps = SelectPrimitive.ScrollUpArrow.Props;
type SelectScrollDownArrowProps = SelectPrimitive.ScrollDownArrow.Props;
type SelectListProps = SelectPrimitive.List.Props;
type SelectItemIndicatorProps = SelectPrimitive.ItemIndicator.Props;
type SelectItemTextProps = SelectPrimitive.ItemText.Props;
type SelectItemTextContentProps = React.ComponentProps<'span'>;
type SelectItemTextIconProps = React.ComponentProps<'span'>;
type SelectItemTextLabelProps = React.ComponentProps<'span'>;
type SelectSeparatorProps = SelectPrimitive.Separator.Props;
type SelectGroupProps = SelectPrimitive.Group.Props;
type SelectGroupLabelProps = SelectPrimitive.GroupLabel.Props;

export {
  Select,
  SelectField,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectIcon,
  SelectContent,
  SelectScrollUpArrow,
  SelectScrollDownArrow,
  SelectList,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectItemTextContent,
  SelectItemTextIcon,
  SelectItemTextLabel,
  SelectSeparator,
  SelectGroup,
  SelectGroupLabel,
};

export type {
  SelectProps,
  SelectAnimation,
  SelectValueType,
  SelectContentClassNames,
  SelectContentSlotProps,
  SelectFieldProps,
  SelectLabelProps,
  SelectTriggerProps,
  SelectValueProps,
  SelectIconProps,
  SelectContentProps,
  SelectScrollUpArrowProps,
  SelectScrollDownArrowProps,
  SelectListProps,
  SelectItemProps,
  SelectItemIndicatorProps,
  SelectItemTextProps,
  SelectItemTextContentProps,
  SelectItemTextIconProps,
  SelectItemTextLabelProps,
  SelectSeparatorProps,
  SelectGroupProps,
  SelectGroupLabelProps,
};