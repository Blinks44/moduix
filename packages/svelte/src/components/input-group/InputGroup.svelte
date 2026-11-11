<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';
  import type { InputGroupSize } from './context';

  export interface InputGroupRootProps
    extends HTMLProps<'div'>, PolymorphicProps<'div'>, RefAttribute {
    size?: InputGroupSize;
  }
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { clsx } from 'clsx';
  import { setInputGroupSize } from './context';
  import styles from './InputGroup.module.css';

  let {
    class: className,
    ref = $bindable(null),
    size = 'md',
    ...props
  }: InputGroupRootProps = $props();

  setInputGroupSize(() => size);
</script>

<Ark
  as="div"
  {...props}
  bind:ref
  class={clsx(styles.root, className)}
  data-size={size}
  data-scope="input-group"
  data-part="root"
  data-slot="input-group-root"
/>