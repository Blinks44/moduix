import { Autocomplete as AutocompletePrimitive } from '@base-ui/react/autocomplete';
import { clsx } from 'clsx';
import * as React from 'react';
import { ChevronDownIcon, ChevronUpDownIcon, CloseLineIcon, PopupArrowIcon } from '@/primitives';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Autocomplete.module.css';

type AutocompleteContentClassNames = {
  portal?: AutocompletePrimitive.Portal.Props['className'];
  backdrop?: AutocompletePrimitive.Backdrop.Props['className'];
  positioner?: AutocompletePrimitive.Positioner.Props['className'];
  arrow?: AutocompletePrimitive.Arrow.Props['className'];
};

type AutocompleteContentSlotProps = {
  portal?: Omit<AutocompletePrimitive.Portal.Props, 'className' | 'children'>;
  backdrop?: Omit<AutocompletePrimitive.Backdrop.Props, 'className'>;
  positioner?: Omit<AutocompletePrimitive.Positioner.Props, 'className' | 'children'>;
  arrow?: Omit<AutocompletePrimitive.Arrow.Props, 'className' | 'children'>;
};

type AutocompleteContentPositionerProps = Pick<
  AutocompletePrimitive.Positioner.Props,
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

type AutocompleteContentProps = AutocompletePrimitive.Popup.Props &
  AutocompleteContentPositionerProps & {
    classNames?: AutocompleteContentClassNames;
    slotProps?: AutocompleteContentSlotProps;
    container?: AutocompletePrimitive.Portal.Props['container'];
    withBackdrop?: boolean;
    withArrow?: boolean;
    arrow?: React.ReactNode;
  };

const Autocomplete = AutocompletePrimitive.Root;

function AutocompleteField({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="autocomplete-field" className={clsx(styles.field, className)} {...props} />
  );
}

function AutocompleteInlineInputContainer({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="autocomplete-inline-input-container"
      className={clsx(styles.inlineInputContainer, className)}
      {...props}
    />
  );
}

function AutocompleteFieldLabel({ className, ...props }: React.ComponentProps<'label'>) {
  return (
    <label
      data-slot="autocomplete-field-label"
      className={clsx(styles.fieldLabel, className)}
      {...props}
    />
  );
}

function AutocompleteValue(props: AutocompletePrimitive.Value.Props) {
  return <AutocompletePrimitive.Value data-slot="autocomplete-value" {...props} />;
}

function AutocompleteInputGroup({ className, ...props }: AutocompletePrimitive.InputGroup.Props) {
  return (
    <AutocompletePrimitive.InputGroup
      data-slot="autocomplete-input-group"
      className={mergeClassName(className, styles.inputGroup)}
      {...props}
    />
  );
}

function AutocompleteInput({ className, ...props }: AutocompletePrimitive.Input.Props) {
  return (
    <AutocompletePrimitive.Input
      data-slot="autocomplete-input"
      className={mergeClassName(className, styles.input)}
      {...props}
    />
  );
}

function AutocompleteControlActions({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="autocomplete-control-actions"
      className={clsx(styles.controlActions, className)}
      {...props}
    />
  );
}

function AutocompleteTrigger({
  className,
  children,
  ...props
}: AutocompletePrimitive.Trigger.Props) {
  return (
    <AutocompletePrimitive.Trigger
      data-slot="autocomplete-trigger"
      className={mergeClassName(className, styles.trigger)}
      {...props}
    >
      {children ?? <ChevronDownIcon className={styles.iconSvg} />}
    </AutocompletePrimitive.Trigger>
  );
}

function AutocompleteFieldTrigger({ className, ...props }: AutocompletePrimitive.Trigger.Props) {
  return (
    <AutocompletePrimitive.Trigger
      data-slot="autocomplete-field-trigger"
      className={mergeClassName(className, styles.fieldTrigger)}
      {...props}
    />
  );
}

function AutocompleteIcon({ className, children, ...props }: AutocompletePrimitive.Icon.Props) {
  return (
    <AutocompletePrimitive.Icon
      data-slot="autocomplete-icon"
      className={mergeClassName(className, styles.icon)}
      {...props}
    >
      {children ?? <ChevronUpDownIcon className={styles.iconSvg} />}
    </AutocompletePrimitive.Icon>
  );
}

function AutocompleteClear({ className, children, ...props }: AutocompletePrimitive.Clear.Props) {
  return (
    <AutocompletePrimitive.Clear
      data-slot="autocomplete-clear"
      className={mergeClassName(className, styles.clear)}
      {...props}
    >
      {children ?? <CloseLineIcon className={styles.iconSvg} />}
    </AutocompletePrimitive.Clear>
  );
}

function AutocompletePortal(props: AutocompletePrimitive.Portal.Props) {
  return <AutocompletePrimitive.Portal data-slot="autocomplete-portal" {...props} />;
}

