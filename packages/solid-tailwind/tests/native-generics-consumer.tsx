import { createListCollection } from '@ark-ui/solid/collection';
import type { ComboboxRootComponent, ComboboxRootProviderComponent } from '@ark-ui/solid/combobox';
import type { ListboxRootComponent, ListboxRootProviderComponent } from '@ark-ui/solid/listbox';
import type { SelectRootComponent, SelectRootProviderComponent } from '@ark-ui/solid/select';
import type { TreeViewRootComponent, TreeViewRootProviderComponent } from '@ark-ui/solid/tree-view';
import { Combobox, ComboboxRootProvider } from '@moduix/solid-tailwind/combobox';
import { CommandPaletteCombobox } from '@moduix/solid-tailwind/command-palette';
import { Listbox, ListboxRootProvider } from '@moduix/solid-tailwind/listbox';
import { Select, SelectRootProvider } from '@moduix/solid-tailwind/select';
import { TreeView, TreeViewRootProvider } from '@moduix/solid-tailwind/tree-view';

type PortalProps = {
  portalled?: boolean;
  portalRef?: HTMLElement | (() => HTMLElement | null | undefined);
};

// Check published declarations, not only the source used by runtime tests.
export const rootContracts = {
  Combobox,
  ComboboxRootProvider,
  CommandPaletteCombobox,
  Listbox,
  ListboxRootProvider,
  Select,
  SelectRootProvider,
  TreeView,
  TreeViewRootProvider,
} satisfies {
  Combobox: ComboboxRootComponent<PortalProps>;
  ComboboxRootProvider: ComboboxRootProviderComponent<PortalProps>;
  CommandPaletteCombobox: ComboboxRootComponent;
  Listbox: ListboxRootComponent;
  ListboxRootProvider: ListboxRootProviderComponent;
  Select: SelectRootComponent<PortalProps>;
  SelectRootProvider: SelectRootProviderComponent<PortalProps>;
  TreeView: TreeViewRootComponent;
  TreeViewRootProvider: TreeViewRootProviderComponent;
};

const collection = createListCollection({ items: [{ label: 'Apple', value: 'apple', id: 1 }] });

export function InferredCollectionItems() {
  return (
    <>
      <Combobox
        collection={collection}
        onValueChange={(details) => {
          const id: number = details.items[0].id;
          // @ts-expect-error Collection items must not widen to any.
          void details.items[0].missing;
          return id;
        }}
      />
      <Select
        collection={collection}
        onValueChange={(details) => {
          const id: number = details.items[0].id;
          // @ts-expect-error Collection items must not widen to any.
          void details.items[0].missing;
          return id;
        }}
      />
      <Listbox
        collection={collection}
        onValueChange={(details) => {
          const id: number = details.items[0].id;
          // @ts-expect-error Collection items must not widen to any.
          void details.items[0].missing;
          return id;
        }}
      />
      <CommandPaletteCombobox
        collection={collection}
        onValueChange={(details) => {
          const id: number = details.items[0].id;
          // @ts-expect-error Collection items must not widen to any.
          void details.items[0].missing;
          return id;
        }}
      />
    </>
  );
}