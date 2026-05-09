import { Combobox as ComboboxPrimitive } from '@base-ui/react/combobox';
import { clsx } from 'clsx';
import * as React from 'react';
import {
  CheckFilledIcon,
  ChevronDownIcon,
  ChevronUpDownIcon,
  CloseLineIcon,
  PopupArrowIcon,
} from '@/primitives';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Combobox.module.css';

type ComboboxContentClassNames = {
  portal?: ComboboxPrimitive.Portal.Props['className'];
  backdrop?: ComboboxPrimitive.Backdrop.Props['className'];
  positioner?: ComboboxPrimitive.Positioner.Props['className'];
  arrow?: ComboboxPrimitive.Arrow.Props['className'];
};

type ComboboxContentProps = ComboboxPrimitive.Popup.Props &
  Pick<
    ComboboxPrimitive.Positioner.Props,
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
  > & {
    classNames?: ComboboxContentClassNames;
    container?: ComboboxPrimitive.Portal.Props['container'];
    withBackdrop?: boolean;
    showArrow?: boolean;
    arrow?: React.ReactNode;
    portalProps?: Omit<ComboboxPrimitive.Portal.Props, 'className' | 'children'>;
    backdropProps?: Omit<ComboboxPrimitive.Backdrop.Props, 'className'>;
    positionerProps?: Omit<ComboboxPrimitive.Positioner.Props, 'className' | 'children'>;
    arrowProps?: Omit<ComboboxPrimitive.Arrow.Props, 'className' | 'children'>;
  };

type IndicatorPosition = 'start' | 'end';
type ComboboxItemProps = ComboboxPrimitive.Item.Props & {
  indicator?: IndicatorPosition;
};
type ComboboxFieldLabelProps = ComboboxPrimitive.Label.Props &
  Pick<React.ComponentProps<'label'>, 'htmlFor'>;

const Combobox = ComboboxPrimitive.Root;

