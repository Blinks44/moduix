import { Container, Text } from '@moduix/react';

const containerSizes = [
  { value: 'xs', label: 'Extra small' },
  { value: 'sm', label: 'Small' },
  { value: 'md', label: 'Medium' },
  { value: 'lg', label: 'Large' },
  { value: 'xl', label: 'Extra large' },
  { value: 'full', label: 'Full width' },
] as const;

export default function ContainerSizesDemo() {
  return (
    <div className="stack">
      {containerSizes.map((size) => (
        <Container key={size.value} size={size.value} className="container">
          <Text>
            {size.label}: size="{size.value}"
          </Text>
        </Container>
      ))}
    </div>
  );
}