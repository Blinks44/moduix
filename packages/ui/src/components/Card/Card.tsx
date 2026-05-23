import clsx from 'clsx';
import * as React from 'react';
import styles from './Card.module.css';

type CardAs = 'div' | 'article' | 'section' | 'aside';
type CardVariant = 'default' | 'elevated' | 'outline' | 'ghost';
type CardSize = 'xs' | 'sm' | 'md' | 'lg';
type CardFooterAlign = 'start' | 'center' | 'end' | 'between';

type CardProps = React.ComponentPropsWithoutRef<CardAs> & {
  as?: CardAs;
  variant?: CardVariant;
  size?: CardSize;
  interactive?: boolean;
};

type CardHeaderProps = React.ComponentProps<'div'> & {
  withDivider?: boolean;
};

type CardBodyProps = React.ComponentProps<'div'>;

type CardFooterProps = React.ComponentProps<'div'> & {
  align?: CardFooterAlign;
  withDivider?: boolean;
};

type CardTitleProps = React.ComponentProps<'h3'>;
type CardDescriptionProps = React.ComponentProps<'p'>;
type CardActionProps = React.ComponentProps<'div'>;

function Card({
  as = 'div',
  className,
  variant = 'default',
  size = 'md',
  interactive = false,
  ...props
}: CardProps) {
  const Root = as;

  return (
    <Root
      data-slot="card-root"
      data-variant={variant}
      data-size={size}
      data-interactive={interactive ? '' : undefined}
      className={clsx(styles.root, className)}
      {...props}
    />
  );
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(function CardHeader(
  { className, withDivider = false, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="card-header"
      data-divided={withDivider ? '' : undefined}
      className={clsx(styles.header, className)}
      {...props}
    />
  );
});

const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(function CardBody(
  { className, ...props },
  ref,
) {
  return (
    <div ref={ref} data-slot="card-body" className={clsx(styles.body, className)} {...props} />
  );
});

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(function CardFooter(
  { className, align = 'end', withDivider = false, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="card-footer"
      data-align={align}
      data-divided={withDivider ? '' : undefined}
      className={clsx(styles.footer, className)}
      {...props}
    />
  );
});

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(function CardTitle(
  { className, ...props },
  ref,
) {
  return (
    <h3 ref={ref} data-slot="card-title" className={clsx(styles.title, className)} {...props} />
  );
});

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  function CardDescription({ className, ...props }, ref) {
    return (
      <p
        ref={ref}
        data-slot="card-description"
        className={clsx(styles.description, className)}
        {...props}
      />
    );
  },
);

const CardAction = React.forwardRef<HTMLDivElement, CardActionProps>(function CardAction(
  { className, ...props },
  ref,
) {
  return (
    <div ref={ref} data-slot="card-action" className={clsx(styles.action, className)} {...props} />
  );
});

CardHeader.displayName = 'CardHeader';
CardBody.displayName = 'CardBody';
CardFooter.displayName = 'CardFooter';
CardTitle.displayName = 'CardTitle';
CardDescription.displayName = 'CardDescription';
CardAction.displayName = 'CardAction';

export { Card, CardHeader, CardBody, CardFooter, CardTitle, CardDescription, CardAction };

export type {
  CardProps,
  CardHeaderProps,
  CardBodyProps,
  CardFooterProps,
  CardTitleProps,
  CardDescriptionProps,
  CardActionProps,
  CardAs,
  CardVariant,
  CardSize,
  CardFooterAlign,
};