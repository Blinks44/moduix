<script setup lang="ts">
import { createListCollection, useListCollection } from '@ark-ui/vue/collection';
import { useFilter } from '@ark-ui/vue/locale';
import { Button } from '@moduix/vue/button';
import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@moduix/vue/card';
import {
  Checkbox,
  CheckboxControl,
  CheckboxHiddenInput,
  CheckboxLabel,
} from '@moduix/vue/checkbox';
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
} from '@moduix/vue/combobox';
import { Field, FieldLabel, FieldRequiredIndicator } from '@moduix/vue/field';
import { Input } from '@moduix/vue/input';
import {
  Select,
  SelectControl,
  SelectTrigger,
  SelectValueText,
  SelectIndicator,
  SelectPositioner,
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectItemIndicator,
  SelectHiddenSelect,
} from '@moduix/vue/select';
import { Textarea } from '@moduix/vue/textarea';
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
  filter: (text, query) => filterOptions.value.contains(text, query),
});
const handleSubmit = (event: Event) => {
  event.preventDefault();
  if (event.currentTarget instanceof HTMLFormElement)
    console.log(Object.fromEntries(new FormData(event.currentTarget)));
};
</script>
<template>
  <form :class="styles.root" @submit="handleSubmit">
    <Card>
      <CardHeader
        ><CardTitle>Create project</CardTitle
        ><CardDescription
          >Share the details your team needs to get started.</CardDescription
        ></CardHeader
      >
      <CardBody :class="styles.stack">
        <Field required
          ><FieldLabel>Project name<FieldRequiredIndicator /></FieldLabel><Input name="name"
        /></Field>
        <Field required
          ><FieldLabel>Team<FieldRequiredIndicator /></FieldLabel>
          <Select :collection="teams" name="team">
            <SelectControl
              ><SelectTrigger><SelectValueText placeholder="Choose a team" /></SelectTrigger
              ><SelectIndicator
            /></SelectControl>
            <SelectPositioner
              ><SelectContent>
                <SelectItem v-for="item in teams.items" :key="item.value" :item="item"
                  ><SelectItemText>{{ item.label }}</SelectItemText
                  ><SelectItemIndicator
                /></SelectItem> </SelectContent></SelectPositioner
            ><SelectHiddenSelect /> </Select
        ></Field>
        <Field required
          ><FieldLabel>Reviewer<FieldRequiredIndicator /></FieldLabel>
          <Combobox
            :collection="collection"
            name="reviewer"
            @input-value-change="filter($event.inputValue)"
          >
            <ComboboxControl
              ><ComboboxInput placeholder="Search people" /><ComboboxClearTrigger
                aria-label="Clear reviewer" /><ComboboxTrigger aria-label="Open reviewers"
            /></ComboboxControl>
            <ComboboxPositioner
              ><ComboboxContent
                ><ComboboxEmpty>No reviewers found.</ComboboxEmpty
                ><ComboboxList>
                  <ComboboxOption v-for="item in collection.items" :key="item.value" :item="item">{{
                    item.label
                  }}</ComboboxOption>
                </ComboboxList></ComboboxContent
              ></ComboboxPositioner
            >
          </Combobox></Field
        >
        <Field
          ><FieldLabel>Summary</FieldLabel
          ><Textarea name="summary" placeholder="What are you planning to build?" :rows="3"
        /></Field>
        <Checkbox name="notifications"
          ><CheckboxControl /><CheckboxLabel>Send status notifications</CheckboxLabel
          ><CheckboxHiddenInput
        /></Checkbox>
      </CardBody>
      <CardFooter><Button :class="styles.submit" type="submit">Create project</Button></CardFooter>
    </Card>
  </form>
</template>