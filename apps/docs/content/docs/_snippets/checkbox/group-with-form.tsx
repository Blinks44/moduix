//#region demo
import { Checkbox } from '@moduix/react';

const options = [
  { value: 'react', label: 'React' },
  { value: 'solid', label: 'Solid' },
  { value: 'vue', label: 'Vue' },
];

export function CheckboxGroupWithFormDemo() {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        console.log(new FormData(event.currentTarget).getAll('framework'));
      }}
    >
      <Checkbox.Group defaultValue={['react']} name="framework">
        {options.map((option) => (
          <Checkbox key={option.value} value={option.value}>
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
            <Checkbox.Label>{option.label}</Checkbox.Label>
            <Checkbox.HiddenInput />
          </Checkbox>
        ))}
      </Checkbox.Group>
      <button type="submit">Submit</button>
    </form>
  );
}
//#endregion