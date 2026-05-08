import { OTPFieldPreview as OTPFieldPrimitive } from '@base-ui/react/otp-field';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './OTPField.module.css';

function getOTPFieldInputProps(
  inputProps: OTPFieldAutoInputProps | OTPFieldAutoInputPropsFactory | undefined,
  index: number,
  length: number,
) {
  return typeof inputProps === 'function' ? inputProps(index, length) : inputProps;
}

function renderOTPFieldInputs(length: number, inputProps?: OTPFieldProps['inputProps']) {
  return Array.from({ length }, (_, index) => (
    <OTPFieldInput
      key={index}
      aria-label={index === 0 ? undefined : `Character ${index + 1} of ${length}`}
      {...getOTPFieldInputProps(inputProps, index, length)}
    />
  ));
}

function OTPField({ className, children, inputProps, length, ...props }: OTPFieldProps) {
  return (
    <OTPFieldPrimitive.Root
      data-slot="otp-field-root"
      className={mergeClassName(className, styles.root)}
      length={length}
      {...props}
    >
      {children ?? renderOTPFieldInputs(length, inputProps)}
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

type OTPFieldAutoInputProps = OTPFieldPrimitive.Input.Props;
type OTPFieldAutoInputPropsFactory = (
  index: number,
  length: number,
) => OTPFieldAutoInputProps | undefined;
type OTPFieldProps = OTPFieldPrimitive.Root.Props & {
  /**
   * Props applied to automatically rendered input slots when `children` are not provided.
   */
  inputProps?: OTPFieldAutoInputProps | OTPFieldAutoInputPropsFactory;
};
type OTPFieldInputProps = OTPFieldPrimitive.Input.Props;
type OTPFieldSeparatorProps = OTPFieldPrimitive.Separator.Props;

export { OTPField, OTPFieldInput, OTPFieldSeparator };

export type { OTPFieldProps, OTPFieldInputProps, OTPFieldSeparatorProps };