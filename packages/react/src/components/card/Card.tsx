import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import { forwardRef, type ComponentRef } from 'react';
import styles from './Card.module.css';

type CardRootProps = HTMLArkProps<'div'> & {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'elevated' | 'outline' | 'subtle';
};

const CardRoot = forwardRef<ComponentRef<typeof ark.div>, CardRootProps>(function CardRoot(
  { className, size = 'md', variant = 'outline', ...props },
  ref,
) {
  return (
    <ark.div
      ref={ref}
      data-scope="card"
      data-part="root"
      data-size={size}
      data-variant={variant}
      className={clsx(styles.root, className)}
      {...props}
      data-slot="card-root"
    />
  );
});

const CardHeader = forwardRef<ComponentRef<typeof ark.div>, HTMLArkProps<'div'>>(
  function CardHeader({ className, ...props }, ref) {
    return (
      <ark.div
        ref={ref}
        data-scope="card"
        data-part="header"
        className={clsx(styles.header, className)}
        {...props}
        data-slot="card-header"
      />
    );
  },
);

const CardBody = forwardRef<ComponentRef<typeof ark.div>, HTMLArkProps<'div'>>(function CardBody(
  { className, ...props },
  ref,
) {
  return (
    <ark.div
      ref={ref}
      data-scope="card"
      data-part="body"
      className={clsx(styles.body, className)}
      {...props}
      data-slot="card-body"
    />
  );
});

const CardMedia = forwardRef<ComponentRef<typeof ark.div>, HTMLArkProps<'div'>>(function CardMedia(
  { className, ...props },
  ref,
) {
  return (
    <ark.div
      ref={ref}
      data-scope="card"
      data-part="media"
      className={clsx(styles.media, className)}
      {...props}
      data-slot="card-media"
    />
  );
});

const CardBackground = forwardRef<ComponentRef<typeof ark.div>, HTMLArkProps<'div'>>(
  function CardBackground({ className, ...props }, ref) {
    return (
      <ark.div
        ref={ref}
        data-scope="card"
        data-part="background"
        className={clsx(styles.background, className)}
        {...props}
        data-slot="card-background"
      />
    );
  },
);

const CardFooter = forwardRef<ComponentRef<typeof ark.div>, HTMLArkProps<'div'>>(
  function CardFooter({ className, ...props }, ref) {
    return (
      <ark.div
        ref={ref}
        data-scope="card"
        data-part="footer"
        className={clsx(styles.footer, className)}
        {...props}
        data-slot="card-footer"
      />
    );
  },
);

const CardTitle = forwardRef<ComponentRef<typeof ark.h3>, HTMLArkProps<'h3'>>(function CardTitle(
  { className, ...props },
  ref,
) {
  return (
    <ark.h3
      ref={ref}
      data-scope="card"
      data-part="title"
      className={clsx(styles.title, className)}
      {...props}
      data-slot="card-title"
    />
  );
});

const CardDescription = forwardRef<ComponentRef<typeof ark.p>, HTMLArkProps<'p'>>(
  function CardDescription({ className, ...props }, ref) {
    return (
      <ark.p
        ref={ref}
        data-scope="card"
        data-part="description"
        className={clsx(styles.description, className)}
        {...props}
        data-slot="card-description"
      />
    );
  },
);

const CardAction = forwardRef<ComponentRef<typeof ark.div>, HTMLArkProps<'div'>>(
  function CardAction({ className, ...props }, ref) {
    return (
      <ark.div
        ref={ref}
        data-scope="card"
        data-part="action"
        className={clsx(styles.action, className)}
        {...props}
        data-slot="card-action"
      />
    );
  },
);

const CardLink = forwardRef<ComponentRef<typeof ark.a>, HTMLArkProps<'a'>>(function CardLink(
  { className, ...props },
  ref,
) {
  return (
    <ark.a
      ref={ref}
      data-scope="card"
      data-part="link"
      className={clsx(styles.link, className)}
      {...props}
      data-slot="card-link"
    />
  );
});

const Card = Object.assign(CardRoot, {
  Root: CardRoot,
  Header: CardHeader,
  Body: CardBody,
  Media: CardMedia,
  Background: CardBackground,
  Footer: CardFooter,
  Title: CardTitle,
  Description: CardDescription,
  Action: CardAction,
  Link: CardLink,
});

export { Card };