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
  import { clsx } from 'clsx';
  import styles from './List.module.css';
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
  class={clsx(styles.root, className)}
  role={role ?? (markerValue === 'none' ? 'list' : undefined)}
  data-scope="list"
  data-part="root"
  data-slot="list-root"
  data-gap={gap}
  data-marker={markerValue}
  data-size={size}
  data-tone={tone}
/>