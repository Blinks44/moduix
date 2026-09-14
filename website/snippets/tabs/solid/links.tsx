import { Tabs } from '@moduix/solid/tabs';

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
    <Tabs defaultValue="overview">
      <Tabs.List>
        {items.map((item) => (
          <Tabs.Trigger
            value={item.value}
            asChild={(props) => (
              <a {...props()} href={'#' + item.value}>
                {item.title}
              </a>
            )}
          />
        ))}
      </Tabs.List>

      {items.map((item) => (
        <Tabs.Content value={item.value}>
          <span id={item.value}>{item.content}</span>
        </Tabs.Content>
      ))}
    </Tabs>
  );
}