import { createListCollection } from '@ark-ui/react/collection';
import { Button } from '@moduix/react/button';
import { LocaleProvider } from '@moduix/react/locale';
import { Select } from '@moduix/react/select';

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
                {cities.items.map((city) => (
                  <Select.Item key={city.value} item={city}>
                    <Select.ItemText>{city.label}</Select.ItemText>
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.ItemGroup>
            </Select.Content>
          </Select.Positioner>
        </Select>
        <Button>حفظ</Button>
      </LocaleProvider>
    </div>
  );
}