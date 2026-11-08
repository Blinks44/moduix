<script lang="ts">
  import { Card, CardBody, CardDescription, CardHeader, CardTitle } from '@moduix/svelte/card';
  import styles from '@/components/examples/card/card-variants.module.css';

  const variants = ['elevated', 'outline', 'subtle'] as const;
  const descriptions = {
    elevated: 'Raised above nearby content.',
    outline: 'Separated with a visible border.',
    subtle: 'Grouped with a muted background.',
  };
</script>

<div class={styles.root}>
  {#each variants as variant (variant)}
    <Card class={styles.card} {variant}>
      <CardHeader>
        <CardTitle>{variant}</CardTitle>
        <CardDescription>{descriptions[variant]}</CardDescription>
      </CardHeader>
      <CardBody>Use variants to communicate surface hierarchy.</CardBody>
    </Card>
  {/each}
</div>