function ComboboxField({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="combobox-field" className={clsx(styles.field, className)} {...props} />;
}

function ComboboxFieldLabel({ className, ...props }: ComboboxFieldLabelProps) {
  return (
    <ComboboxPrimitive.Label
      data-slot="combobox-field-label"
      className={mergeClassName(className, styles.fieldLabel)}
      {...props}
    />
  );
}

function ComboboxValue(props: ComboboxPrimitive.Value.Props) {
  return <ComboboxPrimitive.Value data-slot="combobox-value" {...props} />;
}

function ComboboxInputGroup({ className, ...props }: ComboboxPrimitive.InputGroup.Props) {
  return (
    <ComboboxPrimitive.InputGroup
      data-slot="combobox-input-group"
      className={mergeClassName(className, styles.inputGroup)}
      {...props}
    />
  );
}

function ComboboxInput({ className, ...props }: ComboboxPrimitive.Input.Props) {
  return (
    <ComboboxPrimitive.Input
      data-slot="combobox-input"
      className={mergeClassName(className, styles.input)}
      {...props}
    />
  );
}

function ComboboxControlActions({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="combobox-control-actions"
      className={clsx(styles.controlActions, className)}
      {...props}
    />
  );
}

function ComboboxTrigger({ className, children, ...props }: ComboboxPrimitive.Trigger.Props) {
  return (
    <ComboboxPrimitive.Trigger
      data-slot="combobox-trigger"
      className={mergeClassName(className, styles.trigger)}
      {...props}
    >
      {children ?? <ChevronDownIcon className={styles.iconSvg} />}
    </ComboboxPrimitive.Trigger>
  );
}

function ComboboxIcon({ className, children, ...props }: ComboboxPrimitive.Icon.Props) {
  return (
    <ComboboxPrimitive.Icon
      data-slot="combobox-icon"
      className={mergeClassName(className, styles.icon)}
      {...props}
    >
      {children ?? <ChevronUpDownIcon className={styles.iconSvg} />}
    </ComboboxPrimitive.Icon>
  );
}

function ComboboxClear({ className, children, ...props }: ComboboxPrimitive.Clear.Props) {
  return (
    <ComboboxPrimitive.Clear
      data-slot="combobox-clear"
      className={mergeClassName(className, styles.clear)}
      {...props}
    >
      {children ?? <CloseLineIcon className={styles.iconSvg} />}
    </ComboboxPrimitive.Clear>
  );
}

function ComboboxInlineInputContainer({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="combobox-inline-input-container"
      className={clsx(styles.inlineInputContainer, className)}
      {...props}
    />
  );
}

function ComboboxPortal(props: ComboboxPrimitive.Portal.Props) {
  return <ComboboxPrimitive.Portal data-slot="combobox-portal" {...props} />;
}

function ComboboxBackdrop({ className, ...props }: ComboboxPrimitive.Backdrop.Props) {
  return (
    <ComboboxPrimitive.Backdrop
      data-slot="combobox-backdrop"
      className={mergeClassName(className, styles.backdrop)}
      {...props}
    />
  );
}

function ComboboxPositioner({ className, ...props }: ComboboxPrimitive.Positioner.Props) {
  return (
    <ComboboxPrimitive.Positioner
      data-slot="combobox-positioner"
      className={mergeClassName(className, styles.positioner)}
      {...props}
    />
  );
}

function ComboboxPopup({ className, ...props }: ComboboxPrimitive.Popup.Props) {
  return (
    <ComboboxPrimitive.Popup
      data-slot="combobox-popup"
      className={mergeClassName(className, styles.popup)}
      {...props}
    />
  );
}

function ComboboxArrow({ className, children, ...props }: ComboboxPrimitive.Arrow.Props) {
  return (
    <ComboboxPrimitive.Arrow
      data-slot="combobox-arrow"
      className={mergeClassName(className, styles.arrow)}
      {...props}
    >
      {children ?? <ArrowSvg className={styles.arrowSvg} />}
    </ComboboxPrimitive.Arrow>
  );
}

function ComboboxContent({
  className,
  classNames,
  container,
  withBackdrop = false,
  showArrow = false,
  arrow,
  portalProps,
  backdropProps,
  positionerProps,
  arrowProps,
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
  ...props
}: ComboboxContentProps) {
  const { container: portalPropsContainer, ...restPortalProps } = portalProps ?? {};
  const portalContainer = container ?? portalPropsContainer;
  const resolvedSide = side ?? positionerProps?.side;
  const resolvedSideOffset = sideOffset ?? positionerProps?.sideOffset ?? 5;
  const resolvedAlign = align ?? positionerProps?.align;
  const resolvedAlignOffset = alignOffset ?? positionerProps?.alignOffset;
  const resolvedArrowPadding = arrowPadding ?? positionerProps?.arrowPadding;
  const resolvedAnchor = anchor ?? positionerProps?.anchor;
  const resolvedCollisionAvoidance = collisionAvoidance ?? positionerProps?.collisionAvoidance;
  const resolvedCollisionBoundary = collisionBoundary ?? positionerProps?.collisionBoundary;
  const resolvedCollisionPadding = collisionPadding ?? positionerProps?.collisionPadding;
  const resolvedSticky = sticky ?? positionerProps?.sticky;
  const resolvedPositionMethod = positionMethod ?? positionerProps?.positionMethod;

  return (
    <ComboboxPortal className={classNames?.portal} container={portalContainer} {...restPortalProps}>
      {withBackdrop ? (
        <ComboboxBackdrop className={classNames?.backdrop} {...backdropProps} />
      ) : null}
      <ComboboxPositioner
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
        className={classNames?.positioner}
      >
        <ComboboxPopup className={className} {...props}>
          {showArrow ? (
            <ComboboxArrow className={classNames?.arrow} {...arrowProps}>
              {arrow}
            </ComboboxArrow>
          ) : null}
          {props.children}
        </ComboboxPopup>
      </ComboboxPositioner>
    </ComboboxPortal>
  );
}

function ComboboxStatus({ className, ...props }: ComboboxPrimitive.Status.Props) {
  return (
    <ComboboxPrimitive.Status
      data-slot="combobox-status"
      className={mergeClassName(className, styles.status)}
      {...props}
    />
  );
}

function ComboboxEmpty({ className, ...props }: ComboboxPrimitive.Empty.Props) {
  return (
    <ComboboxPrimitive.Empty
      data-slot="combobox-empty"
      className={mergeClassName(className, styles.empty)}
      {...props}
    />
  );
}

function ComboboxList({ className, ...props }: ComboboxPrimitive.List.Props) {
  return (
    <ComboboxPrimitive.List
      data-slot="combobox-list"
      className={mergeClassName(className, styles.list)}
      {...props}
    />
  );
}

function ComboboxRow({ className, ...props }: ComboboxPrimitive.Row.Props) {
  return (
    <ComboboxPrimitive.Row
      data-slot="combobox-row"
      className={mergeClassName(className, styles.row)}
      {...props}
    />
  );
}

function ComboboxItem({ className, indicator, ...props }: ComboboxItemProps) {
  return (
    <ComboboxPrimitive.Item
      data-slot="combobox-item"
      data-indicator-position={indicator}
      className={mergeClassName(className, styles.item)}
      {...props}
    />
  );
}

function ComboboxItemIndicator({
  className,
  children,
  ...props
}: ComboboxPrimitive.ItemIndicator.Props) {
  return (
    <ComboboxPrimitive.ItemIndicator
      data-slot="combobox-item-indicator"
      className={mergeClassName(className, styles.itemIndicator)}
      {...props}
    >
      {children ?? <CheckIcon className={styles.itemIndicatorIcon} />}
    </ComboboxPrimitive.ItemIndicator>
  );
}

function ComboboxItemText({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span data-slot="combobox-item-text" className={clsx(styles.itemText, className)} {...props} />
  );
}

function ComboboxItemTextContent({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="combobox-item-text-content"
      className={clsx(styles.itemTextContent, className)}
      {...props}
    />
  );
}

function ComboboxItemTextIcon({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="combobox-item-text-icon"
      className={clsx(styles.itemTextIcon, className)}
      {...props}
    />
  );
}

function ComboboxItemTextLabel({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="combobox-item-text-label"
      className={clsx(styles.itemTextLabel, className)}
      {...props}
    />
  );
}

function ComboboxSeparator({ className, ...props }: ComboboxPrimitive.Separator.Props) {
  return (
    <ComboboxPrimitive.Separator
      data-slot="combobox-separator"
      className={mergeClassName(className, styles.separator)}
      {...props}
    />
  );
}

function ComboboxGroup({ className, ...props }: ComboboxPrimitive.Group.Props) {
  return (
    <ComboboxPrimitive.Group
      data-slot="combobox-group"
      className={mergeClassName(className, styles.group)}
      {...props}
    />
  );
}

function ComboboxGroupLabel({ className, ...props }: ComboboxPrimitive.GroupLabel.Props) {
  return (
    <ComboboxPrimitive.GroupLabel
      data-slot="combobox-group-label"
      className={mergeClassName(className, styles.groupLabel)}
      {...props}
    />
  );
}

function ComboboxCollection(props: ComboboxPrimitive.Collection.Props) {
  return <ComboboxPrimitive.Collection data-slot="combobox-collection" {...props} />;
}

function ComboboxChips({ className, ...props }: ComboboxPrimitive.Chips.Props) {
  return (
    <ComboboxPrimitive.Chips
      data-slot="combobox-chips"
      className={mergeClassName(className, styles.chips)}
      {...props}
    />
  );
}

function ComboboxChip({ className, ...props }: ComboboxPrimitive.Chip.Props) {
  return (
    <ComboboxPrimitive.Chip
      data-slot="combobox-chip"
      className={mergeClassName(className, styles.chip)}
      {...props}
    />
  );
}

function ComboboxChipRemove({ className, children, ...props }: ComboboxPrimitive.ChipRemove.Props) {
  return (
    <ComboboxPrimitive.ChipRemove
      data-slot="combobox-chip-remove"
      className={mergeClassName(className, styles.chipRemove)}
      {...props}
    >
      {children ?? <CloseLineIcon className={styles.chipRemoveIcon} />}
    </ComboboxPrimitive.ChipRemove>
  );
}

function ComboboxChipText({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span data-slot="combobox-chip-text" className={clsx(styles.chipText, className)} {...props} />
  );
}

function ComboboxChipsInput({ className, ...props }: ComboboxPrimitive.Input.Props) {
  return (
    <ComboboxPrimitive.Input
      data-slot="combobox-chips-input"
      className={mergeClassName(className, styles.chipsInput)}
      {...props}
    />
  );
}

function useComboboxAnchor() {
  return React.useRef<HTMLDivElement | null>(null);
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

const CheckIcon = CheckFilledIcon;

const useComboboxFilter = ComboboxPrimitive.useFilter;
const useComboboxFilteredItems = ComboboxPrimitive.useFilteredItems;

type ComboboxProps<
  Value = unknown,
  Multiple extends boolean | undefined = false,
> = ComboboxPrimitive.Root.Props<Value, Multiple>;
type ComboboxValueType<
  Value = unknown,
  Multiple extends boolean | undefined = false,
> = ComboboxProps<Value, Multiple>['value'];

export {
  Combobox,
  ComboboxField,
  ComboboxFieldLabel,
  ComboboxValue,
  ComboboxInputGroup,
  ComboboxInput,
  ComboboxControlActions,
  ComboboxTrigger,
  ComboboxIcon,
  ComboboxClear,
  ComboboxContent,
  ComboboxStatus,
  ComboboxEmpty,
  ComboboxList,
  ComboboxRow,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxItemText,
  ComboboxItemTextContent,
  ComboboxItemTextIcon,
  ComboboxItemTextLabel,
  ComboboxSeparator,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxCollection,
  ComboboxInlineInputContainer,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipRemove,
  ComboboxChipText,
  ComboboxChipsInput,
  useComboboxAnchor,
  useComboboxFilter,
  useComboboxFilteredItems,
};

export type {
  ComboboxProps,
  ComboboxValueType,
  ComboboxContentClassNames,
  ComboboxContentProps,
  ComboboxFieldLabelProps,
};