import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { cva } from 'class-variance-authority';
import { splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';

type CardSize = 'sm' | 'md' | 'lg';

type CardVariant = 'elevated' | 'outline' | 'subtle';

type CardRootProps = HTMLArkProps<'div'> & {
  size?: CardSize;
  variant?: CardVariant;
};

const cardRootVariants = cva(
  'group/card relative flex w-full min-w-0 flex-col rounded-lg text-card-foreground focus-visible:outline-focus focus-visible:outline-offset-1 focus-visible:outline-ring has-[>[data-slot=card-background]]:isolate [&:has([data-slot=card-link])_:is(a,button,input,select,textarea,summary,audio[controls],video[controls],iframe,[contenteditable=true],[role=button],[role=checkbox],[role=menuitem],[role=switch],[tabindex]:not([tabindex=-1])):not([data-slot=card-link])]:relative [&:has([data-slot=card-link])_:is(a,button,input,select,textarea,summary,audio[controls],video[controls],iframe,[contenteditable=true],[role=button],[role=checkbox],[role=menuitem],[role=switch],[tabindex]:not([tabindex=-1])):not([data-slot=card-link])]:z-1',
  {
    variants: {
      size: {
        sm: '[--card-spacing:var(--moduix-spacing-4)]',
        md: '[--card-spacing:var(--moduix-spacing-6)]',
        lg: '[--card-spacing:var(--moduix-spacing-8)]',
      },
      variant: {
        elevated: 'border-0 bg-card shadow-md',
        outline: 'border border-border bg-card',
        subtle: 'border-0 bg-muted',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'outline',
    },
  },
);

function Card(props: CardRootProps) {
  const [local, others] = splitProps(props, ['class', 'size', 'variant']);

  return (
    <ark.div
      class={cn(cardRootVariants({ size: local.size, variant: local.variant }), local.class)}
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
  const [local, others] = splitProps(props, ['class']);
  return (
    <ark.div
      class={cn(
        'grid min-w-0 grid-cols-[minmax(0,1fr)] gap-x-2 gap-y-1 px-(--card-spacing) pt-(--card-spacing) last:pb-(--card-spacing)',
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
  const [local, others] = splitProps(props, ['class']);
  return (
    <ark.div
      class={cn(
        'min-w-0 px-(--card-spacing) pt-(--card-spacing) text-sm wrap-anywhere last:pb-(--card-spacing)',
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
  const [local, others] = splitProps(props, ['class']);
  return (
    <ark.div
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
  const [local, others] = splitProps(props, ['class']);
  return (
    <ark.div
      class={cn(
        'absolute inset-0 -z-1 overflow-hidden rounded-[inherit] [&>:is(img,picture,video,canvas,svg,iframe)]:size-full [&>:is(img,picture,video,canvas,svg,iframe)]:object-cover [&>picture]:block [&>picture>img]:size-full [&>picture>img]:object-cover',
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
  const [local, others] = splitProps(props, ['class']);
  return (
    <ark.div
      class={cn(
        'flex min-w-0 flex-wrap items-center gap-2 px-(--card-spacing) pt-(--card-spacing) last:pb-(--card-spacing)',
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
  const [local, others] = splitProps(props, ['class']);
  return (
    <ark.h3
      class={cn(
        'min-w-0 text-lg font-semibold wrap-anywhere group-data-[size=lg]/card:text-xl group-data-[size=sm]/card:text-md',
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
  const [local, others] = splitProps(props, ['class']);
  return (
    <ark.p
      class={cn('min-w-0 text-sm wrap-anywhere text-muted-foreground', local.class)}
      {...others}
      data-scope="card"
      data-part="description"
      data-slot="card-description"
    />
  );
}

function CardAction(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);
  return (
    <ark.div
      class={cn(
        'relative z-1 col-start-2 row-span-2 row-start-1 inline-flex items-start justify-end gap-2',
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
  const [local, others] = splitProps(props, ['class']);
  return (
    <ark.a
      class={cn(
        'text-inherit no-underline after:absolute after:inset-0 after:rounded-lg focus-visible:outline-0 focus-visible:after:outline-focus focus-visible:after:outline-offset-1 focus-visible:after:outline-ring',
        local.class,
      )}
      {...others}
      data-scope="card"
      data-part="link"
      data-slot="card-link"
    />
  );
}

export {
  Card,
  CardAction,
  CardBackground,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardLink,
  CardMedia,
  CardTitle,
};
export type { CardRootProps, CardSize, CardVariant };