import { createListCollection } from '@ark-ui/solid/collection';
import { Button } from '@moduix/solid/button';
import { LocaleProvider } from '@moduix/solid/locale';
import { Select } from '@moduix/solid/select';
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
          <Select.Label>المدينة</Select.Label>
          <Select.Field placeholder="اختر مدينة" />
          <Select.Positioner>
            <Select.Content>
              <Select.ItemGroup>
                <For each={cities.items}>
                  {(city) => (
                    <Select.Item item={city}>
                      <Select.ItemText>{city.label}</Select.ItemText>
                      <Select.ItemIndicator />
                    </Select.Item>
                  )}
                </For>
              </Select.ItemGroup>
            </Select.Content>
          </Select.Positioner>
        </Select>
        <Button>حفظ</Button>
      </LocaleProvider>
    </div>
  );
}