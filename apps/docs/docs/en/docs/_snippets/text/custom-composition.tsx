import { Text } from '@moduix/react/text';

export default function TextCustomElementDemo() {
  return (
    <Text asChild tone="primary" weight="medium">
      <a href="/docs">Read the documentation</a>
    </Text>
  );
}