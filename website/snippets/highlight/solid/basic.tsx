import { Highlight } from '@moduix/solid/highlight';
import { Text } from '@moduix/solid/text';

export default function HighlightDemo() {
  return (
    <Text>
      <Highlight
        query="component"
        text="Ark UI is a headless component library for building accessible web applications."
      />
    </Text>
  );
}