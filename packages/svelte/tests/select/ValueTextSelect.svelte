<script lang="ts">
  import { Select, SelectControl, SelectTrigger, SelectValueText } from '@/components/select';
  import { fruits } from './fruits';

  let { custom = false, value = [] }: { custom?: boolean; value?: string[] } = $props();
  let valueRef: Element | null = $state(null);

  export const getValueRef = () => valueRef;
</script>

{#snippet customValue()}<span>Custom value</span>{/snippet}

<Select collection={fruits} {value} portalled={false}>
  <SelectControl>
    <SelectTrigger>
      <SelectValueText
        bind:ref={valueRef}
        placeholder="Choose fruit"
        class="consumer-value"
        style="color: red"
        data-testid="value-text"
        children={custom ? customValue : undefined}
      />
    </SelectTrigger>
  </SelectControl>
</Select>