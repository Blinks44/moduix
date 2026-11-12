<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import { Field, FieldLabel } from '@moduix/svelte/field';
  import { Textarea } from '@moduix/svelte/textarea';
  import styles from '@/components/examples/textarea/textarea-native-attributes.module.css';

  let submitted = $state('Not submitted');

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    submitted = String(new FormData(form).get('notes') ?? '');
  };
</script>

<form class={styles.root} onsubmit={handleSubmit}>
  <Field>
    <FieldLabel>Notes</FieldLabel>
    <Textarea
      name="notes"
      rows={6}
      maxlength={280}
      spellcheck={false}
      placeholder="Add enough context for the next person reading this."
    />
  </Field>
  <div data-preview-meta style="margin-inline: auto; width: fit-content">
    <output>Submitted: {submitted}</output>
    <Button type="submit" size="sm">Submit</Button>
  </div>
</form>