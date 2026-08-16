import { InputGroup } from '@moduix/react/input-group';

const inputGroupSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export default function InputGroupSizesDemo() {
  return (
    <div style={{ display: 'grid', gap: 'var(--moduix-spacing-3)' }}>
      {inputGroupSizes.map((size) => (
        <InputGroup key={size} size={size}>
          <InputGroup.Addon>@</InputGroup.Addon>
          <InputGroup.Input aria-label={size + ' workspace'} />
        </InputGroup>
      ))}
    </div>
  );
}