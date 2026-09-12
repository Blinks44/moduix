import { Highlight } from '@moduix/solid/highlight';
import { Text } from '@moduix/solid/text';

export default function HighlightMultipleQueriesDemo() {
  return (
    <Text>
      <Highlight
        query={['React', 'Vue']}
        text="Ark UI provides React, Solid, Vue, and Svelte components that are accessible and customizable."
      />
    </Text>
  );
}