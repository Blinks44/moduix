import {
  Combobox,
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
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxIcon,
  ComboboxInlineInputContainer,
  ComboboxInput,
  ComboboxInputGroup,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxItemText,
  ComboboxItemTextContent,
  ComboboxItemTextIcon,
  ComboboxItemTextLabel,
  ComboboxList,
  ComboboxStatus,
  ComboboxTrigger,
  ComboboxValue,
  InfoIcon,
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
  ['--combobox-width', '16rem', 'Controls the control and popup anchor width.'],
  ['--combobox-control-height', 'var(--size-lg)', 'Controls input and trigger height.'],
  ['--combobox-radius', 'var(--radius-md)', 'Controls control and popup radius.'],
  ['--combobox-bg', 'var(--color-background)', 'Controls control background.'],
  ['--combobox-color', 'var(--color-foreground)', 'Controls primary text color.'],
  ['--combobox-border-color', 'var(--color-border)', 'Controls control border color.'],
  ['--combobox-focus-ring-color', 'var(--color-ring)', 'Controls keyboard focus ring color.'],
  ['--combobox-input-padding-x-start', '0.875rem', 'Controls input start padding.'],
  ['--combobox-input-padding-x-end', '3.25rem', 'Controls input end padding.'],
  [
    '--combobox-input-placeholder-color',
    'var(--color-muted-foreground)',
    'Controls placeholder text color.',
  ],
  ['--combobox-action-size', '1.5rem', 'Controls trigger and clear button size.'],
  ['--combobox-icon-color', 'var(--color-muted-foreground)', 'Controls default icon color.'],
  ['--combobox-popup-bg', 'var(--color-popover)', 'Controls popup background.'],
  ['--combobox-popup-border-color', 'var(--color-border)', 'Controls popup border color.'],
  ['--combobox-popup-max-height', '24rem', 'Controls popup max height.'],
  ['--combobox-shadow', 'var(--shadow-lg)', 'Controls popup shadow.'],
  ['--combobox-backdrop-bg', 'var(--backdrop-bg)', 'Controls optional backdrop color.'],
  ['--combobox-backdrop-blur', '2px', 'Controls optional backdrop blur.'],
  [
    '--combobox-backdrop-transition',
    'var(--transition-default)',
    'Controls optional backdrop animation.',
  ],
  ['--combobox-arrow-width', '1.25rem', 'Controls optional popup arrow width.'],
  ['--combobox-arrow-height', '0.625rem', 'Controls optional popup arrow height.'],
  [
    '--combobox-arrow-stroke-color',
    'var(--color-border)',
    'Controls optional popup arrow border color.',
  ],
  ['--combobox-list-padding-y', '0.25rem', 'Controls vertical list padding.'],
  ['--combobox-item-min-height', '2rem', 'Controls item minimum height.'],
  ['--combobox-item-padding-y', 'var(--spacing-2)', 'Controls item vertical padding.'],
  ['--combobox-item-padding-x-end', '1rem', 'Controls item end padding.'],
  ['--combobox-item-gap', 'var(--spacing-2)', 'Controls item content gap.'],
  ['--combobox-highlight-bg', 'var(--color-foreground)', 'Controls highlighted item background.'],
  [
    '--combobox-highlight-color',
    'var(--color-background)',
    'Controls highlighted item text color.',
  ],
  [
    '--combobox-empty-color',
    'var(--color-muted-foreground)',
    'Controls empty and status text color.',
  ],
  ['--combobox-chip-bg', 'var(--color-muted)', 'Controls multiple-value chip background.'],
  ['--combobox-chip-remove-size', '1rem', 'Controls chip remove button size.'],
];

export const comboboxPlaygroundCssProperties: CssPropertyInput[] = [
  ['--combobox-radius', 'var(--radius-md)', 'Controls control and popup radius.'],
  ['--combobox-bg', 'var(--color-background)', 'Controls control background.'],
  ['--combobox-color', 'var(--color-foreground)', 'Controls primary text color.'],
  ['--combobox-border-color', 'var(--color-border)', 'Controls control border color.'],
  ['--combobox-focus-ring-color', 'var(--color-ring)', 'Controls keyboard focus ring color.'],
  ['--combobox-icon-color', 'var(--color-muted-foreground)', 'Controls default icon color.'],
  ['--combobox-popup-bg', 'var(--color-popover)', 'Controls popup background.'],
  ['--combobox-popup-border-color', 'var(--color-border)', 'Controls popup border color.'],
  ['--combobox-shadow', 'var(--shadow-lg)', 'Controls popup shadow.'],
  ['--combobox-highlight-bg', 'var(--color-foreground)', 'Controls highlighted item background.'],
  [
    '--combobox-highlight-color',
    'var(--color-background)',
    'Controls highlighted item text color.',
  ],
  ['--combobox-empty-color', 'var(--color-muted-foreground)', 'Controls empty text color.'],
];

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

      <ComboboxContent>
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

      <ComboboxContent>
        <ComboboxList>
          {(item: OptionItem) => (
            <ComboboxItem key={item.id} value={item} indicator="end">
              <ComboboxItemText>
                <ComboboxItemTextContent>
                  <ComboboxItemTextIcon>
                    <InfoIcon />
                  </ComboboxItemTextIcon>
                  <ComboboxItemTextLabel>{item.label}</ComboboxItemTextLabel>
                </ComboboxItemTextContent>
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
        <ComboboxTrigger className={styles.triggerField}>
          <ComboboxValue placeholder="Select country" />
          <ComboboxIcon />
        </ComboboxTrigger>
      </ComboboxField>

      <ComboboxContent className={styles.popupWithInlineInput}>
        <ComboboxInlineInputContainer>
          <ComboboxInput className={styles.inlineInput} placeholder="Search country" />
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

      <ComboboxContent>
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

      <ComboboxContent>
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

export function CustomStylesComboboxExample() {
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

      <ComboboxContent
        className={styles.customPopup}
        sideOffset={8}
        showArrow
        withBackdrop
        classNames={{
          portal: styles.portal,
          backdrop: styles.backdrop,
          positioner: styles.positioner,
          arrow: styles.arrow,
        }}
      >
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