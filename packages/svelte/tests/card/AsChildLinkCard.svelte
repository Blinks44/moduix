<script lang="ts">
  import { Card, CardBody, CardHeader, CardTitle } from '@/components/card';

  let rootRef: Element | null = $state(null);

  export const getRefs = () => ({ rootRef });
</script>

<Card bind:ref={rootRef} size="lg" variant="subtle" class="consumer-card">
  {#snippet asChild(props)}
    <a {...props()} href="/reports/release-health" aria-label="Open release report">
      <CardHeader><CardTitle>Release health</CardTitle></CardHeader>
      <CardBody>98.4% successful sessions</CardBody>
    </a>
  {/snippet}
</Card>