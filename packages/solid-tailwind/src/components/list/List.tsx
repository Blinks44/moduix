import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { cva } from 'class-variance-authority';
import { splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
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

function List(props: ListRootProps) {
  const [local, others] = splitProps(props, [
    'as',
    'class',
    'gap',
    'marker',
    'role',
    'size',
    'tone',
  ]);
  const as = () => local.as ?? 'ul';
  const marker = () => local.marker ?? (as() === 'ol' ? 'decimal' : 'disc');
  const gap = () => local.gap ?? 'sm';
  const size = () => local.size ?? 'md';
  const tone = () => local.tone ?? 'default';

  return (
    <Dynamic
      component={ark[as()]}
      {...others}
      role={local.role ?? (marker() === 'none' ? 'list' : undefined)}
      data-scope="list"
      data-part="root"
      data-slot="list-root"
      data-gap={gap()}
      data-marker={marker()}
      data-size={size()}
      data-tone={tone()}
      class={cn(
        listVariants({ marker: marker(), gap: gap(), size: size(), tone: tone() }),
        local.class,
      )}
    />
  );
}

function ListItem(props: HTMLArkProps<'li'>) {
  return <ark.li {...props} data-scope="list" data-part="item" data-slot="list-item" />;
}

function ListIndicator(props: HTMLArkProps<'span'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.span
      {...others}
      data-scope="list"
      data-part="indicator"
      data-slot="list-indicator"
      class={cn(listIndicatorClass, local.class)}
    />
  );
}

export { List, ListIndicator, ListItem };
export type { ListElement, ListGap, ListMarker, ListRootProps, ListSize, ListTone };