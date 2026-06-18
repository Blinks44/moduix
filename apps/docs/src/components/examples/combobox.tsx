import type { UseComboboxContext } from 'moduix';
import { useVirtualizer } from '@tanstack/react-virtual';
import {
  Combobox,
  Portal,
  createListCollection,
  useCombobox,
  useComboboxContext,
  useFilter,
  useListCollection,
} from 'moduix';
import { useEffect, useMemo, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesReferenceTable } from '../preview';
import styles from './combobox.module.css';

const fruits = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Grape', value: 'grape' },
  { label: 'Kiwi', value: 'kiwi' },
  { label: 'Mango', value: 'mango' },
  { label: 'Orange', value: 'orange' },
  { label: 'Pineapple', value: 'pineapple' },
  { label: 'Strawberry', value: 'strawberry' },
];

const countries = [
  { country: 'Canada', code: 'CA', continent: 'North America' },
  { country: 'United States', code: 'US', continent: 'North America' },
  { country: 'Germany', code: 'DE', continent: 'Europe' },
  { country: 'France', code: 'FR', continent: 'Europe' },
  { country: 'Japan', code: 'JP', continent: 'Asia' },
  { country: 'South Korea', code: 'KR', continent: 'Asia' },
];

const departments = [
  { label: 'Engineering', value: 'engineering' },
  { label: 'Marketing', value: 'marketing' },
  { label: 'Sales', value: 'sales' },
  { label: 'Finance', value: 'finance' },
  { label: 'Human Resources', value: 'human-resources' },
  { label: 'Operations', value: 'operations' },
  { label: 'Product', value: 'product' },
  { label: 'Customer Success', value: 'customer-success' },
];

const seaCreatures = [
  { label: 'Whale', value: 'whale' },
  { label: 'Dolphin', value: 'dolphin' },
  { label: 'Shark', value: 'shark' },
  { label: 'Octopus', value: 'octopus' },
  { label: 'Jellyfish', value: 'jellyfish' },
  { label: 'Seahorse', value: 'seahorse' },
];

const sizes = [
  { label: 'Small', value: 'sm' },
  { label: 'Medium', value: 'md' },
  { label: 'Large', value: 'lg' },
  { label: 'Extra Large', value: 'xl' },
];

type Character = {
  name: string;
  height: string;
  mass: string;
};

const characters: Character[] = [
  { name: 'C-3PO', height: '167', mass: '75' },
  { name: 'R2-D2', height: '96', mass: '32' },
  { name: 'Luke Skywalker', height: '172', mass: '77' },
];

const developerResources = [
  { label: 'GitHub', href: 'https://github.com', value: 'github' },
  { label: 'Stack Overflow', href: 'https://stackoverflow.com', value: 'stack-overflow' },
  { label: 'MDN Web Docs', href: 'https://developer.mozilla.org', value: 'mdn' },
  { label: 'npm', href: 'https://www.npmjs.com', value: 'npm' },
  { label: 'TypeScript', href: 'https://www.typescriptlang.org', value: 'typescript' },
  { label: 'React', href: 'https://react.dev', value: 'react' },
];

const cities = [
  'New York',
  'Los Angeles',
  'Chicago',
  'Houston',
  'Phoenix',
  'Philadelphia',
  'San Antonio',
  'San Diego',
  'Dallas',
  'San Jose',
  'Austin',
  'Jacksonville',
].map((label) => ({ label, value: label.toLowerCase().replaceAll(' ', '-') }));

const virtualItems = Array.from({ length: 1000 }, (_, index) => ({
  label: `Result ${String(index + 1).padStart(4, '0')}`,
  value: `result-${index + 1}`,
}));

function Popup({ items }: { items: Array<{ label: string; value: string }> }) {
  return (
    <Portal>
      <Combobox.Positioner>
        <Combobox.Content>
          <Combobox.Empty>No options found.</Combobox.Empty>
          <Combobox.List>
            {items.map((item) => (
              <Combobox.Item key={item.value} item={item}>
                <Combobox.ItemText>{item.label}</Combobox.ItemText>
                <Combobox.ItemIndicator />
              </Combobox.Item>
            ))}
          </Combobox.List>
        </Combobox.Content>
      </Combobox.Positioner>
    </Portal>
  );
}

