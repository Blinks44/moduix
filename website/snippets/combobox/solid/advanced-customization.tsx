import { useListCollection } from '@ark-ui/solid/collection';
import { useFilter } from '@ark-ui/solid/locale';
import { Combobox } from '@moduix/solid/combobox';
import { For } from 'solid-js';
import styles from '@/components/examples/combobox/component-advanced-customization.module.css';

const developerResources = [
  { label: 'GitHub', href: 'https://github.com', value: 'github' },
  { label: 'Stack Overflow', href: 'https://stackoverflow.com', value: 'stack-overflow' },
  { label: 'MDN Web Docs', href: 'https://developer.mozilla.org', value: 'mdn' },
  { label: 'npm', href: 'https://www.npmjs.com', value: 'npm' },
  { label: 'TypeScript', href: 'https://www.typescriptlang.org', value: 'typescript' },
];

export default function AdvancedCustomizationComboboxDemo() {
  const { contains } = useFilter({ sensitivity: 'base' })();
  const { collection, filter } = useListCollection({
    initialItems: developerResources,
    filter: contains,
  });

  return (
    <Combobox
      collection={collection()}
      selectionBehavior="preserve"
      onInputValueChange={(details) => filter(details.inputValue)}
    >
      <Combobox.Label>Developer resources</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input placeholder="e.g. GitHub" />
        <Combobox.Trigger aria-label="Open options" />
      </Combobox.Control>
      <Combobox.Positioner>
        <Combobox.Content class={styles.content}>
          <Combobox.List>
            <For each={collection().items}>
              {(item) => (
                <Combobox.Item
                  item={item}
                  asChild={(props) => (
                    <a {...props()} href={item.href} target="_blank" rel="noreferrer">
                      <Combobox.ItemText>{item.label}</Combobox.ItemText>
                      <Combobox.ItemIndicator />
                    </a>
                  )}
                />
              )}
            </For>
          </Combobox.List>
        </Combobox.Content>
      </Combobox.Positioner>
    </Combobox>
  );
}