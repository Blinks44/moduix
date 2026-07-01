import { useListCollection } from '@ark-ui/react/collection';
import { useFilter } from '@ark-ui/react/locale';
import {
  Combobox,
  Field,
  TagsInput,
  type TagsInputInputValueChangeDetails,
  type TagsInputValueChangeDetails,
  useCombobox,
  useTagsInput,
} from '@moduix/react';
import { useId, useState } from 'react';
import type { CssPropertyInput } from '../preview';
import { CSSPropertiesReferenceTable } from '../preview';
import styles from './tags-input.module.css';

export const initialTags = ['React', 'TypeScript'];
export const pastedTags = ['React', 'Solid', 'Vue'];
export const invalidInitialTags = ['alpha', 'beta', 'gamma'];
const frameworkOptions = ['React', 'Solid', 'Vue', 'Svelte', 'Angular', 'Preact', 'Next.js'];

const tagsInputCssProperties: CssPropertyInput[] = [
  ['--tags-input-bg', 'var(--input-bg, var(--color-background))', 'Controls control background.'],
  [
    '--tags-input-border-color',
    'var(--input-border-color, var(--color-border))',
    'Controls control border color.',
  ],
  [
    '--tags-input-border-width',
    'var(--input-border-width, var(--border-width-sm))',
    'Controls control border width.',
  ],
  ['--tags-input-clear-trigger-bg', 'transparent', 'Controls clear trigger background.'],
  [
    '--tags-input-clear-trigger-bg-hover',
    'var(--color-muted)',
    'Controls clear trigger hover background.',
  ],
  [
    '--tags-input-clear-trigger-color',
    'var(--color-muted-foreground)',
    'Controls clear trigger color.',
  ],
  [
    '--tags-input-clear-trigger-color-hover',
    'var(--color-foreground)',
    'Controls clear trigger hover color.',
  ],
  ['--tags-input-clear-trigger-icon-size', '0.75rem', 'Controls clear trigger icon size.'],
  ['--tags-input-clear-trigger-radius', 'var(--radius-sm)', 'Controls clear trigger radius.'],
  ['--tags-input-clear-trigger-size', '1.5rem', 'Controls clear trigger size.'],
  ['--tags-input-color', 'var(--input-color, var(--color-foreground))', 'Controls text color.'],
  ['--tags-input-control-gap', 'var(--spacing-1)', 'Controls spacing inside the control.'],
  ['--tags-input-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled opacity.'],
  [
    '--tags-input-focus-ring-color',
    'var(--input-focus-ring-color, var(--color-ring))',
    'Controls focus ring color.',
  ],
  [
    '--tags-input-focus-ring-offset',
    'var(--input-focus-ring-offset)',
    'Controls focus ring offset.',
  ],
  [
    '--tags-input-focus-ring-width',
    'var(--input-focus-ring-width, var(--border-width-sm))',
    'Controls focus ring width.',
  ],
  ['--tags-input-gap', 'var(--field-gap, var(--spacing-1))', 'Controls root vertical gap.'],
  [
    '--tags-input-input-font-size',
    'var(--input-font-size, var(--text-sm))',
    'Controls entry input font size.',
  ],
  ['--tags-input-input-height', '1.5rem', 'Controls entry input height.'],
  [
    '--tags-input-input-line-height',
    'var(--input-line-height, var(--line-height-text-sm))',
    'Controls entry input line height.',
  ],
  ['--tags-input-input-min-width', '7rem', 'Controls entry input minimum width.'],
  ['--tags-input-input-padding-x', '0.25rem', 'Controls entry input horizontal padding.'],
  [
    '--tags-input-invalid-border-color',
    'var(--input-border-color-invalid, var(--color-destructive))',
    'Controls invalid border color.',
  ],
  [
    '--tags-input-invalid-focus-ring-color',
    'var(--input-border-color-invalid, var(--color-destructive))',
    'Controls invalid focus ring color.',
  ],
  ['--tags-input-item-bg', 'var(--color-secondary)', 'Controls tag background color.'],
  ['--tags-input-item-border-color', 'transparent', 'Controls tag border color.'],
  ['--tags-input-item-border-width', 'var(--border-width-sm)', 'Controls tag border width.'],
  ['--tags-input-item-color', 'var(--color-secondary-foreground)', 'Controls tag text color.'],
  ['--tags-input-item-font-size', 'var(--text-xs)', 'Controls tag font size.'],
  ['--tags-input-item-font-weight', 'var(--weight-medium)', 'Controls tag font weight.'],
  ['--tags-input-item-gap', 'var(--spacing-1)', 'Controls spacing inside each tag.'],
  ['--tags-input-item-height', '1.5rem', 'Controls tag minimum height.'],
  [
    '--tags-input-item-highlight-ring-color',
    'var(--color-ring)',
    'Controls highlighted tag ring color.',
  ],
  [
    '--tags-input-item-highlight-ring-width',
    'var(--border-width-sm)',
    'Controls highlighted tag ring width.',
  ],
  ['--tags-input-item-input-width', '7rem', 'Controls edit input width.'],
  ['--tags-input-item-line-height', 'var(--line-height-text-xs)', 'Controls tag line height.'],
  ['--tags-input-item-padding-x', '0.5rem', 'Controls tag horizontal padding.'],
  ['--tags-input-item-padding-y', '0.125rem', 'Controls tag vertical padding.'],
  ['--tags-input-item-radius', 'var(--radius-full)', 'Controls tag corner radius.'],
  [
    '--tags-input-label-color',
    'var(--field-label-color, var(--color-foreground))',
    'Controls label color.',
  ],
  [
    '--tags-input-label-font-size',
    'var(--field-label-font-size, var(--text-sm))',
    'Controls label font size.',
  ],
  [
    '--tags-input-label-font-weight',
    'var(--field-label-font-weight, var(--weight-medium))',
    'Controls label font weight.',
  ],
  ['--tags-input-label-gap', 'var(--field-label-gap, var(--spacing-1))', 'Controls label gap.'],
  [
    '--tags-input-label-line-height',
    'var(--field-label-line-height, var(--line-height-text-sm))',
    'Controls label line height.',
  ],
  ['--tags-input-max-width', '24rem', 'Controls root max width.'],
  [
    '--tags-input-min-height',
    'var(--input-height, var(--size-lg))',
    'Controls control minimum height.',
  ],
  ['--tags-input-padding-x', '0.5rem', 'Controls horizontal control padding.'],
  ['--tags-input-padding-y', '0.3125rem', 'Controls vertical control padding.'],
  [
    '--tags-input-placeholder-color',
    'var(--input-placeholder-color, var(--color-muted-foreground))',
    'Controls entry input placeholder color.',
  ],
  ['--tags-input-radius', 'var(--input-radius, var(--radius-md))', 'Controls control radius.'],
  [
    '--tags-input-readonly-bg',
    'var(--input-readonly-bg, var(--color-background))',
    'Controls read-only control background.',
  ],
  [
    '--tags-input-readonly-color',
    'var(--input-readonly-color, var(--color-foreground))',
    'Controls read-only text color.',
  ],
  [
    '--tags-input-transition',
    'var(--input-transition, var(--transition-default))',
    'Controls component state transitions.',
  ],
  ['--tags-input-trigger-bg', 'transparent', 'Controls item delete trigger background.'],
  [
    '--tags-input-trigger-bg-hover',
    'color-mix(in oklab, currentColor 12%, transparent)',
    'Controls item delete trigger hover background.',
  ],
  ['--tags-input-trigger-color', 'currentColor', 'Controls item delete trigger color.'],
  [
    '--tags-input-trigger-focus-ring-color',
    'var(--color-ring)',
    'Controls trigger focus ring color.',
  ],
  ['--tags-input-trigger-focus-ring-offset', '2px', 'Controls clear trigger focus offset.'],
  [
    '--tags-input-trigger-focus-ring-width',
    'var(--border-width-sm)',
    'Controls trigger focus ring width.',
  ],
  ['--tags-input-trigger-icon-size', '0.625rem', 'Controls trigger icon size.'],
  ['--tags-input-trigger-radius', 'var(--radius-full)', 'Controls item delete trigger radius.'],
  ['--tags-input-trigger-size', '1rem', 'Controls item delete trigger size.'],
  ['--tags-input-width', '100%', 'Controls root width.'],
];

