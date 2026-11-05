<script lang="ts">
  import { Select, SelectContent, SelectOption, SelectPositioner } from '@/components/select';
  import { fruits } from './fruits';

  let { customIndicator = false }: { customIndicator?: boolean } = $props();
</script>

{#snippet indicator()}<span data-testid="custom-indicator"></span>{/snippet}

{#if customIndicator}
  <Select collection={fruits} defaultOpen defaultValue={['mango']} portalled={false}>
    <SelectPositioner>
      <SelectContent>
        <SelectOption item={fruits.items[1]} {indicator}>Mango</SelectOption>
      </SelectContent>
    </SelectPositioner>
  </Select>
{:else}
  <Select collection={fruits} defaultOpen defaultValue={['apple']} portalled={false}>
    <SelectPositioner>
      <SelectContent>
        <SelectOption item={fruits.items[0]}>Apple</SelectOption>
        <SelectOption item={fruits.items[1]} indicator={false}>Mango</SelectOption>
      </SelectContent>
    </SelectPositioner>
  </Select>
{/if}