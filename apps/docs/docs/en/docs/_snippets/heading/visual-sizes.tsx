import { Heading, Stack } from '@moduix/react';

const headingSizes = [
  {
    size: '2xl',
    label: 'Extra-large heading',
  },
  {
    size: 'xl',
    label: 'Large heading',
  },
  {
    size: 'lg',
    label: 'Medium-large heading',
  },
  {
    size: 'md',
    label: 'Medium heading',
  },
  {
    size: 'sm',
    label: 'Small heading',
  },
  {
    size: 'xs',
    label: 'Extra-small heading',
  },
] as const;

export default function HeadingSizesDemo() {
  return (
    <Stack gap={3}>
      {headingSizes.map((item) => (
        <Heading key={item.size} as="h2" size={item.size}>
          {item.label}
        </Heading>
      ))}
    </Stack>
  );
}