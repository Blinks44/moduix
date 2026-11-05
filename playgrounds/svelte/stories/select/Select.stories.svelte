<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import {
    Select,
    SelectContext,
    SelectField,
    SelectHiddenSelect,
    SelectItemGroup,
    SelectItemGroupLabel,
    SelectLabel,
    SelectRootProvider,
    useSelect,
  } from '@/components/select';
  import { ChevronDownIcon } from '@/lib/moduix/icons/ui';
  import { fruits, languages, longLabels, produce, themeOptions } from './collections';
  import InfoIcon from './InfoIcon.svelte';
  import ItemRows from './ItemRows.svelte';
  import styles from './Select.stories.module.css';
  import SelectFieldView from './SelectFieldView.svelte';
  import SelectPopupContent from './SelectPopupContent.svelte';

  const { Story } = defineMeta({
    title: 'Components/Select',
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
  });
</script>

<script lang="ts">
  let value = $state(['light']);
  const select = useSelect({ collection: fruits, defaultValue: ['banana'] });
</script>

{#snippet chevronDown()}<ChevronDownIcon />{/snippet}
{#snippet infoIcon()}<InfoIcon />{/snippet}

<Story name="Basic" asChild>
  <Select collection={fruits}>
    <SelectLabel>Choose fruit</SelectLabel>
    <SelectFieldView />
    <SelectPopupContent>
      <SelectItemGroup>
        <SelectItemGroupLabel>Fruits</SelectItemGroupLabel>
        <ItemRows items={fruits.items} />
      </SelectItemGroup>
    </SelectPopupContent>
  </Select>
</Story>

<Story name="Custom Field Indicator" asChild>
  <Select collection={fruits}>
    <SelectLabel>Choose fruit</SelectLabel>
    <SelectField placeholder="Select an option" indicator={chevronDown} />
    <SelectPopupContent>
      <SelectItemGroup>
        <SelectItemGroupLabel>Fruits</SelectItemGroupLabel>
        <ItemRows items={fruits.items} />
      </SelectItemGroup>
    </SelectPopupContent>
  </Select>
</Story>

<Story name="Grouped" asChild>
  <Select collection={produce}>
    <SelectLabel>Choose produce</SelectLabel>
    <SelectFieldView placeholder="Select item" />
    <SelectPopupContent>
      {#each produce.group() as [type, items] (type)}
        <SelectItemGroup>
          <SelectItemGroupLabel>{type}</SelectItemGroupLabel>
          <ItemRows {items} />
        </SelectItemGroup>
      {/each}
    </SelectPopupContent>
  </Select>
</Story>

<Story name="Multiple" asChild>
  <Select collection={languages} multiple defaultValue={['javascript', 'typescript']}>
    <SelectLabel>Languages</SelectLabel>
    <SelectFieldView placeholder="Select languages" />
    <SelectPopupContent>
      <SelectItemGroup>
        <SelectItemGroupLabel>Languages</SelectItemGroupLabel>
        <ItemRows items={languages.items} />
      </SelectItemGroup>
    </SelectPopupContent>
  </Select>
</Story>

<Story name="Controlled" asChild>
  <div class={styles.stack}>
    <Select bind:value collection={themeOptions}>
      <SelectLabel>Theme</SelectLabel>
      <SelectFieldView placeholder="Select theme" />
      <SelectPopupContent>
        <SelectItemGroup>
          <SelectItemGroupLabel>Theme</SelectItemGroupLabel>
          <ItemRows items={themeOptions.items} />
        </SelectItemGroup>
      </SelectPopupContent>
    </Select>
    <span class={styles.state}>Current value: {value[0] ?? 'none'}</span>
  </div>
</Story>

<Story name="Clear Trigger" asChild>
  <Select collection={themeOptions} defaultValue={['system']} deselectable>
    <SelectLabel>Theme</SelectLabel>
    <SelectFieldView placeholder="Select theme" />
    <SelectPopupContent><ItemRows items={themeOptions.items} /></SelectPopupContent>
  </Select>
</Story>

<Story name="Disabled" asChild>
  <Select collection={fruits} defaultValue={['apple']} disabled>
    <SelectLabel>Unavailable fruit</SelectLabel>
    <SelectFieldView />
    <SelectPopupContent><ItemRows items={fruits.items} /></SelectPopupContent>
  </Select>
</Story>

<Story name="Invalid" asChild>
  <Select collection={fruits} invalid>
    <SelectLabel>Required fruit</SelectLabel>
    <SelectFieldView />
    <SelectPopupContent><ItemRows items={fruits.items} /></SelectPopupContent>
  </Select>
</Story>

<Story name="Long Content" asChild>
  <Select collection={longLabels} defaultValue={['long-label']} positioning={{ sameWidth: true }}>
    <SelectLabel>Delivery preference with a long label</SelectLabel>
    <SelectFieldView />
    <SelectPopupContent><ItemRows items={longLabels.items} /></SelectPopupContent>
  </Select>
</Story>

<Story name="Lazy Mount" asChild>
  <Select collection={fruits} lazyMount unmountOnExit>
    <SelectLabel>Choose fruit</SelectLabel>
    <SelectFieldView />
    <SelectPopupContent>
      <SelectItemGroup>
        <SelectItemGroupLabel>Fruits</SelectItemGroupLabel>
        <ItemRows items={fruits.items} />
      </SelectItemGroup>
    </SelectPopupContent>
  </Select>
</Story>

<Story name="Context" asChild>
  <Select collection={fruits} defaultValue={['apple']}>
    <SelectLabel>Choose fruit</SelectLabel>
    <SelectFieldView />
    <SelectContext>
      {#snippet render(context)}
        <span class={styles.state}>Selected: {context().valueAsString}</span>
      {/snippet}
    </SelectContext>
    <SelectPopupContent>
      <SelectItemGroup>
        <SelectItemGroupLabel>Fruits</SelectItemGroupLabel>
        <ItemRows items={fruits.items} />
      </SelectItemGroup>
    </SelectPopupContent>
  </Select>
</Story>

<Story name="Root Provider" asChild>
  <div class={styles.stack}>
    <span class={styles.state}>Selected: {select().valueAsString}</span>
    <SelectRootProvider value={select}>
      <SelectLabel>Choose fruit</SelectLabel>
      <SelectFieldView />
      <SelectPopupContent>
        <SelectItemGroup>
          <SelectItemGroupLabel>Fruits</SelectItemGroupLabel>
          <ItemRows items={fruits.items} />
        </SelectItemGroup>
      </SelectPopupContent>
    </SelectRootProvider>
  </div>
</Story>

<Story name="Native Form Control" asChild>
  <Select collection={fruits} defaultValue={['apple']} name="fruit">
    <SelectLabel>Choose fruit</SelectLabel>
    <SelectFieldView />
    <SelectPopupContent>
      <SelectItemGroup>
        <SelectItemGroupLabel>Fruits</SelectItemGroupLabel>
        <ItemRows items={fruits.items} />
      </SelectItemGroup>
    </SelectPopupContent>
    <SelectHiddenSelect />
  </Select>
</Story>

<Story name="Custom Item Layout" asChild>
  <Select collection={fruits}>
    <SelectLabel>Choose fruit</SelectLabel>
    <SelectFieldView />
    <SelectPopupContent><ItemRows items={fruits.items} prefix={infoIcon} /></SelectPopupContent>
  </Select>
</Story>