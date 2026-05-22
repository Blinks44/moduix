import { Field as FieldPrimitive } from '@base-ui/react/field';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Field.module.css';

function Field({ className, ...props }: FieldPrimitive.Root.Props) {
  return (
    <FieldPrimitive.Root
      data-slot="field-root"
      className={mergeClassName(className, styles.root)}
      {...props}
    />
  );
}

function FieldItem({ className, ...props }: FieldPrimitive.Item.Props) {
  return (
    <FieldPrimitive.Item
      data-slot="field-item"
      className={mergeClassName(className, styles.item)}
      {...props}
    />
  );
}

function FieldLabel({ className, ...props }: FieldPrimitive.Label.Props) {
  return (
    <FieldPrimitive.Label
      data-slot="field-label"
      className={mergeClassName(className, styles.label)}
      {...props}
    />
  );
}

function FieldControl({ className, ...props }: FieldPrimitive.Control.Props) {
  return (
    <FieldPrimitive.Control
      data-slot="field-control"
      className={mergeClassName(className, styles.control)}
      {...props}
    />
  );
}

function FieldDescription({ className, ...props }: FieldPrimitive.Description.Props) {
  return (
    <FieldPrimitive.Description
      data-slot="field-description"
      className={mergeClassName(className, styles.description)}
      {...props}
    />
  );
}

function FieldError({ className, ...props }: FieldPrimitive.Error.Props) {
  return (
    <FieldPrimitive.Error
      data-slot="field-error"
      className={mergeClassName(className, styles.error)}
      {...props}
    />
  );
}

const FieldValidity = FieldPrimitive.Validity;

type FieldProps = FieldPrimitive.Root.Props;
type FieldState = FieldPrimitive.Root.State;
type FieldActions = FieldPrimitive.Root.Actions;

type FieldItemProps = FieldPrimitive.Item.Props;
type FieldItemState = FieldPrimitive.Item.State;

type FieldLabelProps = FieldPrimitive.Label.Props;
type FieldLabelState = FieldPrimitive.Label.State;

type FieldControlProps = FieldPrimitive.Control.Props;
type FieldControlState = FieldPrimitive.Control.State;
type FieldControlChangeEventReason = FieldPrimitive.Control.ChangeEventReason;
type FieldControlChangeEventDetails = FieldPrimitive.Control.ChangeEventDetails;

type FieldDescriptionProps = FieldPrimitive.Description.Props;
type FieldDescriptionState = FieldPrimitive.Description.State;

type FieldErrorProps = FieldPrimitive.Error.Props;
type FieldErrorState = FieldPrimitive.Error.State;

type FieldValidityProps = FieldPrimitive.Validity.Props;
type FieldValidityState = FieldPrimitive.Validity.State;

export { Field, FieldItem, FieldLabel, FieldControl, FieldDescription, FieldError, FieldValidity };

export type {
  FieldProps,
  FieldState,
  FieldActions,
  FieldItemProps,
  FieldItemState,
  FieldLabelProps,
  FieldLabelState,
  FieldControlProps,
  FieldControlState,
  FieldControlChangeEventReason,
  FieldControlChangeEventDetails,
  FieldDescriptionProps,
  FieldDescriptionState,
  FieldErrorProps,
  FieldErrorState,
  FieldValidityProps,
  FieldValidityState,
};