<script setup lang="ts">
import { createListCollection } from '@ark-ui/vue/collection';
import { FieldLabel, FieldRoot as Field } from '@ark-ui/vue/field';
import {
  SelectContent,
  SelectControl,
  SelectHiddenSelect,
  SelectIndicator,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectPositioner,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '@ark-ui/vue/select';
import { Fieldset, FieldsetHelperText, FieldsetLegend } from '@moduix/vue/fieldset';
import { Input } from '@moduix/vue/input';
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
      <SelectRoot
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
            <SelectItem v-for="item in countryCodes.items" :key="item.value" :item="item">
              <SelectItemText>{{ item.label }}</SelectItemText>
              <SelectItemIndicator />
            </SelectItem>
          </SelectContent>
        </SelectPositioner>
        <SelectHiddenSelect />
      </SelectRoot>
      <Field>
        <FieldLabel>Phone</FieldLabel>
        <Input type="tel" aria-label="Phone number" />
      </Field>
    </div>
    <FieldsetHelperText>Include the area code.</FieldsetHelperText>
  </Fieldset>
</template>