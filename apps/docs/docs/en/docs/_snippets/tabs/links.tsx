import { Tabs } from '@moduix/react';
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

export default function LinkTabsDemo() {
  return (
    <PreviewLayout maxWidth="32rem">
      <Tabs defaultValue="overview">
        <Tabs.List>
          {items.map((item) => (
            <Tabs.Trigger key={item.value} value={item.value} asChild>
              <a href={'#' + item.value}>{item.title}</a>
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {items.map((item) => (
          <Tabs.Content key={item.value} value={item.value}>
            <span id={item.value}>{item.content}</span>
          </Tabs.Content>
        ))}
      </Tabs>
    </PreviewLayout>
  );
}