<script lang="ts">
  import { Text } from '@/components/text';

  let ref: Element | null = $state(null);

  export const getRef = () => ref;
</script>

<Text bind:ref tone="primary" weight="medium" class="consumer-text">
  {#snippet asChild(props)}
    <a {...props()} href="#text">Read Text guidance</a>
  {/snippet}
</Text>