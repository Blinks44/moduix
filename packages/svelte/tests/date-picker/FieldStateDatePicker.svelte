<script lang="ts">
  import { DatePicker, DatePickerField, DatePickerLabel } from '@/components/date-picker';
  import { Field } from '@/components/field';
  import { Fieldset } from '@/components/fieldset';
</script>

<Field disabled invalid readOnly>
  <DatePicker>
    <DatePickerLabel>Scheduled date</DatePickerLabel>
    <DatePickerField />
  </DatePicker>
</Field>
<Fieldset invalid>
  <DatePicker>
    <DatePickerLabel>Fieldset date</DatePickerLabel>
    <DatePickerField />
  </DatePicker>
</Fieldset>