import { Highlight, Text } from '@moduix/react';

export default function HighlightIgnoreCaseDemo() {
  return (
    <Text>
      <Highlight
        ignoreCase
        query="typescript"
        text="TypeScript provides static type checking. Using typescript helps catch errors early in development."
      />
    </Text>
  );
}