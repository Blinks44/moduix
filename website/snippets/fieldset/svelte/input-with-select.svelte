<script lang="ts">
  import { createListCollection } from '@ark-ui/svelte/collection';
  import { FieldLabel, FieldRoot as Field } from '@ark-ui/svelte/field';
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
  } from '@ark-ui/svelte/select';
  import { Fieldset, FieldsetHelperText, FieldsetLegend } from '@moduix/svelte/fieldset';
  import { Input } from '@moduix/svelte/input';
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

<Fieldset class={styles.root}>
  <FieldsetLegend>Mobile number</FieldsetLegend>
  <div class={styles.phoneInput}>
    <SelectRoot
      class={styles.countryCode}
      collection={countryCodes}
      defaultValue={['+1']}
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
          {#each countryCodes.items as item (item.value)}
            <SelectItem {item}>
              <SelectItemText>{item.label}</SelectItemText>
              <SelectItemIndicator />
            </SelectItem>
          {/each}
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