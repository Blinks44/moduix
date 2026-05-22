import { OTPFieldPreview as OTPFieldPrimitive } from '@base-ui/react/otp-field';
import * as React from 'react';
import { SeparatorMarkIcon } from '@/primitives/Icons';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './OTPField.module.css';

function getSeparatorIndexes(length: number, groupSize: OTPFieldProps['groupSize']) {
  if (!groupSize) {
    return new Set<number>();
  }

  const groups = (Array.isArray(groupSize) ? groupSize : [groupSize]).filter(
    (group) => Number.isInteger(group) && group > 0,
  );

  if (groups.length === 0) {
    return new Set<number>();
  }

  const indexes = new Set<number>();
  let nextSeparatorIndex = 0;

  for (const group of groups) {
    nextSeparatorIndex += group;

    if (nextSeparatorIndex > 0 && nextSeparatorIndex < length) {
      indexes.add(nextSeparatorIndex - 1);
    }
  }

  if (typeof groupSize === 'number') {
    const repeatingGroupSize = groups[0];

    for (
      let index = nextSeparatorIndex + repeatingGroupSize;
      index < length;
      index += repeatingGroupSize
    ) {
      indexes.add(index - 1);
    }
  }

  return indexes;
}

function resolveInputProps(
  inputProps: OTPFieldInputProps | OTPFieldInputPropsFactory | undefined,
  index: number,
  length: number,
) {
  return typeof inputProps === 'function' ? inputProps(index, length) : inputProps;
}

function resolveSeparator(separator: OTPFieldProps['separator'], index: number, length: number) {
  return typeof separator === 'function'
    ? separator({ index, length })
    : (separator ?? <SeparatorMarkIcon />);
}

function renderAutoInputs({
  groupSize,
  inputProps,
  length,
  separator,
}: Pick<OTPFieldProps, 'groupSize' | 'inputProps' | 'length' | 'separator'>) {
  const separatorIndexes = getSeparatorIndexes(length, groupSize);

  return Array.from({ length }, (_, index) => (
    <React.Fragment key={index}>
      <OTPFieldInput
        aria-label={index === 0 ? undefined : `Character ${index + 1} of ${length}`}
        {...resolveInputProps(inputProps, index, length)}
      />
      {separatorIndexes.has(index) ? (
        <OTPFieldSeparator>{resolveSeparator(separator, index, length)}</OTPFieldSeparator>
      ) : null}
    </React.Fragment>
  ));
}

function OTPField({
  className,
  children,
  groupSize,
  inputProps,
  length,
  separator,
  ...props
}: OTPFieldProps) {
  return (
    <OTPFieldPrimitive.Root
      data-slot="otp-field-root"
      className={mergeClassName(className, styles.root)}
      length={length}
      {...props}
    >
      {children ?? renderAutoInputs({ groupSize, inputProps, length, separator })}
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
type OTPFieldInputPropsFactory = (
  index: number,
  length: number,
) => OTPFieldAutoInputProps | undefined;
type OTPFieldSeparatorRenderDetails = {
  index: number;
  length: number;
};
type OTPFieldProps = OTPFieldPrimitive.Root.Props & {
  /**
   * Inserts separators after input groups. A positive integer repeats the same group size; an array
   * inserts separators after the listed positive integer group lengths.
   */
  groupSize?: number | number[];
  /**
   * Props applied to automatically rendered input slots when `children` are not provided.
   */
  inputProps?: OTPFieldAutoInputProps | OTPFieldInputPropsFactory;
  /**
   * Separator content used with `groupSize`. Pass a node or a function for per-separator content.
   */
  separator?: React.ReactNode | ((details: OTPFieldSeparatorRenderDetails) => React.ReactNode);
};
type OTPFieldInputProps = OTPFieldPrimitive.Input.Props;
type OTPFieldSeparatorProps = OTPFieldPrimitive.Separator.Props;

export { OTPField, OTPFieldInput, OTPFieldSeparator };

export type { OTPFieldProps, OTPFieldInputProps, OTPFieldSeparatorProps };