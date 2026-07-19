//#region demo
import { useListCollection } from '@ark-ui/react/collection';
import { useFilter } from '@ark-ui/react/locale';
import { Combobox } from '@moduix/react';

const developerResources = [
  { label: 'GitHub', href: 'https://github.com', value: 'github' },
  {
    label: 'Stack Overflow',
    href: 'https://stackoverflow.com',
    value: 'stack-overflow',
  },
  {
    label: 'MDN Web Docs',
    href: 'https://developer.mozilla.org',
    value: 'mdn',
  },
  { label: 'npm', href: 'https://www.npmjs.com', value: 'npm' },
  {
    label: 'TypeScript',
    href: 'https://www.typescriptlang.org',
    value: 'typescript',
  },
];

export function AdvancedCustomizationComboboxDemo() {
  const { contains } = useFilter({ sensitivity: 'base' });
  const { collection, filter } = useListCollection({
    initialItems: developerResources,
    filter: contains,
  });

  return (
    <Combobox
      collection={collection}
      selectionBehavior="preserve"
      onInputValueChange={(details) => filter(details.inputValue)}
    >
      <Combobox.Label>Developer resources</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input placeholder="e.g. GitHub" />
        <Combobox.Trigger aria-label="Open options" />
      </Combobox.Control>
      <Combobox.Positioner>
        <Combobox.Content>
          <Combobox.List>
            {collection.items.map((item) => (
              <Combobox.Item key={item.value} item={item} asChild>
                <a href={item.href} target="_blank" rel="noreferrer">
                  <Combobox.ItemText>{item.label}</Combobox.ItemText>
                  <Combobox.ItemIndicator />
                </a>
              </Combobox.Item>
            ))}
          </Combobox.List>
        </Combobox.Content>
      </Combobox.Positioner>
    </Combobox>
  );
}
//#endregion