export function ComboboxExample() {
  const { contains } = useFilter({ sensitivity: 'base' });
  const { collection, filter } = useListCollection({ initialItems: fruits, filter: contains });

  return (
    <Combobox.Root
      collection={collection}
      onInputValueChange={(details) => filter(details.inputValue)}
    >
      <Combobox.Label>Choose fruit</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input placeholder="e.g. Mango" />
        <Combobox.ClearTrigger aria-label="Clear selection" />
        <Combobox.Trigger aria-label="Open options" />
      </Combobox.Control>
      <Popup items={collection.items} />
    </Combobox.Root>
  );
}

export function ControlledComboboxExample() {
  const { contains } = useFilter({ sensitivity: 'base' });
  const { collection, filter } = useListCollection({ initialItems: fruits, filter: contains });
  const [value, setValue] = useState<string[]>(['mango']);

  return (
    <div className={styles.stack}>
      <Combobox.Root
        collection={collection}
        value={value}
        onInputValueChange={(details) => filter(details.inputValue)}
        onValueChange={(details) => setValue(details.value)}
      >
        <Combobox.Label>Choose fruit</Combobox.Label>
        <Combobox.Control>
          <Combobox.Input />
          <Combobox.ClearTrigger aria-label="Clear selection" />
          <Combobox.Trigger aria-label="Open options" />
        </Combobox.Control>
        <Popup items={collection.items} />
      </Combobox.Root>
      <span className={styles.note}>Selected: {value[0] ?? 'none'}</span>
    </div>
  );
}

export function GroupedComboboxExample() {
  const { contains } = useFilter({ sensitivity: 'base' });
  const { collection, filter } = useListCollection({
    initialItems: countries,
    itemToString: (item) => item.country,
    itemToValue: (item) => item.code,
    filter: contains,
    groupBy: (item) => item.continent,
  });

  return (
    <Combobox.Root
      collection={collection}
      onInputValueChange={(details) => filter(details.inputValue)}
    >
      <Combobox.Label>Country</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input placeholder="e.g. Canada" />
        <Combobox.ClearTrigger aria-label="Clear selection" />
        <Combobox.Trigger aria-label="Open options" />
      </Combobox.Control>
      <Portal>
        <Combobox.Positioner>
          <Combobox.Content>
            <Combobox.Empty>No countries found.</Combobox.Empty>
            {collection.group().map(([continent, items]) => (
              <Combobox.ItemGroup key={continent}>
                <Combobox.ItemGroupLabel>{continent}</Combobox.ItemGroupLabel>
                {items.map((item) => (
                  <Combobox.Item key={item.code} item={item}>
                    <Combobox.ItemText>{item.country}</Combobox.ItemText>
                    <Combobox.ItemIndicator />
                  </Combobox.Item>
                ))}
              </Combobox.ItemGroup>
            ))}
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  );
}

export function MultipleComboboxExample() {
  const { contains } = useFilter({ sensitivity: 'base' });
  const { collection, filter } = useListCollection({ initialItems: fruits, filter: contains });

  return (
    <Combobox.Root
      collection={collection}
      onInputValueChange={(details) => filter(details.inputValue)}
      multiple
    >
      <Combobox.Label>Fruits</Combobox.Label>
      <Combobox.Context>
        {(context: UseComboboxContext<(typeof fruits)[number]>) => (
          <div className={styles.tags}>
            {context.selectedItems.length === 0 ? (
              <span className={styles.note}>None selected</span>
            ) : null}
            {context.selectedItems.map((item) => (
              <span key={item.value} className={styles.tag}>
                {item.label}
              </span>
            ))}
          </div>
        )}
      </Combobox.Context>
      <Combobox.Control>
        <Combobox.Input placeholder="Search fruits" />
        <Combobox.Trigger aria-label="Open options" />
      </Combobox.Control>
      <Popup items={collection.items} />
    </Combobox.Root>
  );
}

