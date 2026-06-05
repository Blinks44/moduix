import {
  Combobox,
  ComboboxArrow,
  ComboboxBackdrop,
  ComboboxChip,
  ComboboxChipRemove,
  ComboboxChipText,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxClear,
  ComboboxCollection,
  ComboboxContent,
  ComboboxControlActions,
  ComboboxEmpty,
  ComboboxField,
  ComboboxFieldLabel,
  ComboboxFieldTrigger,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxIcon,
  ComboboxInlineInputContainer,
  ComboboxInput,
  ComboboxInputGroup,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxItemText,
  ComboboxList,
  ComboboxPortal,
  ComboboxPositioner,
  ComboboxPopup,
  InfoIcon,
  ComboboxStatus,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxFilter,
} from 'moduix';
import * as React from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';
import styles from './combobox.module.css';

interface OptionItem {
  id: string;
  label: string;
  value: string;
}

interface GroupedOption {
  value: string;
  items: OptionItem[];
}

interface DirectoryUser {
  id: string;
  name: string;
  username: string;
  email: string;
  title: string;
}

const fruits: OptionItem[] = [
  { id: 'apple', label: 'Apple', value: 'apple' },
  { id: 'banana', label: 'Banana', value: 'banana' },
  { id: 'grape', label: 'Grape', value: 'grape' },
  { id: 'kiwi', label: 'Kiwi', value: 'kiwi' },
  { id: 'mango', label: 'Mango', value: 'mango' },
  { id: 'orange', label: 'Orange', value: 'orange' },
  { id: 'pineapple', label: 'Pineapple', value: 'pineapple' },
  { id: 'strawberry', label: 'Strawberry', value: 'strawberry' },
];

const countries: OptionItem[] = [
  { id: 'de', label: 'Germany', value: 'germany' },
  { id: 'es', label: 'Spain', value: 'spain' },
  { id: 'fr', label: 'France', value: 'france' },
  { id: 'gb', label: 'United Kingdom', value: 'united-kingdom' },
  { id: 'it', label: 'Italy', value: 'italy' },
  { id: 'jp', label: 'Japan', value: 'japan' },
  { id: 'ru', label: 'Russia', value: 'russia' },
  { id: 'us', label: 'United States', value: 'united-states' },
];

const groupedProduce: GroupedOption[] = [
  {
    value: 'Fruits',
    items: [
      { id: 'fruit-apple', label: 'Apple', value: 'apple' },
      { id: 'fruit-banana', label: 'Banana', value: 'banana' },
      { id: 'fruit-mango', label: 'Mango', value: 'mango' },
      { id: 'fruit-orange', label: 'Orange', value: 'orange' },
    ],
  },
  {
    value: 'Vegetables',
    items: [
      { id: 'veg-broccoli', label: 'Broccoli', value: 'broccoli' },
      { id: 'veg-carrot', label: 'Carrot', value: 'carrot' },
      { id: 'veg-spinach', label: 'Spinach', value: 'spinach' },
      { id: 'veg-zucchini', label: 'Zucchini', value: 'zucchini' },
    ],
  },
];

const directoryUsers: DirectoryUser[] = [
  {
    id: 'leslie-alexander',
    name: 'Leslie Alexander',
    username: 'leslie',
    email: 'leslie.alexander@example.com',
    title: 'Product Manager',
  },
  {
    id: 'kathryn-murphy',
    name: 'Kathryn Murphy',
    username: 'kathryn',
    email: 'kathryn.murphy@example.com',
    title: 'Marketing Lead',
  },
  {
    id: 'courtney-henry',
    name: 'Courtney Henry',
    username: 'courtney',
    email: 'courtney.henry@example.com',
    title: 'Design Systems',
  },
  {
    id: 'michael-foster',
    name: 'Michael Foster',
    username: 'michael',
    email: 'michael.foster@example.com',
    title: 'Frontend Engineer',
  },
  {
    id: 'lana-steiner',
    name: 'Lana Steiner',
    username: 'lana',
    email: 'lana.steiner@example.com',
    title: 'Product Designer',
  },
];

