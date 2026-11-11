<script lang="ts">
  import { Stack } from '@/components/stack';

  let ref: Element | null = $state(null);

  export const getRef = () => ref;
</script>

<Stack bind:ref gap={12} class="stack-class">
  {#snippet asChild(props)}
    <section
      {...props({ class: 'section-class', style: 'color: red' })}
      aria-label="Project updates"
    ></section>
  {/snippet}
</Stack>