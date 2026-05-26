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

export { Field, FieldItem, FieldLabel, FieldControl, FieldDescription, FieldError, FieldValidity };