import type { ComponentProps } from 'react';
import { Select as SelectPrimitive } from '@base-ui/react/select';
import { clsx } from 'clsx';
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpDownIcon,
  ChevronUpIcon,
  PopupArrowIcon,
} from '@/icons/ui';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Select.module.css';

type IndicatorPosition = 'start' | 'end';
type SelectContentProps = SelectPrimitive.Popup.Props &
  Pick<
    SelectPrimitive.Positioner.Props,
    | 'align'
    | 'alignItemWithTrigger'
    | 'alignOffset'
    | 'arrowPadding'
    | 'collisionAvoidance'
    | 'collisionBoundary'
    | 'collisionPadding'
    | 'side'
    | 'sideOffset'
  > & {
    showArrow?: boolean;
  };
type SelectItemProps = SelectPrimitive.Item.Props & { indicator?: IndicatorPosition };

const SELECT_CONTENT_SIDE_OFFSET = 8;
const Select = SelectPrimitive.Root;

function SelectField({ className, ...props }: ComponentProps<'div'>) {
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

function SelectPopup({ className, ...props }: SelectPrimitive.Popup.Props) {
  return (
    <SelectPrimitive.Popup
      data-slot="select-popup"
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
  children,
  showArrow = false,
  alignItemWithTrigger,
  side,
  sideOffset = SELECT_CONTENT_SIDE_OFFSET,
  align,
  alignOffset,
  arrowPadding,
  collisionAvoidance,
  collisionBoundary,
  collisionPadding,
  ...popupProps
}: SelectContentProps) {
  return (
    <SelectPortal>
      <SelectPositioner
        alignItemWithTrigger={alignItemWithTrigger}
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        arrowPadding={arrowPadding}
        collisionAvoidance={collisionAvoidance}
        collisionBoundary={collisionBoundary}
        collisionPadding={collisionPadding}
      >
        <SelectPopup className={className} {...popupProps}>
          {showArrow ? <SelectArrow /> : null}
          {children}
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

function SelectItemTextContent({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      data-slot="select-item-text-content"
      className={clsx(styles.itemTextContent, className)}
      {...props}
    />
  );
}

function SelectItemTextIcon({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      data-slot="select-item-text-icon"
      className={clsx(styles.itemTextIcon, className)}
      {...props}
    />
  );
}

function SelectItemTextLabel({ className, ...props }: ComponentProps<'span'>) {
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
  Select,
  SelectField,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectPositioner,
  SelectPopup,
  SelectArrow,
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