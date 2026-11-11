<script lang="ts">
  import { ToggleGroup, ToggleGroupItem } from '@/components/toggle-group';
</script>

<ToggleGroup
  class="gap-4 rounded-none border-primary bg-card p-4"
  variant="outline"
  size="lg"
  aria-label="Alignment"
>
  <ToggleGroupItem value="left" class="border-primary bg-card p-0 text-xs">Left</ToggleGroupItem>
</ToggleGroup>