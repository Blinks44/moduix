<script lang="ts">
  import { StepsList, type StepsListProps } from '@ark-ui/svelte/steps';
  import { clsx } from 'clsx';
  import styles from './Steps.module.css';

  let { class: className, ref = $bindable(null), ...props }: StepsListProps = $props();
</script>

<StepsList {...props} bind:ref class={clsx(styles.list, className)} data-slot="steps-list" />