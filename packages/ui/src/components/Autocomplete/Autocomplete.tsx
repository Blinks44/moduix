import { Autocomplete as AutocompletePrimitive } from '@base-ui/react/autocomplete';
import { Combobox as ComboboxPrimitive } from '@base-ui/react/combobox';
import { clsx } from 'clsx';
import * as React from 'react';
import { ChevronDownIcon, ChevronUpDownIcon, CloseLineIcon, PopupArrowIcon } from '@/primitives';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Autocomplete.module.css';

const Autocomplete = AutocompletePrimitive.Root;

const AutocompleteField = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
  function AutocompleteField({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="autocomplete-field"
        className={clsx(styles.field, className)}
        {...props}
      />
    );
  },
);

const AutocompleteInlineInputContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(function AutocompleteInlineInputContainer({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="autocomplete-inline-input-container"
      className={clsx(styles.inlineInputContainer, className)}
      {...props}
    />
  );
});

const AutocompleteFieldLabel = React.forwardRef<
  React.ComponentRef<typeof ComboboxPrimitive.Label>,
  ComboboxPrimitive.Label.Props & Pick<React.ComponentProps<'label'>, 'htmlFor'>
>(function AutocompleteFieldLabel({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.Label
      ref={ref}
      data-slot="autocomplete-field-label"
      className={mergeClassName(className, styles.fieldLabel)}
      {...props}
    />
  );
});

function AutocompleteValue(props: AutocompletePrimitive.Value.Props) {
  return <AutocompletePrimitive.Value data-slot="autocomplete-value" {...props} />;
}

const AutocompleteInputGroup = React.forwardRef<
  React.ComponentRef<typeof AutocompletePrimitive.InputGroup>,
  AutocompletePrimitive.InputGroup.Props
>(function AutocompleteInputGroup({ className, ...props }, ref) {
  return (
    <AutocompletePrimitive.InputGroup
      ref={ref}
      data-slot="autocomplete-input-group"
      className={mergeClassName(className, styles.inputGroup)}
      {...props}
    />
  );
});

const AutocompleteInput = React.forwardRef<
  React.ComponentRef<typeof AutocompletePrimitive.Input>,
  AutocompletePrimitive.Input.Props
>(function AutocompleteInput({ className, ...props }, ref) {
  return (
    <AutocompletePrimitive.Input
      ref={ref}
      data-slot="autocomplete-input"
      className={mergeClassName(className, styles.input)}
      {...props}
    />
  );
});

const AutocompleteControlActions = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
  function AutocompleteControlActions({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="autocomplete-control-actions"
        className={clsx(styles.controlActions, className)}
        {...props}
      />
    );
  },
);

const AutocompleteTrigger = React.forwardRef<
  React.ComponentRef<typeof AutocompletePrimitive.Trigger>,
  AutocompletePrimitive.Trigger.Props
>(function AutocompleteTrigger({ className, children, ...props }, ref) {
  return (
    <AutocompletePrimitive.Trigger
      ref={ref}
      data-slot="autocomplete-trigger"
      className={mergeClassName(className, styles.trigger)}
      {...props}
    >
      {children ?? <ChevronDownIcon className={styles.iconSvg} />}
    </AutocompletePrimitive.Trigger>
  );
});

const AutocompleteFieldTrigger = React.forwardRef<
  React.ComponentRef<typeof AutocompletePrimitive.Trigger>,
  AutocompletePrimitive.Trigger.Props
>(function AutocompleteFieldTrigger({ className, ...props }, ref) {
  return (
    <AutocompletePrimitive.Trigger
      ref={ref}
      data-slot="autocomplete-field-trigger"
      className={mergeClassName(className, styles.fieldTrigger)}
      {...props}
    />
  );
});

const AutocompleteIcon = React.forwardRef<
  React.ComponentRef<typeof AutocompletePrimitive.Icon>,
  AutocompletePrimitive.Icon.Props
>(function AutocompleteIcon({ className, children, ...props }, ref) {
  return (
    <AutocompletePrimitive.Icon
      ref={ref}
      data-slot="autocomplete-icon"
      className={mergeClassName(className, styles.icon)}
      {...props}
    >
      {children ?? <ChevronUpDownIcon className={styles.iconSvg} />}
    </AutocompletePrimitive.Icon>
  );
});

const AutocompleteClear = React.forwardRef<
  React.ComponentRef<typeof AutocompletePrimitive.Clear>,
  AutocompletePrimitive.Clear.Props