export function AsyncSearchComboboxExample() {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState<typeof fruits>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setItems([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const timeout = window.setTimeout(() => {
      setItems(fruits.filter((item) => item.label.toLowerCase().includes(query.toLowerCase())));
      setLoading(false);
    }, 300);

    return () => window.clearTimeout(timeout);
  }, [query]);

  const collection = useMemo(() => createListCollection({ items }), [items]);

  return (
    <Combobox.Root
      collection={collection}
      inputValue={query}
      onInputValueChange={(details) => {
        if (details.reason === 'input-change' || details.inputValue === '') {
          setQuery(details.inputValue);
        }
      }}
    >
      <Combobox.Label>Search fruit</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input placeholder="Start typing" />
        <Combobox.ClearTrigger aria-label="Clear search" />
        <Combobox.Trigger aria-label="Open options" />
      </Combobox.Control>
      <Portal>
        <Combobox.Positioner>
          <Combobox.Content>
            {loading ? <div className={styles.status}>Searching…</div> : null}
            {!loading && query && collection.items.length === 0 ? (
              <div className={styles.status}>No results found.</div>
            ) : null}
            <Combobox.List>
              {collection.items.map((item) => (
                <Combobox.Item key={item.value} item={item}>
                  <Combobox.ItemText>{item.label}</Combobox.ItemText>
                  <Combobox.ItemIndicator />
                </Combobox.Item>
              ))}
            </Combobox.List>
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  );
}

const jobTitles = createListCollection({
  items: [
    { label: 'Designer', value: 'designer' },
    { label: 'Developer', value: 'developer' },
    { label: 'Product Manager', value: 'product-manager' },
  ],
});

export function RootProviderComboboxExample() {
  const combobox = useCombobox({ collection: jobTitles });

  return (
    <div className={styles.providerLayout}>
      <button type="button" className={styles.button} onClick={() => combobox.focus()}>
        Focus
      </button>
      <Combobox.RootProvider value={combobox}>
        <Combobox.Label>Job title</Combobox.Label>
        <Combobox.Control>
          <Combobox.Input />
          <Combobox.ClearTrigger aria-label="Clear selection" />
          <Combobox.Trigger aria-label="Open options" />
        </Combobox.Control>
        <Popup items={jobTitles.items} />
      </Combobox.RootProvider>
    </div>
  );
}

export function AutoHighlightComboboxExample() {
  const { contains } = useFilter({ sensitivity: 'base' });
  const { collection, filter } = useListCollection({
    initialItems: departments,
    filter: contains,
  });

  return (
    <Combobox.Root
      collection={collection}
      inputBehavior="autohighlight"
      onInputValueChange={(details) => filter(details.inputValue)}
    >
      <Combobox.Label>Department</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input placeholder="e.g. Engineering" />
        <Combobox.ClearTrigger aria-label="Clear selection" />
        <Combobox.Trigger aria-label="Open options" />
      </Combobox.Control>
      <Popup items={collection.items} />
    </Combobox.Root>
  );
}

export function InlineAutocompleteComboboxExample() {
  const { startsWith } = useFilter({ sensitivity: 'base' });
  const { collection, filter } = useListCollection({
    initialItems: seaCreatures,
    filter: startsWith,
  });

  return (
    <Combobox.Root
      collection={collection}
      inputBehavior="autocomplete"
      onInputValueChange={(details) => filter(details.inputValue)}
    >
      <Combobox.Label>Sea creature</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input placeholder="e.g. Dolphin" />
        <Combobox.ClearTrigger aria-label="Clear selection" />
        <Combobox.Trigger aria-label="Open options" />
      </Combobox.Control>
      <Popup items={collection.items} />
    </Combobox.Root>
  );
}

