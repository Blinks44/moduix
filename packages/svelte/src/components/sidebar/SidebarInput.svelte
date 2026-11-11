<script module lang="ts">
  import type { InputRootProps } from '../input/Input.svelte';

  export interface SidebarInputProps extends InputRootProps {}
</script>

<script lang="ts">
  import { clsx } from 'clsx';
  import Input from '../input/Input.svelte';
  import styles from './Sidebar.module.css';

  let {
    class: className,
    ref = $bindable(null),
    value = $bindable(),
    ...props
  }: SidebarInputProps = $props();
</script>

<Input {...props} bind:ref bind:value class={clsx(styles.input, className)} />