import {
  Autocomplete,
  AutocompleteClear,
  AutocompleteCollection,
  AutocompleteContent,
  AutocompleteControlActions,
  AutocompleteEmpty,
  AutocompleteField,
  AutocompleteFieldLabel,
  AutocompleteFieldTrigger,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteIcon,
  AutocompleteInlineInputContainer,
  AutocompleteInput,
  AutocompleteInputGroup,
  AutocompleteItem,
  AutocompleteItemText,
  AutocompleteItemTextContent,
  AutocompleteItemTextIcon,
  AutocompleteItemTextLabel,
  AutocompleteList,
  AutocompleteStatus,
  AutocompleteTrigger,
  AutocompleteValue,
  ChevronUpIcon,
  CloseLineIcon,
  InfoIcon,
  useAutocompleteFilter,
} from 'moduix';
import * as React from 'react';
import type { CssPropertyInput } from '../preview';
import styles from './autocomplete.module.css';

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

export const autocompleteCssProperties: CssPropertyInput[] = [
  ['--autocomplete-width', '18rem', 'Controls the control and popup anchor width.'],
  ['--autocomplete-control-height', 'var(--size-lg)', 'Controls input and trigger height.'],
  ['--autocomplete-radius', 'var(--radius-md)', 'Controls control and popup radius.'],
  ['--autocomplete-bg', 'var(--color-background)', 'Controls control background.'],
  ['--autocomplete-color', 'var(--color-foreground)', 'Controls primary text color.'],
  ['--autocomplete-border-color', 'var(--color-border)', 'Controls control border color.'],
  ['--autocomplete-focus-ring-color', 'var(--color-ring)', 'Controls keyboard focus ring color.'],
  ['--autocomplete-popup-bg', 'var(--color-popover)', 'Controls popup background.'],
  ['--autocomplete-popup-border-color', 'var(--color-border)', 'Controls popup border color.'],
  ['--autocomplete-popup-max-height', '24rem', 'Controls the popup max height.'],
  ['--autocomplete-shadow', 'var(--shadow-lg)', 'Controls popup shadow.'],
  ['--autocomplete-list-padding-y', '0.25rem', 'Controls vertical list padding.'],
  ['--autocomplete-item-min-height', '2rem', 'Controls item minimum height.'],
  ['--autocomplete-item-padding-y', 'var(--spacing-2)', 'Controls item vertical padding.'],
  ['--autocomplete-item-padding-x', 'var(--spacing-4)', 'Controls item start padding.'],
  [
    '--autocomplete-highlight-bg',
    'var(--color-foreground)',
    'Controls highlighted item background.',
  ],
  [
    '--autocomplete-highlight-color',
    'var(--color-background)',
    'Controls highlighted item text color.',
  ],
  [
    '--autocomplete-empty-color',
    'var(--color-muted-foreground)',
    'Controls empty state text color.',
  ],
  ['--autocomplete-icon-color', 'var(--color-muted-foreground)', 'Controls default icon color.'],
  ['--autocomplete-action-size', '1.5rem', 'Controls trigger and clear button size.'],
  ['--autocomplete-backdrop-bg', 'var(--backdrop-bg)', 'Controls optional backdrop color.'],
  ['--autocomplete-backdrop-blur', '2px', 'Controls optional backdrop blur.'],
  [
    '--autocomplete-backdrop-transition',
    'var(--transition-default)',
    'Controls optional backdrop animation.',
  ],
  ['--autocomplete-arrow-width', '1.25rem', 'Controls optional popup arrow width.'],
  ['--autocomplete-arrow-height', '0.625rem', 'Controls optional popup arrow height.'],
  [
    '--autocomplete-arrow-stroke-color',
    'var(--color-border)',
    'Controls optional popup arrow border color.',
  ],
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

export function AutocompleteExample() {
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
}

export function GroupedAutocompleteExample() {
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
}

export function ItemIconsAutocompleteExample() {
  const id = React.useId();

  return (
    <Autocomplete items={tags} itemToStringValue={(item) => item.value}>
      <AutocompleteField>
        <AutocompleteFieldLabel htmlFor={id}>Search tags with icons</AutocompleteFieldLabel>
        <AutocompleteInputGroup>
          <AutocompleteInput id={id} placeholder="e.g. feature" />
          <AutocompleteControlActions>
            <AutocompleteClear aria-label="Clear value">
              <CloseLineIcon />
            </AutocompleteClear>
            <AutocompleteTrigger aria-label="Open suggestions">
              <ChevronUpIcon />
            </AutocompleteTrigger>
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
}

export function InputInsidePopupAutocompleteExample() {
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
}

export function LimitAutocompleteExample() {
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
}

export function AutoHighlightAutocompleteExample() {
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
}

export function FuzzyAutocompleteExample() {
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
}

export function AsyncSearchAutocompleteExample() {
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
      return 'Searching...';
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
        <AutocompleteFieldLabel htmlFor={id}>Search movies by name or year</AutocompleteFieldLabel>
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
}

export function PopupOptionsAutocompleteExample() {
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

      <AutocompleteContent
        sideOffset={8}
        showArrow
        withBackdrop
        classNames={{
          backdrop: styles.backdrop,
          arrow: styles.arrow,
        }}
      >
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
}