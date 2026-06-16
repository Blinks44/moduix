import type { ComponentProps, ComponentPropsWithoutRef } from 'react';
import { useRender } from '@base-ui/react/use-render';
import clsx from 'clsx';
import styles from './Card.module.css';

type CardSize = 'default' | 'sm';
type CardTitleElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

function Card({
  className,
  render,
  size = 'default',
  ...props
}: useRender.ComponentProps<'div'> & { size?: CardSize }) {
  return useRender({
    defaultTagName: 'div',
    render,
    props: {
      ...props,
      'data-slot': 'card',
      'data-size': size,
      className: clsx(styles.root, className),
    },
  });
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
  as: Tag = 'h3',
  className,
  ...props
}: ComponentPropsWithoutRef<'h3'> & {
  as?: CardTitleElement;
}) {
  return <Tag data-slot="card-title" className={clsx(styles.title, className)} {...props} />;
}

function CardDescription({ className, ...props }: ComponentProps<'p'>) {
  return (
    <p data-slot="card-description" className={clsx(styles.description, className)} {...props} />
  );
}

function CardAction({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="card-action" className={clsx(styles.action, className)} {...props} />;
}

function CardLink({ className, render, ...props }: useRender.ComponentProps<'a'>) {
  return useRender({
    defaultTagName: 'a',
    render,
    props: {
      ...props,
      'data-slot': 'card-link',
      className: clsx(styles.link, className),
    },
  });
}

export {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
  CardAction,
  CardLink,
};
export type { CardSize, CardTitleElement };