export const comboboxOverrideCssProperties: CssPropertyInput[] = [
  ['--combobox-action-bg', 'transparent', 'Default: transparent.'],
  ['--combobox-action-bg-hover', 'var(--color-muted)', 'Default: var(--color-muted).'],
  ['--combobox-action-color-hover', 'var(--color-foreground)', 'Default: var(--color-foreground).'],
  ['--combobox-action-radius', 'var(--radius-sm)', 'Default: var(--radius-sm).'],
  ['--combobox-action-size', '1.5rem', 'Default: 1.5rem.'],
  ['--combobox-actions-gap', '0.125rem', 'Default: 0.125rem.'],
  ['--combobox-actions-offset-right', '0.5rem', 'Default: 0.5rem.'],
  ['--combobox-arrow-height', '0.625rem', 'Default: 0.625rem.'],
  ['--combobox-arrow-inline-offset', '13px', 'Default: 13px.'],
  ['--combobox-arrow-size', '8px', 'Default: 8px.'],
  [
    '--combobox-arrow-stroke-color',
    'var(--combobox-popup-border-color)',
    'Default: var(--combobox-popup-border-color).',
  ],
  ['--combobox-arrow-width', '1.25rem', 'Default: 1.25rem.'],
  [
    '--combobox-backdrop-bg',
    'var(--backdrop-bg, var(--color-overlay))',
    'Default: var(--backdrop-bg, var(--color-overlay)).',
  ],
  ['--combobox-backdrop-blur', '4px', 'Default: 4px.'],
  [
    '--combobox-backdrop-transition',
    'var(--transition-default)',
    'Default: var(--transition-default).',
  ],
  ['--combobox-bg', 'var(--color-background)', 'Default: var(--color-background).'],
  ['--combobox-border-color', 'var(--color-border)', 'Default: var(--color-border).'],
  ['--combobox-border-width', 'var(--border-width-sm)', 'Default: var(--border-width-sm).'],
  ['--combobox-check-padding-x-start', '0.625rem', 'Default: 0.625rem.'],
  ['--combobox-chip-bg', 'var(--color-muted)', 'Default: var(--color-muted).'],
  ['--combobox-chip-color', 'var(--color-foreground)', 'Default: var(--color-foreground).'],
  ['--combobox-chip-font-size', 'var(--text-sm)', 'Default: var(--text-sm).'],
  ['--combobox-chip-gap', 'var(--spacing-1)', 'Default: var(--spacing-1).'],
  [
    '--combobox-chip-line-height',
    'var(--line-height-text-sm)',
    'Default: var(--line-height-text-sm).',
  ],
  ['--combobox-chip-min-height', '1.625rem', 'Default: 1.625rem.'],
  ['--combobox-chip-padding-left', '0.5rem', 'Default: 0.5rem.'],
  ['--combobox-chip-padding-right', '0.375rem', 'Default: 0.375rem.'],
  ['--combobox-chip-padding-y', '0.1875rem', 'Default: 0.1875rem.'],
  ['--combobox-chip-radius', 'var(--radius-sm)', 'Default: var(--radius-sm).'],
  [
    '--combobox-chip-remove-bg-hover',
    'var(--color-overlay-foreground)',
    'Default: var(--color-overlay-foreground).',
  ],
  ['--combobox-chip-remove-icon-size', '0.75rem', 'Default: 0.75rem.'],
  ['--combobox-chip-remove-radius', 'var(--radius-sm)', 'Default: var(--radius-sm).'],
  ['--combobox-chip-remove-size', '1rem', 'Default: 1rem.'],
  ['--combobox-chips-gap', 'var(--spacing-1)', 'Default: var(--spacing-1).'],
  ['--combobox-chips-input-height', '1.75rem', 'Default: 1.75rem.'],
  ['--combobox-chips-input-min-width', '4rem', 'Default: 4rem.'],
  ['--combobox-chips-input-padding-x', '0.5rem', 'Default: 0.5rem.'],
  ['--combobox-chips-padding', 'var(--spacing-1)', 'Default: var(--spacing-1).'],
  ['--combobox-color', 'var(--color-foreground)', 'Default: var(--color-foreground).'],
  ['--combobox-control-height', 'var(--size-lg)', 'Default: var(--size-lg).'],
  [
    '--combobox-empty-color',
    'var(--color-muted-foreground)',
    'Default: var(--color-muted-foreground).',
  ],
  ['--combobox-empty-font-size', 'var(--text-sm)', 'Default: var(--text-sm).'],
  [
    '--combobox-empty-line-height',
    'var(--line-height-text-sm)',
    'Default: var(--line-height-text-sm).',
  ],
  ['--combobox-empty-padding-x', '1rem', 'Default: 1rem.'],
  ['--combobox-empty-padding-y', '0.75rem', 'Default: 0.75rem.'],
  ['--combobox-field-gap', '0.375rem', 'Default: 0.375rem.'],
  ['--combobox-focus-ring-color', 'var(--color-ring)', 'Default: var(--color-ring).'],
  ['--combobox-group-label-bg', 'var(--color-popover)', 'Default: var(--color-popover).'],
  [
    '--combobox-group-label-color',
    'var(--color-muted-foreground)',
    'Default: var(--color-muted-foreground).',
  ],
  ['--combobox-group-label-font-size', 'var(--text-xs)', 'Default: var(--text-xs).'],
  [
    '--combobox-group-label-font-weight',
    'var(--weight-semibold)',
    'Default: var(--weight-semibold).',
  ],
  [
    '--combobox-group-label-line-height',
    'var(--line-height-text-xs)',
    'Default: var(--line-height-text-xs).',
  ],
  ['--combobox-group-label-padding-bottom', '0.35rem', 'Default: 0.35rem.'],
  ['--combobox-group-label-padding-top', '0.35rem', 'Default: 0.35rem.'],
  ['--combobox-group-label-padding-x', '0.625rem', 'Default: 0.625rem.'],
  ['--combobox-group-padding-bottom', 'var(--spacing-1)', 'Default: var(--spacing-1).'],
  ['--combobox-highlight-bg', 'var(--color-foreground)', 'Default: var(--color-foreground).'],
  ['--combobox-highlight-color', 'var(--color-background)', 'Default: var(--color-background).'],
  ['--combobox-highlight-inset-x', 'var(--spacing-1)', 'Default: var(--spacing-1).'],
  ['--combobox-highlight-radius', 'var(--radius-sm)', 'Default: var(--radius-sm).'],
  [
    '--combobox-icon-color',
    'var(--color-muted-foreground)',
    'Default: var(--color-muted-foreground).',
  ],
  ['--combobox-icon-size', '0.875rem', 'Default: 0.875rem.'],
  ['--combobox-icon-svg-size', '1rem', 'Default: 1rem.'],
  ['--combobox-input-group-padding-x', '0', 'Default: 0.'],
  ['--combobox-input-padding-x-end', '3.25rem', 'Default: 3.25rem.'],
  ['--combobox-input-padding-x-start', '0.875rem', 'Default: 0.875rem.'],
  [
    '--combobox-input-placeholder-color',
    'var(--color-muted-foreground)',
    'Default: var(--color-muted-foreground).',
  ],
  ['--combobox-item-bg', 'transparent', 'Default: transparent.'],
  ['--combobox-item-border-color', 'transparent', 'Default: transparent.'],
  ['--combobox-item-border-radius', '0', 'Default: 0.'],
  ['--combobox-item-border-width', '0', 'Default: 0.'],
  ['--combobox-item-color', 'var(--color-foreground)', 'Default: var(--color-foreground).'],
  ['--combobox-item-font-size', 'var(--text-sm)', 'Default: var(--text-sm).'],
  ['--combobox-item-gap', 'var(--spacing-2)', 'Default: var(--spacing-2).'],
  ['--combobox-item-indicator-bg', 'transparent', 'Default: transparent.'],
  ['--combobox-item-indicator-border-color', 'transparent', 'Default: transparent.'],
  ['--combobox-item-indicator-border-width', '0', 'Default: 0.'],
  ['--combobox-item-indicator-icon-size', '0.75rem', 'Default: 0.75rem.'],
  ['--combobox-item-indicator-padding', '0', 'Default: 0.'],
  ['--combobox-item-indicator-radius', '0', 'Default: 0.'],
  ['--combobox-item-indicator-size', '0.75rem', 'Default: 0.75rem.'],
  [
    '--combobox-item-line-height',
    'var(--line-height-text-sm)',
    'Default: var(--line-height-text-sm).',
  ],
  ['--combobox-item-min-height', '2rem', 'Default: 2rem.'],
  ['--combobox-item-padding-x-end', '1rem', 'Default: 1rem.'],
  ['--combobox-item-padding-y', 'var(--spacing-2)', 'Default: var(--spacing-2).'],
  ['--combobox-label-font-size', 'var(--text-sm)', 'Default: var(--text-sm).'],
  ['--combobox-label-font-weight', 'var(--weight-medium)', 'Default: var(--weight-medium).'],
  [
    '--combobox-label-line-height',
    'var(--line-height-text-sm)',
    'Default: var(--line-height-text-sm).',
  ],
  [
    '--combobox-list-max-height',
    'var(--combobox-popup-max-height)',
    'Default: var(--combobox-popup-max-height).',
  ],
  ['--combobox-list-padding-y', '0.25rem', 'Default: 0.25rem.'],
  ['--combobox-list-scroll-padding-y', '0.25rem', 'Default: 0.25rem.'],
  ['--combobox-popup-bg', 'var(--color-popover)', 'Default: var(--color-popover).'],
  ['--combobox-popup-border-color', 'var(--color-border)', 'Default: var(--color-border).'],
  ['--combobox-popup-max-height', '24rem', 'Default: 24rem.'],
  ['--combobox-radius', 'var(--radius-md)', 'Default: var(--radius-md).'],
  ['--combobox-separator-margin-x', '1rem', 'Default: 1rem.'],
  ['--combobox-separator-margin-y', '0.375rem', 'Default: 0.375rem.'],
  ['--combobox-shadow', 'var(--shadow-lg)', 'Default: var(--shadow-lg).'],
  [
    '--combobox-status-color',
    'var(--combobox-empty-color)',
    'Default: var(--combobox-empty-color).',
  ],
  [
    '--combobox-status-divider-color',
    'var(--combobox-popup-border-color)',
    'Default: var(--combobox-popup-border-color).',
  ],
  ['--combobox-status-divider-width', 'var(--border-width-sm)', 'Default: var(--border-width-sm).'],
  ['--combobox-status-font-size', 'var(--text-xs)', 'Default: var(--text-xs).'],
  ['--combobox-status-gap', 'var(--spacing-1)', 'Default: var(--spacing-1).'],
  [
    '--combobox-status-line-height',
    'var(--line-height-text-xs)',
    'Default: var(--line-height-text-xs).',
  ],
  ['--combobox-status-padding-x', '0.75rem', 'Default: 0.75rem.'],
  ['--combobox-status-padding-y', '0.5rem', 'Default: 0.5rem.'],
  ['--combobox-width', '16rem', 'Default: 16rem.'],
];

