import {
  Autocomplete,
  AutocompleteArrow,
  AutocompleteBackdrop,
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
  AutocompletePopup,
  AutocompletePortal,
  AutocompletePositioner,
  AutocompleteRow,
  AutocompleteStatus,
  AutocompleteTrigger,
  AutocompleteValue,
  ChevronUpIcon,
  CloseIcon,
  InfoIcon,
  useAutocompleteFilter,
  useAutocompleteFilteredItems,
} from 'moduix';
import * as React from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';

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

export const autocompleteOverrideCssProperties: CssPropertyInput[] = [
  [
    '--autocomplete-action-bg-hover',
    'var(--color-muted)',
    'Controls trigger and clear hover background.',
  ],
  [
    '--autocomplete-action-color-hover',
    'var(--color-foreground)',
    'Controls trigger and clear hover color.',
  ],
  ['--autocomplete-action-radius', 'var(--radius-sm)', 'Controls trigger and clear button radius.'],
  ['--autocomplete-action-size', '1.5rem', 'Controls trigger and clear button size.'],
  ['--autocomplete-actions-gap', '0.125rem', 'Controls spacing between trigger and clear buttons.'],
  ['--autocomplete-actions-offset-right', '0.5rem', 'Controls right offset for control actions.'],
  ['--autocomplete-arrow-height', '0.625rem', 'Controls optional popup arrow height.'],
  ['--autocomplete-arrow-inline-offset', '13px', 'Controls arrow inline-side offset.'],
  ['--autocomplete-arrow-size', '8px', 'Controls arrow side offset size.'],
  [
    '--autocomplete-arrow-stroke-color',
    'var(--autocomplete-popup-border-color)',
    'Controls optional popup arrow border color.',
  ],
  ['--autocomplete-arrow-width', '1.25rem', 'Controls optional popup arrow width.'],
  [
    '--autocomplete-backdrop-bg',
    'var(--backdrop-bg, var(--color-overlay))',
    'Controls optional backdrop color.',
  ],
  ['--autocomplete-backdrop-blur', '4px', 'Controls optional backdrop blur.'],
  [
    '--autocomplete-backdrop-transition',
    'var(--transition-default)',
    'Controls optional backdrop animation.',
  ],
  ['--autocomplete-bg', 'var(--color-background)', 'Controls control background.'],
  ['--autocomplete-border-color', 'var(--color-border)', 'Controls control border color.'],
  ['--autocomplete-border-width', 'var(--border-width-sm)', 'Controls control border width.'],
  ['--autocomplete-color', 'var(--color-foreground)', 'Controls primary text color.'],
  ['--autocomplete-control-height', 'var(--size-lg)', 'Controls input and trigger height.'],
  [
    '--autocomplete-empty-color',
    'var(--color-muted-foreground)',
    'Controls empty state text color.',
  ],
  ['--autocomplete-empty-font-size', 'var(--text-sm)', 'Controls empty-state font size.'],
  [
    '--autocomplete-empty-line-height',
    'var(--line-height-text-sm)',
    'Controls empty-state line height.',
  ],
  ['--autocomplete-empty-padding-x', '1rem', 'Controls empty-state horizontal padding.'],
  ['--autocomplete-empty-padding-y', '0.75rem', 'Controls empty-state vertical padding.'],
  ['--autocomplete-field-gap', '0.375rem', 'Controls spacing between field label and control.'],
  [
    '--autocomplete-field-trigger-bg-open',
    'var(--color-muted)',
    'Controls field-trigger background when popup is open.',
  ],
  ['--autocomplete-focus-ring-color', 'var(--color-ring)', 'Controls keyboard focus ring color.'],
  [
    '--autocomplete-focus-ring-offset',
    'var(--autocomplete-border-width)',
    'Controls focus ring offset.',
  ],
  [
    '--autocomplete-focus-ring-width',
    'var(--autocomplete-border-width)',
    'Controls focus ring width.',
  ],
  ['--autocomplete-grid-item-min-height', '2.5rem', 'Controls grid item minimum height.'],
  [
    '--autocomplete-grid-item-padding-x',
    'var(--spacing-2)',
    'Controls grid item horizontal padding.',
  ],
  ['--autocomplete-grid-item-width', '2.5rem', 'Controls grid item width.'],
  ['--autocomplete-group-label-bg', 'var(--color-popover)', 'Controls group label background.'],
  [
    '--autocomplete-group-label-color',
    'var(--color-muted-foreground)',
    'Controls group label color.',
  ],
  ['--autocomplete-group-label-font-size', 'var(--text-xs)', 'Controls group label font size.'],
  [
    '--autocomplete-group-label-font-weight',
    'var(--weight-semibold)',
    'Controls group label font weight.',
  ],
  [
    '--autocomplete-group-label-line-height',
    'var(--line-height-text-xs)',
    'Controls group label line height.',
  ],
  ['--autocomplete-group-label-padding-bottom', '0.35rem', 'Controls group label bottom padding.'],
  ['--autocomplete-group-label-padding-top', '0.35rem', 'Controls group label top padding.'],
  ['--autocomplete-group-label-padding-x', '0.625rem', 'Controls group label horizontal padding.'],
  ['--autocomplete-group-padding-bottom', 'var(--spacing-1)', 'Controls group bottom padding.'],
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
    '--autocomplete-highlight-inset-x',
    'var(--spacing-1)',
    'Controls highlighted item horizontal inset.',
  ],
  ['--autocomplete-highlight-radius', 'var(--radius-sm)', 'Controls highlighted item radius.'],
  ['--autocomplete-icon-color', 'var(--color-muted-foreground)', 'Controls default icon color.'],
  ['--autocomplete-icon-size', '0.875rem', 'Controls icon container size.'],
  ['--autocomplete-icon-svg-size', '1rem', 'Controls icon glyph size.'],
  [
    '--autocomplete-inline-input-border-width',
    'var(--border-width-sm)',
    'Controls inline input border width.',
  ],
  [
    '--autocomplete-inline-input-container-padding-bottom',
    'var(--spacing-2)',
    'Controls inline input container bottom padding.',
  ],
  [
    '--autocomplete-inline-input-container-padding-top',
    'var(--spacing-2)',
    'Controls inline input container top padding.',
  ],
  [
    '--autocomplete-inline-input-container-padding-x',
    'var(--spacing-2)',
    'Controls inline input container horizontal padding.',
  ],
  [
    '--autocomplete-inline-input-divider-color',
    'var(--autocomplete-border-color)',
    'Controls inline input container divider color.',
  ],
  [
    '--autocomplete-inline-input-divider-style',
    'solid',
    'Controls inline input container divider style.',
  ],
  [
    '--autocomplete-inline-input-divider-width',
    'var(--border-width-sm)',
    'Controls inline input container divider width.',
  ],
  ['--autocomplete-inline-input-padding-x', '0.75rem', 'Controls inline input horizontal padding.'],
  ['--autocomplete-inline-input-radius', 'var(--radius-sm)', 'Controls inline input radius.'],
  ['--autocomplete-inline-list-padding-bottom', '0.5rem', 'Controls inline list bottom padding.'],
  ['--autocomplete-inline-list-padding-top', '0.375rem', 'Controls inline list top padding.'],
  [
    '--autocomplete-inline-list-scroll-padding-bottom',
    '0.5rem',
    'Controls inline list bottom scroll padding.',
  ],
  [
    '--autocomplete-inline-list-scroll-padding-top',
    '0.375rem',
    'Controls inline list top scroll padding.',
  ],
  ['--autocomplete-input-group-padding-x', '0', 'Controls horizontal input-group padding.'],
  ['--autocomplete-input-padding-x-end', '0.875rem', 'Controls input end padding without actions.'],
  [
    '--autocomplete-input-padding-x-end-with-actions',
    '3.25rem',
    'Controls input end padding when control actions are rendered.',
  ],
  ['--autocomplete-input-padding-x-start', '0.875rem', 'Controls input start padding.'],
  [
    '--autocomplete-input-placeholder-color',
    'var(--color-muted-foreground)',
    'Controls placeholder color.',
  ],
  ['--autocomplete-item-color', 'var(--color-foreground)', 'Controls item text color.'],
  ['--autocomplete-item-font-size', 'var(--text-sm)', 'Controls item font size.'],
  ['--autocomplete-item-line-height', 'var(--line-height-text-sm)', 'Controls item line height.'],
  ['--autocomplete-item-min-height', '2rem', 'Controls item minimum height.'],
  ['--autocomplete-item-padding-x', 'var(--spacing-4)', 'Controls item start padding.'],
  ['--autocomplete-item-padding-x-end', '1rem', 'Controls item end padding.'],
  ['--autocomplete-item-padding-y', 'var(--spacing-2)', 'Controls item vertical padding.'],
  [
    '--autocomplete-item-text-content-gap',
    'var(--spacing-2)',
    'Controls gap between item text content slots.',
  ],
  ['--autocomplete-item-text-icon-color', 'currentColor', 'Controls item text icon color.'],
  ['--autocomplete-item-text-icon-size', '1rem', 'Controls item text icon size.'],
  ['--autocomplete-label-font-size', 'var(--text-sm)', 'Controls field label font size.'],
  ['--autocomplete-label-font-weight', 'var(--weight-medium)', 'Controls field label font weight.'],
  [
    '--autocomplete-label-line-height',
    'var(--line-height-text-sm)',
    'Controls field label line height.',
  ],
  [
    '--autocomplete-list-max-height',
    'var(--autocomplete-popup-max-height)',
    'Controls list max height.',
  ],
  ['--autocomplete-list-padding-y', '0.25rem', 'Controls vertical list padding.'],
  ['--autocomplete-list-scroll-padding-y', '0.25rem', 'Controls list scroll padding.'],
  ['--autocomplete-popup-bg', 'var(--color-popover)', 'Controls popup background.'],
  ['--autocomplete-popup-border-color', 'var(--color-border)', 'Controls popup border color.'],
  ['--autocomplete-popup-border-width', 'var(--border-width-sm)', 'Controls popup border width.'],
  ['--autocomplete-popup-max-height', '24rem', 'Controls the popup max height.'],
  ['--autocomplete-radius', 'var(--radius-md)', 'Controls control and popup radius.'],
  ['--autocomplete-row-gap', 'var(--spacing-1)', 'Controls grid row item gap.'],
  ['--autocomplete-row-padding-x', 'var(--spacing-1)', 'Controls grid row horizontal padding.'],
  ['--autocomplete-separator-margin-x', '1rem', 'Controls separator horizontal margin.'],
  ['--autocomplete-separator-margin-y', '0.375rem', 'Controls separator vertical margin.'],
  ['--autocomplete-separator-size', 'var(--border-width-sm)', 'Controls separator thickness.'],
  ['--autocomplete-shadow', 'var(--shadow-lg)', 'Controls popup shadow.'],
  ['--autocomplete-status-color', 'var(--autocomplete-empty-color)', 'Controls status text color.'],
  [
    '--autocomplete-status-divider-color',
    'var(--autocomplete-popup-border-color)',
    'Controls status divider color.',
  ],
  [
    '--autocomplete-status-divider-width',
    'var(--border-width-sm)',
    'Controls status divider width.',
  ],
  ['--autocomplete-status-font-size', 'var(--text-xs)', 'Controls status font size.'],
  ['--autocomplete-status-gap', 'var(--spacing-1)', 'Controls status content gap.'],
  [
    '--autocomplete-status-line-height',
    'var(--line-height-text-xs)',
    'Controls status line height.',
  ],
  ['--autocomplete-status-padding-x', '0.75rem', 'Controls status horizontal padding.'],
  ['--autocomplete-status-padding-y', '0.5rem', 'Controls status vertical padding.'],
  ['--autocomplete-trigger-gap', '0.75rem', 'Controls field-trigger content gap.'],
  ['--autocomplete-trigger-padding-x', '0.875rem', 'Controls field-trigger horizontal padding.'],
  ['--autocomplete-width', '16rem', 'Controls the control and popup anchor width.'],
];

