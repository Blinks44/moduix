import { OTPFieldPreview as OTPFieldPrimitive } from '@base-ui/react/otp-field';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './OTPField.module.css';

function OTPField({ children, className, length, ...props }: OTPFieldPrimitive.Root.Props) {
  return (
    <OTPFieldPrimitive.Root
      data-slot="otp-field-root"
      className={mergeClassName(className, styles.root)}
      length={length}
      {...props}
    >
      {children ?? renderInputs(length)}
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
  return (
    <OTPFieldPrimitive.Separator
      data-slot="otp-field-separator"
      className={mergeClassName(className, styles.separator)}
      {...props}
    />
  );
}

function renderInputs(length: number) {
  return Array.from({ length }, (_, index) => (
    <OTPFieldInput
      key={index}
      aria-label={index === 0 ? undefined : `Character ${index + 1} of ${length}`}
    />
  ));
}

export { OTPField, OTPFieldInput, OTPFieldSeparator };