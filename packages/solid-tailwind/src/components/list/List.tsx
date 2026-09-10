import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { cva } from 'class-variance-authority';
import { Show, splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';

type ListMarker = 'disc' | 'decimal' | 'none';
type ListGap = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type ListSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type ListTone = 'default' | 'muted' | 'subtle' | 'primary' | 'destructive';

type ListBaseProps = {
  marker?: ListMarker;
  gap?: ListGap;
  size?: ListSize;
  tone?: ListTone;
};

type ListDataProps = {
  'data-scope'?: string;
  'data-part'?: string;
  'data-slot'?: string;
};

type ListRootProps =
  | (HTMLArkProps<'ul'> &
      ListBaseProps &
      ListDataProps & {
        as?: 'ul';
        'data-gap'?: string;
        'data-marker'?: string;
        'data-size'?: string;
        'data-tone'?: string;
      })
  | (HTMLArkProps<'ol'> &
      ListBaseProps &
      ListDataProps & {
        as: 'ol';
        'data-gap'?: string;
        'data-marker'?: string;
        'data-size'?: string;
        'data-tone'?: string;
      });

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

function ListRoot(props: ListRootProps) {
  return (
    <Show
      when={props.as === 'ol'}
      fallback={<UnorderedListRoot {...(props as Extract<ListRootProps, { as?: 'ul' }>)} />}
    >
      <OrderedListRoot {...(props as Extract<ListRootProps, { as: 'ol' }>)} />
    </Show>
  );
}

function OrderedListRoot(props: Extract<ListRootProps, { as: 'ol' }>) {
  const [local, others] = splitProps(props, [
    'as',
    'asChild',
    'class',
    'gap',
    'marker',
    'role',
    'size',
    'tone',
    'data-scope',
    'data-part',
    'data-slot',
    'data-gap',
    'data-marker',
    'data-size',
    'data-tone',
  ]);
  const marker = local.marker ?? 'auto';

  return (
    <ark.ol
      asChild={local.asChild}
      {...others}
      role={local.role ?? (marker === 'none' ? 'list' : undefined)}
      data-scope="list"
      data-part="root"
      data-slot="list-root"
      data-gap={local.gap ?? 'sm'}
      data-marker={marker}
      data-size={local.size ?? 'md'}
      data-tone={local.tone ?? 'default'}
      class={cn(
        listVariants({
          as: 'ol',
          gap: local.gap ?? 'sm',
          marker,
          size: local.size ?? 'md',
          tone: local.tone ?? 'default',
        }),
        local.class,
      )}
    />
  );
}

function UnorderedListRoot(props: Extract<ListRootProps, { as?: 'ul' }>) {
  const [local, others] = splitProps(props, [
    'as',
    'asChild',
    'class',
    'gap',
    'marker',
    'role',
    'size',
    'tone',
    'data-scope',
    'data-part',
    'data-slot',
    'data-gap',
    'data-marker',
    'data-size',
    'data-tone',
  ]);
  const marker = local.marker ?? 'auto';

  return (
    <ark.ul
      asChild={local.asChild}
      {...others}
      role={local.role ?? (marker === 'none' ? 'list' : undefined)}
      data-scope="list"
      data-part="root"
      data-slot="list-root"
      data-gap={local.gap ?? 'sm'}
      data-marker={marker}
      data-size={local.size ?? 'md'}
      data-tone={local.tone ?? 'default'}
      class={cn(
        listVariants({
          as: 'ul',
          gap: local.gap ?? 'sm',
          marker,
          size: local.size ?? 'md',
          tone: local.tone ?? 'default',
        }),
        local.class,
      )}
    />
  );
}

function ListItem(props: HTMLArkProps<'li'> & ListDataProps) {
  const [local, others] = splitProps(props, [
    'asChild',
    'class',
    'data-scope',
    'data-part',
    'data-slot',
  ]);

  return (
    <ark.li
      asChild={local.asChild}
      {...others}
      data-scope="list"
      data-part="item"
      data-slot="list-item"
      class={local.class}
    />
  );
}

const List = Object.assign(ListRoot, {
  Root: ListRoot,
  Item: ListItem,
});

export { List };