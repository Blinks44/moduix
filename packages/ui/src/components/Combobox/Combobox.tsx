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

type ComboboxContentSlotProps = {
  portal?: Omit<ComboboxPrimitive.Portal.Props, 'className' | 'children'>;
  backdrop?: Omit<ComboboxPrimitive.Backdrop.Props, 'className'>;
  positioner?: Omit<ComboboxPrimitive.Positioner.Props, 'className' | 'children'>;
  arrow?: Omit<ComboboxPrimitive.Arrow.Props, 'className' | 'children'>;
};

type ComboboxContentPositionerProps = Pick<
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
>;

type ComboboxContentProps = ComboboxPrimitive.Popup.Props &
  ComboboxContentPositionerProps & {
    classNames?: ComboboxContentClassNames;
    slotProps?: ComboboxContentSlotProps;
    container?: ComboboxPrimitive.Portal.Props['container'];
    withBackdrop?: boolean;
    withArrow?: boolean;
    arrow?: React.ReactNode;
  };

type IndicatorPosition = 'start' | 'end';
type ComboboxItemProps = ComboboxPrimitive.Item.Props & {
  indicator?: IndicatorPosition;
};
type ComboboxFieldLabelProps = ComboboxPrimitive.Label.Props &
  Pick<React.ComponentProps<'label'>, 'htmlFor'>;

const Combobox = ComboboxPrimitive.Root;

const ComboboxField = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
  function ComboboxField({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="combobox-field"
        className={clsx(styles.field, className)}
        {...props}
      />
    );
  },
);

const ComboboxFieldLabel = React.forwardRef<
  React.ComponentRef<typeof ComboboxPrimitive.Label>,
  ComboboxFieldLabelProps
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

const ComboboxInputGroup = React.forwardRef<
  React.ComponentRef<typeof ComboboxPrimitive.InputGroup>,
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

const ComboboxInput = React.forwardRef<
  React.ComponentRef<typeof ComboboxPrimitive.Input>,
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

const ComboboxControlActions = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
  function ComboboxControlActions({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="combobox-control-actions"
        className={clsx(styles.controlActions, className)}
        {...props}
      />
    );
  },
);

const ComboboxTrigger = React.forwardRef<
  React.ComponentRef<typeof ComboboxPrimitive.Trigger>,
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

const ComboboxFieldTrigger = React.forwardRef<
  React.ComponentRef<typeof ComboboxPrimitive.Trigger>,
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

const ComboboxIcon = React.forwardRef<
  React.ComponentRef<typeof ComboboxPrimitive.Icon>,
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

const ComboboxClear = React.forwardRef<
  React.ComponentRef<typeof ComboboxPrimitive.Clear>,
  ComboboxPrimitive.Clear.Props
>(function ComboboxClear({ className, children, ...props }, ref) {
  return (
    <ComboboxPrimitive.Clear
      ref={ref}
      data-slot="combobox-clear"
      className={mergeClassName(className, styles.clear)}
      {...props}
    >
      {children ?? <CloseLineIcon className={styles.iconSvg} />}
    </ComboboxPrimitive.Clear>
  );
});

const ComboboxInlineInputContainer = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
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

const ComboboxPortal = React.forwardRef<
  React.ComponentRef<typeof ComboboxPrimitive.Portal>,
  ComboboxPrimitive.Portal.Props
>(function ComboboxPortal(props, ref) {
  return <ComboboxPrimitive.Portal ref={ref} data-slot="combobox-portal" {...props} />;
});

const ComboboxBackdrop = React.forwardRef<
  React.ComponentRef<typeof ComboboxPrimitive.Backdrop>,
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

const ComboboxPositioner = React.forwardRef<
  React.ComponentRef<typeof ComboboxPrimitive.Positioner>,
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

const ComboboxPopup = React.forwardRef<
  React.ComponentRef<typeof ComboboxPrimitive.Popup>,
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

const ComboboxArrow = React.forwardRef<
  React.ComponentRef<typeof ComboboxPrimitive.Arrow>,
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

