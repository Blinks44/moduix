import { Text } from '@moduix/solid/text';

export default function TextCustomElementDemo() {
  return (
    <Text
      asChild={(props) => (
        <a {...props()} href="/docs">
          Read the documentation
        </a>
      )}
      tone="primary"
      weight="medium"
    />
  );
}