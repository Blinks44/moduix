<script lang="ts">
  import { Toggle, ToggleIndicator } from '@/components/toggle';
</script>

<Toggle defaultPressed>
  Favorite
  <ToggleIndicator>
    <span>On</span>
    {#snippet fallback()}<span>Off</span>{/snippet}
  </ToggleIndicator>
</Toggle>