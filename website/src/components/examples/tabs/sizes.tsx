import { Stack } from '@moduix/react/stack';
import { Tabs, TabsIndicator, TabsList, TabsTrigger } from '@moduix/react/tabs';

const sizes = ['sm', 'md', 'lg'] as const;
const tabs = ['Overview', 'Projects', 'Account'];

export default function TabsSizesDemo() {
  return (
    <Stack align="flex-start" gap="3">
      {sizes.map((size) => (
        <Tabs key={size} defaultValue="Overview" size={size}>
          <TabsList aria-label={`Sections, ${size}`}>
            {tabs.map((tab) => (
              <TabsTrigger key={tab} value={tab}>
                {tab}
              </TabsTrigger>
            ))}
            <TabsIndicator />
          </TabsList>
        </Tabs>
      ))}
    </Stack>
  );
}