import type { ComponentProps, ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import styles from './Empty.module.css';

type EmptyTitleElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type EmptyTitleProps = ComponentPropsWithoutRef<'h3'> & { as?: EmptyTitleElement };

function Empty({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="empty-root" className={clsx(styles.root, className)} {...props} />;
}

function EmptyIcon({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="empty-icon" className={clsx(styles.icon, className)} {...props} />;
}

function EmptyContent({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="empty-content" className={clsx(styles.content, className)} {...props} />;
}

function EmptyTitle({ as: Heading = 'h3', className, ...props }: EmptyTitleProps) {
  return <Heading data-slot="empty-title" className={clsx(styles.title, className)} {...props} />;
}

function EmptyDescription({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div data-slot="empty-description" className={clsx(styles.description, className)} {...props} />
  );
}

function EmptyActions({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="empty-actions" className={clsx(styles.actions, className)} {...props} />;
}

export { Empty, EmptyIcon, EmptyContent, EmptyTitle, EmptyDescription, EmptyActions };