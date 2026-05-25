import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { InfoIcon } from '@/primitives/Icons';
import {
  Autocomplete,
  AutocompleteClear,
  AutocompleteCollection,
  AutocompleteArrow,
  AutocompleteBackdrop,
  AutocompleteContent,
  AutocompleteControlActions,
  AutocompleteEmpty,
  AutocompleteField,
  AutocompleteFieldLabel,
  AutocompleteFieldTrigger,
  AutocompleteInlineInputContainer,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteIcon,
  AutocompleteInput,
  AutocompleteInputGroup,
  AutocompleteItem,
  AutocompleteItemText,
  AutocompleteItemTextContent,
  AutocompleteItemTextIcon,
  AutocompleteItemTextLabel,
  AutocompleteList,
  AutocompletePopup,
  AutocompletePortal,
  AutocompletePositioner,
  AutocompleteRow,
  AutocompleteStatus,
  AutocompleteTrigger,
  AutocompleteValue,
  useAutocompleteFilter,
  useAutocompleteFilteredItems,
} from './Autocomplete';
import styles from './Autocomplete.stories.module.css';

const meta = {
  title: 'Components/Autocomplete',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

interface TagItem {
  id: string;
  value: string;
}

interface GroupedTags {
  value: string;
  items: TagItem[];
}

interface Movie {
  id: string;
  title: string;
  year: number;
}

interface Shortcut {
  id: string;
  value: string;
  label: string;
}

const tags: TagItem[] = [
  { id: 't1', value: 'feature' },
  { id: 't2', value: 'fix' },
  { id: 't3', value: 'bug' },
  { id: 't4', value: 'docs' },
  { id: 't5', value: 'internal' },
  { id: 't6', value: 'mobile' },
  { id: 't7', value: 'design-system' },
  { id: 't8', value: 'ui-library' },
];

const groupedTags: GroupedTags[] = [
  {
    value: 'General',
    items: [
      { id: 'gt-1', value: 'feature' },
      { id: 'gt-2', value: 'fix' },
      { id: 'gt-3', value: 'docs' },
    ],
  },
  {
    value: 'Scope',
    items: [
      { id: 'gt-4', value: 'internal' },
      { id: 'gt-5', value: 'mobile' },
      { id: 'gt-6', value: 'backend' },
    ],
  },
];

const topMovies: Movie[] = [
  { id: '1', title: 'The Shawshank Redemption', year: 1994 },
  { id: '2', title: 'The Godfather', year: 1972 },
  { id: '3', title: 'The Dark Knight', year: 2008 },
  { id: '4', title: 'Pulp Fiction', year: 1994 },
  { id: '5', title: 'Forrest Gump', year: 1994 },
  { id: '6', title: 'Inception', year: 2010 },
  { id: '7', title: 'Interstellar', year: 2014 },
  { id: '8', title: 'The Matrix', year: 1999 },
  { id: '9', title: 'Fight Club', year: 1999 },
  { id: '10', title: 'Spirited Away', year: 2001 },
];

const shortcuts: Shortcut[] = [
  { id: 's1', value: 'N', label: 'New file' },
  { id: 's2', value: 'O', label: 'Open file' },
  { id: 's3', value: 'S', label: 'Save file' },
  { id: 's4', value: 'P', label: 'Print' },
  { id: 's5', value: 'F', label: 'Find' },
  { id: 's6', value: 'R', label: 'Replace' },
  { id: 's7', value: 'Z', label: 'Undo' },
  { id: 's8', value: 'Y', label: 'Redo' },
  { id: 's9', value: 'B', label: 'Bold' },
  { id: 's10', value: 'I', label: 'Italic' },
  { id: 's11', value: 'U', label: 'Underline' },
  { id: 's12', value: 'K', label: 'Link' },
];

function normalizeText(text: string) {
  return text.toLowerCase().trim();
}

function isFuzzyMatch(value: string, query: string) {
  const normalizedValue = normalizeText(value);
  const normalizedQuery = normalizeText(query);

  if (normalizedQuery === '') {
    return true;
  }

  let queryIndex = 0;

  for (const character of normalizedValue) {
    if (character === normalizedQuery[queryIndex]) {
      queryIndex += 1;

      if (queryIndex === normalizedQuery.length) {
        return true;
      }
    }
  }

  return false;
}

function chunkArray<T>(items: T[], size: number) {
  const chunks: T[][] = [];

  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }

  return chunks;
}

function ShortcutGrid() {
  const filteredItems = useAutocompleteFilteredItems<Shortcut>();

  if (filteredItems.length === 0) {
    return null;
  }

  return (
    <AutocompleteList>
      {chunkArray(filteredItems, 6).map((row) => (
        <AutocompleteRow key={row.map((item) => item.id).join('-')}>
          {row.map((item) => (
            <AutocompleteItem key={item.id} value={item} aria-label={item.label}>
              <AutocompleteItemText>{item.value}</AutocompleteItemText>
            </AutocompleteItem>
          ))}
        </AutocompleteRow>
      ))}
    </AutocompleteList>
  );
}

