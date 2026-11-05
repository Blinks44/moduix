<script lang="ts">
  import { SimpleGrid } from '@/components/simple-grid';

  let { onclick }: { onclick: () => void } = $props();

  let ref: Element | null = $state(null);

  export const getRef = () => ref;
</script>

<SimpleGrid bind:ref columns={2} class="consumer-grid" id="projects" {onclick}>
  {#snippet asChild(props)}
    <ul {...props({ class: 'project-list' })} aria-label="Projects">
      <li>Analytics</li>
      <li>Billing</li>
    </ul>
  {/snippet}
</SimpleGrid>