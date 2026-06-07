import { OTPFieldPreview as OTPFieldPrimitive } from '@base-ui/react/otp-field';
import { mergeClassName } from '@/lib/moduix/mergeClassName';
import styles from './OTPField.module.css';

function OTPField({ children, className, length, ...props }: OTPFieldPrimitive.Root.Props) {
  return (
    <OTPFieldPrimitive.Root
      data-slot="otp-field-root"
      className={mergeClassName(className, styles.root)}
      length={length}
      {...props}
    >
      {children ?? renderDefaultInputs(length)}
    </OTPFieldPrimitive.Root>
  );
}

function OTPFieldInput({ className, ...props }: OTPFieldPrimitive.Input.Props) {
  return (
    <OTPFieldPrimitive.Input
      data-slot="otp-field-input"
      className={mergeClassName(className, styles.input)}
      {...props}
    />
  );
}

function OTPFieldSeparator({ className, ...props }: OTPFieldPrimitive.Separator.Props) {
  const { 'aria-hidden': ariaHidden = true, role = 'presentation', ...separatorProps } = props;

  return (
    <OTPFieldPrimitive.Separator
      data-slot="otp-field-separator"
      aria-hidden={ariaHidden}
      role={role}
      className={mergeClassName(className, styles.separator)}
      {...separatorProps}
    />
  );
}

function getCharacterAriaLabel(index: number, length: number) {
  return index === 0 ? undefined : `Character ${index + 1} of ${length}`;
}

function renderDefaultInputs(length: number) {
  return Array.from({ length }, (_, index) => (
    <OTPFieldInput key={index} aria-label={getCharacterAriaLabel(index, length)} />
  ));
}

export { OTPField, OTPFieldInput, OTPFieldSeparator };