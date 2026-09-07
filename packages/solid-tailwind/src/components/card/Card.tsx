import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { cva } from 'class-variance-authority';
import { createContext, splitProps, useContext } from 'solid-js';
import { cn } from '@/lib/moduix/cn';

type CardSize = 'sm' | 'md' | 'lg';
type CardRootProps = HTMLArkProps<'div'> & {
  size?: CardSize;
  variant?: 'elevated' | 'outline' | 'subtle';
};

const cardRootVariants = cva(
  'relative flex w-full min-w-0 flex-col rounded-lg text-card-foreground focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring has-[>[data-slot=card-background]]:isolate [&:has(>[data-slot=card-background])>*:not([data-slot=card-background])]:z-1 [&:has([data-slot=card-link])_:is(a,button,input,select,textarea,[role=button],[role=checkbox],[role=menuitem],[role=switch],[tabindex]:not([tabindex=-1])):not([data-slot=card-link])]:relative [&:has([data-slot=card-link])_:is(a,button,input,select,textarea,[role=button],[role=checkbox],[role=menuitem],[role=switch],[tabindex]:not([tabindex=-1])):not([data-slot=card-link])]:z-1',
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

const cardHeaderVariants = cva('grid min-w-0 grid-cols-[minmax(0,1fr)_auto] gap-x-2 gap-y-1', {
  variants: { size: { sm: 'px-4 pt-4', md: 'px-6 pt-6', lg: 'px-8 pt-8' } },
});
const cardBodyVariants = cva('min-w-0 pt-4 text-sm wrap-anywhere text-muted-foreground', {
  variants: {
    size: {
      sm: 'px-4 pb-4 first:pt-4',
      md: 'px-6 pb-6 first:pt-6',
      lg: 'px-8 pb-8 first:pt-8',
    },
  },
});
const cardFooterVariants = cva('flex min-w-0 flex-wrap items-center gap-2', {
  variants: { size: { sm: 'px-4 pb-4', md: 'px-6 pb-6', lg: 'px-8 pb-8' } },
});
const cardTitleVariants = cva('col-start-1 min-w-0 font-semibold wrap-anywhere', {
  variants: { size: { sm: 'text-md', md: 'text-lg', lg: 'text-xl' } },
});

const CardSizeContext = createContext<() => CardSize>((): CardSize => 'md');

function CardRoot(props: CardRootProps) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class', 'size', 'variant']);

  return (
    <CardSizeContext.Provider value={(): CardSize => local.size ?? 'md'}>
      <ark.div
        asChild={local.asChild}
        data-scope="card"
        data-part="root"
        data-slot="card-root"
        data-size={local.size ?? 'md'}
        data-variant={local.variant ?? 'outline'}
        class={cn(cardRootVariants({ variant: local.variant }), local.class)}
        {...others}
      >
        {local.children}
      </ark.div>
    </CardSizeContext.Provider>
  );
}

function CardHeader(props: HTMLArkProps<'div'>) {
  const size = useContext(CardSizeContext)!;
  const [local, others] = splitProps(props, ['asChild', 'class']);
  return (
    <ark.div
      asChild={local.asChild}
      data-scope="card"
      data-part="header"
      data-slot="card-header"
      class={cn(cardHeaderVariants({ size: size() }), local.class)}
      {...others}
    />
  );
}

function CardBody(props: HTMLArkProps<'div'>) {
  const size = useContext(CardSizeContext)!;
  const [local, others] = splitProps(props, ['asChild', 'class']);
  return (
    <ark.div
      asChild={local.asChild}
      data-scope="card"
      data-part="body"
      data-slot="card-body"
      class={cn(cardBodyVariants({ size: size() }), local.class)}
      {...others}
    />
  );
}

function CardMedia(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);
  return (
    <ark.div
      asChild={local.asChild}
      data-scope="card"
      data-part="media"
      data-slot="card-media"
      class={cn(
        'min-w-0 overflow-hidden rounded-ss-[inherit] rounded-se-[inherit] [&>:is(img,picture,video,canvas,svg,iframe)]:w-full [&>picture]:block [&>picture>img]:w-full',
        local.class,
      )}
      {...others}
    />
  );
}

function CardBackground(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);
  return (
    <ark.div
      asChild={local.asChild}
      data-scope="card"
      data-part="background"
      data-slot="card-background"
      class={cn(
        'absolute inset-0 z-0 overflow-hidden rounded-[inherit] [&>:is(img,picture,video,canvas,svg,iframe)]:size-full [&>:is(img,picture,video,canvas,svg,iframe)]:object-cover [&>picture]:block [&>picture>img]:size-full [&>picture>img]:object-cover',
        local.class,
      )}
      {...others}
    />
  );
}

function CardFooter(props: HTMLArkProps<'div'>) {
  const size = useContext(CardSizeContext)!;
  const [local, others] = splitProps(props, ['asChild', 'class']);
  return (
    <ark.div
      asChild={local.asChild}
      data-scope="card"
      data-part="footer"
      data-slot="card-footer"
      class={cn(cardFooterVariants({ size: size() }), local.class)}
      {...others}
    />
  );
}

function CardTitle(props: HTMLArkProps<'h3'>) {
  const size = useContext(CardSizeContext)!;
  const [local, others] = splitProps(props, ['asChild', 'class']);
  return (
    <ark.h3
      asChild={local.asChild}
      data-scope="card"
      data-part="title"
      data-slot="card-title"
      class={cn(cardTitleVariants({ size: size() }), local.class)}
      {...others}
    />
  );
}

function CardDescription(props: HTMLArkProps<'p'>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);
  return (
    <ark.p
      asChild={local.asChild}
      data-scope="card"
      data-part="description"
      data-slot="card-description"
      class={cn('col-start-1 min-w-0 text-sm wrap-anywhere text-muted-foreground', local.class)}
      {...others}
    />
  );
}

function CardAction(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);
  return (
    <ark.div
      asChild={local.asChild}
      data-scope="card"
      data-part="action"
      data-slot="card-action"
      class={cn(
        'relative z-1 col-start-2 row-span-2 row-start-1 inline-flex items-start justify-end gap-2 justify-self-end',
        local.class,
      )}
      {...others}
    />
  );
}

function CardLink(props: HTMLArkProps<'a'>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);
  return (
    <ark.a
      asChild={local.asChild}
      data-scope="card"
      data-part="link"
      data-slot="card-link"
      class={cn(
        'static text-inherit no-underline after:absolute after:inset-0 after:z-0 after:rounded-lg focus-visible:outline-0 focus-visible:after:outline-2 focus-visible:after:outline-offset-1 focus-visible:after:outline-ring',
        local.class,
      )}
      {...others}
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