export const Basic: Story = {
  render: () => {
    const id = React.useId();

    return (
      <Autocomplete items={tags} itemToStringValue={(item) => item.value}>
        <AutocompleteField>
          <AutocompleteFieldLabel htmlFor={id}>Search tags</AutocompleteFieldLabel>
          <AutocompleteInputGroup>
            <AutocompleteInput id={id} placeholder="e.g. feature" />
            <AutocompleteControlActions>
              <AutocompleteClear aria-label="Clear value" />
              <AutocompleteTrigger aria-label="Open suggestions" />
            </AutocompleteControlActions>
          </AutocompleteInputGroup>
        </AutocompleteField>

        <AutocompleteContent>
          <AutocompleteEmpty>No tags found.</AutocompleteEmpty>
          <AutocompleteList>
            {(item: TagItem) => (
              <AutocompleteItem key={item.id} value={item}>
                <AutocompleteItemText>{item.value}</AutocompleteItemText>
              </AutocompleteItem>
            )}
          </AutocompleteList>
        </AutocompleteContent>
      </Autocomplete>
    );
  },
};

export const Grouped: Story = {
  render: () => {
    const id = React.useId();

    return (
      <Autocomplete items={groupedTags} itemToStringValue={(item) => item.value}>
        <AutocompleteField>
          <AutocompleteFieldLabel htmlFor={id}>Search grouped tags</AutocompleteFieldLabel>
          <AutocompleteInputGroup>
            <AutocompleteInput id={id} placeholder="e.g. docs" />
            <AutocompleteControlActions>
              <AutocompleteClear aria-label="Clear value" />
              <AutocompleteTrigger aria-label="Open suggestions" />
            </AutocompleteControlActions>
          </AutocompleteInputGroup>
        </AutocompleteField>

        <AutocompleteContent>
          <AutocompleteEmpty>No tags found.</AutocompleteEmpty>
          <AutocompleteList>
            {(group: GroupedTags) => (
              <AutocompleteGroup key={group.value} items={group.items}>
                <AutocompleteGroupLabel>{group.value}</AutocompleteGroupLabel>
                <AutocompleteCollection>
                  {(item: TagItem) => (
                    <AutocompleteItem key={item.id} value={item}>
                      <AutocompleteItemText>{item.value}</AutocompleteItemText>
                    </AutocompleteItem>
                  )}
                </AutocompleteCollection>
              </AutocompleteGroup>
            )}
          </AutocompleteList>
        </AutocompleteContent>
      </Autocomplete>
    );
  },
};

export const WithItemIcons: Story = {
  render: () => {
    const id = React.useId();

    return (
      <Autocomplete items={tags} itemToStringValue={(item) => item.value}>
        <AutocompleteField>
          <AutocompleteFieldLabel htmlFor={id}>Search tags with icons</AutocompleteFieldLabel>
          <AutocompleteInputGroup>
            <AutocompleteInput id={id} placeholder="e.g. feature" />
            <AutocompleteControlActions>
              <AutocompleteClear aria-label="Clear value" />
              <AutocompleteTrigger aria-label="Open suggestions" />
            </AutocompleteControlActions>
          </AutocompleteInputGroup>
        </AutocompleteField>

        <AutocompleteContent>
          <AutocompleteEmpty>No tags found.</AutocompleteEmpty>
          <AutocompleteList>
            {(item: TagItem) => (
              <AutocompleteItem key={item.id} value={item}>
                <AutocompleteItemText>
                  <AutocompleteItemTextContent>
                    <AutocompleteItemTextIcon>
                      <InfoIcon />
                    </AutocompleteItemTextIcon>
                    <AutocompleteItemTextLabel>{item.value}</AutocompleteItemTextLabel>
                  </AutocompleteItemTextContent>
                </AutocompleteItemText>
              </AutocompleteItem>
            )}
          </AutocompleteList>
        </AutocompleteContent>
      </Autocomplete>
    );
  },
};

export const InputInsidePopup: Story = {
  render: () => {
    return (
      <Autocomplete items={tags} itemToStringValue={(item) => item.value}>
        <AutocompleteField>
          <AutocompleteFieldLabel>Tag</AutocompleteFieldLabel>
          <AutocompleteFieldTrigger>
            <AutocompleteValue>{(value) => value || 'Type to search'}</AutocompleteValue>
            <AutocompleteIcon />
          </AutocompleteFieldTrigger>
        </AutocompleteField>

        <AutocompleteContent>
          <AutocompleteInlineInputContainer>
            <AutocompleteInput placeholder="Search tag" />
          </AutocompleteInlineInputContainer>
          <AutocompleteEmpty>No tags found.</AutocompleteEmpty>
          <AutocompleteList>
            {(item: TagItem) => (
              <AutocompleteItem key={item.id} value={item}>
                <AutocompleteItemText>{item.value}</AutocompleteItemText>
              </AutocompleteItem>
            )}
          </AutocompleteList>
        </AutocompleteContent>
      </Autocomplete>
    );
  },
};

