import { Stack } from '@moduix/solid/stack';
import { Tabs, TabsIndicator, TabsList, TabsTrigger } from '@moduix/solid/tabs';
import { For } from 'solid-js';

const sizes = ['sm', 'md', 'lg'] as const;
const tabs = ['Overview', 'Projects', 'Account'];

export default function TabsSizesDemo() {
  return (
    <Stack align="flex-start" gap="3">
      <For each={sizes}>
        {(size) => (
          <Tabs defaultValue="Overview" size={size}>
            <TabsList aria-label={`Sections, ${size}`}>
              <For each={tabs}>{(tab) => <TabsTrigger value={tab}>{tab}</TabsTrigger>}</For>
              <TabsIndicator />
            </TabsList>
          </Tabs>
        )}
      </For>
    </Stack>
  );
}