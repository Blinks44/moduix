import { Heading, Stack } from '@moduix/react';

const headingWeights = [
  {
    weight: 'regular',
    label: 'Regular weight',
  },
  {
    weight: 'medium',
    label: 'Medium weight',
  },
  {
    weight: 'semibold',
    label: 'Semibold weight',
  },
  {
    weight: 'bold',
    label: 'Bold weight',
  },
] as const;

export default function HeadingWeightsDemo() {
  return (
    <Stack gap={3}>
      {headingWeights.map((item) => (
        <Heading key={item.weight} as="h2" weight={item.weight}>
          {item.label}
        </Heading>
      ))}
    </Stack>
  );
}