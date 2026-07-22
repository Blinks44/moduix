import { InputGroup } from '@moduix/react';

const inputGroupSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export default function InputGroupSizesDemo() {
  return (
    <div className="input-group-demo-stack">
      {inputGroupSizes.map((size) => (
        <InputGroup key={size} size={size}>
          <InputGroup.Addon>@</InputGroup.Addon>
          <InputGroup.Input aria-label={size + ' workspace'} />
        </InputGroup>
      ))}
    </div>
  );
}