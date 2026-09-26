import { useListCollection } from '@ark-ui/solid/collection';
import { useFilter } from '@ark-ui/solid/locale';
import {
  Combobox,
  ComboboxContent,
  ComboboxControl,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxItemText,
  ComboboxLabel,
  ComboboxList,
  ComboboxPositioner,
  ComboboxTrigger,
} from '@moduix/solid/combobox';
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
      <ComboboxLabel>Developer resources</ComboboxLabel>
      <ComboboxControl>
        <ComboboxInput placeholder="e.g. GitHub" />
        <ComboboxTrigger aria-label="Open options" />
      </ComboboxControl>
      <ComboboxPositioner>
        <ComboboxContent class={styles.content}>
          <ComboboxList>
            <For each={collection().items}>
              {(item) => (
                <ComboboxItem
                  item={item}
                  asChild={(props) => (
                    <a {...props()} href={item.href} target="_blank" rel="noreferrer">
                      <ComboboxItemText>{item.label}</ComboboxItemText>
                      <ComboboxItemIndicator />
                    </a>
                  )}
                />
              )}
            </For>
          </ComboboxList>
        </ComboboxContent>
      </ComboboxPositioner>
    </Combobox>
  );
}