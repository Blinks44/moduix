<script lang="ts">
  import { ToggleGroup, ToggleGroupItem } from '@/components/toggle-group';

  let variant = $state<'default' | 'outline' | 'ghost'>('outline');
  let size = $state<'sm' | 'lg'>('sm');
  let consumerClass = $state('consumer-root');

  export const update = () => {
    variant = 'ghost';
    size = 'lg';
    consumerClass = 'updated-root';
  };
</script>

<ToggleGroup
  defaultValue={['left']}
  {variant}
  {size}
  class={consumerClass}
  aria-label="Alignment"
  data-slot="consumer-root"
  data-variant="consumer-variant"
  data-size="consumer-size"
>
  <ToggleGroupItem
    value="left"
    variant="ghost"
    size="icon-md"
    class="consumer-item"
    data-slot="consumer-item"
    data-variant="consumer-variant"
    data-size="consumer-size"
  >
    Left
  </ToggleGroupItem>
  <ToggleGroupItem value="center">Center</ToggleGroupItem>
</ToggleGroup>