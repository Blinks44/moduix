import type { ComponentProps, ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import styles from './Card.module.css';

function Card({
  className,
  size = 'default',
  ...props
}: ComponentProps<'div'> & { size?: 'default' | 'sm' }) {
  return (
    <div data-slot="card" data-size={size} className={clsx(styles.root, className)} {...props} />
  );
}

function CardHeader({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="card-header" className={clsx(styles.header, className)} {...props} />;
}

function CardContent({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="card-content" className={clsx(styles.content, className)} {...props} />;
}

function CardFooter({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="card-footer" className={clsx(styles.footer, className)} {...props} />;
}

function CardTitle({
  as: Root = 'h3',
  className,
  ...props
}: ComponentPropsWithoutRef<'h3'> & {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}) {
  return <Root data-slot="card-title" className={clsx(styles.title, className)} {...props} />;
}

function CardDescription({ className, ...props }: ComponentProps<'p'>) {
  return (
    <p data-slot="card-description" className={clsx(styles.description, className)} {...props} />
  );
}

function CardAction({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="card-action" className={clsx(styles.action, className)} {...props} />;
}

export { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription, CardAction };