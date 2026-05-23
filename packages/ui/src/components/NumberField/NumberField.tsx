import { NumberField as NumberFieldPrimitive } from '@base-ui/react/number-field';
import * as React from 'react';
import { MinusIcon, PlusSmallIcon, ScrubCursorIcon } from '@/primitives';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './NumberField.module.css';

const DEFAULT_DECREMENT_LABEL = 'Decrease value';
const DEFAULT_INCREMENT_LABEL = 'Increase value';

type NumberFieldGroupProps = NumberFieldPrimitive.Group.Props;
type NumberFieldDecrementProps = NumberFieldPrimitive.Decrement.Props;
type NumberFieldInputProps = NumberFieldPrimitive.Input.Props;
type NumberFieldIncrementProps = NumberFieldPrimitive.Increment.Props;
type NumberFieldScrubAreaCursorProps = NumberFieldPrimitive.ScrubAreaCursor.Props;

type NumberFieldScrubAreaClassNames = {
  cursor?: NumberFieldPrimitive.ScrubAreaCursor.Props['className'];
};

type NumberFieldClassNames = {
  group?: NumberFieldGroupProps['className'];
  decrement?: NumberFieldDecrementProps['className'];
  input?: NumberFieldInputProps['className'];
  increment?: NumberFieldIncrementProps['className'];
};

type NumberFieldProps = NumberFieldPrimitive.Root.Props & {
  classNames?: NumberFieldClassNames;
  decrementLabel?: string;
  incrementLabel?: string;
  withGroup?: boolean;
};

type NumberFieldScrubAreaProps = NumberFieldPrimitive.ScrubArea.Props & {
  cursor?: React.ReactNode;
  withCursor?: boolean;
  classNames?: NumberFieldScrubAreaClassNames;
};

function NumberField({
  className,
  classNames,
  children,
  decrementLabel = DEFAULT_DECREMENT_LABEL,
  incrementLabel = DEFAULT_INCREMENT_LABEL,
  withGroup = true,
  ...props
}: NumberFieldProps) {
  const groupClassName = classNames?.group;
  const decrementClassName = classNames?.decrement;
  const inputClassName = classNames?.input;
  const incrementClassName = classNames?.increment;

  return (
    <NumberFieldPrimitive.Root
      data-slot="number-field-root"
      className={mergeClassName(className, styles.root)}
      {...props}
    >
      {children}
      {withGroup ? (
        <NumberFieldGroup className={groupClassName}>
          <NumberFieldDecrement aria-label={decrementLabel} className={decrementClassName} />
          <NumberFieldInput className={inputClassName} />
          <NumberFieldIncrement aria-label={incrementLabel} className={incrementClassName} />
        </NumberFieldGroup>
      ) : null}
    </NumberFieldPrimitive.Root>
  );
}

function NumberFieldScrubArea({
  className,
  children,
  cursor,
  withCursor = true,
  classNames,
  ...props
}: NumberFieldScrubAreaProps) {
  const cursorClassName = classNames?.cursor;
  const shouldRenderCursor = withCursor && cursor !== null;

  return (
    <NumberFieldPrimitive.ScrubArea
      data-slot="number-field-scrub-area"
      className={mergeClassName(className, styles.scrubArea)}
      {...props}
    >
      {children}
      {shouldRenderCursor ? (
        <NumberFieldScrubAreaCursor className={cursorClassName}>
          {cursor ?? <ScrubCursorIcon />}
        </NumberFieldScrubAreaCursor>
      ) : null}
    </NumberFieldPrimitive.ScrubArea>
  );
}

function NumberFieldScrubAreaCursor({ className, ...props }: NumberFieldScrubAreaCursorProps) {
  return (
    <NumberFieldPrimitive.ScrubAreaCursor
      data-slot="number-field-scrub-area-cursor"
      className={mergeClassName(className, styles.scrubAreaCursor)}
      {...props}
    />
  );
}

function NumberFieldGroup({ className, ...props }: NumberFieldPrimitive.Group.Props) {
  return (
    <NumberFieldPrimitive.Group
      data-slot="number-field-group"
      className={mergeClassName(className, styles.group)}
      {...props}
    />
  );
}

function NumberFieldDecrement({ className, children, ...props }: NumberFieldDecrementProps) {
  return (
    <NumberFieldPrimitive.Decrement
      data-slot="number-field-decrement"
      className={mergeClassName(className, styles.decrement)}
      {...props}
    >
      {children ?? <MinusIcon />}
    </NumberFieldPrimitive.Decrement>
  );
}

function NumberFieldInput({ className, ...props }: NumberFieldInputProps) {
  return (
    <NumberFieldPrimitive.Input
      data-slot="number-field-input"
      className={mergeClassName(className, styles.input)}
      {...props}
    />
  );
}

function NumberFieldIncrement({ className, children, ...props }: NumberFieldIncrementProps) {
  return (
    <NumberFieldPrimitive.Increment
      data-slot="number-field-increment"
      className={mergeClassName(className, styles.increment)}
      {...props}
    >
      {children ?? <PlusSmallIcon />}
    </NumberFieldPrimitive.Increment>
  );
}

export {
  NumberField,
  NumberFieldScrubArea,
  NumberFieldGroup,
  NumberFieldDecrement,
  NumberFieldInput,
  NumberFieldIncrement,
};

export type {
  NumberFieldClassNames,
  NumberFieldProps,
  NumberFieldScrubAreaClassNames,
  NumberFieldScrubAreaProps,
  NumberFieldGroupProps,
  NumberFieldDecrementProps,
  NumberFieldInputProps,
  NumberFieldIncrementProps,
};