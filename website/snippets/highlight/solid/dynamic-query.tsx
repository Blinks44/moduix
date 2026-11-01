import { Highlight } from '@moduix/solid/highlight';
import { Input } from '@moduix/solid/input';
import { Stack } from '@moduix/solid/stack';
import { Text } from '@moduix/solid/text';
import { createSignal } from 'solid-js';

export default function HighlightDynamicQueryDemo() {
  const [query, setQuery] = createSignal('component');

  return (
    <Stack gap="4">
      <Input
        aria-label="Search text"
        value={query()}
        onInput={(event) => setQuery(event.currentTarget.value)}
        placeholder="Search text..."
      />
      <Text>
        <Highlight
          query={query()}
          text="Choose a component from the list. Open its documentation to see examples, props, and keyboard controls."
        />
      </Text>
    </Stack>
  );
}