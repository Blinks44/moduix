import { createListCollection } from '@ark-ui/react/collection';
import { Button } from '@moduix/react/button';
import { LocaleProvider } from '@moduix/react/locale';
import {
  Select,
  SelectLabel,
  SelectField,
  SelectPositioner,
  SelectContent,
  SelectItemGroup,
  SelectOption,
} from '@moduix/react/select';

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
                {cities.items.map((city) => (
                  <SelectOption key={city.value} item={city}>
                    {city.label}
                  </SelectOption>
                ))}
              </SelectItemGroup>
            </SelectContent>
          </SelectPositioner>
        </Select>
        <Button>حفظ</Button>
      </LocaleProvider>
    </div>
  );
}