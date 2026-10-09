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

import { useForm } from '@tanstack/vue-form';
import { ref } from 'vue';
const filterOptions = useFilter({ sensitivity: 'base' });
const { collection, filter } = useListCollection({
  initialItems: people,
  filter: (text, query) => filterOptions.value.contains(text, query),
});
const formElement = ref<HTMLFormElement | null>(null);
const form = useForm({
  defaultValues: { name: '', team: '', reviewer: '', summary: '', notifications: false },
  onSubmit: async ({ value }) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    console.log(value);
  },
  onSubmitInvalid: () => {
    requestAnimationFrame(() =>
      formElement.value?.querySelector<HTMLElement>('[aria-invalid="true"]:not([hidden])')?.focus(),
    );
  },
});
const submitting = form.useSelector((state) => state.isSubmitting);
const canSubmit = form.useSelector((state) => state.canSubmit);
</script>
<template>
  <form
    ref="formElement"
    :class="styles.form"
    novalidate
    @submit.prevent.stop="form.handleSubmit()"
  >
    <Card>
      <CardHeader
        ><CardTitle>Create project</CardTitle
        ><CardDescription
          >Share the details your team needs to get started.</CardDescription
        ></CardHeader
      >
      <CardBody :class="styles.fields">
        <form.Field
          name="name"
          :validators="{ onSubmit: ({ value }) => (!value ? 'Enter a project name.' : undefined) }"
          v-slot="{ field, state }"
        >
          <Field :invalid="!state.meta.isValid" required
            ><FieldLabel>Project name<FieldRequiredIndicator /></FieldLabel
            ><Input
              :name="field.name"
              :model-value="state.value"
              @update:model-value="field.handleChange(String($event ?? ''))"
              @blur="field.handleBlur"
            /><FieldErrorText>{{ state.meta.errors.join(', ') }}</FieldErrorText></Field
          >
        </form.Field>
        <form.Field
          name="team"
          :validators="{ onSubmit: ({ value }) => (!value ? 'Choose a team.' : undefined) }"
          v-slot="{ field, state }"
        >
          <Field :invalid="!state.meta.isValid" required
            ><FieldLabel>Team<FieldRequiredIndicator /></FieldLabel>
            <Select
              :collection="teams"
              :name="field.name"
              :value="state.value ? [state.value] : []"
              @value-change="field.handleChange($event.value[0] ?? '')"
            >
              <SelectControl
                ><SelectTrigger @blur="field.handleBlur"
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
            ><FieldErrorText>{{ state.meta.errors.join(', ') }}</FieldErrorText></Field
          >
        </form.Field>
        <form.Field
          name="reviewer"
          :validators="{ onSubmit: ({ value }) => (!value ? 'Choose a reviewer.' : undefined) }"
          v-slot="{ field, state }"
        >
          <Field :invalid="!state.meta.isValid" required
            ><FieldLabel>Reviewer<FieldRequiredIndicator /></FieldLabel>
            <Combobox
              :collection="collection"
              :name="field.name"
              :value="state.value ? [state.value] : []"
              @value-change="field.handleChange($event.value[0] ?? '')"
              @input-value-change="filter($event.inputValue)"
            >
              <ComboboxControl
                ><ComboboxInput
                  @blur="field.handleBlur"
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
            ><FieldErrorText>{{ state.meta.errors.join(', ') }}</FieldErrorText></Field
          >
        </form.Field>
        <form.Field name="summary" v-slot="{ field, state }">
          <Field :invalid="!state.meta.isValid"
            ><FieldLabel>Summary</FieldLabel
            ><Textarea
              :name="field.name"
              :model-value="state.value"
              @update:model-value="field.handleChange(String($event ?? ''))"
              @blur="field.handleBlur"
              placeholder="What are you planning to build?"
              :rows="3"
            /><FieldErrorText>{{ state.meta.errors.join(', ') }}</FieldErrorText></Field
          >
        </form.Field>
        <form.Field name="notifications" v-slot="{ field, state }">
          <Checkbox
            :name="field.name"
            :checked="state.value ?? false"
            @checked-change="field.handleChange($event.checked === true)"
            @blur="field.handleBlur"
            ><CheckboxControl /><CheckboxLabel>Send status notifications</CheckboxLabel
            ><CheckboxHiddenInput
          /></Checkbox>
        </form.Field>
      </CardBody>
      <CardFooter
        ><Button
          :class="styles.submit"
          type="submit"
          :disabled="!canSubmit"
          :loading="submitting"
          >{{ submitting ? 'Creating…' : 'Create project' }}</Button
        ></CardFooter
      >
    </Card>
  </form>
</template>