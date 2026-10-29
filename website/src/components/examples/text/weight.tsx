import { Stack } from '@moduix/react/stack';
import { Text } from '@moduix/react/text';

export default function TextWeightsDemo() {
  return (
    <Stack gap="3">
      <Text weight="regular">Regular weight</Text>
      <Text weight="medium">Medium weight</Text>
      <Text weight="semibold">Semibold weight</Text>
      <Text weight="bold">Bold weight</Text>
    </Stack>
  );
}