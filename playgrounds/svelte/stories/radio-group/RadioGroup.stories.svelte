<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Field, FieldErrorText, FieldHelperText, FieldLabel } from '@/components/field';
  import { Fieldset, FieldsetLegend } from '@/components/fieldset';
  import {
    RadioGroup,
    RadioGroupIndicator,
    RadioGroupItem,
    RadioGroupItemControl,
    RadioGroupItemHiddenInput,
    RadioGroupItemText,
    RadioGroupLabel,
    RadioGroupOption,
    RadioGroupRootProvider,
    useRadioGroup,
  } from '@/components/radio-group';
  import styles from './RadioGroup.stories.module.css';
  import RadioItems from './RadioItems.svelte';
  import RadioOptions from './RadioOptions.svelte';

  const { Story } = defineMeta({
    title: 'Components/RadioGroup',
    component: RadioGroup,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
  });

  const frameworks = ['React', 'Solid', 'Vue'] as const;
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
</script>

<script lang="ts">
  let value: string | null = $state('React');
  const radioGroup = useRadioGroup({ defaultValue: 'React' });
</script>

<Story name="Basic" asChild>
  <RadioGroup defaultValue="React">
    <RadioGroupLabel>Framework</RadioGroupLabel>
    <RadioOptions />
  </RadioGroup>
</Story>

<Story name="Initial Value" asChild>
  <RadioGroup defaultValue="Solid">
    <RadioGroupLabel>Framework</RadioGroupLabel>
    <RadioItems />
  </RadioGroup>
</Story>

<Story name="Controlled" asChild>
  <div class={styles.stack}>
    <RadioGroup bind:value>
      <RadioGroupLabel>Framework</RadioGroupLabel>
      <RadioItems />
    </RadioGroup>
    <span class={styles.hint}>Current value: {value ?? 'none'}</span>
  </div>
</Story>

<Story name="Root Provider" asChild>
  <div class={styles.stack}>
    <RadioGroupRootProvider value={radioGroup}>
      <RadioGroupLabel>Framework</RadioGroupLabel>
      <RadioItems />
    </RadioGroupRootProvider>
    <button class={styles.button} type="button" onclick={() => radioGroup().setValue('Solid')}>
      Set to Solid
    </button>
  </div>
</Story>

<Story name="Orientation" asChild>
  <RadioGroup orientation="horizontal" defaultValue="React">
    <RadioGroupLabel>Framework</RadioGroupLabel>
    <div class={styles.inlineItems}>
      <RadioItems />
    </div>
  </RadioGroup>
</Story>

<Story name="Sizes" asChild>
  <div class={styles.stack}>
    {#each sizes as size (size)}
      <RadioGroup {size} defaultValue="React">
        <RadioGroupLabel>{size.toUpperCase()}</RadioGroupLabel>
        <RadioItems />
      </RadioGroup>
    {/each}
  </div>
</Story>

<Story name="Disabled" asChild>
  <RadioGroup defaultValue="React" disabled>
    <RadioGroupLabel>Framework</RadioGroupLabel>
    <RadioItems />
  </RadioGroup>
</Story>

<Story name="Item Disabled" asChild>
  <RadioGroup defaultValue="React">
    <RadioGroupLabel>Framework</RadioGroupLabel>
    <RadioGroupOption value="React">React</RadioGroupOption>
    <RadioGroupOption disabled value="Solid">Solid</RadioGroupOption>
    <RadioGroupOption value="Vue">Vue</RadioGroupOption>
  </RadioGroup>
</Story>

<Story name="Read Only" asChild>
  <RadioGroup defaultValue="Solid" readOnly>
    <RadioGroupLabel>Framework</RadioGroupLabel>
    <RadioItems />
  </RadioGroup>
</Story>

<Story name="Custom Styling" asChild>
  <RadioGroup defaultValue="React" class={styles.customRoot}>
    <RadioGroupLabel>Styled Framework</RadioGroupLabel>
    {#each frameworks as item (item)}
      <RadioGroupItem value={item} class={styles.customItem}>
        <RadioGroupItemControl class={styles.customControl} />
        <RadioGroupItemText>{item}</RadioGroupItemText>
        <RadioGroupItemHiddenInput />
      </RadioGroupItem>
    {/each}
  </RadioGroup>
</Story>

<Story name="As Child" exportName="AsChild" asChild>
  <RadioGroup defaultValue="React">
    <RadioGroupLabel>Framework</RadioGroupLabel>
    {#each frameworks as item (item)}
      <RadioGroupItem value={item} class={styles.cardItem}>
        {#snippet asChild(props)}
          <label {...props()}>
            <RadioGroupItemControl />
            <RadioGroupItemText>{item}</RadioGroupItemText>
            <RadioGroupItemHiddenInput />
          </label>
        {/snippet}
      </RadioGroupItem>
    {/each}
  </RadioGroup>
</Story>

<Story name="With Indicator" asChild>
  <div class={styles.indicatorStack}>
    <div>Framework</div>
    <RadioGroup aria-label="Framework" defaultValue="React" class={styles.indicatorRoot}>
      <RadioGroupIndicator class={styles.groupIndicator} />
      <RadioItems />
    </RadioGroup>
  </div>
</Story>

<Story name="With Fieldset" asChild>
  <Fieldset class={styles.fieldset}>
    <FieldsetLegend>Select a framework</FieldsetLegend>
    <RadioGroup defaultValue="React">
      <RadioItems />
    </RadioGroup>
  </Fieldset>
</Story>

<Story name="With Field" asChild>
  <Field invalid>
    <FieldLabel>Account type</FieldLabel>
    <RadioGroup invalid required name="account-type">
      <RadioOptions items={['Personal', 'Team']} />
    </RadioGroup>
    <FieldHelperText>Choose the default account context for new projects.</FieldHelperText>
    <FieldErrorText>Choose an account type.</FieldErrorText>
  </Field>
</Story>