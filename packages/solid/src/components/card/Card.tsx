import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { clsx } from 'clsx';
import { splitProps } from 'solid-js';
import styles from './Card.module.css';

type CardRootProps = HTMLArkProps<'div'> & {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'elevated' | 'outline' | 'subtle';
};

function CardRoot(props: CardRootProps) {
  const [local, others] = splitProps(props, ['asChild', 'class', 'size', 'variant']);

  return (
    <ark.div
      asChild={local.asChild}
      {...others}
      data-scope="card"
      data-part="root"
      data-slot="card-root"
      data-size={local.size ?? 'md'}
      data-variant={local.variant ?? 'outline'}
      class={clsx(styles.root, local.class)}
    />
  );
}

function CardHeader(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <ark.div
      asChild={local.asChild}
      class={clsx(styles.header, local.class)}
      {...others}
      data-scope="card"
      data-part="header"
      data-slot="card-header"
    />
  );
}

function CardBody(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <ark.div
      asChild={local.asChild}
      class={clsx(styles.body, local.class)}
      {...others}
      data-scope="card"
      data-part="body"
      data-slot="card-body"
    />
  );
}

function CardMedia(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <ark.div
      asChild={local.asChild}
      class={clsx(styles.media, local.class)}
      {...others}
      data-scope="card"
      data-part="media"
      data-slot="card-media"
    />
  );
}

function CardBackground(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <ark.div
      asChild={local.asChild}
      class={clsx(styles.background, local.class)}
      {...others}
      data-scope="card"
      data-part="background"
      data-slot="card-background"
    />
  );
}

function CardFooter(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <ark.div
      asChild={local.asChild}
      class={clsx(styles.footer, local.class)}
      {...others}
      data-scope="card"
      data-part="footer"
      data-slot="card-footer"
    />
  );
}

function CardTitle(props: HTMLArkProps<'h3'>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <ark.h3
      asChild={local.asChild}
      class={clsx(styles.title, local.class)}
      {...others}
      data-scope="card"
      data-part="title"
      data-slot="card-title"
    />
  );
}

function CardDescription(props: HTMLArkProps<'p'>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <ark.p
      asChild={local.asChild}
      class={clsx(styles.description, local.class)}
      {...others}
      data-scope="card"
      data-part="description"
      data-slot="card-description"
    />
  );
}

function CardAction(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <ark.div
      asChild={local.asChild}
      class={clsx(styles.action, local.class)}
      {...others}
      data-scope="card"
      data-part="action"
      data-slot="card-action"
    />
  );
}

function CardLink(props: HTMLArkProps<'a'>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <ark.a
      asChild={local.asChild}
      class={clsx(styles.link, local.class)}
      {...others}
      data-scope="card"
      data-part="link"
      data-slot="card-link"
    />
  );
}

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