<script setup lang="ts">
import { createListCollection } from '@ark-ui/vue/collection';
import { Field, FieldLabel } from '@moduix/vue/field';
import { Fieldset, FieldsetHelperText, FieldsetLegend } from '@moduix/vue/fieldset';
import { Input } from '@moduix/vue/input';
import {
  Select,
  SelectContent,
  SelectControl,
  SelectHiddenSelect,
  SelectIndicator,
  SelectLabel,
  SelectOption,
  SelectPositioner,
  SelectTrigger,
  SelectValueText,
} from '@moduix/vue/select';
import styles from '@/components/examples/fieldset/fieldset-input-with-select.module.css';

const countryCodes = createListCollection({
  items: [
    { label: '+1', value: '+1' },
    { label: '+44', value: '+44' },
    { label: '+49', value: '+49' },
    { label: '+41', value: '+41' },
  ],
});
</script>

<template>
  <Fieldset :class="styles.root">
    <FieldsetLegend>Mobile number</FieldsetLegend>
    <div :class="styles.phoneInput">
      <Select
        :class="styles.countryCode"
        :collection="countryCodes"
        :default-value="['+1']"
        name="countryCode"
      >
        <SelectLabel>Code</SelectLabel>
        <SelectControl>
          <SelectTrigger>
            <SelectValueText />
          </SelectTrigger>
          <SelectIndicator />
        </SelectControl>
        <SelectPositioner>
          <SelectContent>
            <SelectOption v-for="item in countryCodes.items" :key="item.value" :item="item">{{
              item.label
            }}</SelectOption>
          </SelectContent>
        </SelectPositioner>
        <SelectHiddenSelect />
      </Select>
      <Field>
        <FieldLabel>Phone</FieldLabel>
        <Input type="tel" aria-label="Phone number" />
      </Field>
    </div>
    <FieldsetHelperText>Include the area code.</FieldsetHelperText>
  </Fieldset>
</template>