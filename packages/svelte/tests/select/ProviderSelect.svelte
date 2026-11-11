<script lang="ts">
  import {
    SelectContent,
    SelectContext,
    SelectField,
    SelectItem,
    SelectItemContext,
    SelectItemText,
    SelectLabel,
    SelectList,
    SelectPositioner,
    SelectRootProvider,
    useSelect,
  } from '@/components/select';
  import ChooseAppleButton from './ChooseAppleButton.svelte';
  import { fruits } from './fruits';

  const select = useSelect({ collection: fruits, defaultValue: ['mango'], open: true });
</script>

<SelectRootProvider value={select} portalled={false}>
  <ChooseAppleButton />
  <SelectContext>
    {#snippet render(context)}<output>{context().value.join(', ')}</output>{/snippet}
  </SelectContext>
  <SelectLabel>Provider fruit</SelectLabel>
  <SelectField placeholder="Select fruit" />
  <SelectPositioner>
    <SelectContent>
      <SelectList>
        {#each fruits.items as item (item.value)}
          <SelectItem {item}>
            <SelectItemText>{item.label}</SelectItemText>
            <SelectItemContext>
              {#snippet render(context)}
                <span>{context().selected ? 'Selected' : 'Not selected'}</span>
              {/snippet}
            </SelectItemContext>
          </SelectItem>
        {/each}
      </SelectList>
    </SelectContent>
  </SelectPositioner>
</SelectRootProvider>