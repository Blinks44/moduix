<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export interface AvatarGroupProps
    extends HTMLProps<'div'>, PolymorphicProps<'div'>, RefAttribute {}
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { clsx } from 'clsx';
  import styles from './Avatar.module.css';

  let { class: className, ref = $bindable(null), ...props }: AvatarGroupProps = $props();
</script>

<Ark as="div" {...props} bind:ref class={clsx(styles.group, className)} data-slot="avatar-group" />