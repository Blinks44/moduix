import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { cva } from 'class-variance-authority';
import type { ForwardedRef } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';

type ListElement = 'ul' | 'ol';
type ListMarker = 'disc' | 'decimal' | 'none';
type ListGap = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type ListSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type ListTone = 'default' | 'muted' | 'subtle' | 'primary' | 'destructive';

type ListRootProps = HTMLArkProps<'ol'> & {
  as?: ListElement;
  marker?: ListMarker;
  gap?: ListGap;
  size?: ListSize;
  tone?: ListTone;
};

const listIndicatorClass =
  "inline-flex shrink-0 items-center justify-center min-h-lh me-2 [&>svg]:pointer-events-none [&>svg]:shrink-0 [&>svg:not([class*='size-'])]:size-[1em]";

const listVariants = cva(
  [
    'flex flex-col gap-(--_list-gap) ps-5 font-regular tracking-normal break-words',
    '[&>li>:is(ul,ol)]:mt-(--_list-gap)',
    '[&>li:has(>[data-slot=list-indicator])]:flex [&>li:has(>[data-slot=list-indicator])]:items-start',
  ],
  {
    variants: {
      marker: {
        disc: 'list-disc',
        decimal: 'list-decimal',
        none: 'list-none ps-0',
      },
      gap: {
        xs: '[--_list-gap:var(--moduix-spacing-1)]',
        sm: '[--_list-gap:var(--moduix-spacing-2)]',
        md: '[--_list-gap:var(--moduix-spacing-3)]',
        lg: '[--_list-gap:var(--moduix-spacing-4)]',
        xl: '[--_list-gap:var(--moduix-spacing-5)]',
        '2xl': '[--_list-gap:var(--moduix-spacing-6)]',
      },
      size: {
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-md',
        lg: 'text-lg',
        xl: 'text-xl',
      },
      tone: {
        default: 'text-foreground',
        muted: 'text-muted-foreground',
        subtle: 'text-secondary-foreground',
        primary: 'text-primary',
        destructive: 'text-destructive',
      },
    },
  },
);

const List = forwardRef<HTMLUListElement | HTMLOListElement, ListRootProps>(function List(
  {
    as = 'ul',
    marker = as === 'ol' ? 'decimal' : 'disc',
    gap = 'sm',
    size = 'md',
    tone = 'default',
    role = marker === 'none' ? 'list' : undefined,
    className,
    ...props
  },
  ref,
) {
  const Element = ark[as] as typeof ark.ol;

  return (
    <Element
      {...props}
      ref={ref as ForwardedRef<HTMLOListElement>}
      role={role}
      data-scope="list"
      data-part="root"
      data-slot="list-root"
      data-gap={gap}
      data-marker={marker}
      data-size={size}
      data-tone={tone}
      className={cn(listVariants({ marker, gap, size, tone }), className)}
    />
  );
});

const ListItem = forwardRef<HTMLLIElement, HTMLArkProps<'li'>>(function ListItem(props, ref) {
  return <ark.li {...props} ref={ref} data-scope="list" data-part="item" data-slot="list-item" />;
});

const ListIndicator = forwardRef<HTMLSpanElement, HTMLArkProps<'span'>>(function ListIndicator(
  { className, ...props },
  ref,
) {
  return (
    <ark.span
      {...props}
      ref={ref}
      data-scope="list"
      data-part="indicator"
      data-slot="list-indicator"
      className={cn(listIndicatorClass, className)}
    />
  );
});

export { List, ListIndicator, ListItem };
export type { ListElement, ListGap, ListMarker, ListRootProps, ListSize, ListTone };