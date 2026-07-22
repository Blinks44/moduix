import { Tabs } from '@moduix/react';

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

export default function LineTabsDemo() {
  return (
    <Tabs defaultValue="overview" variant="line">
      <Tabs.List>
        {items.map((item) => (
          <Tabs.Trigger key={item.value} value={item.value}>
            {item.title}
          </Tabs.Trigger>
        ))}
        <Tabs.Indicator />
      </Tabs.List>

      {items.map((item) => (
        <Tabs.Content key={item.value} value={item.value}>
          {item.content}
        </Tabs.Content>
      ))}
    </Tabs>
  );
}