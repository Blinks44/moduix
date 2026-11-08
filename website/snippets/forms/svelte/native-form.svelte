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
  import { Field, FieldLabel, FieldRequiredIndicator } from '@moduix/svelte/field';
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
  import styles from '@/components/examples/forms/forms-native-form.module.css';

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
  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    if (event.currentTarget instanceof HTMLFormElement)
      console.log(Object.fromEntries(new FormData(event.currentTarget)));
  };
</script>

<form class={styles.root} onsubmit={handleSubmit}>
  <Card>
    <CardHeader>
      <CardTitle>Create project</CardTitle>
      <CardDescription>Share the details your team needs to get started.</CardDescription>
    </CardHeader>
    <CardBody class={styles.stack}>
      <Field required>
        <FieldLabel>Project name<FieldRequiredIndicator /></FieldLabel>
        <Input name="name" />
      </Field>
      <Field required>
        <FieldLabel>Team<FieldRequiredIndicator /></FieldLabel>
        <Select collection={teams} name="team">
          <SelectControl>
            <SelectTrigger><SelectValueText placeholder="Choose a team" /></SelectTrigger>
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
      </Field>
      <Field required>
        <FieldLabel>Reviewer<FieldRequiredIndicator /></FieldLabel>
        <Combobox
          collection={collection()}
          name="reviewer"
          onInputValueChange={(details) => filter(details.inputValue)}
        >
          <ComboboxControl>
            <ComboboxInput placeholder="Search people" />
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
      </Field>
      <Field>
        <FieldLabel>Summary</FieldLabel>
        <Textarea name="summary" placeholder="What are you planning to build?" rows={3} />
      </Field>
      <Checkbox name="notifications">
        <CheckboxControl />
        <CheckboxLabel>Send status notifications</CheckboxLabel>
        <CheckboxHiddenInput />
      </Checkbox>
    </CardBody>
    <CardFooter><Button class={styles.submit} type="submit">Create project</Button></CardFooter>
  </Card>
</form>