export function TagsInputCssPropertiesPanel() {
  return (
    <CSSPropertiesReferenceTable properties={tagsInputCssProperties.map(normalizeCssProperty)} />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}

function TagsInputItems({ value }: { value: string[] }) {
  return value.map((item, index) => (
    <TagsInput.Item key={`${item}-${index}`} index={index} value={item}>
      <TagsInput.ItemPreview>
        <TagsInput.ItemText>{item}</TagsInput.ItemText>
        <TagsInput.ItemDeleteTrigger aria-label={`Remove ${item}`} />
      </TagsInput.ItemPreview>
      <TagsInput.ItemInput />
    </TagsInput.Item>
  ));
}

export function TagsInputExample() {
  return (
    <TagsInput defaultValue={initialTags} name="frameworks">
      <TagsInput.Label>Frameworks</TagsInput.Label>
      <TagsInput.Control>
        <TagsInput.Context>
          {(tagsInput) => <TagsInputItems value={tagsInput.value} />}
        </TagsInput.Context>
        <TagsInput.Input placeholder="Add framework" />
        <TagsInput.ClearTrigger aria-label="Clear frameworks" />
      </TagsInput.Control>
      <TagsInput.HiddenInput />
    </TagsInput>
  );
}

export function TagsInputControlledExample() {
  const [value, setValue] = useState(initialTags);

  function handleValueChange(details: TagsInputValueChangeDetails) {
    setValue(details.value);
  }

  return (
    <div className={styles.stack}>
      <TagsInput value={value} onValueChange={handleValueChange}>
        <TagsInput.Label>Skills</TagsInput.Label>
        <TagsInput.Control>
          <TagsInputItems value={value} />
          <TagsInput.Input placeholder="Add skill" />
          <TagsInput.ClearTrigger aria-label="Clear skills" />
        </TagsInput.Control>
        <TagsInput.HiddenInput />
      </TagsInput>
      <span className={styles.hint}>Current value: {value.join(', ') || 'empty'}</span>
    </div>
  );
}

export function TagsInputControlledInputExample() {
  const [inputValue, setInputValue] = useState('');

  function handleInputValueChange(details: TagsInputInputValueChangeDetails) {
    setInputValue(details.inputValue);
  }

  return (
    <div className={styles.stack}>
      <div className={styles.actions}>
        <button type="button" onClick={() => setInputValue('React')}>
          Set React
        </button>
        <button type="button" onClick={() => setInputValue('')}>
          Clear input
        </button>
      </div>
      <TagsInput
        defaultValue={['Solid']}
        inputValue={inputValue}
        onInputValueChange={handleInputValueChange}
      >
        <TagsInput.Label>Frameworks</TagsInput.Label>
        <TagsInput.Control>
          <TagsInput.Context>
            {(tagsInput) => <TagsInputItems value={tagsInput.value} />}
          </TagsInput.Context>
          <TagsInput.Input placeholder="Add framework" />
          <TagsInput.ClearTrigger aria-label="Clear frameworks" />
        </TagsInput.Control>
        <TagsInput.HiddenInput />
      </TagsInput>
      <span className={styles.hint}>Input value: {inputValue || 'empty'}</span>
    </div>
  );
}

export function TagsInputDelimiterPasteExample() {
  return (
    <TagsInput defaultValue={pastedTags} delimiter={/[,;\s]/} addOnPaste>
      <TagsInput.Label>Frameworks</TagsInput.Label>
      <TagsInput.Control>
        <TagsInput.Context>
          {(tagsInput) => <TagsInputItems value={tagsInput.value} />}
        </TagsInput.Context>
        <TagsInput.Input placeholder="Comma, semicolon, or space" />
        <TagsInput.ClearTrigger aria-label="Clear frameworks" />
      </TagsInput.Control>
      <TagsInput.HiddenInput />
    </TagsInput>
  );
}

export function TagsInputValidationExample() {
  const [invalidReason, setInvalidReason] = useState('none');

  return (
    <div className={styles.stack}>
      <TagsInput
        max={3}
        maxLength={12}
        defaultValue={invalidInitialTags}
        validate={(details) => {
          return details.inputValue.length >= 3 && !details.value.includes(details.inputValue);
        }}
        onValueInvalid={(details) => {
          setInvalidReason(details.reason);
        }}
      >
        <TagsInput.Label>Labels</TagsInput.Label>
        <TagsInput.Control>
          <TagsInput.Context>
            {(tagsInput) => <TagsInputItems value={tagsInput.value} />}
          </TagsInput.Context>
          <TagsInput.Input placeholder="Add unique label" />
          <TagsInput.ClearTrigger aria-label="Clear labels" />
        </TagsInput.Control>
        <TagsInput.HiddenInput />
      </TagsInput>
      <span className={styles.hint}>Last invalid reason: {invalidReason}</span>
    </div>
  );
}

export function TagsInputAllowDuplicatesExample() {
  return (
    <TagsInput allowDuplicates defaultValue={['React', 'React']}>
      <TagsInput.Label>Frameworks</TagsInput.Label>
      <TagsInput.Control>
        <TagsInput.Context>
          {(tagsInput) => <TagsInputItems value={tagsInput.value} />}
        </TagsInput.Context>
        <TagsInput.Input placeholder="Add framework" />
        <TagsInput.ClearTrigger aria-label="Clear frameworks" />
      </TagsInput.Control>
      <TagsInput.HiddenInput />
    </TagsInput>
  );
}

export function TagsInputMaxOverflowExample() {
  return (
    <TagsInput max={2} allowOverflow defaultValue={['React', 'Solid']}>
      <TagsInput.Label>Frameworks</TagsInput.Label>
      <TagsInput.Control>
        <TagsInput.Context>
          {(tagsInput) => <TagsInputItems value={tagsInput.value} />}
        </TagsInput.Context>
        <TagsInput.Input placeholder="Add framework" />
        <TagsInput.ClearTrigger aria-label="Clear frameworks" />
      </TagsInput.Control>
      <TagsInput.HiddenInput />
    </TagsInput>
  );
}

export function TagsInputSanitizeBlurExample() {
  return (
    <TagsInput
      blurBehavior="add"
      sanitizeValue={(value) => value.trim().toLowerCase()}
      defaultValue={['design']}
    >
      <TagsInput.Label>Topics</TagsInput.Label>
      <TagsInput.Control>
        <TagsInput.Context>
          {(tagsInput) => <TagsInputItems value={tagsInput.value} />}
        </TagsInput.Context>
        <TagsInput.Input placeholder="Blur to add" />
        <TagsInput.ClearTrigger aria-label="Clear topics" />
      </TagsInput.Control>
      <TagsInput.HiddenInput />
    </TagsInput>
  );
}

export function TagsInputComboboxExample() {
  const { contains } = useFilter({ sensitivity: 'base' });
  const { collection, filter } = useListCollection({
    initialItems: frameworkOptions,
    filter: contains,
  });
  const id = useId();
  const ids = { input: `${id}-input`, control: `${id}-control` };
  const tagsInput = useTagsInput({ ids });
  const combobox = useCombobox({
    ids,
    collection,
    value: [],
    allowCustomValue: true,
    selectionBehavior: 'clear',
    onInputValueChange: (details) => {
      filter(details.inputValue);
    },
    onValueChange: (details) => {
      if (details.value[0]) {
        tagsInput.addValue(details.value[0]);
      }
    },
  });

  return (
    <Combobox.RootProvider value={combobox}>
      <TagsInput.RootProvider value={tagsInput}>
        <TagsInput.Label>Frameworks</TagsInput.Label>
        <TagsInput.Control>
          <TagsInputItems value={tagsInput.value} />
          <Combobox.Input asChild>
            <TagsInput.Input placeholder="Add framework" />
          </Combobox.Input>
          <TagsInput.ClearTrigger aria-label="Clear frameworks" />
        </TagsInput.Control>
        <TagsInput.HiddenInput />
      </TagsInput.RootProvider>
      <Combobox.Positioner>
        <Combobox.Content className={styles.comboboxContent}>
          <Combobox.Empty className={styles.comboboxItem}>No frameworks found.</Combobox.Empty>
          {collection.items.map((item) => (
            <Combobox.Item key={item} item={item} className={styles.comboboxItem}>
              <Combobox.ItemText>{item}</Combobox.ItemText>
              <Combobox.ItemIndicator />
            </Combobox.Item>
          ))}
        </Combobox.Content>
      </Combobox.Positioner>
    </Combobox.RootProvider>
  );
}

export function TagsInputFieldExample() {
  return (
    <Field invalid required className={styles.field}>
      <TagsInput defaultValue={['api']} name="topics">
        <TagsInput.Label>Topics</TagsInput.Label>
        <TagsInput.Control>
          <TagsInput.Context>
            {(tagsInput) => <TagsInputItems value={tagsInput.value} />}
          </TagsInput.Context>
          <TagsInput.Input placeholder="Add topic" />
          <TagsInput.ClearTrigger aria-label="Clear topics" />
        </TagsInput.Control>
        <TagsInput.HiddenInput />
      </TagsInput>
      <Field.HelperText>Add at least one topic.</Field.HelperText>
      <Field.ErrorText>Topics are required.</Field.ErrorText>
    </Field>
  );
}

export function TagsInputStateExample() {
  return (
    <div className={styles.stack}>
      <TagsInput disabled defaultValue={['disabled']}>
        <TagsInput.Label>Disabled</TagsInput.Label>
        <TagsInput.Control>
          <TagsInput.Context>
            {(tagsInput) => <TagsInputItems value={tagsInput.value} />}
          </TagsInput.Context>
          <TagsInput.Input placeholder="Unavailable" />
        </TagsInput.Control>
        <TagsInput.HiddenInput />
      </TagsInput>
      <TagsInput readOnly defaultValue={['read-only']}>
        <TagsInput.Label>Read-only</TagsInput.Label>
        <TagsInput.Control>
          <TagsInput.Context>
            {(tagsInput) => <TagsInputItems value={tagsInput.value} />}
          </TagsInput.Context>
          <TagsInput.Input placeholder="Read-only" />
          <TagsInput.ClearTrigger aria-label="Clear read-only tags" />
        </TagsInput.Control>
        <TagsInput.HiddenInput />
      </TagsInput>
    </div>
  );
}

export function TagsInputDisableEditingExample() {
  return (
    <TagsInput editable={false} defaultValue={initialTags}>
      <TagsInput.Label>Frameworks</TagsInput.Label>
      <TagsInput.Control>
        <TagsInput.Context>
          {(tagsInput) => <TagsInputItems value={tagsInput.value} />}
        </TagsInput.Context>
        <TagsInput.Input placeholder="Add framework" />
        <TagsInput.ClearTrigger aria-label="Clear frameworks" />
      </TagsInput.Control>
      <TagsInput.HiddenInput />
    </TagsInput>
  );
}

export function TagsInputRootProviderExample() {
  const id = useId();
  const tagsInput = useTagsInput({ id, defaultValue: ['React'] });

  return (
    <div className={styles.stack}>
      <div className={styles.actions}>
        <button type="button" onClick={() => tagsInput.addValue('Solid')}>
          Add Solid
        </button>
        <button type="button" onClick={() => tagsInput.clearValue()}>
          Clear
        </button>
        <button type="button" onClick={tagsInput.focus}>
          Focus
        </button>
      </div>
      <TagsInput.RootProvider value={tagsInput}>
        <TagsInput.Label>Frameworks</TagsInput.Label>
        <TagsInput.Control>
          <TagsInputItems value={tagsInput.value} />
          <TagsInput.Input placeholder="Add framework" />
          <TagsInput.ClearTrigger aria-label="Clear frameworks" />
        </TagsInput.Control>
        <TagsInput.HiddenInput />
      </TagsInput.RootProvider>
    </div>
  );
}

export function TagsInputCustomStylingExample() {
  return (
    <TagsInput className={styles.customRoot} defaultValue={['Design', 'API']}>
      <TagsInput.Label>Workstreams</TagsInput.Label>
      <TagsInput.Control>
        <TagsInput.Context>
          {(tagsInput) => <TagsInputItems value={tagsInput.value} />}
        </TagsInput.Context>
        <TagsInput.Input placeholder="Add workstream" />
        <TagsInput.ClearTrigger aria-label="Clear workstreams" />
      </TagsInput.Control>
      <TagsInput.HiddenInput />
    </TagsInput>
  );
}