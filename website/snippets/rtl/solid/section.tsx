import { createListCollection } from '@ark-ui/solid/collection';
import { Button } from '@moduix/solid/button';
import { LocaleProvider } from '@moduix/solid/locale';
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
} from '@moduix/solid/select';
import { For } from 'solid-js';

const cities = createListCollection({
  items: [
    { label: 'القاهرة', value: 'cairo' },
    { label: 'الإسكندرية', value: 'alexandria' },
  ],
});

export function ArabicPreferences() {
  return (
    <div dir="rtl" lang="ar">
      <LocaleProvider locale="ar-EG">
        <Select collection={cities}>
          <SelectLabel>المدينة</SelectLabel>
          <SelectField placeholder="اختر مدينة" />
          <SelectPositioner>
            <SelectContent>
              <SelectItemGroup>
                <For each={cities.items}>
                  {(city) => (
                    <SelectItem item={city}>
                      <SelectItemText>{city.label}</SelectItemText>
                      <SelectItemIndicator />
                    </SelectItem>
                  )}
                </For>
              </SelectItemGroup>
            </SelectContent>
          </SelectPositioner>
        </Select>
        <Button>حفظ</Button>
      </LocaleProvider>
    </div>
  );
}