>(function AutocompleteClear({ className, children, ...props }, ref) {
  return (
    <AutocompletePrimitive.Clear
      ref={ref}
      data-slot="autocomplete-clear"
      className={mergeClassName(className, styles.clear)}
      {...props}
    >
      {children ?? <CloseLineIcon className={styles.iconSvg} />}
    </AutocompletePrimitive.Clear>
  );
});

const AutocompletePortal = React.forwardRef<
  React.ComponentRef<typeof AutocompletePrimitive.Portal>,
  AutocompletePrimitive.Portal.Props
>(function AutocompletePortal(props, ref) {
  return <AutocompletePrimitive.Portal ref={ref} data-slot="autocomplete-portal" {...props} />;
});

const AutocompleteBackdrop = React.forwardRef<
  React.ComponentRef<typeof AutocompletePrimitive.Backdrop>,
  AutocompletePrimitive.Backdrop.Props
>(function AutocompleteBackdrop({ className, ...props }, ref) {
  return (
    <AutocompletePrimitive.Backdrop
      ref={ref}
      data-slot="autocomplete-backdrop"
      className={mergeClassName(className, styles.backdrop)}
      {...props}
    />
  );
});

const AutocompletePositioner = React.forwardRef<
  React.ComponentRef<typeof AutocompletePrimitive.Positioner>,
  AutocompletePrimitive.Positioner.Props
>(function AutocompletePositioner({ className, ...props }, ref) {
  return (
    <AutocompletePrimitive.Positioner
      ref={ref}
      data-slot="autocomplete-positioner"
      className={mergeClassName(className, styles.positioner)}
      {...props}
    />
  );
});

const AutocompletePopup = React.forwardRef<
  React.ComponentRef<typeof AutocompletePrimitive.Popup>,
  AutocompletePrimitive.Popup.Props
>(function AutocompletePopup({ className, ...props }, ref) {
  return (
    <AutocompletePrimitive.Popup
      ref={ref}
      data-slot="autocomplete-popup"
      className={mergeClassName(className, styles.popup)}
      {...props}
    />
  );
});

const AutocompleteArrow = React.forwardRef<
  React.ComponentRef<typeof AutocompletePrimitive.Arrow>,
  AutocompletePrimitive.Arrow.Props
>(function AutocompleteArrow({ className, children, ...props }, ref) {
  return (
    <AutocompletePrimitive.Arrow
      ref={ref}
      data-slot="autocomplete-arrow"
      className={mergeClassName(className, styles.arrow)}
      {...props}
    >
      {children ?? <ArrowSvg className={styles.arrowSvg} />}
    </AutocompletePrimitive.Arrow>
  );
});

function AutocompleteContent({
  className,
  children,
  sideOffset,
  ...props
}: AutocompletePrimitive.Popup.Props & {
  sideOffset?: AutocompletePrimitive.Positioner.Props['sideOffset'];
}) {
  return (
    <AutocompletePortal>
      <AutocompletePositioner sideOffset={sideOffset ?? 5}>
        <AutocompletePopup className={className} {...props}>
          {children}
        </AutocompletePopup>
      </AutocompletePositioner>
    </AutocompletePortal>
  );
}

const AutocompleteStatus = React.forwardRef<
  React.ComponentRef<typeof AutocompletePrimitive.Status>,
  AutocompletePrimitive.Status.Props
>(function AutocompleteStatus({ className, ...props }, ref) {
  return (
    <AutocompletePrimitive.Status
      ref={ref}
      data-slot="autocomplete-status"
      className={mergeClassName(className, styles.status)}
      {...props}
    />
  );
});

const AutocompleteEmpty = React.forwardRef<
  React.ComponentRef<typeof AutocompletePrimitive.Empty>,
  AutocompletePrimitive.Empty.Props
>(function AutocompleteEmpty({ className, ...props }, ref) {
  return (
    <AutocompletePrimitive.Empty
      ref={ref}
      data-slot="autocomplete-empty"
      className={mergeClassName(className, styles.empty)}
      {...props}
    />
  );
});

const AutocompleteList = React.forwardRef<
  React.ComponentRef<typeof AutocompletePrimitive.List>,
  AutocompletePrimitive.List.Props
>(function AutocompleteList({ className, ...props }, ref) {
  return (
    <AutocompletePrimitive.List
      ref={ref}
      data-slot="autocomplete-list"
      className={mergeClassName(className, styles.list)}
      {...props}
    />
  );
});

const AutocompleteRow = React.forwardRef<
  React.ComponentRef<typeof AutocompletePrimitive.Row>,
  AutocompletePrimitive.Row.Props
>(function AutocompleteRow({ className, ...props }, ref) {
  return (
    <AutocompletePrimitive.Row
      ref={ref}
      data-slot="autocomplete-row"
      className={mergeClassName(className, styles.row)}
      {...props}
    />
  );
});

