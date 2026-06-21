import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './Card.module.css';

export type CardSize = 'sm' | 'md' | 'lg';
export type CardVariant = 'elevated' | 'outline' | 'subtle';
export type CardRootProps = HTMLArkProps<'div'> & {
  size?: CardSize;
  variant?: CardVariant;
};
export type CardHeaderProps = HTMLArkProps<'div'>;
export type CardBodyProps = HTMLArkProps<'div'>;
export type CardFooterProps = HTMLArkProps<'div'>;
export type CardTitleProps = HTMLArkProps<'h3'>;
export type CardDescriptionProps = HTMLArkProps<'p'>;
export type CardActionProps = HTMLArkProps<'div'>;
export type CardLinkProps = HTMLArkProps<'a'>;

const CardRoot = forwardRef<HTMLDivElement, CardRootProps>(function CardRoot(
  { className, size = 'md', variant = 'outline', ...props },
  ref,
) {
  return (
    <ark.div
      ref={ref}
      data-scope="card"
      data-part="root"
      data-slot="card-root"
      data-size={size}
      data-variant={variant}
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
    />
  );
});

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(function CardHeader(
  { className, ...props },
  ref,
) {
  return (
    <ark.div
      ref={ref}
      data-scope="card"
      data-part="header"
      data-slot="card-header"
      className={clsx(styles.header, normalizeClassName(className))}
      {...props}
    />
  );
});

const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(function CardBody(
  { className, ...props },
  ref,
) {
  return (
    <ark.div
      ref={ref}
      data-scope="card"
      data-part="body"
      data-slot="card-body"
      className={clsx(styles.body, normalizeClassName(className))}
      {...props}
    />
  );
});

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(function CardFooter(
  { className, ...props },
  ref,
) {
  return (
    <ark.div
      ref={ref}
      data-scope="card"
      data-part="footer"
      data-slot="card-footer"
      className={clsx(styles.footer, normalizeClassName(className))}
      {...props}
    />
  );
});

const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(function CardTitle(
  { className, ...props },
  ref,
) {
  return (
    <ark.h3
      ref={ref}
      data-scope="card"
      data-part="title"
      data-slot="card-title"
      className={clsx(styles.title, normalizeClassName(className))}
      {...props}
    />
  );
});

const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  function CardDescription({ className, ...props }, ref) {
    return (
      <ark.p
        ref={ref}
        data-scope="card"
        data-part="description"
        data-slot="card-description"
        className={clsx(styles.description, normalizeClassName(className))}
        {...props}
      />
    );
  },
);

const CardAction = forwardRef<HTMLDivElement, CardActionProps>(function CardAction(
  { className, ...props },
  ref,
) {
  return (
    <ark.div
      ref={ref}
      data-scope="card"
      data-part="action"
      data-slot="card-action"
      className={clsx(styles.action, normalizeClassName(className))}
      {...props}
    />
  );
});

const CardLink = forwardRef<HTMLAnchorElement, CardLinkProps>(function CardLink(
  { className, ...props },
  ref,
) {
  return (
    <ark.a
      ref={ref}
      data-scope="card"
      data-part="link"
      data-slot="card-link"
      className={clsx(styles.link, normalizeClassName(className))}
      {...props}
    />
  );
});

const Card = Object.assign(CardRoot, {
  Root: CardRoot,
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
  Title: CardTitle,
  Description: CardDescription,
  Action: CardAction,
  Link: CardLink,
});

export { Card };