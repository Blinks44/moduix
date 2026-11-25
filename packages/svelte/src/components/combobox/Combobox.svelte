<script module lang="ts">
  import type { CollectionItem } from '@ark-ui/svelte/collection';
  import type { ComboboxRootProps as ArkComboboxRootProps } from '@ark-ui/svelte/combobox';
  import type { OverlayPortalProps } from '@/lib/moduix/overlayPortal';

  export interface ComboboxRootProps<T extends CollectionItem = CollectionItem>
    extends ArkComboboxRootProps<T>, OverlayPortalProps {
    filter?: (inputValue: string) => void;
  }
</script>

<script lang="ts" generics="T extends CollectionItem = CollectionItem">
  import { ComboboxRoot } from '@ark-ui/svelte/combobox';
  import { clsx } from 'clsx';
  import { setOverlayPortalContext } from '@/lib/moduix/overlayPortal/context';
  import styles from './Combobox.module.css';

  let {
    class: className,
    filter,
    highlightedValue = $bindable(),
    inputValue = $bindable(),
    lazyMount = true,
    onInputValueChange,
    open = $bindable(),
    portalled = true,
    portalRef,
    ref = $bindable(null),
    unmountOnExit = true,
    value = $bindable(),
    ...props
  }: ComboboxRootProps<T> = $props();

  const handleInputValueChange: ComboboxRootProps<T>['onInputValueChange'] = (details) => {
    filter?.(details.inputValue);
    onInputValueChange?.(details);
  };

  setOverlayPortalContext({
    portalled: () => portalled,
    portalRef: () => portalRef,
  });
</script>

<ComboboxRoot
  {...props}
  bind:ref
  bind:value
  bind:inputValue
  bind:open
  bind:highlightedValue
  {lazyMount}
  onInputValueChange={filter || onInputValueChange ? handleInputValueChange : undefined}
  {unmountOnExit}
  class={clsx(styles.root, className)}
  data-slot="combobox-root"
/>