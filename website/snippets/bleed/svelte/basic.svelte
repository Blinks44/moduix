<script lang="ts">
  import { Bleed } from '@moduix/svelte/bleed';
  import { Text } from '@moduix/svelte/text';
  import styles from '@/components/examples/bleed/bleed-basic.module.css';

  const content = {
    before: 'Container content stays constrained.',
    surface: 'This block bleeds to the viewport edges.',
    after: 'Following content returns to the container width.',
  };
</script>

<div class={styles.root}>
  <Text tone="muted">{content.before}</Text>
  <Bleed class={styles.surface}>
    <Text weight="semibold">{content.surface}</Text>
  </Bleed>
  <Text tone="muted">{content.after}</Text>
</div>