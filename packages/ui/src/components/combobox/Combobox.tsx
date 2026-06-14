import type { ComponentProps, ComponentRef } from 'react';
import { Combobox as ComboboxPrimitive } from '@base-ui/react/combobox';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpDownIcon,
  CloseIcon,
  PopupArrowIcon,
} from '@/lib/moduix/icons/ui';
import { mergeClassName } from '@/lib/moduix/mergeClassName';
import styles from './Combobox.module.css';

type IndicatorPosition = 'start' | 'end' | 'none';
type ComboboxContentProps = ComboboxPrimitive.Popup.Props &
  Pick<
    ComboboxPrimitive.Positioner.Props,
    | 'side'
    | 'sideOffset'
    | 'align'
    | 'alignOffset'
    | 'arrowPadding'
    | 'collisionAvoidance'
    | 'collisionBoundary'
    | 'collisionPadding'
  > & {
    showArrow?: boolean;
  };

const COMBOBOX_CONTENT_SIDE_OFFSET = 5;

const Combobox = ComboboxPrimitive.Root;

function ComboboxField({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="combobox-field" className={clsx(styles.field, className)} {...props} />;
}

const ComboboxFieldLabel = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.Label>,
  ComboboxPrimitive.Label.Props
>(function ComboboxFieldLabel({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.Label
      ref={ref}
      data-slot="combobox-field-label"
      className={mergeClassName(className, styles.fieldLabel)}
      {...props}
    />
  );
});

function ComboboxValue(props: ComboboxPrimitive.Value.Props) {
  return <ComboboxPrimitive.Value data-slot="combobox-value" {...props} />;
}

const ComboboxInlineInputContainer = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  function ComboboxInlineInputContainer({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="combobox-inline-input-container"
        className={clsx(styles.inlineInputContainer, className)}
        {...props}
      />
    );
  },
);

const ComboboxInputGroup = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.InputGroup>,
  ComboboxPrimitive.InputGroup.Props
>(function ComboboxInputGroup({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.InputGroup
      ref={ref}
      data-slot="combobox-input-group"
      className={mergeClassName(className, styles.inputGroup)}
      {...props}
    />
  );
});

const ComboboxInput = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.Input>,
  ComboboxPrimitive.Input.Props
>(function ComboboxInput({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.Input
      ref={ref}
      data-slot="combobox-input"
      className={mergeClassName(className, styles.input)}
      {...props}
    />
  );
});

function ComboboxControlActions({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="combobox-control-actions"
      className={clsx(styles.controlActions, className)}
      {...props}
    />
  );
}

const ComboboxTrigger = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.Trigger>,
  ComboboxPrimitive.Trigger.Props
>(function ComboboxTrigger({ className, children, ...props }, ref) {
  return (
    <ComboboxPrimitive.Trigger
      ref={ref}
      data-slot="combobox-trigger"
      className={mergeClassName(className, styles.trigger)}
      {...props}
    >
      {children ?? <ChevronDownIcon className={styles.iconSvg} />}
    </ComboboxPrimitive.Trigger>
  );
});

const ComboboxFieldTrigger = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.Trigger>,
  ComboboxPrimitive.Trigger.Props
>(function ComboboxFieldTrigger({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.Trigger
      ref={ref}
      data-slot="combobox-field-trigger"
      className={mergeClassName(className, styles.fieldTrigger)}
      {...props}
    />
  );
});

const ComboboxIcon = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.Icon>,
  ComboboxPrimitive.Icon.Props
>(function ComboboxIcon({ className, children, ...props }, ref) {
  return (
    <ComboboxPrimitive.Icon
      ref={ref}
      data-slot="combobox-icon"
      className={mergeClassName(className, styles.icon)}
      {...props}
    >
      {children ?? <ChevronUpDownIcon className={styles.iconSvg} />}
    </ComboboxPrimitive.Icon>
  );
});

const ComboboxClear = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.Clear>,
  ComboboxPrimitive.Clear.Props
>(function ComboboxClear({ className, children, ...props }, ref) {
  return (
    <ComboboxPrimitive.Clear
      ref={ref}
      data-slot="combobox-clear"
      className={mergeClassName(className, styles.clear)}
      {...props}
    >
      {children ?? <CloseIcon className={styles.iconSvg} />}
    </ComboboxPrimitive.Clear>
  );
});

