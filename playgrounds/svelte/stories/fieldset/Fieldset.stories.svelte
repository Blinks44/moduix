<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import {
    Checkbox,
    CheckboxControl,
    CheckboxHiddenInput,
    CheckboxIndicator,
    CheckboxLabel,
  } from '@/components/checkbox';
  import { Field, FieldLabel } from '@/components/field';
  import {
    Fieldset,
    FieldsetErrorText,
    FieldsetHelperText,
    FieldsetLegend,
    FieldsetRootProvider,
    useFieldset,
  } from '@/components/fieldset';
  import { Input } from '@/components/input';
  import {
    RadioGroup,
    RadioGroupItem,
    RadioGroupItemControl,
    RadioGroupItemHiddenInput,
    RadioGroupItemText,
  } from '@/components/radio-group';
  import styles from './Fieldset.stories.module.css';

  const { Story } = defineMeta({
    title: 'Components/Fieldset',
    component: Fieldset,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
  });
</script>

<script lang="ts">
  const fieldset = useFieldset({ id: 'root-provider-fieldset', invalid: true });
</script>

<Story name="Default" asChild>
  <Fieldset>
    <FieldsetLegend>Billing details</FieldsetLegend>
    <Field>
      <FieldLabel>Company</FieldLabel>
      <Input placeholder="Enter company name" />
    </Field>
    <Field>
      <FieldLabel>Tax ID</FieldLabel>
      <Input placeholder="Enter tax ID" />
    </Field>
    <FieldsetHelperText>Use the legal details shown on your invoice.</FieldsetHelperText>
  </Fieldset>
</Story>

<Story name="Invalid" asChild>
  <Fieldset invalid>
    <FieldsetLegend>Contact details</FieldsetLegend>
    <Field invalid>
      <FieldLabel>Email</FieldLabel>
      <Input type="email" defaultValue="invalid-address" />
    </Field>
    <FieldsetErrorText>Enter a valid email address.</FieldsetErrorText>
  </Fieldset>
</Story>

<Story name="Disabled" asChild>
  <Fieldset disabled>
    <FieldsetLegend>Disabled account details</FieldsetLegend>
    <Field>
      <FieldLabel>Email</FieldLabel>
      <Input defaultValue="team@example.com" />
    </Field>
    <Field>
      <FieldLabel>Phone</FieldLabel>
      <Input defaultValue="+1 (555) 123-45-67" />
    </Field>
  </Fieldset>
</Story>

<Story name="With Checkbox" asChild>
  <Fieldset>
    <FieldsetLegend>Email preferences</FieldsetLegend>
    <Checkbox defaultChecked>
      <CheckboxControl>
        <CheckboxIndicator />
      </CheckboxControl>
      <CheckboxLabel>Product updates</CheckboxLabel>
      <CheckboxHiddenInput />
    </Checkbox>
    <Checkbox>
      <CheckboxControl>
        <CheckboxIndicator />
      </CheckboxControl>
      <CheckboxLabel>Marketing emails</CheckboxLabel>
      <CheckboxHiddenInput />
    </Checkbox>
  </Fieldset>
</Story>

<Story name="With Radio Group" asChild>
  <Fieldset>
    <FieldsetLegend>Storage type</FieldsetLegend>
    <RadioGroup defaultValue="ssd">
      {#each ['ssd', 'hdd'] as value (value)}
        <RadioGroupItem {value}>
          <RadioGroupItemControl />
          <RadioGroupItemText>{value.toUpperCase()}</RadioGroupItemText>
          <RadioGroupItemHiddenInput />
        </RadioGroupItem>
      {/each}
    </RadioGroup>
    <FieldsetHelperText>Choose the primary storage medium.</FieldsetHelperText>
  </Fieldset>
</Story>

<Story name="Long Content" asChild>
  <Fieldset invalid>
    <FieldsetLegend>
      International tax residency and withholding election for non-resident account holders
    </FieldsetLegend>
    <Field invalid>
      <FieldLabel>Tax identification number</FieldLabel>
      <Input />
    </Field>
    <FieldsetHelperText>
      Enter the tax identification number issued by your country of tax residence.
    </FieldsetHelperText>
    <FieldsetErrorText>
      A tax identification number is required before you can continue.
    </FieldsetErrorText>
  </Fieldset>
</Story>

<Story name="Root Provider" asChild>
  <FieldsetRootProvider value={fieldset}>
    <FieldsetLegend>External state</FieldsetLegend>
    <Field invalid>
      <FieldLabel>Project name</FieldLabel>
      <Input defaultValue="" />
    </Field>
    <FieldsetErrorText>A project name is required.</FieldsetErrorText>
  </FieldsetRootProvider>
</Story>

<Story name="Custom Styles" asChild>
  <Fieldset class={styles.customFieldset}>
    <FieldsetLegend class={styles.customLegend}>Styled fieldset</FieldsetLegend>
    <Field class={styles.customField}>
      <FieldLabel class={styles.customLabel}>Project name</FieldLabel>
      <Input placeholder="Maps Platform" class={styles.customControl} />
    </Field>
    <FieldsetHelperText class={styles.customHelper}>Visible to project members.</FieldsetHelperText>
  </Fieldset>
</Story>