export const comboboxPlaygroundCssProperties: CssPropertyInput[] = comboboxOverrideCssProperties;

export function ComboboxCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <div className="space-y-2">
      <CSSPropertiesReferenceTable
        properties={comboboxOverrideCssProperties.map(normalizeCssProperty)}
      />
    </div>
  );
}

export function ComboboxCssPlaygroundPanel({
  values,
  onChange,
  onReset,
}: CSSPropertiesEditorContext) {
  return (
    <div className="space-y-2">
      <CSSPropertiesEditor
        properties={comboboxPlaygroundCssProperties.map(normalizeCssProperty)}
        values={values}
        onChange={onChange}
        onReset={onReset}
      />
    </div>
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}

export function ComboboxExample() {
  const id = React.useId();

  return (
    <Combobox items={fruits} itemToStringLabel={(item: OptionItem) => item.label}>
      <ComboboxField>
        <ComboboxFieldLabel htmlFor={id}>Choose fruit</ComboboxFieldLabel>
        <ComboboxInputGroup>
          <ComboboxInput id={id} placeholder="e.g. Mango" />
          <ComboboxControlActions>
            <ComboboxClear aria-label="Clear selection" />
            <ComboboxTrigger aria-label="Open options" />
          </ComboboxControlActions>
        </ComboboxInputGroup>
      </ComboboxField>

      <ComboboxContent sideOffset={4}>
        <ComboboxEmpty>No fruits found.</ComboboxEmpty>
        <ComboboxList>
          {(item: OptionItem) => (
            <ComboboxItem key={item.id} value={item}>
              <ComboboxItemIndicator />
              <ComboboxItemText>{item.label}</ComboboxItemText>
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

export function IndicatorRightComboboxExample() {
  const id = React.useId();

  return (
    <Combobox items={fruits} itemToStringLabel={(item: OptionItem) => item.label}>
      <ComboboxField>
        <ComboboxFieldLabel htmlFor={id}>Choose fruit</ComboboxFieldLabel>
        <ComboboxInputGroup>
          <ComboboxInput id={id} placeholder="e.g. Mango" />
          <ComboboxControlActions>
            <ComboboxClear aria-label="Clear selection" />
            <ComboboxTrigger aria-label="Open options" />
          </ComboboxControlActions>
        </ComboboxInputGroup>
      </ComboboxField>

      <ComboboxContent sideOffset={4}>
        <ComboboxList>
          {(item: OptionItem) => (
            <ComboboxItem key={item.id} value={item} indicator="end">
              <ComboboxItemText className={styles.itemTextWithIcon}>
                <InfoIcon className={styles.itemIcon} />
                <span>{item.label}</span>
              </ComboboxItemText>
              <ComboboxItemIndicator />
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

export function InputInsidePopupComboboxExample() {
  return (
    <Combobox items={countries} itemToStringLabel={(item: OptionItem) => item.label}>
      <ComboboxField>
        <ComboboxFieldLabel>Country</ComboboxFieldLabel>
        <ComboboxFieldTrigger>
          <ComboboxValue placeholder="Select country" />
          <ComboboxIcon />
        </ComboboxFieldTrigger>
      </ComboboxField>

      <ComboboxContent sideOffset={4} className={styles.popupWithInlineInput}>
        <ComboboxInlineInputContainer>
          <ComboboxInput placeholder="Search country" />
        </ComboboxInlineInputContainer>
        <ComboboxEmpty>No countries found.</ComboboxEmpty>
        <ComboboxList className={styles.listWithInlineInput}>
          {(item: OptionItem) => (
            <ComboboxItem key={item.id} value={item}>
              <ComboboxItemIndicator />
              <ComboboxItemText>{item.label}</ComboboxItemText>
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

export function GroupedComboboxExample() {
  const id = React.useId();

  return (
    <Combobox items={groupedProduce} itemToStringLabel={(item: OptionItem) => item.label}>
      <ComboboxField>
        <ComboboxFieldLabel htmlFor={id}>Select produce</ComboboxFieldLabel>
        <ComboboxInputGroup>
          <ComboboxInput id={id} placeholder="e.g. Spinach" />
          <ComboboxControlActions>
            <ComboboxClear aria-label="Clear selection" />
            <ComboboxTrigger aria-label="Open groups" />
          </ComboboxControlActions>
        </ComboboxInputGroup>
      </ComboboxField>

      <ComboboxContent sideOffset={4}>
        <ComboboxEmpty>No produce found.</ComboboxEmpty>
        <ComboboxList>
          {(group: GroupedOption) => (
            <ComboboxGroup key={group.value} items={group.items}>
              <ComboboxGroupLabel>{group.value}</ComboboxGroupLabel>
              <ComboboxCollection>
                {(item: OptionItem) => (
                  <ComboboxItem key={item.id} value={item}>
                    <ComboboxItemIndicator />
                    <ComboboxItemText>{item.label}</ComboboxItemText>
                  </ComboboxItem>
                )}
              </ComboboxCollection>
            </ComboboxGroup>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

export function MultipleComboboxExample() {
  const id = React.useId();

  return (
    <Combobox items={fruits} itemToStringLabel={(item: OptionItem) => item.label} multiple>
      <ComboboxField className={styles.multipleField}>
        <ComboboxFieldLabel htmlFor={id}>Select fruits</ComboboxFieldLabel>
        <ComboboxInputGroup className={styles.multipleInputGroup}>
          <ComboboxChips>
            <ComboboxValue>
              {(value: OptionItem[]) => (
                <React.Fragment>
                  {value.map((item) => (
                    <ComboboxChip key={item.id} aria-label={item.label}>
                      <ComboboxChipText>{item.label}</ComboboxChipText>
                      <ComboboxChipRemove aria-label={`Remove ${item.label}`} />
                    </ComboboxChip>
                  ))}
                  <ComboboxChipsInput id={id} placeholder={value.length === 0 ? 'Select...' : ''} />
                </React.Fragment>
              )}
            </ComboboxValue>
          </ComboboxChips>
        </ComboboxInputGroup>
      </ComboboxField>

      <ComboboxContent sideOffset={4}>
        <ComboboxEmpty>No fruits found.</ComboboxEmpty>
        <ComboboxList>
          {(item: OptionItem) => (
            <ComboboxItem key={item.id} value={item}>
              <ComboboxItemIndicator />
              <ComboboxItemText>{item.label}</ComboboxItemText>
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

export function AsyncSearchComboboxExample() {
  const id = React.useId();
  const { contains } = useComboboxFilter();

  const [searchResults, setSearchResults] = React.useState<DirectoryUser[]>([]);
  const [selectedValue, setSelectedValue] = React.useState<DirectoryUser | null>(null);
  const [searchValue, setSearchValue] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const [isPending, startTransition] = React.useTransition();

  const abortControllerRef = React.useRef<AbortController | null>(null);
  const trimmedSearchValue = searchValue.trim();

  const items = React.useMemo(() => {
    if (!selectedValue || searchResults.some((user) => user.id === selectedValue.id)) {
      return searchResults;
    }

    return [...searchResults, selectedValue];
  }, [searchResults, selectedValue]);

  async function searchUsers(query: string) {
    await new Promise((resolve) => {
      setTimeout(resolve, 250);
    });

    if (query === 'error') {
      return { users: [], error: 'Failed to fetch people. Try again.' };
    }

    const users = directoryUsers.filter((user) => {
      return (
        contains(user.name, query) ||
        contains(user.username, query) ||
        contains(user.email, query) ||
        contains(user.title, query)
      );
    });

    return { users, error: null };
  }

  function getStatus() {
    if (isPending) {
      return 'Searching...';
    }

    if (error) {
      return error;
    }

    if (trimmedSearchValue === '') {
      return selectedValue ? null : 'Start typing to search people...';
    }

    if (searchResults.length === 0) {
      return `No matches for "${trimmedSearchValue}".`;
    }

    return null;
  }

  const status = getStatus();
  const emptyMessage =
    trimmedSearchValue !== '' && !isPending && searchResults.length === 0 && !error
      ? 'Try a different search term.'
      : null;

  return (
    <Combobox
      items={items}
      itemToStringLabel={(user: DirectoryUser) => user.name}
      filter={null}
      onOpenChangeComplete={(open) => {
        if (!open && selectedValue) {
          setSearchResults([selectedValue]);
        }
      }}
      onValueChange={(nextSelectedValue) => {
        setSelectedValue(nextSelectedValue);
        setSearchValue('');
        setError(null);
      }}
      onInputValueChange={(nextSearchValue, { reason }) => {
        setSearchValue(nextSearchValue);

        if (nextSearchValue === '') {
          abortControllerRef.current?.abort();
          setSearchResults([]);
          setError(null);
          return;
        }

        if (reason === 'item-press') {
          return;
        }

        const controller = new AbortController();
        abortControllerRef.current?.abort();
        abortControllerRef.current = controller;

        startTransition(async () => {
          setError(null);
          const result = await searchUsers(nextSearchValue);

          if (controller.signal.aborted) {
            return;
          }

          startTransition(() => {
            setSearchResults(result.users);
            setError(result.error);
          });
        });
      }}
    >
      <ComboboxField>
        <ComboboxFieldLabel htmlFor={id}>Assign reviewer</ComboboxFieldLabel>
        <ComboboxInputGroup>
          <ComboboxInput id={id} placeholder="e.g. Michael" />
          <ComboboxControlActions>
            <ComboboxClear aria-label="Clear selection" />
            <ComboboxTrigger aria-label="Open options" />
          </ComboboxControlActions>
        </ComboboxInputGroup>
      </ComboboxField>

      <ComboboxContent sideOffset={4}>
        <ComboboxStatus>{status}</ComboboxStatus>
        <ComboboxEmpty>{emptyMessage}</ComboboxEmpty>
        <ComboboxList>
          {(user: DirectoryUser) => (
            <ComboboxItem key={user.id} value={user}>
              <ComboboxItemIndicator />
              <ComboboxItemText className={styles.multilineItemText}>
                <span className={styles.itemTitle}>{user.name}</span>
                <span className={styles.itemMeta}>
                  <span>@{user.username}</span>
                  <span>{user.title}</span>
                </span>
                <span className={styles.itemMeta}>{user.email}</span>
              </ComboboxItemText>
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

export function CustomCompositionComboboxExample() {
  const id = React.useId();

  return (
    <Combobox items={fruits} itemToStringLabel={(item: OptionItem) => item.label}>
      <ComboboxField>
        <ComboboxFieldLabel htmlFor={id}>Choose fruit</ComboboxFieldLabel>
        <ComboboxInputGroup className={styles.customInputGroup}>
          <ComboboxInput id={id} placeholder="e.g. Mango" />
          <ComboboxControlActions>
            <ComboboxClear aria-label="Clear selection" />
            <ComboboxTrigger aria-label="Open options" />
          </ComboboxControlActions>
        </ComboboxInputGroup>
      </ComboboxField>

      <ComboboxPortal className={styles.portal}>
        <ComboboxBackdrop className={styles.backdrop} />
        <ComboboxPositioner className={styles.positioner} sideOffset={8}>
          <ComboboxPopup className={styles.customPopup}>
            <ComboboxArrow className={styles.arrow} />
            <ComboboxEmpty>No fruits found.</ComboboxEmpty>
            <ComboboxList>
              {(item: OptionItem) => (
                <ComboboxItem key={item.id} value={item}>
                  <ComboboxItemIndicator />
                  <ComboboxItemText>{item.label}</ComboboxItemText>
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxPopup>
        </ComboboxPositioner>
      </ComboboxPortal>
    </Combobox>
  );
}