const ComboboxPortal = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.Portal>,
  ComboboxPrimitive.Portal.Props
>(function ComboboxPortal({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.Portal
      ref={ref}
      data-slot="combobox-portal"
      className={className}
      {...props}
    />
  );
});

const ComboboxBackdrop = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.Backdrop>,
  ComboboxPrimitive.Backdrop.Props
>(function ComboboxBackdrop({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.Backdrop
      ref={ref}
      data-slot="combobox-backdrop"
      className={mergeClassName(className, styles.backdrop)}
      {...props}
    />
  );
});

const ComboboxPositioner = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.Positioner>,
  ComboboxPrimitive.Positioner.Props
>(function ComboboxPositioner({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.Positioner
      ref={ref}
      data-slot="combobox-positioner"
      className={mergeClassName(className, styles.positioner)}
      {...props}
    />
  );
});

const ComboboxPopup = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.Popup>,
  ComboboxPrimitive.Popup.Props
>(function ComboboxPopup({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.Popup
      ref={ref}
      data-slot="combobox-popup"
      className={mergeClassName(className, styles.popup)}
      {...props}
    />
  );
});

const ComboboxArrow = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.Arrow>,
  ComboboxPrimitive.Arrow.Props
>(function ComboboxArrow({ className, children, ...props }, ref) {
  return (
    <ComboboxPrimitive.Arrow
      ref={ref}
      data-slot="combobox-arrow"
      className={mergeClassName(className, styles.arrow)}
      {...props}
    >
      {children ?? <ArrowSvg className={styles.arrowSvg} />}
    </ComboboxPrimitive.Arrow>
  );
});

const ComboboxContent = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.Popup>,
  ComboboxContentProps
>(function ComboboxContent(
  {
    className,
    showArrow = false,
    children,
    side,
    sideOffset = COMBOBOX_CONTENT_SIDE_OFFSET,
    align,
    alignOffset,
    arrowPadding,
    collisionAvoidance,
    collisionBoundary,
    collisionPadding,
    ...props
  },
  ref,
) {
  return (
    <ComboboxPortal>
      <ComboboxPositioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        arrowPadding={arrowPadding}
        collisionAvoidance={collisionAvoidance}
        collisionBoundary={collisionBoundary}
        collisionPadding={collisionPadding}
      >
        <ComboboxPopup ref={ref} className={className} {...props}>
          {showArrow ? <ComboboxArrow /> : null}
          {children}
        </ComboboxPopup>
      </ComboboxPositioner>
    </ComboboxPortal>
  );
});

const ComboboxStatus = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.Status>,
  ComboboxPrimitive.Status.Props
>(function ComboboxStatus({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.Status
      ref={ref}
      data-slot="combobox-status"
      className={mergeClassName(className, styles.status)}
      {...props}
    />
  );
});

const ComboboxEmpty = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.Empty>,
  ComboboxPrimitive.Empty.Props
>(function ComboboxEmpty({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.Empty
      ref={ref}
      data-slot="combobox-empty"
      className={mergeClassName(className, styles.empty)}
      {...props}
    />
  );
});

const ComboboxList = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.List>,
  ComboboxPrimitive.List.Props
>(function ComboboxList({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.List
      ref={ref}
      data-slot="combobox-list"
      className={mergeClassName(className, styles.list)}
      {...props}
    />
  );
});

const ComboboxRow = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.Row>,
  ComboboxPrimitive.Row.Props
>(function ComboboxRow({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.Row
      ref={ref}
      data-slot="combobox-row"
      className={mergeClassName(className, styles.row)}
      {...props}
    />
  );
});

const ComboboxItem = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.Item>,
  ComboboxPrimitive.Item.Props & {
    indicator?: IndicatorPosition;
  }
>(function ComboboxItem({ className, indicator, ...props }, ref) {
  return (
    <ComboboxPrimitive.Item
      ref={ref}
      data-slot="combobox-item"
      data-indicator-position={indicator}
      className={mergeClassName(className, styles.item)}
      {...props}
    />
  );
});

