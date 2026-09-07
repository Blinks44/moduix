'use client';

import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { cva } from 'class-variance-authority';
import type { ComponentRef } from 'react';
import { createContext, forwardRef, useContext } from 'react';
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
  variants: {
    size: {
      sm: 'px-4 pt-4',
      md: 'px-6 pt-6',
      lg: 'px-8 pt-8',
    },
  },
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
  variants: {
    size: {
      sm: 'px-4 pb-4',
      md: 'px-6 pb-6',
      lg: 'px-8 pb-8',
    },
  },
});

const cardTitleVariants = cva('col-start-1 min-w-0 font-semibold wrap-anywhere', {
  variants: {
    size: {
      sm: 'text-md',
      md: 'text-lg',
      lg: 'text-xl',
    },
  },
});

const CardSizeContext = createContext<CardSize>('md');

const CardRoot = forwardRef<ComponentRef<typeof ark.div>, CardRootProps>(function CardRoot(
  { children, className, size = 'md', variant, ...props },
  ref,
) {
  return (
    <CardSizeContext.Provider value={size}>
      <ark.div
        ref={ref}
        data-scope="card"
        data-part="root"
        data-slot="card-root"
        data-size={size}
        data-variant={variant ?? 'outline'}
        className={cn(cardRootVariants({ variant }), className)}
        {...props}
      >
        {children}
      </ark.div>
    </CardSizeContext.Provider>
  );
});

const CardHeader = forwardRef<ComponentRef<typeof ark.div>, HTMLArkProps<'div'>>(
  function CardHeader({ className, ...props }, ref) {
    const size = useContext(CardSizeContext);

    return (
      <ark.div
        ref={ref}
        data-scope="card"
        data-part="header"
        data-slot="card-header"
        className={cn(cardHeaderVariants({ size }), className)}
        {...props}
      />
    );
  },
);

const CardBody = forwardRef<ComponentRef<typeof ark.div>, HTMLArkProps<'div'>>(function CardBody(
  { className, ...props },
  ref,
) {
  const size = useContext(CardSizeContext);

  return (
    <ark.div
      ref={ref}
      data-scope="card"
      data-part="body"
      data-slot="card-body"
      className={cn(cardBodyVariants({ size }), className)}
      {...props}
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
      data-slot="card-media"
      className={cn(
        'min-w-0 overflow-hidden rounded-ss-[inherit] rounded-se-[inherit] [&>:is(img,picture,video,canvas,svg,iframe)]:w-full [&>picture]:block [&>picture>img]:w-full',
        className,
      )}
      {...props}
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
        data-slot="card-background"
        className={cn(
          'absolute inset-0 z-0 overflow-hidden rounded-[inherit] [&>:is(img,picture,video,canvas,svg,iframe)]:size-full [&>:is(img,picture,video,canvas,svg,iframe)]:object-cover [&>picture]:block [&>picture>img]:size-full [&>picture>img]:object-cover',
          className,
        )}
        {...props}
      />
    );
  },
);

const CardFooter = forwardRef<ComponentRef<typeof ark.div>, HTMLArkProps<'div'>>(
  function CardFooter({ className, ...props }, ref) {
    const size = useContext(CardSizeContext);

    return (
      <ark.div
        ref={ref}
        data-scope="card"
        data-part="footer"
        data-slot="card-footer"
        className={cn(cardFooterVariants({ size }), className)}
        {...props}
      />
    );
  },
);

const CardTitle = forwardRef<ComponentRef<typeof ark.h3>, HTMLArkProps<'h3'>>(function CardTitle(
  { className, ...props },
  ref,
) {
  const size = useContext(CardSizeContext);

  return (
    <ark.h3
      ref={ref}
      data-scope="card"
      data-part="title"
      data-slot="card-title"
      className={cn(cardTitleVariants({ size }), className)}
      {...props}
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
        data-slot="card-description"
        className={cn('col-start-1 min-w-0 text-sm wrap-anywhere text-muted-foreground', className)}
        {...props}
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
        data-slot="card-action"
        className={cn(
          'relative z-1 col-start-2 row-span-2 row-start-1 inline-flex items-start justify-end gap-2 justify-self-end',
          className,
        )}
        {...props}
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
      data-slot="card-link"
      className={cn(
        'static text-inherit no-underline after:absolute after:inset-0 after:z-0 after:rounded-lg focus-visible:outline-0 focus-visible:after:outline-2 focus-visible:after:outline-offset-1 focus-visible:after:outline-ring',
        className,
      )}
      {...props}
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