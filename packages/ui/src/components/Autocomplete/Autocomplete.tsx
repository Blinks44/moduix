import type { ComponentProps, ComponentRef } from 'react';
import { Autocomplete as AutocompletePrimitive } from '@base-ui/react/autocomplete';
import { Combobox as ComboboxPrimitive } from '@base-ui/react/combobox';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { ChevronDownIcon, ChevronUpDownIcon, CloseIcon, PopupArrowIcon } from '@/icons/ui';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Autocomplete.module.css';

const Autocomplete = AutocompletePrimitive.Root;

const AutocompleteField = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
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

const AutocompleteInlineInputContainer = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  function AutocompleteInlineInputContainer({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="autocomplete-inline-input-container"
        className={clsx(styles.inlineInputContainer, className)}
        {...props}
      />
    );
  },
);

const AutocompleteFieldLabel = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.Label>,
  ComboboxPrimitive.Label.Props
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

const AutocompleteInputGroup = forwardRef<
  ComponentRef<typeof AutocompletePrimitive.InputGroup>,
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

const AutocompleteInput = forwardRef<
  ComponentRef<typeof AutocompletePrimitive.Input>,
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

const AutocompleteControlActions = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
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

const AutocompleteTrigger = forwardRef<
  ComponentRef<typeof AutocompletePrimitive.Trigger>,
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

const AutocompleteFieldTrigger = forwardRef<
  ComponentRef<typeof AutocompletePrimitive.Trigger>,
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

const AutocompleteIcon = forwardRef<
  ComponentRef<typeof AutocompletePrimitive.Icon>,
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

const AutocompleteClear = forwardRef<
  ComponentRef<typeof AutocompletePrimitive.Clear>,
  AutocompletePrimitive.Clear.Props
>(function AutocompleteClear({ className, children, ...props }, ref) {
  return (
    <AutocompletePrimitive.Clear
      ref={ref}
      data-slot="autocomplete-clear"
      className={mergeClassName(className, styles.clear)}
      {...props}
    >
      {children ?? <CloseIcon className={styles.iconSvg} />}
    </AutocompletePrimitive.Clear>
  );
});

const AutocompletePortal = forwardRef<
  ComponentRef<typeof AutocompletePrimitive.Portal>,
  AutocompletePrimitive.Portal.Props
>(function AutocompletePortal(props, ref) {
  return <AutocompletePrimitive.Portal ref={ref} data-slot="autocomplete-portal" {...props} />;
});

const AutocompleteBackdrop = forwardRef<
  ComponentRef<typeof AutocompletePrimitive.Backdrop>,
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

const AutocompletePositioner = forwardRef<
  ComponentRef<typeof AutocompletePrimitive.Positioner>,
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

const AutocompletePopup = forwardRef<
  ComponentRef<typeof AutocompletePrimitive.Popup>,
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

const AutocompleteArrow = forwardRef<
  ComponentRef<typeof AutocompletePrimitive.Arrow>,
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

type AutocompleteContentProps = AutocompletePrimitive.Popup.Props &
  Pick<
    AutocompletePrimitive.Positioner.Props,
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

const AutocompleteContent = forwardRef<
  ComponentRef<typeof AutocompletePrimitive.Popup>,
  AutocompleteContentProps
>(function AutocompleteContent(
  {
    className,
    showArrow = false,
    children,
    side,
    sideOffset = 5,
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
    <AutocompletePortal>
      <AutocompletePositioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        arrowPadding={arrowPadding}
        collisionAvoidance={collisionAvoidance}
        collisionBoundary={collisionBoundary}
        collisionPadding={collisionPadding}
      >
        <AutocompletePopup ref={ref} className={className} {...props}>
          {showArrow ? <AutocompleteArrow /> : null}
          {children}
        </AutocompletePopup>
      </AutocompletePositioner>
    </AutocompletePortal>
  );
});

const AutocompleteStatus = forwardRef<
  ComponentRef<typeof AutocompletePrimitive.Status>,
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

const AutocompleteEmpty = forwardRef<
  ComponentRef<typeof AutocompletePrimitive.Empty>,
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

const AutocompleteList = forwardRef<
  ComponentRef<typeof AutocompletePrimitive.List>,
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

const AutocompleteRow = forwardRef<
  ComponentRef<typeof AutocompletePrimitive.Row>,
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

const AutocompleteItem = forwardRef<
  ComponentRef<typeof AutocompletePrimitive.Item>,
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

const AutocompleteItemText = forwardRef<HTMLSpanElement, ComponentProps<'span'>>(
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

const AutocompleteItemTextContent = forwardRef<HTMLSpanElement, ComponentProps<'span'>>(
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

const AutocompleteItemTextIcon = forwardRef<HTMLSpanElement, ComponentProps<'span'>>(
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

const AutocompleteItemTextLabel = forwardRef<HTMLSpanElement, ComponentProps<'span'>>(
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

const AutocompleteSeparator = forwardRef<
  ComponentRef<typeof AutocompletePrimitive.Separator>,
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

const AutocompleteGroup = forwardRef<
  ComponentRef<typeof AutocompletePrimitive.Group>,
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

const AutocompleteGroupLabel = forwardRef<
  ComponentRef<typeof AutocompletePrimitive.GroupLabel>,
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