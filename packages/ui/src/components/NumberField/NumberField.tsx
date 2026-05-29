import { NumberField as NumberFieldPrimitive } from '@base-ui/react/number-field';
import { MinusIcon, PlusIcon, ScrubCursorIcon } from '@/icons/ui';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './NumberField.module.css';

const DEFAULT_DECREMENT_LABEL = 'Decrease value';
const DEFAULT_INCREMENT_LABEL = 'Increase value';

function NumberFieldRoot({ className, ...props }: NumberFieldPrimitive.Root.Props) {
  return (
    <NumberFieldPrimitive.Root
      data-slot="number-field-root"
      className={mergeClassName(className, styles.root)}
      {...props}
    />
  );
}

function NumberField({
  className,
  children,
  decrementLabel = DEFAULT_DECREMENT_LABEL,
  incrementLabel = DEFAULT_INCREMENT_LABEL,
  ...props
}: NumberFieldPrimitive.Root.Props & {
  decrementLabel?: string;
  incrementLabel?: string;
}) {
  return (
    <NumberFieldRoot className={className} {...props}>
      {children}
      <NumberFieldGroup>
        <NumberFieldDecrement aria-label={decrementLabel} />
        <NumberFieldInput />
        <NumberFieldIncrement aria-label={incrementLabel} />
      </NumberFieldGroup>
    </NumberFieldRoot>
  );
}

function NumberFieldScrubArea({ className, ...props }: NumberFieldPrimitive.ScrubArea.Props) {
  return (
    <NumberFieldPrimitive.ScrubArea
      data-slot="number-field-scrub-area"
      className={mergeClassName(className, styles.scrubArea)}
      {...props}
    />
  );
}

function NumberFieldScrubAreaCursor({
  className,
  children,
  ...props
}: NumberFieldPrimitive.ScrubAreaCursor.Props) {
  return (
    <NumberFieldPrimitive.ScrubAreaCursor
      data-slot="number-field-scrub-area-cursor"
      className={mergeClassName(className, styles.scrubAreaCursor)}
      {...props}
    >
      {children ?? <ScrubCursorIcon />}
    </NumberFieldPrimitive.ScrubAreaCursor>
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

function NumberFieldDecrement({
  className,
  children,
  'aria-label': ariaLabel = DEFAULT_DECREMENT_LABEL,
  ...props
}: NumberFieldPrimitive.Decrement.Props) {
  return (
    <NumberFieldPrimitive.Decrement
      data-slot="number-field-decrement"
      aria-label={ariaLabel}
      className={mergeClassName(className, styles.decrement)}
      {...props}
    >
      {children ?? <MinusIcon />}
    </NumberFieldPrimitive.Decrement>
  );
}

function NumberFieldInput({ className, ...props }: NumberFieldPrimitive.Input.Props) {
  return (
    <NumberFieldPrimitive.Input
      data-slot="number-field-input"
      className={mergeClassName(className, styles.input)}
      {...props}
    />
  );
}

function NumberFieldIncrement({
  className,
  children,
  'aria-label': ariaLabel = DEFAULT_INCREMENT_LABEL,
  ...props
}: NumberFieldPrimitive.Increment.Props) {
  return (
    <NumberFieldPrimitive.Increment
      data-slot="number-field-increment"
      aria-label={ariaLabel}
      className={mergeClassName(className, styles.increment)}
      {...props}
    >
      {children ?? <PlusIcon />}
    </NumberFieldPrimitive.Increment>
  );
}

export {
  NumberField,
  NumberFieldRoot,
  NumberFieldScrubArea,
  NumberFieldScrubAreaCursor,
  NumberFieldGroup,
  NumberFieldDecrement,
  NumberFieldInput,
  NumberFieldIncrement,
};