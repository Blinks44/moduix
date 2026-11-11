<script lang="ts">
  import { StepsItem, type StepsItemProps } from '@ark-ui/svelte/steps';
  import { clsx } from 'clsx';
  import styles from './Steps.module.css';

  let { class: className, ref = $bindable(null), ...props }: StepsItemProps = $props();
</script>

<StepsItem {...props} bind:ref class={clsx(styles.item, className)} data-slot="steps-item" />