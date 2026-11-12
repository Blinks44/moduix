<script lang="ts">
  import { createListCollection } from '@ark-ui/svelte/collection';
  import { Field, FieldLabel } from '@moduix/svelte/field';
  import { Fieldset, FieldsetHelperText, FieldsetLegend } from '@moduix/svelte/fieldset';
  import { Input } from '@moduix/svelte/input';
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
  } from '@moduix/svelte/select';
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
    <Select
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
            <SelectOption {item}>{item.label}</SelectOption>
          {/each}
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