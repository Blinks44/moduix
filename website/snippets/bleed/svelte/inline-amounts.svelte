<script lang="ts">
  import { Bleed } from '@moduix/svelte/bleed';
  import { Text } from '@moduix/svelte/text';
  import styles from '@/components/examples/bleed/bleed-inline-amounts.module.css';

  const inlineAmounts = [
    { label: 'Small inline bleed', value: 'sm' },
    { label: 'Large inline bleed', value: 'lg' },
    { label: 'Full inline bleed', value: 'full' },
  ] as const;
</script>

<div class={styles.root}>
  {#each inlineAmounts as amount (amount.value)}
    <Bleed inline={amount.value} class={styles.panel}>
      <Text>{amount.label}</Text>
    </Bleed>
  {/each}
</div>