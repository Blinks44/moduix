<script setup lang="ts">
import { createListCollection } from '@ark-ui/vue/collection';
import { Button } from '@moduix/vue/button';
import { LocaleProvider } from '@moduix/vue/locale';
import {
  Select,
  SelectLabel,
  SelectField,
  SelectPositioner,
  SelectContent,
  SelectItemGroup,
  SelectItem,
  SelectItemText,
  SelectItemIndicator,
} from '@moduix/vue/select';
const cities = createListCollection({
  items: [
    { label: 'القاهرة', value: 'cairo' },
    { label: 'الإسكندرية', value: 'alexandria' },
  ],
});
</script>
<template>
  <div dir="rtl" lang="ar">
    <LocaleProvider locale="ar-EG">
      <Select :collection="cities">
        <SelectLabel>المدينة</SelectLabel><SelectField placeholder="اختر مدينة" />
        <SelectPositioner
          ><SelectContent
            ><SelectItemGroup>
              <SelectItem v-for="city in cities.items" :key="city.value" :item="city">
                <SelectItemText>{{ city.label }}</SelectItemText
                ><SelectItemIndicator />
              </SelectItem> </SelectItemGroup></SelectContent
        ></SelectPositioner>
      </Select>
      <Button>حفظ</Button>
    </LocaleProvider>
  </div>
</template>