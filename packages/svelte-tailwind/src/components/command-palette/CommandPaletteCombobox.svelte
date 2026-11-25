<script module lang="ts">
  import type { CollectionItem } from '@ark-ui/svelte/collection';
  import type { ComboboxRootProps } from '@ark-ui/svelte/combobox';

  export interface CommandPaletteComboboxProps<
    T extends CollectionItem = CollectionItem,
  > extends ComboboxRootProps<T> {
    filter?: (inputValue: string) => void;
  }
</script>

<script lang="ts" generics="T extends CollectionItem = CollectionItem">
  import { ComboboxRoot } from '@ark-ui/svelte/combobox';
  import { useDialogContext } from '@ark-ui/svelte/dialog';
  import { onDestroy } from 'svelte';
  import { cn } from '@/lib/moduix/cn';

  let {
    class: className,
    closeOnSelect = true,
    disableLayer = true,
    filter,
    highlightedValue = $bindable(),
    inputBehavior = 'autohighlight',
    inputValue = $bindable(),
    onInputValueChange,
    onSelect,
    open = true,
    ref = $bindable(null),
    selectionBehavior = 'preserve',
    value = $bindable(),
    ...props
  }: CommandPaletteComboboxProps<T> = $props();

  const dialog = useDialogContext();

  const handleInputValueChange: CommandPaletteComboboxProps<T>['onInputValueChange'] = (
    details,
  ) => {
    filter?.(details.inputValue);
    onInputValueChange?.(details);
  };

  const handleSelect: CommandPaletteComboboxProps<T>['onSelect'] = (details) => {
    onSelect?.(details);
    if (closeOnSelect) {
      dialog().setOpen(false);
    }
  };

  let wasOpen = dialog().open;
  $effect(() => {
    const isOpen = dialog().open;
    if (wasOpen && !isOpen) {
      filter?.('');
    }
    wasOpen = isOpen;
  });
  onDestroy(() => {
    if (wasOpen) {
      filter?.('');
    }
  });
</script>

<!-- The palette list stays open: the open state is controlled and ignores Ark's own close requests. -->
<ComboboxRoot
  {...props}
  bind:ref
  bind:value
  bind:inputValue
  bind:highlightedValue
  bind:open={() => open, () => {}}
  class={cn('flex min-h-0 flex-1 flex-col overflow-hidden', className)}
  {closeOnSelect}
  {disableLayer}
  {inputBehavior}
  {selectionBehavior}
  onInputValueChange={handleInputValueChange}
  onSelect={handleSelect}
  data-slot="command-palette-combobox"
/>