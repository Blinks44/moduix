<script module lang="ts">
  import type { CollectionItem } from '@ark-ui/svelte/collection';
  import type { ComboboxRootProps } from '@ark-ui/svelte/combobox';

  export interface CommandPaletteComboboxProps<
    T extends CollectionItem = CollectionItem,
  > extends ComboboxRootProps<T> {}
</script>

<script lang="ts" generics="T extends CollectionItem = CollectionItem">
  import { ComboboxRoot } from '@ark-ui/svelte/combobox';
  import { useDialogContext } from '@ark-ui/svelte/dialog';
  import { cn } from '@/lib/moduix/cn';

  let {
    class: className,
    closeOnSelect = true,
    disableLayer = true,
    highlightedValue = $bindable(),
    inputBehavior = 'autohighlight',
    inputValue = $bindable(),
    onSelect,
    open = true,
    ref = $bindable(null),
    selectionBehavior = 'preserve',
    value = $bindable(),
    ...props
  }: CommandPaletteComboboxProps<T> = $props();

  const dialog = useDialogContext();

  const handleSelect: CommandPaletteComboboxProps<T>['onSelect'] = (details) => {
    onSelect?.(details);
    if (closeOnSelect) {
      dialog().setOpen(false);
    }
  };
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
  onSelect={handleSelect}
  data-slot="command-palette-combobox"
/>