const ComboboxItemIndicator = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.ItemIndicator>,
  ComboboxPrimitive.ItemIndicator.Props
>(function ComboboxItemIndicator({ className, children, ...props }, ref) {
  return (
    <ComboboxPrimitive.ItemIndicator
      ref={ref}
      data-slot="combobox-item-indicator"
      className={mergeClassName(className, styles.itemIndicator)}
      {...props}
    >
      {children ?? <CheckIcon className={styles.itemIndicatorIcon} />}
    </ComboboxPrimitive.ItemIndicator>
  );
});

function ComboboxItemText({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span data-slot="combobox-item-text" className={clsx(styles.itemText, className)} {...props} />
  );
}

const ComboboxSeparator = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.Separator>,
  ComboboxPrimitive.Separator.Props
>(function ComboboxSeparator({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.Separator
      ref={ref}
      data-slot="combobox-separator"
      className={mergeClassName(className, styles.separator)}
      {...props}
    />
  );
});

const ComboboxGroup = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.Group>,
  ComboboxPrimitive.Group.Props
>(function ComboboxGroup({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.Group
      ref={ref}
      data-slot="combobox-group"
      className={mergeClassName(className, styles.group)}
      {...props}
    />
  );
});

const ComboboxGroupLabel = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.GroupLabel>,
  ComboboxPrimitive.GroupLabel.Props
>(function ComboboxGroupLabel({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.GroupLabel
      ref={ref}
      data-slot="combobox-group-label"
      className={mergeClassName(className, styles.groupLabel)}
      {...props}
    />
  );
});

function ComboboxCollection(props: ComboboxPrimitive.Collection.Props) {
  return <ComboboxPrimitive.Collection data-slot="combobox-collection" {...props} />;
}

const ComboboxChips = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.Chips>,
  ComboboxPrimitive.Chips.Props
>(function ComboboxChips({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.Chips
      ref={ref}
      data-slot="combobox-chips"
      className={mergeClassName(className, styles.chips)}
      {...props}
    />
  );
});

const ComboboxChip = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.Chip>,
  ComboboxPrimitive.Chip.Props
>(function ComboboxChip({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.Chip
      ref={ref}
      data-slot="combobox-chip"
      className={mergeClassName(className, styles.chip)}
      {...props}
    />
  );
});

const ComboboxChipRemove = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.ChipRemove>,
  ComboboxPrimitive.ChipRemove.Props
>(function ComboboxChipRemove({ className, children, ...props }, ref) {
  return (
    <ComboboxPrimitive.ChipRemove
      ref={ref}
      data-slot="combobox-chip-remove"
      className={mergeClassName(className, styles.chipRemove)}
      {...props}
    >
      {children ?? <CloseIcon className={styles.chipRemoveIcon} />}
    </ComboboxPrimitive.ChipRemove>
  );
});

function ComboboxChipText({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span data-slot="combobox-chip-text" className={clsx(styles.chipText, className)} {...props} />
  );
}

const ComboboxChipsInput = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.Input>,
  ComboboxPrimitive.Input.Props
>(function ComboboxChipsInput({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.Input
      ref={ref}
      data-slot="combobox-chips-input"
      className={mergeClassName(className, styles.chipsInput)}
      {...props}
    />
  );
});

const useComboboxFilter = ComboboxPrimitive.useFilter;
const useComboboxFilteredItems = ComboboxPrimitive.useFilteredItems;

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
  Combobox,
  ComboboxField,
  ComboboxFieldLabel,
  ComboboxValue,
  ComboboxInlineInputContainer,
  ComboboxInputGroup,
  ComboboxInput,
  ComboboxControlActions,
  ComboboxTrigger,
  ComboboxFieldTrigger,
  ComboboxIcon,
  ComboboxClear,
  ComboboxPortal,
  ComboboxBackdrop,
  ComboboxPositioner,
  ComboboxPopup,
  ComboboxContent,
  ComboboxArrow,
  ComboboxStatus,
  ComboboxEmpty,
  ComboboxList,
  ComboboxRow,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxItemText,
  ComboboxSeparator,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxCollection,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipRemove,
  ComboboxChipText,
  ComboboxChipsInput,
  useComboboxFilter,
  useComboboxFilteredItems,
};