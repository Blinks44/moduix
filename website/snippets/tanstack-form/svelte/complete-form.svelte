<script lang="ts">
  import { createListCollection, useListCollection } from '@ark-ui/svelte/collection';
  import { useFilter } from '@ark-ui/svelte/locale';
  import { Button } from '@moduix/svelte/button';
  import {
    Card,
    CardBody,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from '@moduix/svelte/card';
  import {
    Checkbox,
    CheckboxControl,
    CheckboxHiddenInput,
    CheckboxLabel,
  } from '@moduix/svelte/checkbox';
  import {
    Combobox,
    ComboboxClearTrigger,
    ComboboxContent,
    ComboboxControl,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxList,
    ComboboxOption,
    ComboboxPositioner,
    ComboboxTrigger,
  } from '@moduix/svelte/combobox';
  import { Field, FieldErrorText, FieldLabel, FieldRequiredIndicator } from '@moduix/svelte/field';
  import { Input } from '@moduix/svelte/input';
  import {
    Select,
    SelectControl,
    SelectTrigger,
    SelectValueText,
    SelectIndicator,
    SelectPositioner,
    SelectContent,
    SelectHiddenSelect,
    SelectOption,
  } from '@moduix/svelte/select';
  import { Textarea } from '@moduix/svelte/textarea';
  import { createForm } from '@tanstack/svelte-form';
  import styles from '@/components/examples/tanstack-form/tanstack-form-complete-form.module.css';

  const teams = createListCollection({
    items: [
      { label: 'Platform', value: 'platform' },
      { label: 'Product', value: 'product' },
      { label: 'Design', value: 'design' },
    ],
  });

  const people = [
    { label: 'Ada Lovelace', value: 'ada' },
    { label: 'Grace Hopper', value: 'grace' },
    { label: 'Margaret Hamilton', value: 'margaret' },
    { label: 'Radia Perlman', value: 'radia' },
  ];
  const filterOptions = useFilter({ sensitivity: 'base' });
  const { collection, filter } = useListCollection({
    initialItems: people,
    filter: (text, query) => filterOptions().contains(text, query),
  });
  let formElement = $state<HTMLFormElement | null>(null);
  const form = createForm(() => ({
    defaultValues: { name: '', team: '', reviewer: '', summary: '', notifications: false },
    onSubmit: async ({ value }) => {
      await new Promise((resolve) => setTimeout(resolve, 600));
      console.log(value);
    },
    onSubmitInvalid: () => {
      requestAnimationFrame(() =>
        formElement?.querySelector<HTMLElement>('[aria-invalid="true"]:not([hidden])')?.focus(),
      );
    },
  }));
  const submitting = form.useSelector((state) => state.isSubmitting);
  const canSubmit = form.useSelector((state) => state.canSubmit);
</script>

<form
  bind:this={formElement}
  class={styles.form}
  novalidate
  onsubmit={(event) => {
    event.preventDefault();
    event.stopPropagation();
    form.handleSubmit();
  }}
>
  <Card>
    <CardHeader>
      <CardTitle>Create project</CardTitle>
      <CardDescription>Share the details your team needs to get started.</CardDescription>
    </CardHeader>
    <CardBody class={styles.fields}>
      <form.Field
        name="name"
        validators={{ onSubmit: ({ value }) => (!value ? 'Enter a project name.' : undefined) }}
      >
        {#snippet children(field)}
          <Field invalid={!field.state.meta.isValid} required>
            <FieldLabel>Project name<FieldRequiredIndicator /></FieldLabel>
            <Input
              name={field.name}
              value={field.state.value}
              oninput={(event) => field.handleChange(event.currentTarget.value)}
              onblur={field.handleBlur}
            />
            <FieldErrorText>{field.state.meta.errors.join(', ')}</FieldErrorText>
          </Field>
        {/snippet}
      </form.Field>
      <form.Field
        name="team"
        validators={{ onSubmit: ({ value }) => (!value ? 'Choose a team.' : undefined) }}
      >
        {#snippet children(field)}
          <Field invalid={!field.state.meta.isValid} required>
            <FieldLabel>Team<FieldRequiredIndicator /></FieldLabel>
            <Select
              collection={teams}
              name={field.name}
              value={field.state.value ? [field.state.value] : []}
              onValueChange={(details) => field.handleChange(details.value[0] ?? '')}
            >
              <SelectControl>
                <SelectTrigger onblur={field.handleBlur}>
                  <SelectValueText placeholder="Choose a team" />
                </SelectTrigger>
                <SelectIndicator />
              </SelectControl>
              <SelectPositioner>
                <SelectContent>
                  {#each teams.items as item (item.value)}
                    <SelectOption {item}>{item.label}</SelectOption>
                  {/each}
                </SelectContent>
              </SelectPositioner>
              <SelectHiddenSelect />
            </Select>
            <FieldErrorText>{field.state.meta.errors.join(', ')}</FieldErrorText>
          </Field>
        {/snippet}
      </form.Field>
      <form.Field
        name="reviewer"
        validators={{ onSubmit: ({ value }) => (!value ? 'Choose a reviewer.' : undefined) }}
      >
        {#snippet children(field)}
          <Field invalid={!field.state.meta.isValid} required>
            <FieldLabel>Reviewer<FieldRequiredIndicator /></FieldLabel>
            <Combobox
              collection={collection()}
              name={field.name}
              value={field.state.value ? [field.state.value] : []}
              onValueChange={(details) => field.handleChange(details.value[0] ?? '')}
              onInputValueChange={(details) => filter(details.inputValue)}
            >
              <ComboboxControl>
                <ComboboxInput onblur={field.handleBlur} placeholder="Search people" />
                <ComboboxClearTrigger aria-label="Clear reviewer" />
                <ComboboxTrigger aria-label="Open reviewers" />
              </ComboboxControl>
              <ComboboxPositioner>
                <ComboboxContent>
                  <ComboboxEmpty>No reviewers found.</ComboboxEmpty>
                  <ComboboxList>
                    {#each collection().items as item (item.value)}
                      <ComboboxOption {item}>{item.label}</ComboboxOption>
                    {/each}
                  </ComboboxList>
                </ComboboxContent>
              </ComboboxPositioner>
            </Combobox>
            <FieldErrorText>{field.state.meta.errors.join(', ')}</FieldErrorText>
          </Field>
        {/snippet}
      </form.Field>
      <form.Field name="summary">
        {#snippet children(field)}
          <Field invalid={!field.state.meta.isValid}>
            <FieldLabel>Summary</FieldLabel>
            <Textarea
              name={field.name}
              value={field.state.value}
              oninput={(event) => field.handleChange(event.currentTarget.value)}
              onblur={field.handleBlur}
              placeholder="What are you planning to build?"
              rows={3}
            />
            <FieldErrorText>{field.state.meta.errors.join(', ')}</FieldErrorText>
          </Field>
        {/snippet}
      </form.Field>
      <form.Field name="notifications">
        {#snippet children(field)}
          <Checkbox
            name={field.name}
            checked={field.state.value ?? false}
            onCheckedChange={(details) => field.handleChange(details.checked === true)}
            onblur={field.handleBlur}
          >
            <CheckboxControl />
            <CheckboxLabel>Send status notifications</CheckboxLabel>
            <CheckboxHiddenInput />
          </Checkbox>
        {/snippet}
      </form.Field>
    </CardBody>
    <CardFooter>
      <Button
        class={styles.submit}
        type="submit"
        disabled={!canSubmit.current}
        loading={submitting.current}
      >
        {submitting.current ? 'Creating…' : 'Create project'}
      </Button>
    </CardFooter>
  </Card>
</form>