function AutocompleteBackdrop({ className, ...props }: AutocompletePrimitive.Backdrop.Props) {
  return (
    <AutocompletePrimitive.Backdrop
      data-slot="autocomplete-backdrop"
      className={mergeClassName(className, styles.backdrop)}
      {...props}
    />
  );
}

function AutocompletePositioner({ className, ...props }: AutocompletePrimitive.Positioner.Props) {
  return (
    <AutocompletePrimitive.Positioner
      data-slot="autocomplete-positioner"
      className={mergeClassName(className, styles.positioner)}
      {...props}
    />
  );
}

function AutocompletePopup({ className, ...props }: AutocompletePrimitive.Popup.Props) {
  return (
    <AutocompletePrimitive.Popup
      data-slot="autocomplete-popup"
      className={mergeClassName(className, styles.popup)}
      {...props}
    />
  );
}

function AutocompleteArrow({ className, children, ...props }: AutocompletePrimitive.Arrow.Props) {
  return (
    <AutocompletePrimitive.Arrow
      data-slot="autocomplete-arrow"
      className={mergeClassName(className, styles.arrow)}
      {...props}
    >
      {children ?? <ArrowSvg className={styles.arrowSvg} />}
    </AutocompletePrimitive.Arrow>
  );
}

function AutocompleteContent({
  className,
  classNames,
  slotProps,
  container,
  withBackdrop = false,
  withArrow = false,
  arrow,
  children,
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
}: AutocompleteContentProps) {
  const portalProps = slotProps?.portal;
  const backdropProps = slotProps?.backdrop;
  const positionerProps = slotProps?.positioner;
  const arrowProps = slotProps?.arrow;
  const { container: portalPropsContainer, ...restPortalProps } = portalProps ?? {};
  const portalContainer = container ?? portalPropsContainer;
  const resolvedPositionerProps: AutocompleteContentPositionerProps = {
    side: side ?? positionerProps?.side,
    sideOffset: sideOffset ?? positionerProps?.sideOffset ?? 5,
    align: align ?? positionerProps?.align,
    alignOffset: alignOffset ?? positionerProps?.alignOffset,
    arrowPadding: arrowPadding ?? positionerProps?.arrowPadding,
    anchor: anchor ?? positionerProps?.anchor,
    collisionAvoidance: collisionAvoidance ?? positionerProps?.collisionAvoidance,
    collisionBoundary: collisionBoundary ?? positionerProps?.collisionBoundary,
    collisionPadding: collisionPadding ?? positionerProps?.collisionPadding,
    sticky: sticky ?? positionerProps?.sticky,
    positionMethod: positionMethod ?? positionerProps?.positionMethod,
  };

  return (
    <AutocompletePortal
      className={classNames?.portal}
      container={portalContainer}
      {...restPortalProps}
    >
      {withBackdrop ? (
        <AutocompleteBackdrop className={classNames?.backdrop} {...backdropProps} />
      ) : null}
      <AutocompletePositioner
        {...positionerProps}
        {...resolvedPositionerProps}
        className={classNames?.positioner}
      >
        <AutocompletePopup className={className} {...props}>
          {withArrow ? (
            <AutocompleteArrow className={classNames?.arrow} {...arrowProps}>
              {arrow}
            </AutocompleteArrow>
          ) : null}
          {children}
        </AutocompletePopup>
      </AutocompletePositioner>
    </AutocompletePortal>
  );
}

function AutocompleteStatus({ className, ...props }: AutocompletePrimitive.Status.Props) {
  return (
    <AutocompletePrimitive.Status
      data-slot="autocomplete-status"
      className={mergeClassName(className, styles.status)}
      {...props}
    />
  );
}

function AutocompleteEmpty({ className, ...props }: AutocompletePrimitive.Empty.Props) {
  return (
    <AutocompletePrimitive.Empty
      data-slot="autocomplete-empty"
      className={mergeClassName(className, styles.empty)}
      {...props}
    />
  );
}

function AutocompleteList({ className, ...props }: AutocompletePrimitive.List.Props) {
  return (
    <AutocompletePrimitive.List
      data-slot="autocomplete-list"
      className={mergeClassName(className, styles.list)}
      {...props}
    />
  );
}

function AutocompleteRow({ className, ...props }: AutocompletePrimitive.Row.Props) {
  return (
    <AutocompletePrimitive.Row
      data-slot="autocomplete-row"
      className={mergeClassName(className, styles.row)}
      {...props}
    />
  );
}

function AutocompleteItem({ className, ...props }: AutocompletePrimitive.Item.Props) {
  return (
    <AutocompletePrimitive.Item
      data-slot="autocomplete-item"
      className={mergeClassName(className, styles.item)}
      {...props}
    />
  );
}

function AutocompleteItemText({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="autocomplete-item-text"
      className={clsx(styles.itemText, className)}
      {...props}
    />
  );
}

function AutocompleteItemTextContent({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="autocomplete-item-text-content"
      className={clsx(styles.itemTextContent, className)}
      {...props}
    />
  );
}

