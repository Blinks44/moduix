<script lang="ts">
  import { Card, CardBody, CardDescription, CardHeader, CardTitle } from '@moduix/svelte/card';
  import styles from '@/components/examples/card/card-sizes.module.css';

  const sizes = ['sm', 'md', 'lg'] as const;
  const descriptions = {
    sm: 'Compact supporting content.',
    md: 'Default product content.',
    lg: 'Prominent standalone content.',
  };
</script>

<div class={styles.root}>
  {#each sizes as size (size)}
    <Card class={styles.card} {size}>
      <CardHeader>
        <CardTitle>Card {size}</CardTitle>
        <CardDescription>{descriptions[size]}</CardDescription>
      </CardHeader>
      <CardBody>Shared content with size-specific density.</CardBody>
    </Card>
  {/each}
</div>