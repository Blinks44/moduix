import clsx from 'clsx';
import * as React from 'react';
import styles from './Card.module.css';

type CardAs = 'div' | 'article' | 'section' | 'aside';
type CardVariant = 'default' | 'elevated' | 'outline' | 'ghost';
type CardSize = 'xs' | 'sm' | 'md' | 'lg';
type CardFooterAlign = 'start' | 'center' | 'end' | 'between';
type CardTitleAs = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type CardProps = React.ComponentPropsWithoutRef<'div'> & {
  as?: CardAs;
  variant?: CardVariant;
  size?: CardSize;
  interactive?: boolean;
  render?: React.ReactElement<{ className?: string }>;
};

type CardHeaderProps = React.ComponentProps<'div'> & {
  withDivider?: boolean;
};

type CardBodyProps = React.ComponentProps<'div'>;

type CardFooterProps = React.ComponentProps<'div'> & {
  align?: CardFooterAlign;
  withDivider?: boolean;
};

type CardTitleProps = React.ComponentPropsWithoutRef<'h3'> & {
  as?: CardTitleAs;
};
type CardDescriptionProps = React.ComponentProps<'p'>;
type CardActionProps = React.ComponentProps<'div'>;

const Card = React.forwardRef<HTMLElement, CardProps>(function Card(
  {
    as = 'div',
    className,
    variant = 'default',
    size = 'md',
    interactive = false,
    render,
    ...props
  },
  ref,
) {
  const Root = as;
  const rootProps = {
    'data-slot': 'card-root',
    'data-variant': variant,
    'data-size': size,
    'data-interactive': interactive ? '' : undefined,
    className: clsx(styles.root, className),
    ...props,
  };

  if (render) {
    return React.cloneElement(render, {
      ref,
      ...rootProps,
      ...render.props,
      className: clsx(rootProps.className, render.props.className),
    } as any);
  }

  return <Root ref={ref as React.Ref<any>} {...rootProps} />;
});

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
  { as = 'h3', className, ...props },
  ref,
) {
  const Root = as;

  return (
    <Root ref={ref} data-slot="card-title" className={clsx(styles.title, className)} {...props} />
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
  CardTitleAs,
};