import { Tabs, useTabs } from '@moduix/solid/tabs';
import styles from '@/components/examples/tabs/tabs-root-provider.module.css';

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
    <div class={styles.root}>
      <Tabs.RootProvider value={tabs}>
        <Tabs.List>
          {items.map((item) => (
            <Tabs.Trigger value={item.value}>{item.title}</Tabs.Trigger>
          ))}
        </Tabs.List>

        {items.map((item) => (
          <Tabs.Content value={item.value}>{item.content}</Tabs.Content>
        ))}
      </Tabs.RootProvider>
      <output>Selected: {tabs().value ?? 'none'}</output>
    </div>
  );
}