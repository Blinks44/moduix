import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { clsx } from 'clsx';
import * as React from 'react';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Button.module.css';

type ButtonVariant =
  | 'default'
  | 'outline'
  | 'secondary'
  | 'destructive'
  | 'destructive-outline'
  | 'ghost'
  | 'link';

type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'icon-sm' | 'icon-md' | 'icon-lg';

type ButtonClassNames = {
  content?: string;
  loadingIndicator?: string;
  spinner?: string;
};

type ButtonProps = ButtonPrimitive.Props & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  loadingText?: React.ReactNode;
  loadingIndicator?: React.ReactNode;
  classNames?: ButtonClassNames;
};

const Button = React.forwardRef<React.ComponentRef<typeof ButtonPrimitive>, ButtonProps>(
  function Button(
    {
      className,
      classNames,
      children,
      variant = 'default',
      size = 'md',
      loading = false,
      loadingText,
      loadingIndicator,
      disabled,
      focusableWhenDisabled,
      ...props
    }: ButtonProps,
    ref,
  ) {
    const hasLoadingText = loadingText !== undefined;
    const showLoadingText = loading && hasLoadingText;
    const showLoadingOverlay = loading && !hasLoadingText;
    const resolvedDisabled = disabled || loading;
    const spinner = loadingIndicator ?? <ButtonSpinner className={classNames?.spinner} />;

    return (
      <ButtonPrimitive
        ref={ref}
        data-slot="button-root"
        data-variant={variant}
        data-size={size}
        data-loading={loading ? '' : undefined}
        aria-busy={loading || undefined}
        className={mergeClassName(className, styles.root)}
        disabled={resolvedDisabled}
        focusableWhenDisabled={focusableWhenDisabled}
        {...props}
      >
        <span
          data-slot="button-content"
          className={clsx(
            styles.content,
            showLoadingOverlay && styles.contentHidden,
            classNames?.content,
          )}
        >
          {showLoadingText ? (
            <>
              <span
                data-slot="button-loading-indicator"
                className={clsx(styles.loadingIndicator, classNames?.loadingIndicator)}
              >
                {spinner}
              </span>
              {loadingText}
            </>
          ) : (
            children
          )}
        </span>
        {showLoadingOverlay ? (
          <span
            data-slot="button-loading-indicator"
            className={clsx(
              styles.loadingIndicator,
              styles.loadingIndicatorOverlay,
              classNames?.loadingIndicator,
            )}
          >
            {spinner}
          </span>
        ) : null}
      </ButtonPrimitive>
    );
  },
);

function ButtonSpinner({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="button-spinner"
      className={clsx(styles.spinner, className)}
      role="presentation"
      aria-hidden="true"
      {...props}
    />
  );
}

export { Button };
export type { ButtonProps, ButtonVariant, ButtonSize, ButtonClassNames };