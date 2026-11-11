<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export type ListElement = 'ul' | 'ol';
  export type ListMarker = 'disc' | 'decimal' | 'none';
  export type ListGap = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  export type ListSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  export type ListTone = 'default' | 'muted' | 'primary' | 'destructive';

  export interface ListRootProps extends HTMLProps<'ol'>, PolymorphicProps<'ol'>, RefAttribute {
    as?: ListElement;
    gap?: ListGap;
    marker?: ListMarker;
    size?: ListSize;
    tone?: ListTone;
  }
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { cva } from 'class-variance-authority';
  import { cn } from '@/lib/moduix/cn';

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
          primary: 'text-primary',
          destructive: 'text-destructive',
        },
      },
    },
  );

  let {
    as = 'ul',
    class: className,
    gap = 'sm',
    marker,
    ref = $bindable(null),
    role,
    size = 'md',
    tone = 'default',
    ...props
  }: ListRootProps = $props();

  const markerValue = $derived(marker ?? (as === 'ol' ? 'decimal' : 'disc'));
</script>

<Ark
  as={as as 'ol'}
  {...props}
  bind:ref
  class={cn(listVariants({ marker: markerValue, gap, size, tone }), className)}
  role={role ?? (markerValue === 'none' ? 'list' : undefined)}
  data-scope="list"
  data-part="root"
  data-slot="list-root"
  data-gap={gap}
  data-marker={markerValue}
  data-size={size}
  data-tone={tone}
/>