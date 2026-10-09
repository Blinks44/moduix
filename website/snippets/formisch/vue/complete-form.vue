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
import { Field, FieldErrorText, FieldLabel, FieldRequiredIndicator } from '@moduix/vue/field';
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

import { Field as FormischField, Form, useForm } from '@formisch/vue';
import * as v from 'valibot';
import type { ComponentPublicInstance } from 'vue';
const filterOptions = useFilter({ sensitivity: 'base' });
const { collection, filter } = useListCollection({
  initialItems: people,
  filter: (text, query) => filterOptions.value.contains(text, query),
});
const schema = v.object({
  name: v.pipe(v.string(), v.minLength(1, 'Enter a project name.')),
  team: v.pipe(v.string(), v.minLength(1, 'Choose a team.')),
  reviewer: v.pipe(v.string(), v.minLength(1, 'Choose a reviewer.')),
  summary: v.string(),
  notifications: v.boolean(),
});
const form = useForm({
  schema,
  initialInput: { name: '', team: '', reviewer: '', summary: '', notifications: false },
  validate: 'submit',
  revalidate: 'input',
});
const registerControl = (
  instance: Element | ComponentPublicInstance | null,
  register: (element: Element | null) => void,
) => {
  const element = instance && '$el' in instance ? instance.$el : instance;
  register(element instanceof Element ? element : null);
};
const handleSubmit = async (values: v.InferOutput<typeof schema>) => {
  await new Promise((resolve) => setTimeout(resolve, 600));
  console.log(values);
};
</script>
<template>
  <Form :class="styles.form" :of="form" :on-submit="handleSubmit">
    <Card>
      <CardHeader
        ><CardTitle>Create project</CardTitle
        ><CardDescription
          >Share the details your team needs to get started.</CardDescription
        ></CardHeader
      >
      <CardBody :class="styles.fields">
        <FormischField :of="form" :path="['name']" v-slot="field">
          <Field :invalid="field.errors !== null" required
            ><FieldLabel>Project name<FieldRequiredIndicator /></FieldLabel
            ><Input
              :name="field.props.name"
              :ref="(instance) => registerControl(instance, field.props.ref)"
              :autofocus="field.props.autofocus"
              v-model="field.input"
              @focus="field.props.onFocus"
              @change="field.props.onChange"
              @blur="field.props.onBlur"
            /><FieldErrorText>{{ field.errors?.[0] }}</FieldErrorText></Field
          >
        </FormischField>
        <FormischField :of="form" :path="['team']" v-slot="field">
          <Field :invalid="field.errors !== null" required
            ><FieldLabel>Team<FieldRequiredIndicator /></FieldLabel>
            <Select
              :collection="teams"
              :name="field.props.name"
              :value="field.input ? [field.input] : []"
              @value-change="field.input = $event.value[0] ?? ''"
            >
              <SelectControl
                ><SelectTrigger
                  :ref="(instance) => registerControl(instance, field.props.ref)"
                  :autofocus="field.props.autofocus"
                  @focus="field.props.onFocus"
                  @blur="field.props.onBlur"
                  ><SelectValueText placeholder="Choose a team" /></SelectTrigger
                ><SelectIndicator
              /></SelectControl>
              <SelectPositioner
                ><SelectContent>
                  <SelectItem v-for="item in teams.items" :key="item.value" :item="item"
                    ><SelectItemText>{{ item.label }}</SelectItemText
                    ><SelectItemIndicator
                  /></SelectItem> </SelectContent></SelectPositioner
              ><SelectHiddenSelect /> </Select
            ><FieldErrorText>{{ field.errors?.[0] }}</FieldErrorText></Field
          >
        </FormischField>
        <FormischField :of="form" :path="['reviewer']" v-slot="field">
          <Field :invalid="field.errors !== null" required
            ><FieldLabel>Reviewer<FieldRequiredIndicator /></FieldLabel>
            <Combobox
              :collection="collection"
              :name="field.props.name"
              :value="field.input ? [field.input] : []"
              @value-change="field.input = $event.value[0] ?? ''"
              @input-value-change="filter($event.inputValue)"
            >
              <ComboboxControl
                ><ComboboxInput
                  :ref="(instance) => registerControl(instance, field.props.ref)"
                  :autofocus="field.props.autofocus"
                  @focus="field.props.onFocus"
                  @blur="field.props.onBlur"
                  placeholder="Search people" /><ComboboxClearTrigger
                  aria-label="Clear reviewer" /><ComboboxTrigger aria-label="Open reviewers"
              /></ComboboxControl>
              <ComboboxPositioner
                ><ComboboxContent
                  ><ComboboxEmpty>No reviewers found.</ComboboxEmpty
                  ><ComboboxList>
                    <ComboboxOption
                      v-for="item in collection.items"
                      :key="item.value"
                      :item="item"
                      >{{ item.label }}</ComboboxOption
                    >
                  </ComboboxList></ComboboxContent
                ></ComboboxPositioner
              > </Combobox
            ><FieldErrorText>{{ field.errors?.[0] }}</FieldErrorText></Field
          >
        </FormischField>
        <FormischField :of="form" :path="['summary']" v-slot="field">
          <Field :invalid="field.errors !== null"
            ><FieldLabel>Summary</FieldLabel
            ><Textarea
              :name="field.props.name"
              :ref="(instance) => registerControl(instance, field.props.ref)"
              :autofocus="field.props.autofocus"
              v-model="field.input"
              @focus="field.props.onFocus"
              @change="field.props.onChange"
              @blur="field.props.onBlur"
              placeholder="What are you planning to build?"
              :rows="3"
            /><FieldErrorText>{{ field.errors?.[0] }}</FieldErrorText></Field
          >
        </FormischField>
        <FormischField :of="form" :path="['notifications']" v-slot="field">
          <Checkbox
            :name="field.props.name"
            :checked="field.input ?? false"
            @checked-change="field.input = $event.checked === true"
            @blur="field.props.onBlur"
            @focus="field.props.onFocus"
            ><CheckboxControl /><CheckboxLabel>Send status notifications</CheckboxLabel
            ><CheckboxHiddenInput
          /></Checkbox>
        </FormischField>
      </CardBody>
      <CardFooter
        ><Button :class="styles.submit" type="submit" :loading="form.isSubmitting">{{
          form.isSubmitting ? 'Creating…' : 'Create project'
        }}</Button></CardFooter
      >
    </Card>
  </Form>
</template>