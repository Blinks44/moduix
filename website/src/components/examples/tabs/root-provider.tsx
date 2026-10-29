import { Stack } from '@moduix/react/stack';
import {
  TabsContent,
  TabsIndicator,
  TabsList,
  TabsRootProvider,
  TabsTrigger,
  useTabs,
} from '@moduix/react/tabs';
import { PreviewMeta } from '@/components/mdx/Components';

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
  const tabs = useTabs({
    defaultValue: 'overview',
  });
  return (
    <Stack align="center" gap="3">
      <TabsRootProvider value={tabs}>
        <TabsList>
          {items.map((item) => (
            <TabsTrigger key={item.value} value={item.value}>
              {item.title}
            </TabsTrigger>
          ))}
          <TabsIndicator />
        </TabsList>

        {items.map((item) => (
          <TabsContent key={item.value} value={item.value}>
            {item.content}
          </TabsContent>
        ))}
      </TabsRootProvider>
      <PreviewMeta>
        <output>Selected: {tabs.value ?? 'none'}</output>
      </PreviewMeta>
    </Stack>
  );
}