<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';
  import type { InputGroupAddonAlign } from './context';

  export interface InputGroupAddonProps
    extends HTMLProps<'span'>, PolymorphicProps<'span'>, RefAttribute {
    align?: InputGroupAddonAlign;
  }
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { clsx } from 'clsx';
  import styles from './InputGroup.module.css';

  let {
    align = 'inline',
    class: className,
    ref = $bindable(null),
    ...props
  }: InputGroupAddonProps = $props();
</script>

<Ark
  as="span"
  {...props}
  bind:ref
  class={clsx(styles.addon, className)}
  data-scope="input-group"
  data-part="addon"
  data-slot="input-group-addon"
  data-align={align}
/>