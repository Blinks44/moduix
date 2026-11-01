import { Stack } from '@moduix/solid/stack';
import {
  TabsContent,
  TabsIndicator,
  TabsList,
  TabsRootProvider,
  TabsTrigger,
  useTabs,
} from '@moduix/solid/tabs';

const items = [
  {
    value: 'overview',
    title: 'Overview',
    content:
      'Review project status, team velocity, workloads and activity highlights in one place.',
  },
  {
    value: 'projects',
    title: 'Projects',
    content:
      'Track active workstreams, owners and milestones across all departments and align delivery timelines.',
  },
  {
    value: 'account',
    title: 'Account',
    content: 'Manage personal settings, team settings, notifications and access preferences.',
  },
];

export default function RootProviderTabsDemo() {
  const tabs = useTabs({ defaultValue: 'overview' });

  return (
    <Stack align="center" gap="3">
      <TabsRootProvider value={tabs}>
        <TabsList>
          {items.map((item) => (
            <TabsTrigger value={item.value}>{item.title}</TabsTrigger>
          ))}
          <TabsIndicator />
        </TabsList>

        {items.map((item) => (
          <TabsContent value={item.value}>{item.content}</TabsContent>
        ))}
      </TabsRootProvider>
      <output>Selected: {tabs().value ?? 'none'}</output>
    </Stack>
  );
}