export function ContextComboboxExample() {
  const { contains } = useFilter({ sensitivity: 'base' });
  const { collection, filter } = useListCollection({ initialItems: sizes, filter: contains });

  return (
    <div className={styles.stack}>
      <Combobox.Root
        collection={collection}
        onInputValueChange={(details) => filter(details.inputValue)}
      >
        <Combobox.Context>
          {(context: UseComboboxContext<(typeof sizes)[number]>) => (
            <span className={styles.note}>Selected: {context.valueAsString || 'none'}</span>
          )}
        </Combobox.Context>
        <Combobox.Label>Size</Combobox.Label>
        <Combobox.Control>
          <Combobox.Input placeholder="e.g. Medium" />
          <Combobox.ClearTrigger aria-label="Clear selection" />
          <Combobox.Trigger aria-label="Open options" />
        </Combobox.Control>
        <Popup items={collection.items} />
      </Combobox.Root>
    </div>
  );
}

function RehydrateComboboxValue() {
  const combobox = useComboboxContext();
  const hydrated = useRef(false);

  useEffect(() => {
    if (combobox.value.length && combobox.collection.size && !hydrated.current) {
      combobox.syncSelectedItems();
      hydrated.current = true;
    }
  }, [combobox]);

  return null;
}

export function RehydrateValueComboboxExample() {
  const { collection, set } = useListCollection<Character>({
    initialItems: [],
    itemToString: (item) => item.name,
    itemToValue: (item) => item.name,
  });
  const combobox = useCombobox({
    collection,
    defaultValue: ['C-3PO'],
    placeholder: 'e.g. Luke',
  });

  useEffect(() => {
    const timeout = window.setTimeout(() => set(characters), 400);
    return () => window.clearTimeout(timeout);
  }, [set]);

  return (
    <Combobox.RootProvider value={combobox}>
      <Combobox.Label>Character</Combobox.Label>
      <RehydrateComboboxValue />
      <Combobox.Control>
        <Combobox.Input />
        <Combobox.ClearTrigger aria-label="Clear selection" />
        <Combobox.Trigger aria-label="Open options" />
      </Combobox.Control>
      <Portal>
        <Combobox.Positioner>
          <Combobox.Content>
            {collection.size === 0 ? <div className={styles.status}>Loading…</div> : null}
            <Combobox.List>
              {collection.items.map((item) => (
                <Combobox.Item key={item.name} item={item}>
                  <Combobox.ItemText>
                    {item.name} · {item.height} cm / {item.mass} kg
                  </Combobox.ItemText>
                  <Combobox.ItemIndicator />
                </Combobox.Item>
              ))}
            </Combobox.List>
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.RootProvider>
  );
}

export function LinksComboboxExample() {
  const { contains } = useFilter({ sensitivity: 'base' });
  const { collection, filter } = useListCollection({
    initialItems: developerResources,
    filter: contains,
  });

  return (
    <Combobox.Root
      collection={collection}
      selectionBehavior="preserve"
      onInputValueChange={(details) => filter(details.inputValue)}
    >
      <Combobox.Label>Developer resources</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input placeholder="e.g. GitHub" />
        <Combobox.Trigger aria-label="Open options" />
      </Combobox.Control>
      <Portal>
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
      </Portal>
    </Combobox.Root>
  );
}

export function DynamicComboboxExample() {
  const { collection, set } = useListCollection<string>({ initialItems: [] });

  return (
    <Combobox.Root
      collection={collection}
      onInputValueChange={(details) => {
        if (details.reason !== 'input-change') {
          return;
        }

        const name = details.inputValue.trim();
        set(
          name
            ? ['gmail.com', 'outlook.com', 'proton.me'].map((domain) => `${name}@${domain}`)
            : [],
        );
      }}
    >
      <Combobox.Label>Email</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input placeholder="e.g. alex" />
        <Combobox.Trigger aria-label="Open options" />
      </Combobox.Control>
      <Portal>
        <Combobox.Positioner>
          <Combobox.Content>
            <Combobox.List>
              {collection.items.map((item) => (
                <Combobox.Item key={item} item={item}>
                  <Combobox.ItemText>{item}</Combobox.ItemText>
                  <Combobox.ItemIndicator />
                </Combobox.Item>
              ))}
            </Combobox.List>
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  );
}

