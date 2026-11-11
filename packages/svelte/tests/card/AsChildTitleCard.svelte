<script lang="ts">
  import { Card, CardHeader, CardTitle } from '@/components/card';

  let { calls }: { calls: string[] } = $props();

  let titleRef: Element | null = $state(null);

  export const getRefs = () => ({ titleRef });
</script>

<Card>
  <CardHeader>
    <CardTitle bind:ref={titleRef} data-probe="title" onclick={() => calls.push('part')}>
      {#snippet asChild(props)}
        <h2 {...props({ onclick: () => calls.push('heading') })}>System load</h2>
      {/snippet}
    </CardTitle>
  </CardHeader>
</Card>