export const autocompletePlaygroundCssProperties: CssPropertyInput[] = [
  ['--autocomplete-bg', 'var(--color-background)', 'Controls control background.'],
  ['--autocomplete-border-color', 'var(--color-border)', 'Controls control border color.'],
  ['--autocomplete-color', 'var(--color-foreground)', 'Controls primary text color.'],
  ['--autocomplete-empty-color', 'var(--color-muted-foreground)', 'Controls empty text color.'],
  ['--autocomplete-focus-ring-color', 'var(--color-ring)', 'Controls focus ring color.'],
  ['--autocomplete-group-label-font-weight', 'var(--weight-semibold)', 'Controls label weight.'],
  ['--autocomplete-highlight-bg', 'var(--color-foreground)', 'Controls highlighted item bg.'],
  ['--autocomplete-highlight-color', 'var(--color-background)', 'Controls highlighted item text.'],
  ['--autocomplete-icon-color', 'var(--color-muted-foreground)', 'Controls default icon color.'],
  ['--autocomplete-popup-bg', 'var(--color-popover)', 'Controls popup background.'],
  ['--autocomplete-popup-border-color', 'var(--color-border)', 'Controls popup border color.'],
  ['--autocomplete-radius', 'var(--radius-md)', 'Controls control and popup radius.'],
  ['--autocomplete-shadow', 'var(--shadow-lg)', 'Controls popup shadow.'],
];