type CreatableItem = {
  label: string;
  value: string;
  created?: boolean;
};

const createOptionValue = '__create-option__';

export function CreatableComboboxExample() {
  const { contains } = useFilter({ sensitivity: 'base' });
  const { collection, filter, remove, update, upsert } = useListCollection<CreatableItem>({
    initialItems: [
      { label: 'Bug', value: 'bug' },
      { label: 'Feature', value: 'feature' },
      { label: 'Enhancement', value: 'enhancement' },
      { label: 'Documentation', value: 'documentation' },
    ],
    filter: contains,
  });
  const [inputValue, setInputValue] = useState('');
  const [value, setValue] = useState<string[]>([]);

  return (
    <Combobox.Root
      collection={collection}
      inputValue={inputValue}
      value={value}
      allowCustomValue
      onInputValueChange={(details) => {
        const nextInputValue = details.inputValue;

        if (details.reason === 'input-change' || details.reason === 'item-select') {
          const hasExactMatch = collection.items.some(
            (item) => item.label.toLowerCase() === nextInputValue.toLowerCase(),
          );

          flushSync(() => {
            if (nextInputValue.trim() && !hasExactMatch) {
              upsert(createOptionValue, {
                label: nextInputValue,
                value: createOptionValue,
              });
            } else {
              remove(createOptionValue);
            }
          });
          filter(nextInputValue);
        }

        setInputValue(nextInputValue);
      }}
      onOpenChange={(details) => {
        if (details.reason === 'trigger-click') {
          filter('');
        }
      }}
      onValueChange={(details) => {
        const nextValue = details.value.map((item) =>
          item === createOptionValue ? inputValue : item,
        );

        setValue(nextValue);
        if (details.value.includes(createOptionValue)) {
          update(createOptionValue, {
            label: inputValue,
            value: inputValue,
            created: true,
          });
        }
      }}
    >
      <Combobox.Label>Issue label</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input placeholder="e.g. Accessibility" />
        <Combobox.ClearTrigger aria-label="Clear selection" />
        <Combobox.Trigger aria-label="Open options" />
      </Combobox.Control>
      <Portal>
        <Combobox.Positioner>
          <Combobox.Content>
            <Combobox.List>
              {collection.items.map((item) => (
                <Combobox.Item key={item.value} item={item}>
                  <Combobox.ItemText>
                    {item.value === createOptionValue
                      ? `Create "${item.label}"`
                      : `${item.label}${item.created ? ' (new)' : ''}`}
                  </Combobox.ItemText>
                  <Combobox.ItemIndicator />
                </Combobox.Item>
              ))}
            </Combobox.List>
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  );
}

export function LimitComboboxExample() {
  const { contains } = useFilter({ sensitivity: 'base' });
  const { collection, filter } = useListCollection({
    initialItems: cities,
    filter: contains,
    limit: 5,
  });

  return (
    <Combobox.Root
      collection={collection}
      onInputValueChange={(details) => filter(details.inputValue)}
    >
      <Combobox.Label>City</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input placeholder="e.g. San" />
        <Combobox.Trigger aria-label="Open options" />
      </Combobox.Control>
      <Popup items={collection.items} />
    </Combobox.Root>
  );
}

