<script lang="ts">
  import { Bleed } from '@moduix/svelte/bleed';
  import { Text } from '@moduix/svelte/text';
  import styles from '@/components/examples/bleed/bleed-block-bleed.module.css';

  const content = {
    before: 'Container padding above.',
    surface: 'Inline and block bleed',
    after: 'Container padding below.',
  };
</script>

<div class={styles.root}>
  <Text tone="muted">{content.before}</Text>
  <Bleed inline="md" block="md" class={styles.panel}>
    <Text>{content.surface}</Text>
  </Bleed>
  <Text tone="muted">{content.after}</Text>
</div>