export const Limit: Story = {
  render: () => {
    const id = React.useId();

    return (
      <Autocomplete
        items={topMovies}
        itemToStringValue={(item: Movie) => item.title}
        limit={5}
        openOnInputClick
      >
        <AutocompleteField>
          <AutocompleteFieldLabel htmlFor={id}>Top 5 matches</AutocompleteFieldLabel>
          <AutocompleteInputGroup>
            <AutocompleteInput id={id} placeholder="Type movie title" />
            <AutocompleteControlActions>
              <AutocompleteClear aria-label="Clear value" />
              <AutocompleteTrigger aria-label="Open suggestions" />
            </AutocompleteControlActions>
          </AutocompleteInputGroup>
        </AutocompleteField>

        <AutocompleteContent>
          <AutocompleteEmpty>No movies found.</AutocompleteEmpty>
          <AutocompleteList>
            {(movie: Movie) => (
              <AutocompleteItem key={movie.id} value={movie}>
                <AutocompleteItemText>
                  {movie.title} ({movie.year})
                </AutocompleteItemText>
              </AutocompleteItem>
            )}
          </AutocompleteList>
        </AutocompleteContent>
      </Autocomplete>
    );
  },
};

export const AutoHighlight: Story = {
  render: () => {
    const id = React.useId();

    return (
      <Autocomplete
        items={tags}
        itemToStringValue={(item) => item.value}
        autoHighlight="always"
        mode="list"
      >
        <AutocompleteField>
          <AutocompleteFieldLabel htmlFor={id}>Auto highlight</AutocompleteFieldLabel>
          <AutocompleteInputGroup>
            <AutocompleteInput id={id} placeholder="Use arrow keys or type" />
            <AutocompleteControlActions>
              <AutocompleteClear aria-label="Clear value" />
              <AutocompleteTrigger aria-label="Open suggestions" />
            </AutocompleteControlActions>
          </AutocompleteInputGroup>
        </AutocompleteField>

        <AutocompleteContent>
          <AutocompleteEmpty>No tags found.</AutocompleteEmpty>
          <AutocompleteList>
            {(item: TagItem) => (
              <AutocompleteItem key={item.id} value={item}>
                <AutocompleteItemText>{item.value}</AutocompleteItemText>
              </AutocompleteItem>
            )}
          </AutocompleteList>
        </AutocompleteContent>
      </Autocomplete>
    );
  },
};

export const Grid: Story = {
  render: () => {
    const id = React.useId();

    return (
      <Autocomplete
        items={shortcuts}
        itemToStringValue={(item: Shortcut) => item.label}
        grid
        openOnInputClick
      >
        <AutocompleteField>
          <AutocompleteFieldLabel htmlFor={id}>Shortcut command</AutocompleteFieldLabel>
          <AutocompleteInputGroup>
            <AutocompleteInput id={id} placeholder="Type a command" />
            <AutocompleteControlActions>
              <AutocompleteClear aria-label="Clear value" />
              <AutocompleteTrigger aria-label="Open suggestions" />
            </AutocompleteControlActions>
          </AutocompleteInputGroup>
        </AutocompleteField>

        <AutocompleteContent>
          <AutocompleteEmpty>No shortcuts found.</AutocompleteEmpty>
          <ShortcutGrid />
        </AutocompleteContent>
      </Autocomplete>
    );
  },
};

export const Fuzzy: Story = {
  render: () => {
    const id = React.useId();

    return (
      <Autocomplete
        items={topMovies}
        itemToStringValue={(item: Movie) => item.title}
        filter={(item, query, itemToString) => {
          const label = itemToString ? itemToString(item) : String(item);
          return isFuzzyMatch(label, query);
        }}
      >
        <AutocompleteField>
          <AutocompleteFieldLabel htmlFor={id}>Fuzzy search</AutocompleteFieldLabel>
          <AutocompleteInputGroup>
            <AutocompleteInput id={id} placeholder="e.g. tdk or sra" />
            <AutocompleteControlActions>
              <AutocompleteClear aria-label="Clear value" />
              <AutocompleteTrigger aria-label="Open suggestions" />
            </AutocompleteControlActions>
          </AutocompleteInputGroup>
        </AutocompleteField>

        <AutocompleteContent>
          <AutocompleteEmpty>No movies found.</AutocompleteEmpty>
          <AutocompleteList>
            {(movie: Movie) => (
              <AutocompleteItem key={movie.id} value={movie}>
                <AutocompleteItemText>
                  {movie.title} ({movie.year})
                </AutocompleteItemText>
              </AutocompleteItem>
            )}
          </AutocompleteList>
        </AutocompleteContent>
      </Autocomplete>
    );
  },
};

