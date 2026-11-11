<script lang="ts">
  import { Highlight } from '@/components/highlight';
  import { Input } from '@/components/input';
  import { Text } from '@/components/text';
  import styles from './Highlight.stories.module.css';

  let query = $state('component');
</script>

<div class={styles.stack}>
  <Input
    bind:value={query}
    aria-label="Search text"
    class={styles.field}
    placeholder="Search text..."
  />
  <Text>
    <Highlight
      {query}
      text="With Ark UI, you can build accessible, custom components. Each component is fully typed and works seamlessly with React, Solid, Svelte, and Vue."
    />
  </Text>
</div>