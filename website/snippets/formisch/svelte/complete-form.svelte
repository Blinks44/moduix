<script lang="ts">
  import { createListCollection, useListCollection } from '@ark-ui/svelte/collection';
  import { useFilter } from '@ark-ui/svelte/locale';
  import { Field as FormischField, Form, createForm } from '@formisch/svelte';
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
  import * as v from 'valibot';
  import styles from '@/components/examples/formisch/formisch-complete-form.module.css';

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
  const schema = v.object({
    name: v.pipe(v.string(), v.minLength(1, 'Enter a project name.')),
    team: v.pipe(v.string(), v.minLength(1, 'Choose a team.')),
    reviewer: v.pipe(v.string(), v.minLength(1, 'Choose a reviewer.')),
    summary: v.string(),
    notifications: v.boolean(),
  });
  const form = createForm({
    schema,
    initialInput: { name: '', team: '', reviewer: '', summary: '', notifications: false },
    validate: 'submit',
    revalidate: 'input',
  });
  const handleSubmit = async (values: v.InferOutput<typeof schema>) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    console.log(values);
  };
</script>

<Form class={styles.form} of={form} onsubmit={handleSubmit}>
  <Card>
    <CardHeader>
      <CardTitle>Create project</CardTitle>
      <CardDescription>Share the details your team needs to get started.</CardDescription>
    </CardHeader>
    <CardBody class={styles.fields}>
      <FormischField of={form} path={['name']}>
        {#snippet children(field)}
          <Field invalid={field.errors !== null} required>
            <FieldLabel>Project name<FieldRequiredIndicator /></FieldLabel>
            <Input {...field.props} value={field.input ?? ''} />
            <FieldErrorText>{field.errors?.[0]}</FieldErrorText>
          </Field>
        {/snippet}
      </FormischField>
      <FormischField of={form} path={['team']}>
        {#snippet children(field)}
          {@const { name, oninput, onchange, ...triggerProps } = field.props}
          <Field invalid={field.errors !== null} required>
            <FieldLabel>Team<FieldRequiredIndicator /></FieldLabel>
            <Select
              collection={teams}
              {name}
              value={field.input ? [field.input] : []}
              onValueChange={(details) => field.onInput(details.value[0] ?? '')}
            >
              <SelectControl>
                <SelectTrigger {...triggerProps}>
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
            <FieldErrorText>{field.errors?.[0]}</FieldErrorText>
          </Field>
        {/snippet}
      </FormischField>
      <FormischField of={form} path={['reviewer']}>
        {#snippet children(field)}
          {@const { name, oninput, onchange, ...inputProps } = field.props}
          <Field invalid={field.errors !== null} required>
            <FieldLabel>Reviewer<FieldRequiredIndicator /></FieldLabel>
            <Combobox
              collection={collection()}
              {name}
              value={field.input ? [field.input] : []}
              onValueChange={(details) => field.onInput(details.value[0] ?? '')}
              onInputValueChange={(details) => filter(details.inputValue)}
            >
              <ComboboxControl>
                <ComboboxInput {...inputProps} placeholder="Search people" />
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
            <FieldErrorText>{field.errors?.[0]}</FieldErrorText>
          </Field>
        {/snippet}
      </FormischField>
      <FormischField of={form} path={['summary']}>
        {#snippet children(field)}
          <Field invalid={field.errors !== null}>
            <FieldLabel>Summary</FieldLabel>
            <Textarea
              {...field.props}
              value={field.input ?? ''}
              placeholder="What are you planning to build?"
              rows={3}
            />
            <FieldErrorText>{field.errors?.[0]}</FieldErrorText>
          </Field>
        {/snippet}
      </FormischField>
      <FormischField of={form} path={['notifications']}>
        {#snippet children(field)}
          <Checkbox
            name={field.props.name}
            checked={field.input ?? false}
            onCheckedChange={(details) => field.onInput(details.checked === true)}
            onblur={field.props.onblur}
            onfocus={field.props.onfocus}
          >
            <CheckboxControl />
            <CheckboxLabel>Send status notifications</CheckboxLabel>
            <CheckboxHiddenInput />
          </Checkbox>
        {/snippet}
      </FormischField>
    </CardBody>
    <CardFooter>
      <Button class={styles.submit} type="submit" loading={form.isSubmitting}>
        {form.isSubmitting ? 'Creating…' : 'Create project'}
      </Button>
    </CardFooter>
  </Card>
</Form>