function AutocompleteItemTextIcon({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="autocomplete-item-text-icon"
      className={clsx(styles.itemTextIcon, className)}
      {...props}
    />
  );
}

function AutocompleteItemTextLabel({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="autocomplete-item-text-label"
      className={clsx(styles.itemTextLabel, className)}
      {...props}
    />
  );
}

function AutocompleteSeparator({ className, ...props }: AutocompletePrimitive.Separator.Props) {
  return (
    <AutocompletePrimitive.Separator
      data-slot="autocomplete-separator"
      className={mergeClassName(className, styles.separator)}
      {...props}
    />
  );
}

function AutocompleteGroup({ className, ...props }: AutocompletePrimitive.Group.Props) {
  return (
    <AutocompletePrimitive.Group
      data-slot="autocomplete-group"
      className={mergeClassName(className, styles.group)}
      {...props}
    />
  );
}

function AutocompleteGroupLabel({ className, ...props }: AutocompletePrimitive.GroupLabel.Props) {
  return (
    <AutocompletePrimitive.GroupLabel
      data-slot="autocomplete-group-label"
      className={mergeClassName(className, styles.groupLabel)}
      {...props}
    />
  );
}

function AutocompleteCollection(props: AutocompletePrimitive.Collection.Props) {
  return <AutocompletePrimitive.Collection data-slot="autocomplete-collection" {...props} />;
}

function useAutocompleteAnchor() {
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

const useAutocompleteFilter = AutocompletePrimitive.useFilter;
const useAutocompleteFilteredItems = AutocompletePrimitive.useFilteredItems;

type AutocompleteProps<Value = unknown> = AutocompletePrimitive.Root.Props<Value>;
type AutocompleteValueType<Value = unknown> = AutocompleteProps<Value>['value'];
type AutocompleteFieldProps = React.ComponentProps<'div'>;
type AutocompleteInlineInputContainerProps = React.ComponentProps<'div'>;
type AutocompleteFieldLabelProps = React.ComponentProps<'label'>;
type AutocompleteValueProps = AutocompletePrimitive.Value.Props;
type AutocompleteInputGroupProps = AutocompletePrimitive.InputGroup.Props;
type AutocompleteInputProps = AutocompletePrimitive.Input.Props;
type AutocompleteControlActionsProps = React.ComponentProps<'div'>;
type AutocompleteTriggerProps = AutocompletePrimitive.Trigger.Props;
type AutocompleteFieldTriggerProps = AutocompletePrimitive.Trigger.Props;
type AutocompleteIconProps = AutocompletePrimitive.Icon.Props;
type AutocompleteClearProps = AutocompletePrimitive.Clear.Props;
type AutocompleteStatusProps = AutocompletePrimitive.Status.Props;
type AutocompleteEmptyProps = AutocompletePrimitive.Empty.Props;
type AutocompleteListProps = AutocompletePrimitive.List.Props;
type AutocompleteRowProps = AutocompletePrimitive.Row.Props;
type AutocompleteItemProps = AutocompletePrimitive.Item.Props;
type AutocompleteItemTextProps = React.ComponentProps<'span'>;
type AutocompleteItemTextContentProps = React.ComponentProps<'span'>;
type AutocompleteItemTextIconProps = React.ComponentProps<'span'>;
type AutocompleteItemTextLabelProps = React.ComponentProps<'span'>;
type AutocompleteSeparatorProps = AutocompletePrimitive.Separator.Props;
type AutocompleteGroupProps = AutocompletePrimitive.Group.Props;
type AutocompleteGroupLabelProps = AutocompletePrimitive.GroupLabel.Props;
type AutocompleteCollectionProps = AutocompletePrimitive.Collection.Props;

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
  useAutocompleteAnchor,
  useAutocompleteFilter,
  useAutocompleteFilteredItems,
};

export type {
  AutocompleteProps,
  AutocompleteValueType,
  AutocompleteContentClassNames,
  AutocompleteContentSlotProps,
  AutocompleteContentProps,
  AutocompleteFieldProps,
  AutocompleteInlineInputContainerProps,
  AutocompleteFieldLabelProps,
  AutocompleteValueProps,
  AutocompleteInputGroupProps,
  AutocompleteInputProps,
  AutocompleteControlActionsProps,
  AutocompleteTriggerProps,
  AutocompleteFieldTriggerProps,
  AutocompleteIconProps,
  AutocompleteClearProps,
  AutocompleteStatusProps,
  AutocompleteEmptyProps,
  AutocompleteListProps,
  AutocompleteRowProps,
  AutocompleteItemProps,
  AutocompleteItemTextProps,
  AutocompleteItemTextContentProps,
  AutocompleteItemTextIconProps,
  AutocompleteItemTextLabelProps,
  AutocompleteSeparatorProps,
  AutocompleteGroupProps,
  AutocompleteGroupLabelProps,
  AutocompleteCollectionProps,
};