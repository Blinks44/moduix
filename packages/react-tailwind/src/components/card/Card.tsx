'use client';

import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { cva } from 'class-variance-authority';
import type { ComponentRef } from 'react';
import { forwardRef } from 'react';
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

const CardRoot = forwardRef<ComponentRef<typeof ark.div>, CardRootProps>(function CardRoot(
  { className, size, variant, ...props },
  ref,
) {
  return (
    <ark.div
      ref={ref}
      className={cn(cardRootVariants({ variant }), className)}
      {...props}
      data-scope="card"
      data-part="root"
      data-size={size ?? 'md'}
      data-variant={variant ?? 'outline'}
      data-slot="card-root"
    />
  );
});

const CardHeader = forwardRef<ComponentRef<typeof ark.div>, HTMLArkProps<'div'>>(
  function CardHeader({ className, ...props }, ref) {
    return (
      <ark.div
        ref={ref}
        className={cn(
          'grid min-w-0 grid-cols-[minmax(0,1fr)_auto] gap-x-2 gap-y-1 px-6 pt-6 group-data-[size=lg]/card:px-8 group-data-[size=lg]/card:pt-8 group-data-[size=sm]/card:px-4 group-data-[size=sm]/card:pt-4',
          className,
        )}
        {...props}
        data-scope="card"
        data-part="header"
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
      className={cn(
        'min-w-0 px-6 pt-4 pb-6 text-sm wrap-anywhere text-muted-foreground group-data-[size=lg]/card:px-8 group-data-[size=lg]/card:pb-8 group-data-[size=sm]/card:px-4 group-data-[size=sm]/card:pb-4 first:pt-6 group-data-[size=lg]/card:first:pt-8 group-data-[size=sm]/card:first:pt-4',
        className,
      )}
      {...props}
      data-scope="card"
      data-part="body"
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
      className={cn(
        'min-w-0 overflow-hidden rounded-ss-[inherit] rounded-se-[inherit] [&>:is(img,picture,video,canvas,svg,iframe)]:w-full [&>picture]:block [&>picture>img]:w-full',
        className,
      )}
      {...props}
      data-scope="card"
      data-part="media"
      data-slot="card-media"
    />
  );
});

const CardBackground = forwardRef<ComponentRef<typeof ark.div>, HTMLArkProps<'div'>>(
  function CardBackground({ className, ...props }, ref) {
    return (
      <ark.div
        ref={ref}
        className={cn(
          'absolute inset-0 z-0 overflow-hidden rounded-[inherit] [&>:is(img,picture,video,canvas,svg,iframe)]:size-full [&>:is(img,picture,video,canvas,svg,iframe)]:object-cover [&>picture]:block [&>picture>img]:size-full [&>picture>img]:object-cover',
          className,
        )}
        {...props}
        data-scope="card"
        data-part="background"
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
        className={cn(
          'flex min-w-0 flex-wrap items-center gap-2 px-6 pb-6 group-data-[size=lg]/card:px-8 group-data-[size=lg]/card:pb-8 group-data-[size=sm]/card:px-4 group-data-[size=sm]/card:pb-4',
          className,
        )}
        {...props}
        data-scope="card"
        data-part="footer"
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
      className={cn(
        'col-start-1 min-w-0 text-lg font-semibold wrap-anywhere group-data-[size=lg]/card:text-xl group-data-[size=sm]/card:text-md',
        className,
      )}
      {...props}
      data-scope="card"
      data-part="title"
      data-slot="card-title"
    />
  );
});

const CardDescription = forwardRef<ComponentRef<typeof ark.p>, HTMLArkProps<'p'>>(
  function CardDescription({ className, ...props }, ref) {
    return (
      <ark.p
        ref={ref}
        className={cn('col-start-1 min-w-0 text-sm wrap-anywhere text-muted-foreground', className)}
        {...props}
        data-scope="card"
        data-part="description"
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
        className={cn(
          'relative z-1 col-start-2 row-span-2 row-start-1 inline-flex items-start justify-end gap-2 justify-self-end',
          className,
        )}
        {...props}
        data-scope="card"
        data-part="action"
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
      className={cn(
        'static text-inherit no-underline after:absolute after:inset-0 after:z-0 after:rounded-lg focus-visible:outline-0 focus-visible:after:outline-2 focus-visible:after:outline-offset-1 focus-visible:after:outline-ring',
        className,
      )}
      {...props}
      data-scope="card"
      data-part="link"
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