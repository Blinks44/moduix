<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Field, FieldErrorText, FieldHelperText, FieldLabel } from '@/components/field';
  import { Input } from '@/components/input';
  import styles from './Input.stories.module.css';

  const { Story } = defineMeta({
    title: 'Components/Input',
    component: Input,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
  });
</script>

<script lang="ts">
  let value = $state('');
</script>

<Story name="Basic" asChild>
  <Field class={styles.field}>
    <FieldLabel>Name</FieldLabel>
    <FieldHelperText>Used in your public workspace profile.</FieldHelperText>
    <Input placeholder="Enter your name" />
  </Field>
</Story>

<Story name="Controlled" asChild>
  <Field class={styles.field}>
    <FieldLabel>Username</FieldLabel>
    <Input bind:value placeholder="Type to control value" />
  </Field>
</Story>

<Story name="Sizes" asChild>
  <div class={styles.stack}>
    <Input size="xs" aria-label="Extra-small input" placeholder="Extra-small input" />
    <Input size="sm" aria-label="Small input" placeholder="Small input" />
    <Input size="md" aria-label="Medium input" placeholder="Medium input" />
    <Input size="lg" aria-label="Large input" placeholder="Large input" />
    <Input size="xl" aria-label="Extra-large input" placeholder="Extra-large input" />
  </div>
</Story>

<Story name="Native Attributes" asChild>
  <Field class={styles.field}>
    <FieldLabel>Security code</FieldLabel>
    <Input
      htmlSize={8}
      inputmode="numeric"
      maxlength={6}
      name="security-code"
      placeholder="000000"
      type="text"
      autocomplete="one-time-code"
    />
  </Field>
</Story>

<Story name="File" asChild>
  <Field class={styles.field}>
    <FieldLabel>Attachment</FieldLabel>
    <Input accept=".pdf,.png" type="file" />
    <FieldHelperText>Choose a PDF or PNG file.</FieldHelperText>
  </Field>
</Story>

<Story name="As Child" exportName="AsChild" asChild>
  <Field class={styles.field}>
    <FieldLabel>Repository</FieldLabel>
    <Input>
      {#snippet asChild(props)}
        <input {...props()} name="repository" placeholder="owner/project" />
      {/snippet}
    </Input>
  </Field>
</Story>

<Story name="Disabled And Read Only" asChild>
  <div class={styles.stack}>
    <Input disabled aria-label="Disabled input" placeholder="Disabled input" />
    <Input readonly aria-label="Read-only workspace" value="Assigned workspace" />
  </div>
</Story>

<Story name="With Field Validation" asChild>
  <Field class={styles.field} invalid>
    <FieldLabel>Email</FieldLabel>
    <Input type="email" placeholder="name@example.com" />
    <FieldErrorText>Enter a valid email address.</FieldErrorText>
  </Field>
</Story>

<Story name="Custom Styles" asChild>
  <Field class={styles.field}>
    <FieldLabel>Project key</FieldLabel>
    <Input placeholder="MAPS" class={styles.customInput} />
  </Field>
</Story>