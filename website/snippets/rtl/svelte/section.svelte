<script lang="ts">
  import { createListCollection } from '@ark-ui/svelte/collection';
  import { Button } from '@moduix/svelte/button';
  import { LocaleProvider } from '@moduix/svelte/locale';
  import {
    Select,
    SelectLabel,
    SelectField,
    SelectPositioner,
    SelectContent,
    SelectItemGroup,
    SelectOption,
  } from '@moduix/svelte/select';
  const cities = createListCollection({
    items: [
      { label: 'القاهرة', value: 'cairo' },
      { label: 'الإسكندرية', value: 'alexandria' },
    ],
  });
</script>

<div dir="rtl" lang="ar">
  <LocaleProvider locale="ar-EG">
    <Select collection={cities}>
      <SelectLabel>المدينة</SelectLabel><SelectField placeholder="اختر مدينة" />
      <SelectPositioner>
        <SelectContent>
          <SelectItemGroup>
            {#each cities.items as city (city.value)}
              <SelectOption item={city}>{city.label}</SelectOption>
            {/each}
          </SelectItemGroup>
        </SelectContent>
      </SelectPositioner>
    </Select>
    <Button>حفظ</Button>
  </LocaleProvider>
</div>