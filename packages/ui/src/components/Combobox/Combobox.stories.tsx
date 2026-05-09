import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { InfoIcon } from '@/primitives/Icons';
import {
  Combobox,
  ComboboxChip,
  ComboboxChipRemove,
  ComboboxChipText,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxClear,
  ComboboxCollection,
  ComboboxControlActions,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxField,
  ComboboxFieldLabel,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxIcon,
  ComboboxInput,
  ComboboxInlineInputContainer,
  ComboboxInputGroup,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxItemTextContent,
  ComboboxItemTextIcon,
  ComboboxItemTextLabel,
  ComboboxItemText,
  ComboboxList,
  ComboboxStatus,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxFilter,
} from './Combobox';
import styles from './Combobox.stories.module.css';

const meta = {
  title: 'Components/Combobox',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

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
    id: 'dries-vincent',
    name: 'Dries Vincent',
    username: 'dries',
    email: 'dries.vincent@example.com',
    title: 'UX Engineer',
  },
  {
    id: 'lana-steiner',
    name: 'Lana Steiner',
    username: 'lana',
    email: 'lana.steiner@example.com',
    title: 'Product Designer',
  },
  {
    id: 'phoenix-baker',
    name: 'Phoenix Baker',
    username: 'phoenix',
    email: 'phoenix.baker@example.com',
    title: 'Developer Advocate',
  },
];

export const Basic: Story = {
  render: () => {
    const id = React.useId();

    return (
      <Combobox items={fruits}>
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
  },
};

export const IndicatorRightWithIcon: Story = {
  render: () => {
    const id = React.useId();

    return (
      <Combobox items={fruits}>
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
  },
};

export const InputInsidePopup: Story = {
  render: () => {
    return (
      <Combobox items={countries}>
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
  },
};

export const Grouped: Story = {
  render: () => {
    const id = React.useId();

    return (
      <Combobox items={groupedProduce}>
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
  },
};

export const Multiple: Story = {
  render: () => {
    const id = React.useId();

    return (
      <Combobox items={fruits} multiple>
        <ComboboxField className={styles.fieldWide}>
          <ComboboxFieldLabel htmlFor={id}>Select fruits</ComboboxFieldLabel>
          <ComboboxInputGroup className={styles.inputGroupMulti}>
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
                    <ComboboxChipsInput
                      id={id}
                      placeholder={value.length === 0 ? 'Select...' : ''}
                    />
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
  },
};

export const AsyncSearchSingle: Story = {
  render: () => {
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

    async function searchUsers(
      query: string,
    ): Promise<{ users: DirectoryUser[]; error: string | null }> {
      await new Promise((resolve) => {
        setTimeout(resolve, 250);
      });

      if (query === 'error') {
        return {
          users: [],
          error: 'Failed to fetch people. Try again.',
        };
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
        return (
          <React.Fragment>
            <span className={styles.spinner} aria-hidden />
            Searching...
          </React.Fragment>
        );
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

    function getEmptyMessage() {
      if (trimmedSearchValue === '' || isPending || searchResults.length > 0 || error) {
        return null;
      }
      return 'Try a different search term.';
    }

    const status = getStatus();
    const emptyMessage = getEmptyMessage();

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
                <ComboboxItemText className={styles.itemTextMultiline}>
                  <span className={styles.itemTitle}>{user.name}</span>
                  <span className={styles.itemMeta}>
                    <span className={styles.itemUsername}>@{user.username}</span>
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
  },
};

export const CustomStyles: Story = {
  render: () => {
    const id = React.useId();

    return (
      <Combobox items={fruits}>
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
  },
};