export const AsyncSearch: Story = {
  render: () => {
    const id = React.useId();
    const { contains } = useAutocompleteFilter();

    const [value, setValue] = React.useState('');
    const [searchResults, setSearchResults] = React.useState<Movie[]>([]);
    const [error, setError] = React.useState<string | null>(null);
    const [isPending, startTransition] = React.useTransition();

    const abortControllerRef = React.useRef<AbortController | null>(null);
    const trimmedValue = value.trim();

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

      if (trimmedValue === '') {
        return null;
      }

      if (searchResults.length === 0) {
        return `No matches for "${trimmedValue}".`;
      }

      return `${searchResults.length} result${searchResults.length === 1 ? '' : 's'} found`;
    }

    const status = getStatus();

    return (
      <Autocomplete
        items={searchResults}
        value={value}
        filter={null}
        itemToStringValue={(item: Movie) => item.title}
        onValueChange={(nextValue) => {
          setValue(nextValue);

          const controller = new AbortController();
          abortControllerRef.current?.abort();
          abortControllerRef.current = controller;

          if (nextValue.trim() === '') {
            setSearchResults([]);
            setError(null);
            return;
          }

          startTransition(async () => {
            setError(null);

            await new Promise((resolve) => {
              setTimeout(resolve, 250);
            });

            if (controller.signal.aborted) {
              return;
            }

            if (nextValue.trim().toLowerCase() === 'error') {
              startTransition(() => {
                setSearchResults([]);
                setError('Failed to fetch movies. Try again.');
              });
              return;
            }

            const result = topMovies.filter(
              (movie) =>
                contains(movie.title, nextValue) || contains(movie.year.toString(), nextValue),
            );

            startTransition(() => {
              setSearchResults(result);
              setError(null);
            });
          });
        }}
      >
        <AutocompleteField>
          <AutocompleteFieldLabel htmlFor={id}>
            Search movies by name or year
          </AutocompleteFieldLabel>
          <AutocompleteInputGroup>
            <AutocompleteInput id={id} placeholder="e.g. Pulp Fiction or 1994" />
            <AutocompleteControlActions>
              <AutocompleteClear aria-label="Clear value" />
              <AutocompleteTrigger aria-label="Open suggestions" />
            </AutocompleteControlActions>
          </AutocompleteInputGroup>
        </AutocompleteField>

        <AutocompleteContent sideOffset={4}>
          <AutocompleteStatus>{status}</AutocompleteStatus>
          <AutocompleteEmpty>
            {trimmedValue !== '' && !isPending && !error ? 'Try a different query.' : null}
          </AutocompleteEmpty>
          <AutocompleteList>
            {(movie: Movie) => (
              <AutocompleteItem key={movie.id} value={movie}>
                <AutocompleteItemText>
                  {movie.title} ({movie.year})
                </AutocompleteItemText>
              </AutocompleteItem>
            )}
          </AutocompleteList>
        </AutocompleteContent>
      </Autocomplete>
    );
  },
};

export const CustomStyles: Story = {
  render: () => {
    const id = React.useId();

    return (
      <Autocomplete items={tags} itemToStringValue={(item) => item.value}>
        <AutocompleteField>
          <AutocompleteFieldLabel htmlFor={id}>Search tags</AutocompleteFieldLabel>
          <AutocompleteInputGroup className={styles.customInputGroup}>
            <AutocompleteInput id={id} placeholder="e.g. feature" />
            <AutocompleteControlActions>
              <AutocompleteClear aria-label="Clear value" />
              <AutocompleteTrigger aria-label="Open suggestions" />
            </AutocompleteControlActions>
          </AutocompleteInputGroup>
        </AutocompleteField>

        <AutocompletePortal className={styles.customPortal}>
          <AutocompleteBackdrop className={styles.customBackdrop} />
          <AutocompletePositioner className={styles.customPositioner} sideOffset={8}>
            <AutocompletePopup className={styles.customPopup}>
              <AutocompleteArrow className={styles.customArrow} />
              <AutocompleteEmpty>No tags found.</AutocompleteEmpty>
              <AutocompleteList>
                {(item: TagItem) => (
                  <AutocompleteItem key={item.id} value={item}>
                    <AutocompleteItemText>{item.value}</AutocompleteItemText>
                  </AutocompleteItem>
                )}
              </AutocompleteList>
            </AutocompletePopup>
          </AutocompletePositioner>
        </AutocompletePortal>
      </Autocomplete>
    );
  },
};