export function AutocompleteCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <div className="space-y-2">
      <CSSPropertiesReferenceTable
        properties={autocompleteOverrideCssProperties.map(normalizeCssProperty)}
      />
    </div>
  );
}

export function AutocompleteCssPlaygroundPanel({
  values,
  onChange,
  onReset,
}: CSSPropertiesEditorContext) {
  return (
    <div className="space-y-2">
      <CSSPropertiesEditor
        properties={autocompletePlaygroundCssProperties.map(normalizeCssProperty)}
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

export function AutocompleteExample() {
  const id = React.useId();

  return (
    <Autocomplete items={tags} itemToStringValue={(item) => item.value}>
      <AutocompleteField>
        <label htmlFor={id}>Search tags</label>
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
        <label htmlFor={id}>Search grouped tags</label>
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
        <label htmlFor={id}>Search tags with icons</label>
        <AutocompleteInputGroup>
          <AutocompleteInput id={id} placeholder="e.g. feature" />
          <AutocompleteControlActions>
            <AutocompleteClear aria-label="Clear value">
              <CloseIcon />
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
        <label htmlFor={id}>Top 5 matches</label>
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
        <label htmlFor={id}>Auto highlight</label>
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

export function GridAutocompleteExample() {
  const id = React.useId();

  return (
    <Autocomplete
      items={shortcuts}
      itemToStringValue={(item: Shortcut) => item.label}
      grid
      openOnInputClick
    >
      <AutocompleteField>
        <label htmlFor={id}>Shortcut command</label>
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
        <label htmlFor={id}>Fuzzy search</label>
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
      return 'Start typing to search movies...';
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
        <label htmlFor={id}>Search movies by name or year</label>
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

export function CustomCompositionAutocompleteExample() {
  const id = React.useId();

  return (
    <Autocomplete items={tags} itemToStringValue={(item) => item.value}>
      <AutocompleteField>
        <label htmlFor={id}>Search tags</label>
        <AutocompleteInputGroup className="customInputGroup">
          <AutocompleteInput id={id} placeholder="e.g. feature" />
          <AutocompleteControlActions>
            <AutocompleteClear aria-label="Clear value" />
            <AutocompleteTrigger aria-label="Open suggestions" />
          </AutocompleteControlActions>
        </AutocompleteInputGroup>
      </AutocompleteField>

      <AutocompletePortal className="customPortal">
        <AutocompleteBackdrop className="customBackdrop" />
        <AutocompletePositioner className="customPositioner" sideOffset={8}>
          <AutocompletePopup className="customPopup">
            <AutocompleteArrow className="customArrow" />
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
}