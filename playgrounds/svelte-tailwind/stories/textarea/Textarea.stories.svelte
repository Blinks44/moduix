<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Field, FieldErrorText, FieldHelperText, FieldLabel } from '@/components/field';
  import { Textarea } from '@/components/textarea';

  const { Story } = defineMeta({
    title: 'Components/Textarea',
    component: Textarea,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
  });

  const fieldClass = 'w-80';
  const stackClass = 'grid w-80 gap-3';
  const customTextareaClass = 'resize-none border-primary/45 bg-primary/5 text-primary';
</script>

<script lang="ts">
  let value = $state('');
</script>

<Story name="Default Path" asChild>
  <Field class={fieldClass}>
    <FieldLabel>Comment</FieldLabel>
    <FieldHelperText>Included in the issue summary visible to the whole team.</FieldHelperText>
    <Textarea placeholder="Write a short comment" />
  </Field>
</Story>

<Story name="Sizes" asChild>
  <div class={stackClass}>
    <Textarea size="xs" aria-label="Extra-small textarea" placeholder="Extra-small textarea" />
    <Textarea size="sm" aria-label="Small textarea" placeholder="Small textarea" />
    <Textarea size="md" aria-label="Medium textarea" placeholder="Medium textarea" />
    <Textarea size="lg" aria-label="Large textarea" placeholder="Large textarea" />
    <Textarea size="xl" aria-label="Extra-large textarea" placeholder="Extra-large textarea" />
  </div>
</Story>

<Story name="Controlled" asChild>
  <Field class={fieldClass}>
    <FieldLabel>Feedback</FieldLabel>
    <Textarea placeholder="Type to control value" bind:value />
  </Field>
</Story>

<Story name="Native Attributes" asChild>
  <Field class={fieldClass}>
    <FieldLabel>Notes</FieldLabel>
    <Textarea
      name="notes"
      rows={6}
      maxlength={280}
      spellcheck={false}
      placeholder="Add enough context for the next person reading this."
    />
  </Field>
</Story>

<Story name="Auto Resize" asChild>
  <Field class={fieldClass}>
    <FieldLabel>Issue description</FieldLabel>
    <Textarea
      autoresize
      placeholder="Start typing a longer description. Height grows with content."
    />
  </Field>
</Story>

<Story name="Disabled And Read Only" asChild>
  <div class={stackClass}>
    <Textarea aria-label="Disabled textarea" disabled placeholder="Disabled textarea" />
    <Textarea aria-label="Read-only textarea" readonly value="Read-only text value" />
  </div>
</Story>

<Story name="Field Validation" asChild>
  <Field class={fieldClass} invalid required>
    <FieldLabel>Details</FieldLabel>
    <Textarea minlength={10} placeholder="Add at least 10 characters" />
    <FieldHelperText>Include enough detail for the team to reproduce the issue.</FieldHelperText>
    <FieldErrorText>Please provide details.</FieldErrorText>
    <FieldErrorText>Enter at least 10 characters.</FieldErrorText>
  </Field>
</Story>

<Story name="Custom Styles" asChild>
  <Field class={fieldClass}>
    <FieldLabel>Notes</FieldLabel>
    <Textarea class={customTextareaClass} placeholder="Styled textarea" />
  </Field>
</Story>