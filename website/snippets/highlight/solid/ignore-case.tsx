import { Highlight } from '@moduix/solid/highlight';
import { Text } from '@moduix/solid/text';

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