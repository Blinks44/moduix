<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import {
    Checkbox,
    CheckboxControl,
    CheckboxHiddenInput,
    CheckboxIndicator,
    CheckboxLabel,
  } from '@/components/checkbox';
  import {
    Field,
    FieldErrorText,
    FieldHelperText,
    FieldItem,
    FieldLabel,
    FieldRequiredIndicator,
    FieldRootProvider,
    useField,
  } from '@/components/field';
  import { Input } from '@/components/input';
  import { NativeSelect } from '@/components/native-select';
  import {
    RadioGroup,
    RadioGroupItem,
    RadioGroupItemControl,
    RadioGroupItemHiddenInput,
    RadioGroupItemText,
  } from '@/components/radio-group';
  import { Textarea } from '@/components/textarea';

  const { Story } = defineMeta({
    title: 'Components/Field',
    component: Field,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
  });
</script>

<script lang="ts">
  let value = $state('');
  const invalid = $derived(value.length > 0 && value.length < 3);
  const field = useField({ id: 'root-provider-field', required: true });
</script>

<Story name="Input Parity" asChild>
  <div
    style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; width: 36rem"
  >
    <Field>
      <FieldLabel>Input Default</FieldLabel>
      <Input placeholder="Enter your name" />
    </Field>
    <Field>
      <FieldLabel>Input Default</FieldLabel>
      <Input placeholder="Enter your name" />
    </Field>
    <Field invalid>
      <FieldLabel>Input Invalid</FieldLabel>
      <Input placeholder="name@example.com" />
    </Field>
    <Field invalid>
      <FieldLabel>Input Invalid</FieldLabel>
      <Input placeholder="name@example.com" />
    </Field>
    <Field readOnly>
      <FieldLabel>Input Read-only</FieldLabel>
      <Input placeholder="Workspace key" />
    </Field>
    <Field readOnly>
      <FieldLabel>Input Read-only</FieldLabel>
      <Input placeholder="Workspace key" />
    </Field>
    <Field disabled>
      <FieldLabel>Input Disabled</FieldLabel>
      <Input placeholder="Acme Inc." />
    </Field>
    <Field disabled>
      <FieldLabel>Input Disabled</FieldLabel>
      <Input placeholder="Acme Inc." />
    </Field>
    <Field>
      <FieldLabel>Input File</FieldLabel>
      <Input type="file" />
    </Field>
    <Field>
      <FieldLabel>Input File</FieldLabel>
      <Input type="file" />
    </Field>
    <Input aria-label="Input standalone disabled" disabled placeholder="Standalone disabled" />
    <Input aria-label="Input standalone disabled" disabled placeholder="Standalone disabled" />
  </div>
</Story>

<Story name="Basic" asChild>
  <Field required>
    <FieldLabel>
      Name
      <FieldRequiredIndicator />
    </FieldLabel>
    <Input placeholder="Enter your name" />
    <FieldHelperText>Visible on your public profile.</FieldHelperText>
  </Field>
</Story>

<Story name="Invalid" asChild>
  <Field invalid required>
    <FieldLabel>Email</FieldLabel>
    <Input type="email" placeholder="name@example.com" />
    <FieldHelperText>Use your work email.</FieldHelperText>
    <FieldErrorText>Enter a valid email address.</FieldErrorText>
  </Field>
</Story>

<Story name="Controlled Invalid" asChild>
  <Field {invalid}>
    <FieldLabel>Username</FieldLabel>
    <Input bind:value placeholder="e.g. vinny" />
    <FieldHelperText>Use at least 3 characters.</FieldHelperText>
    <FieldErrorText>Username must be at least 3 characters.</FieldErrorText>
  </Field>
</Story>

<Story name="With Textarea" asChild>
  <Field>
    <FieldLabel>Summary</FieldLabel>
    <Textarea placeholder="Describe the request" autoresize />
    <FieldHelperText>The textarea can autoresize as the user types.</FieldHelperText>
  </Field>
</Story>

<Story name="Select" asChild>
  <Field required>
    <FieldLabel>Priority</FieldLabel>
    <NativeSelect value="">
      <option value="" disabled>Select priority</option>
      <option value="low">Low</option>
      <option value="normal">Normal</option>
      <option value="high">High</option>
    </NativeSelect>
    <FieldHelperText>Used for triage queues.</FieldHelperText>
  </Field>
</Story>

<Story name="Disabled" asChild>
  <Field disabled>
    <FieldLabel>Organization</FieldLabel>
    <Input placeholder="Acme Inc." />
    <FieldHelperText>This field is currently managed by your workspace.</FieldHelperText>
  </Field>
</Story>

<Story name="Read Only" asChild>
  <Field readOnly>
    <FieldLabel>Workspace key</FieldLabel>
    <Input value="MAPS" />
    <FieldHelperText>Read-only state is propagated to the input.</FieldHelperText>
  </Field>
</Story>

<Story name="With Checkbox" asChild>
  <Field required>
    <Checkbox>
      <CheckboxControl>
        <CheckboxIndicator />
      </CheckboxControl>
      <CheckboxLabel>Accept support access</CheckboxLabel>
      <CheckboxHiddenInput />
    </Checkbox>
    <FieldHelperText>Required before the team can inspect workspace data.</FieldHelperText>
    <FieldErrorText>Support access must be enabled.</FieldErrorText>
  </Field>
</Story>

<Story name="With Radio Group" asChild>
  <Field>
    <FieldLabel>Account type</FieldLabel>
    <RadioGroup defaultValue="team" aria-label="Account type">
      <RadioGroupItem value="personal">
        <RadioGroupItemControl />
        <RadioGroupItemText>Personal account</RadioGroupItemText>
        <RadioGroupItemHiddenInput />
      </RadioGroupItem>
      <RadioGroupItem value="team">
        <RadioGroupItemControl />
        <RadioGroupItemText>Team account</RadioGroupItemText>
        <RadioGroupItemHiddenInput />
      </RadioGroupItem>
    </RadioGroup>
    <FieldHelperText>Choose the default account context for new projects.</FieldHelperText>
  </Field>
</Story>

<Story name="Long Content" asChild>
  <Field invalid>
    <FieldLabel>
      International tax residency and withholding election for non-resident account holders
    </FieldLabel>
    <Input />
    <FieldHelperText>
      Enter the tax identification number issued by your country of tax residence.
    </FieldHelperText>
    <FieldErrorText>
      A tax identification number is required before you can continue.
    </FieldErrorText>
  </Field>
</Story>

<Story name="Item Target" asChild>
  <Field target="amount">
    <FieldLabel>Amount</FieldLabel>
    <FieldItem value="currency">
      <NativeSelect aria-label="Currency" value="USD">
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
      </NativeSelect>
    </FieldItem>
    <FieldItem value="amount">
      <Input inputmode="decimal" placeholder="0.00" />
    </FieldItem>
    <FieldHelperText>The root label targets the amount input.</FieldHelperText>
  </Field>
</Story>

<Story name="Root Provider" asChild>
  <FieldRootProvider value={field}>
    <FieldLabel>Project key</FieldLabel>
    <Input placeholder="MAPS" />
    <FieldHelperText>The field state is created outside the rendered tree.</FieldHelperText>
  </FieldRootProvider>
</Story>