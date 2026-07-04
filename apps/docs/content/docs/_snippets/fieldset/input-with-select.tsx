/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { createListCollection } from '@ark-ui/react/collection';
import { Field, Fieldset, Select } from '@moduix/react';

const countryCodes = createListCollection({
  items: [
    {
      label: '+1',
      value: '+1',
    },
    {
      label: '+44',
      value: '+44',
    },
    {
      label: '+49',
      value: '+49',
    },
    {
      label: '+41',
      value: '+41',
    },
  ],
});
export function PhoneInput() {
  return (
    <Fieldset className="fieldset">
      <Fieldset.Legend>Mobile number</Fieldset.Legend>
      <div className="phone-input">
        <Select className="country-code" collection={countryCodes} defaultValue={['+1']}>
          <Select.Label>Code</Select.Label>
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText />
            </Select.Trigger>
            <Select.Indicators>
              <Select.Indicator />
            </Select.Indicators>
          </Select.Control>
          <Select.Positioner>
            <Select.Content>
              {countryCodes.items.map((item) => (
                <Select.Item key={item.value} item={item}>
                  <Select.ItemText>{item.label}</Select.ItemText>
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
          <Select.HiddenSelect name="countryCode" />
        </Select>
        <Field>
          <Field.Label>Phone</Field.Label>
          <Field.Input type="tel" aria-label="Phone number" />
        </Field>
      </div>
      <Fieldset.HelperText>Include the area code.</Fieldset.HelperText>
    </Fieldset>
  );
}

//#endregion