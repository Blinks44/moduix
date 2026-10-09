import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { cva } from 'class-variance-authority';
import type { ForwardedRef } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';

type ListMarker = 'disc' | 'decimal' | 'none';
type ListGap = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type ListSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type ListTone = 'default' | 'muted' | 'subtle' | 'primary' | 'destructive';
type ListMarkerValue = ListMarker | 'auto';

type ListBaseProps = {
  marker?: ListMarker;
  gap?: ListGap;
  size?: ListSize;
  tone?: ListTone;
};
type ListRootProps =
  | (HTMLArkProps<'ul'> & ListBaseProps & { as?: 'ul' })
  | (HTMLArkProps<'ol'> & ListBaseProps & { as: 'ol' });

const listVariants = cva('flex flex-col font-regular tracking-normal list-outside break-words', {
  variants: {
    as: {
      ul: null,
      ol: null,
    },
    gap: {
      xs: 'gap-space-xs',
      sm: 'gap-space-sm',
      md: 'gap-space-md',
      lg: 'gap-space-lg',
      xl: 'gap-space-xl',
      '2xl': 'gap-space-2xl',
    },
    marker: {
      auto: null,
      disc: 'list-disc ps-5',
      decimal: 'list-decimal ps-5',
      none: 'list-none',
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
  compoundVariants: [
    { as: 'ul', marker: 'auto', class: 'list-disc ps-5' },
    { as: 'ol', marker: 'auto', class: 'list-[revert] ps-5' },
  ],
  defaultVariants: {
    as: 'ul',
    gap: 'sm',
    marker: 'auto',
    size: 'md',
    tone: 'default',
  },
});

const List = forwardRef<HTMLUListElement | HTMLOListElement, ListRootProps>(function List(
  { as, asChild, className, gap = 'sm', marker, role, size = 'md', tone = 'default', ...props },
  ref,
) {
  const markerValue: ListMarkerValue = marker ?? 'auto';
  const rootProps = {
    asChild,
    role: role ?? (markerValue === 'none' ? 'list' : undefined),
    ...props,
    'data-scope': 'list',
    'data-part': 'root',
    'data-slot': 'list-root',
    'data-gap': gap,
    'data-marker': markerValue,
    'data-size': size,
    'data-tone': tone,
    className: cn(
      listVariants({
        as: as === 'ol' ? 'ol' : 'ul',
        gap,
        marker: markerValue,
        size,
        tone,
      }),
      className,
    ),
  };

  if (as === 'ol') {
    return <ark.ol ref={ref as ForwardedRef<HTMLOListElement>} {...rootProps} />;
  }

  return <ark.ul ref={ref as ForwardedRef<HTMLUListElement>} {...rootProps} />;
});

const ListItem = forwardRef<HTMLLIElement, HTMLArkProps<'li'>>(function ListItem(
  { asChild, className, ...props },
  ref,
) {
  return (
    <ark.li
      ref={ref}
      asChild={asChild}
      {...props}
      data-scope="list"
      data-part="item"
      data-slot="list-item"
      className={className}
    />
  );
});

export { List, ListItem };