const AutocompleteItem = React.forwardRef<
  React.ComponentRef<typeof AutocompletePrimitive.Item>,
  AutocompletePrimitive.Item.Props
>(function AutocompleteItem({ className, ...props }, ref) {
  return (
    <AutocompletePrimitive.Item
      ref={ref}
      data-slot="autocomplete-item"
      className={mergeClassName(className, styles.item)}
      {...props}
    />
  );
});

const AutocompleteItemText = React.forwardRef<HTMLSpanElement, React.ComponentProps<'span'>>(
  function AutocompleteItemText({ className, ...props }, ref) {
    return (
      <span
        ref={ref}
        data-slot="autocomplete-item-text"
        className={clsx(styles.itemText, className)}
        {...props}
      />
    );
  },
);

const AutocompleteItemTextContent = React.forwardRef<HTMLSpanElement, React.ComponentProps<'span'>>(
  function AutocompleteItemTextContent({ className, ...props }, ref) {
    return (
      <span
        ref={ref}
        data-slot="autocomplete-item-text-content"
        className={clsx(styles.itemTextContent, className)}
        {...props}
      />
    );
  },
);

const AutocompleteItemTextIcon = React.forwardRef<HTMLSpanElement, React.ComponentProps<'span'>>(
  function AutocompleteItemTextIcon({ className, ...props }, ref) {
    return (
      <span
        ref={ref}
        data-slot="autocomplete-item-text-icon"
        className={clsx(styles.itemTextIcon, className)}
        {...props}
      />
    );
  },
);

const AutocompleteItemTextLabel = React.forwardRef<HTMLSpanElement, React.ComponentProps<'span'>>(
  function AutocompleteItemTextLabel({ className, ...props }, ref) {
    return (
      <span
        ref={ref}
        data-slot="autocomplete-item-text-label"
        className={clsx(styles.itemTextLabel, className)}
        {...props}
      />
    );
  },
);

const AutocompleteSeparator = React.forwardRef<
  React.ComponentRef<typeof AutocompletePrimitive.Separator>,
  AutocompletePrimitive.Separator.Props
>(function AutocompleteSeparator({ className, ...props }, ref) {
  return (
    <AutocompletePrimitive.Separator
      ref={ref}
      data-slot="autocomplete-separator"
      className={mergeClassName(className, styles.separator)}
      {...props}
    />
  );
});

const AutocompleteGroup = React.forwardRef<
  React.ComponentRef<typeof AutocompletePrimitive.Group>,
  AutocompletePrimitive.Group.Props
>(function AutocompleteGroup({ className, ...props }, ref) {
  return (
    <AutocompletePrimitive.Group
      ref={ref}
      data-slot="autocomplete-group"
      className={mergeClassName(className, styles.group)}
      {...props}
    />
  );
});

const AutocompleteGroupLabel = React.forwardRef<
  React.ComponentRef<typeof AutocompletePrimitive.GroupLabel>,
  AutocompletePrimitive.GroupLabel.Props
>(function AutocompleteGroupLabel({ className, ...props }, ref) {
  return (
    <AutocompletePrimitive.GroupLabel
      ref={ref}
      data-slot="autocomplete-group-label"
      className={mergeClassName(className, styles.groupLabel)}
      {...props}
    />
  );
});

function AutocompleteCollection(props: AutocompletePrimitive.Collection.Props) {
  return <AutocompletePrimitive.Collection data-slot="autocomplete-collection" {...props} />;
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

const useAutocompleteFilter = AutocompletePrimitive.useFilter;
const useAutocompleteFilteredItems = AutocompletePrimitive.useFilteredItems;

export {
  Autocomplete,
  AutocompleteField,
  AutocompleteInlineInputContainer,
  AutocompleteFieldLabel,
  AutocompleteValue,
  AutocompleteInputGroup,
  AutocompleteInput,
  AutocompleteControlActions,
  AutocompleteTrigger,
  AutocompleteFieldTrigger,
  AutocompleteIcon,
  AutocompleteClear,
  AutocompletePortal,
  AutocompleteBackdrop,
  AutocompletePositioner,
  AutocompletePopup,
  AutocompleteArrow,
  AutocompleteContent,
  AutocompleteStatus,
  AutocompleteEmpty,
  AutocompleteList,
  AutocompleteRow,
  AutocompleteItem,
  AutocompleteItemText,
  AutocompleteItemTextContent,
  AutocompleteItemTextIcon,
  AutocompleteItemTextLabel,
  AutocompleteSeparator,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteCollection,
  useAutocompleteFilter,
  useAutocompleteFilteredItems,
};