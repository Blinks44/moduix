<script lang="ts">
  import { Toggle, ToggleIndicator } from '@/components/toggle';
</script>

<Toggle defaultPressed>
  <ToggleIndicator>
    {#snippet asChild(props)}
      <span {...props()} data-testid="indicator-host">On</span>
    {/snippet}
  </ToggleIndicator>
</Toggle>