function ComboboxContent({
  children,
  className,
  classNames,
  slotProps,
  container,
  withBackdrop = false,
  withArrow,
  arrow,
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
  const { portal, backdrop, positioner, arrow: arrowSlotProps } = slotProps ?? {};
  const { container: portalSlotContainer, ...portalProps } = portal ?? {};
  const resolvedPositionerProps: ComboboxContentPositionerProps = {
    side: side ?? positioner?.side,
    sideOffset: sideOffset ?? positioner?.sideOffset ?? 5,
    align: align ?? positioner?.align,
    alignOffset: alignOffset ?? positioner?.alignOffset,
    arrowPadding: arrowPadding ?? positioner?.arrowPadding,
    anchor: anchor ?? positioner?.anchor,
    collisionAvoidance: collisionAvoidance ?? positioner?.collisionAvoidance,
    collisionBoundary: collisionBoundary ?? positioner?.collisionBoundary,
    collisionPadding: collisionPadding ?? positioner?.collisionPadding,
    sticky: sticky ?? positioner?.sticky,
    positionMethod: positionMethod ?? positioner?.positionMethod,
  };
  const showArrow = withArrow ?? false;
  const portalContainer = container ?? portalSlotContainer;

  return (
    <ComboboxPortal className={classNames?.portal} container={portalContainer} {...portalProps}>
      {withBackdrop ? <ComboboxBackdrop className={classNames?.backdrop} {...backdrop} /> : null}
      <ComboboxPositioner
        {...positioner}
        {...resolvedPositionerProps}
        className={classNames?.positioner}
      >
        <ComboboxPopup className={className} {...props}>
          {showArrow ? (
            <ComboboxArrow className={classNames?.arrow} {...arrowSlotProps}>
              {arrow}
            </ComboboxArrow>
          ) : null}
          {children}
        </ComboboxPopup>
      </ComboboxPositioner>
    </ComboboxPortal>
  );
}

const ComboboxStatus = React.forwardRef<
  React.ComponentRef<typeof ComboboxPrimitive.Status>,
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

const ComboboxEmpty = React.forwardRef<
  React.ComponentRef<typeof ComboboxPrimitive.Empty>,
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

const ComboboxList = React.forwardRef<
  React.ComponentRef<typeof ComboboxPrimitive.List>,
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

const ComboboxRow = React.forwardRef<
  React.ComponentRef<typeof ComboboxPrimitive.Row>,
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

const ComboboxItem = React.forwardRef<
  React.ComponentRef<typeof ComboboxPrimitive.Item>,
  ComboboxItemProps
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

const ComboboxItemIndicator = React.forwardRef<
  React.ComponentRef<typeof ComboboxPrimitive.ItemIndicator>,
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

const ComboboxItemText = React.forwardRef<HTMLSpanElement, React.ComponentProps<'span'>>(
  function ComboboxItemText({ className, ...props }, ref) {
    return (
      <span
        ref={ref}
        data-slot="combobox-item-text"
        className={clsx(styles.itemText, className)}
        {...props}
      />
    );
  },
);

const ComboboxItemTextContent = React.forwardRef<HTMLSpanElement, React.ComponentProps<'span'>>(
  function ComboboxItemTextContent({ className, ...props }, ref) {
    return (
      <span
        ref={ref}
        data-slot="combobox-item-text-content"
        className={clsx(styles.itemTextContent, className)}
        {...props}
      />
    );
  },
);

const ComboboxItemTextIcon = React.forwardRef<HTMLSpanElement, React.ComponentProps<'span'>>(
  function ComboboxItemTextIcon({ className, ...props }, ref) {
    return (
      <span
        ref={ref}
        data-slot="combobox-item-text-icon"
        className={clsx(styles.itemTextIcon, className)}
        {...props}
      />
    );
  },
);

const ComboboxItemTextLabel = React.forwardRef<HTMLSpanElement, React.ComponentProps<'span'>>(
  function ComboboxItemTextLabel({ className, ...props }, ref) {
    return (
      <span
        ref={ref}
        data-slot="combobox-item-text-label"
        className={clsx(styles.itemTextLabel, className)}
        {...props}
      />
    );
  },
);

const ComboboxSeparator = React.forwardRef<
  React.ComponentRef<typeof ComboboxPrimitive.Separator>,
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

const ComboboxGroup = React.forwardRef<
  React.ComponentRef<typeof ComboboxPrimitive.Group>,
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

const ComboboxGroupLabel = React.forwardRef<
  React.ComponentRef<typeof ComboboxPrimitive.GroupLabel>,
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

const ComboboxChips = React.forwardRef<
  React.ComponentRef<typeof ComboboxPrimitive.Chips>,
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

const ComboboxChip = React.forwardRef<
  React.ComponentRef<typeof ComboboxPrimitive.Chip>,
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

const ComboboxChipRemove = React.forwardRef<
  React.ComponentRef<typeof ComboboxPrimitive.ChipRemove>,
  ComboboxPrimitive.ChipRemove.Props
>(function ComboboxChipRemove({ className, children, ...props }, ref) {
  return (
    <ComboboxPrimitive.ChipRemove
      ref={ref}
      data-slot="combobox-chip-remove"
      className={mergeClassName(className, styles.chipRemove)}
      {...props}
    >
      {children ?? <CloseLineIcon className={styles.chipRemoveIcon} />}
    </ComboboxPrimitive.ChipRemove>
  );
});

const ComboboxChipText = React.forwardRef<HTMLSpanElement, React.ComponentProps<'span'>>(
  function ComboboxChipText({ className, ...props }, ref) {
    return (
      <span
        ref={ref}
        data-slot="combobox-chip-text"
        className={clsx(styles.chipText, className)}
        {...props}
      />
    );
  },
);

const ComboboxChipsInput = React.forwardRef<
  React.ComponentRef<typeof ComboboxPrimitive.Input>,
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
type ComboboxFieldProps = React.ComponentProps<'div'>;
type ComboboxValueProps = ComboboxPrimitive.Value.Props;
type ComboboxInputGroupProps = ComboboxPrimitive.InputGroup.Props;
type ComboboxInputProps = ComboboxPrimitive.Input.Props;
type ComboboxControlActionsProps = React.ComponentProps<'div'>;
type ComboboxTriggerProps = ComboboxPrimitive.Trigger.Props;
type ComboboxFieldTriggerProps = ComboboxPrimitive.Trigger.Props;
type ComboboxIconProps = ComboboxPrimitive.Icon.Props;
type ComboboxClearProps = ComboboxPrimitive.Clear.Props;
type ComboboxStatusProps = ComboboxPrimitive.Status.Props;
type ComboboxEmptyProps = ComboboxPrimitive.Empty.Props;
type ComboboxListProps = ComboboxPrimitive.List.Props;
type ComboboxRowProps = ComboboxPrimitive.Row.Props;
type ComboboxItemIndicatorProps = ComboboxPrimitive.ItemIndicator.Props;
type ComboboxItemTextProps = React.ComponentProps<'span'>;
type ComboboxItemTextContentProps = React.ComponentProps<'span'>;
type ComboboxItemTextIconProps = React.ComponentProps<'span'>;
type ComboboxItemTextLabelProps = React.ComponentProps<'span'>;
type ComboboxSeparatorProps = ComboboxPrimitive.Separator.Props;
type ComboboxGroupProps = ComboboxPrimitive.Group.Props;
type ComboboxGroupLabelProps = ComboboxPrimitive.GroupLabel.Props;
type ComboboxCollectionProps = ComboboxPrimitive.Collection.Props;
type ComboboxInlineInputContainerProps = React.ComponentProps<'div'>;
type ComboboxChipsProps = ComboboxPrimitive.Chips.Props;
type ComboboxChipProps = ComboboxPrimitive.Chip.Props;
type ComboboxChipRemoveProps = ComboboxPrimitive.ChipRemove.Props;
type ComboboxChipTextProps = React.ComponentProps<'span'>;
type ComboboxChipsInputProps = ComboboxPrimitive.Input.Props;

export {
  Combobox,
  ComboboxField,
  ComboboxFieldLabel,
  ComboboxValue,
  ComboboxInputGroup,
  ComboboxInput,
  ComboboxControlActions,
  ComboboxTrigger,
  ComboboxFieldTrigger,
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
  ComboboxContentSlotProps,
  ComboboxContentProps,
  ComboboxFieldProps,
  ComboboxFieldLabelProps,
  ComboboxValueProps,
  ComboboxInputGroupProps,
  ComboboxInputProps,
  ComboboxControlActionsProps,
  ComboboxTriggerProps,
  ComboboxFieldTriggerProps,
  ComboboxIconProps,
  ComboboxClearProps,
  ComboboxStatusProps,
  ComboboxEmptyProps,
  ComboboxListProps,
  ComboboxRowProps,
  ComboboxItemProps,
  ComboboxItemIndicatorProps,
  ComboboxItemTextProps,
  ComboboxItemTextContentProps,
  ComboboxItemTextIconProps,
  ComboboxItemTextLabelProps,
  ComboboxSeparatorProps,
  ComboboxGroupProps,
  ComboboxGroupLabelProps,
  ComboboxCollectionProps,
  ComboboxInlineInputContainerProps,
  ComboboxChipsProps,
  ComboboxChipProps,
  ComboboxChipRemoveProps,
  ComboboxChipTextProps,
  ComboboxChipsInputProps,
};