export function VirtualizedComboboxExample() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { contains } = useFilter({ sensitivity: 'base' });
  const { collection, filter, reset } = useListCollection({
    initialItems: virtualItems,
    filter: contains,
  });
  const virtualizer = useVirtualizer({
    count: collection.size,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => 32,
    overscan: 8,
  });

  return (
    <Combobox.Root
      collection={collection}
      onInputValueChange={(details) => filter(details.inputValue)}
      scrollToIndexFn={(details) => {
        virtualizer.scrollToIndex(details.index, { align: 'center' });
      }}
    >
      <Combobox.Label>Large dataset</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input placeholder="Search 1,000 results" />
        <Combobox.Trigger aria-label="Open options" onClick={reset} />
      </Combobox.Control>
      <Portal>
        <Combobox.Positioner>
          <Combobox.Content className={styles.virtualContent}>
            <Combobox.Empty>No results found.</Combobox.Empty>
            <div ref={scrollRef} className={styles.virtualScroller}>
              <Combobox.List
                className={styles.virtualList}
                style={{ height: virtualizer.getTotalSize() }}
              >
                {virtualizer.getVirtualItems().map((virtualItem) => {
                  const item = collection.items[virtualItem.index];

                  return (
                    <Combobox.Item
                      key={item.value}
                      item={item}
                      aria-setsize={collection.size}
                      aria-posinset={virtualItem.index + 1}
                      className={styles.virtualItem}
                      style={{
                        height: virtualItem.size,
                        transform: `translateY(${virtualItem.start}px)`,
                      }}
                    >
                      <Combobox.ItemText>{item.label}</Combobox.ItemText>
                      <Combobox.ItemIndicator />
                    </Combobox.Item>
                  );
                })}
              </Combobox.List>
            </div>
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  );
}

export const comboboxExampleCss = `
[data-slot='combobox-content'] {
  min-width: var(--reference-width);
  transform-origin: var(--transform-origin);
}

[data-slot='combobox-item'][data-highlighted] {
  background: var(--combobox-highlight-bg, var(--color-foreground));
  color: var(--combobox-highlight-color, var(--color-background));
}
`;

