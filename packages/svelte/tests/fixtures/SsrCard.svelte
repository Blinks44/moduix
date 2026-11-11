<script lang="ts">
  import { Card, CardBody, CardHeader, CardTitle } from '@/components/card';
</script>

<Card size="lg" variant="subtle">
  {#snippet asChild(props)}
    <a {...props()} href="/reports/release-health" aria-label="Open release report">
      <CardHeader><CardTitle>Release health</CardTitle></CardHeader>
      <CardBody>98.4% successful sessions</CardBody>
    </a>
  {/snippet}
</Card>