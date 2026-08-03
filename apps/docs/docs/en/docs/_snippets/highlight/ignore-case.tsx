import { Highlight } from '@moduix/react/highlight';
import { Text } from '@moduix/react/text';

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