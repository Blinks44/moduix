import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { cva } from 'class-variance-authority';
import { splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';

type CardRootProps = HTMLArkProps<'div'> & {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'elevated' | 'outline' | 'subtle';
};

const cardRootVariants = cva(
  'group/card relative flex w-full min-w-0 flex-col rounded-lg text-card-foreground focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring has-[>[data-slot=card-background]]:isolate [&:has(>[data-slot=card-background])>*:not([data-slot=card-background])]:z-1 [&:has([data-slot=card-link])_:is(a,button,input,select,textarea,summary,audio[controls],video[controls],iframe,[contenteditable=true],[role=button],[role=checkbox],[role=menuitem],[role=switch],[tabindex]:not([tabindex=-1])):not([data-slot=card-link])]:relative [&:has([data-slot=card-link])_:is(a,button,input,select,textarea,summary,audio[controls],video[controls],iframe,[contenteditable=true],[role=button],[role=checkbox],[role=menuitem],[role=switch],[tabindex]:not([tabindex=-1])):not([data-slot=card-link])]:z-1',
  {
    variants: {
      variant: {
        elevated: 'border-0 bg-card shadow-md',
        outline: 'border border-border bg-card',
        subtle: 'border-0 bg-muted',
      },
    },
    defaultVariants: {
      variant: 'outline',
    },
  },
);

function CardRoot(props: CardRootProps) {
  const [local, others] = splitProps(props, ['asChild', 'class', 'size', 'variant']);

  return (
    <ark.div
      asChild={local.asChild}
      class={cn(cardRootVariants({ variant: local.variant }), local.class)}
      {...others}
      data-scope="card"
      data-part="root"
      data-size={local.size ?? 'md'}
      data-variant={local.variant ?? 'outline'}
      data-slot="card-root"
    />
  );
}

function CardHeader(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);
  return (
    <ark.div
      asChild={local.asChild}
      class={cn(
        'grid min-w-0 grid-cols-[minmax(0,1fr)_auto] gap-x-2 gap-y-1 px-6 pt-6 group-data-[size=lg]/card:px-8 group-data-[size=lg]/card:pt-8 group-data-[size=sm]/card:px-4 group-data-[size=sm]/card:pt-4',
        local.class,
      )}
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
      class={cn(
        'min-w-0 px-6 pt-4 pb-6 text-sm wrap-anywhere text-muted-foreground group-data-[size=lg]/card:px-8 group-data-[size=lg]/card:pb-8 group-data-[size=sm]/card:px-4 group-data-[size=sm]/card:pb-4 first:pt-6 group-data-[size=lg]/card:first:pt-8 group-data-[size=sm]/card:first:pt-4',
        local.class,
      )}
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
      class={cn(
        'min-w-0 overflow-hidden rounded-ss-[inherit] rounded-se-[inherit] [&>:is(img,picture,video,canvas,svg,iframe)]:w-full [&>picture]:block [&>picture>img]:w-full',
        local.class,
      )}
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
      class={cn(
        'absolute inset-0 z-0 overflow-hidden rounded-[inherit] [&>:is(img,picture,video,canvas,svg,iframe)]:size-full [&>:is(img,picture,video,canvas,svg,iframe)]:object-cover [&>picture]:block [&>picture>img]:size-full [&>picture>img]:object-cover',
        local.class,
      )}
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
      class={cn(
        'flex min-w-0 flex-wrap items-center gap-2 px-6 pb-6 group-data-[size=lg]/card:px-8 group-data-[size=lg]/card:pb-8 group-data-[size=sm]/card:px-4 group-data-[size=sm]/card:pb-4',
        local.class,
      )}
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
      class={cn(
        'col-start-1 min-w-0 text-lg font-semibold wrap-anywhere group-data-[size=lg]/card:text-xl group-data-[size=sm]/card:text-md',
        local.class,
      )}
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
      class={cn('col-start-1 min-w-0 text-sm wrap-anywhere text-muted-foreground', local.class)}
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
      class={cn(
        'relative z-1 col-start-2 row-span-2 row-start-1 inline-flex items-start justify-end gap-2 justify-self-end',
        local.class,
      )}
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
      class={cn(
        'static text-inherit no-underline after:absolute after:inset-0 after:z-0 after:rounded-lg focus-visible:outline-0 focus-visible:after:outline-2 focus-visible:after:outline-offset-1 focus-visible:after:outline-ring',
        local.class,
      )}
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