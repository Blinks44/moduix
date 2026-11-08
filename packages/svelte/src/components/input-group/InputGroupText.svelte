<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';
  import type { InputGroupAddonAlign } from './context';

  export interface InputGroupTextProps
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
  }: InputGroupTextProps = $props();
</script>

<Ark
  as="span"
  {...props}
  bind:ref
  class={clsx(styles.text, className)}
  data-scope="input-group"
  data-part="text"
  data-slot="input-group-text"
  data-align={align}
/>