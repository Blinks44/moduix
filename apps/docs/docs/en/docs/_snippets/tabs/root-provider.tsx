import { Tabs, useTabs } from '@moduix/react';
import { PreviewLayout } from '@/components/examples/preview-layout';

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
    <PreviewLayout gap="var(--moduix-spacing-3)" maxWidth="32rem">
      <output className="tabs-demo-selected">selected: {tabs.value}</output>
      <Tabs.RootProvider value={tabs}>
        <Tabs.List>
          {items.map((item) => (
            <Tabs.Trigger key={item.value} value={item.value}>
              {item.title}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {items.map((item) => (
          <Tabs.Content key={item.value} value={item.value}>
            {item.content}
          </Tabs.Content>
        ))}
      </Tabs.RootProvider>
    </PreviewLayout>
  );
}