export const comboboxOverrideCssProperties: CssPropertyInput[] = [
  ['--combobox-action-bg', 'transparent', 'Controls action background.'],
  ['--combobox-action-bg-hover', 'var(--color-muted)', 'Controls action hover background.'],
  ['--combobox-action-color-hover', 'var(--color-foreground)', 'Controls action hover color.'],
  ['--combobox-action-gap', '0.125rem', 'Controls the gap between actions.'],
  ['--combobox-action-offset-right', '0.5rem', 'Controls the trailing action offset.'],
  ['--combobox-action-radius', 'var(--radius-sm)', 'Controls action radius.'],
  ['--combobox-action-size', '1.5rem', 'Controls action size.'],
  ['--combobox-bg', 'var(--color-background)', 'Controls control background.'],
  ['--combobox-border-color', 'var(--color-border)', 'Controls control border color.'],
  ['--combobox-border-width', 'var(--border-width-sm)', 'Controls control border width.'],
  ['--combobox-color', 'var(--color-foreground)', 'Controls root text color.'],
  ['--combobox-content-bg', 'var(--color-popover)', 'Controls content background.'],
  ['--combobox-content-border-color', 'var(--color-border)', 'Controls content border color.'],
  ['--combobox-content-border-width', 'var(--border-width-sm)', 'Controls content border width.'],
  ['--combobox-content-closed-opacity', '0', 'Controls closed animation opacity.'],
  ['--combobox-content-closed-scale', 'var(--scale-popup)', 'Controls closed animation scale.'],
  ['--combobox-content-color', 'var(--color-popover-foreground)', 'Controls content text color.'],
  ['--combobox-content-max-height', '24rem', 'Controls content maximum height.'],
  ['--combobox-content-padding-y', 'var(--spacing-1)', 'Controls content vertical padding.'],
  ['--combobox-content-shadow', 'var(--shadow-lg)', 'Controls content shadow.'],
  ['--combobox-control-height', 'var(--size-lg)', 'Controls input height.'],
  ['--combobox-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled opacity.'],
  ['--combobox-empty-color', 'var(--color-muted-foreground)', 'Controls empty text color.'],
  ['--combobox-empty-font-size', 'var(--text-sm)', 'Controls empty font size.'],
  ['--combobox-empty-line-height', 'var(--line-height-text-sm)', 'Controls empty line height.'],
  ['--combobox-empty-padding-x', '1rem', 'Controls empty horizontal padding.'],
  ['--combobox-empty-padding-y', '0.75rem', 'Controls empty vertical padding.'],
  ['--combobox-focus-ring-color', 'var(--color-ring)', 'Controls focus ring color.'],
  ['--combobox-focus-ring-offset', 'var(--border-width-sm)', 'Controls focus ring offset.'],
  ['--combobox-focus-ring-width', 'var(--border-width-sm)', 'Controls focus ring width.'],
  ['--combobox-highlight-bg', 'var(--color-foreground)', 'Controls highlighted item background.'],
  ['--combobox-highlight-color', 'var(--color-background)', 'Controls highlighted item color.'],
  ['--combobox-icon-color', 'var(--color-muted-foreground)', 'Controls action icon color.'],
  ['--combobox-icon-size', '1rem', 'Controls action icon size.'],
  ['--combobox-input-padding-x-end', '4.25rem', 'Controls input trailing padding.'],
  ['--combobox-input-padding-x-start', '0.875rem', 'Controls input leading padding.'],
  [
    '--combobox-input-placeholder-color',
    'var(--color-muted-foreground)',
    'Controls placeholder color.',
  ],
  ['--combobox-invalid-color', 'var(--color-destructive)', 'Controls invalid border color.'],
  ['--combobox-item-group-gap', 'var(--spacing-2)', 'Controls the gap between item groups.'],
  [
    '--combobox-item-group-label-color',
    'var(--color-muted-foreground)',
    'Controls group label color.',
  ],
  ['--combobox-item-group-label-font-size', 'var(--text-xs)', 'Controls group label font size.'],
  [
    '--combobox-item-group-label-font-weight',
    'var(--weight-semibold)',
    'Controls group label weight.',
  ],
  [
    '--combobox-item-group-label-line-height',
    'var(--line-height-text-xs)',
    'Controls group label line height.',
  ],
  ['--combobox-item-group-label-padding-x', '0.625rem', 'Controls group label horizontal padding.'],
  ['--combobox-item-group-label-padding-y', '0.35rem', 'Controls group label vertical padding.'],
  ['--combobox-item-bg', 'transparent', 'Controls item background.'],
  ['--combobox-item-border-color', 'transparent', 'Controls item border color.'],
  ['--combobox-item-border-width', '0', 'Controls item border width.'],
  ['--combobox-item-color', 'var(--color-foreground)', 'Controls item text color.'],
  ['--combobox-item-font-size', 'var(--text-sm)', 'Controls item font size.'],
  ['--combobox-item-gap', 'var(--spacing-2)', 'Controls item content gap.'],
  ['--combobox-item-indicator-size', '0.75rem', 'Controls item indicator size.'],
  ['--combobox-item-inset-x', 'var(--spacing-2)', 'Controls item horizontal inset.'],
  ['--combobox-item-line-height', 'var(--line-height-text-sm)', 'Controls item line height.'],
  ['--combobox-item-min-height', '2rem', 'Controls item minimum height.'],
  ['--combobox-item-padding-x', '0.625rem', 'Controls item horizontal padding.'],
  ['--combobox-item-padding-y', 'var(--spacing-2)', 'Controls item vertical padding.'],
  ['--combobox-item-radius', 'var(--radius-sm)', 'Controls item radius.'],
  ['--combobox-label-color', 'var(--combobox-color)', 'Controls label color.'],
  ['--combobox-label-font-size', 'var(--text-sm)', 'Controls label font size.'],
  ['--combobox-label-font-weight', 'var(--weight-medium)', 'Controls label font weight.'],
  ['--combobox-label-line-height', 'var(--line-height-text-sm)', 'Controls label line height.'],
  ['--combobox-max-width', '100%', 'Controls root maximum width.'],
  ['--combobox-radius', 'var(--radius-md)', 'Controls control and content radius.'],
  ['--combobox-root-gap', '0.375rem', 'Controls root part spacing.'],
  ['--combobox-transition', 'var(--transition-default)', 'Controls state transitions.'],
  ['--combobox-width', '16rem', 'Controls root width.'],
];

const cssProperties = comboboxOverrideCssProperties.map((property) => {
  if ('name' in property) {
    return property;
  }

  return { name: property[0], defaultValue: property[1], description: property[2] };
});

export function ComboboxCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return <CSSPropertiesReferenceTable properties={cssProperties} />;
}