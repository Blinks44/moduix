<script lang="ts">
  import { Badge, BadgeLabel } from '@/components/badge';

  let rootRef: Element | null = $state(null);
  let labelRef: Element | null = $state(null);

  export const getRefs = () => ({ rootRef, labelRef });
</script>

<Badge bind:ref={rootRef} variant="link">
  {#snippet asChild(props)}
    <a {...props()} href="#styling" aria-label="Badge styling guidance">
      <BadgeLabel bind:ref={labelRef} data-part="custom">
        {#snippet asChild(labelProps)}
          <strong {...labelProps()}>Open guide</strong>
        {/snippet}
      </BadgeLabel>
    </a>
  {/snippet}
</Badge>