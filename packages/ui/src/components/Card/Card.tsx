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
  const Component = as;

  return (
    <Component
      data-slot="card-root"
      data-variant={variant}
      data-size={size}
      data-interactive={interactive ? '' : undefined}
      className={clsx(styles.root, className)}
      {...props}
    />
  );
}

function CardHeader({ className, withDivider = false, ...props }: CardHeaderProps) {
  return (
    <div
      data-slot="card-header"
      data-divided={withDivider ? '' : undefined}
      className={clsx(styles.header, className)}
      {...props}
    />
  );
}

function CardBody({ className, ...props }: CardBodyProps) {
  return <div data-slot="card-body" className={clsx(styles.body, className)} {...props} />;
}

function CardFooter({ className, align = 'end', withDivider = false, ...props }: CardFooterProps) {
  return (
    <div
      data-slot="card-footer"
      data-align={align}
      data-divided={withDivider ? '' : undefined}
      className={clsx(styles.footer, className)}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: CardTitleProps) {
  return <h3 data-slot="card-title" className={clsx(styles.title, className)} {...props} />;
}

function CardDescription({ className, ...props }: CardDescriptionProps) {
  return (
    <p data-slot="card-description" className={clsx(styles.description, className)} {...props} />
  );
}

function CardAction({ className, ...props }: CardActionProps) {
  return <div data-slot="card-action" className={clsx(styles.action, className)} {...props} />;
}

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