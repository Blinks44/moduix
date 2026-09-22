import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
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

export default function DisabledTabTabsDemo() {
  return (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="projects" disabled>
          Projects
        </TabsTrigger>
        <TabsTrigger value="account">Account</TabsTrigger>
      </TabsList>

      {items.map((item) => (
        <TabsContent value={item.value}>{item.content}</TabsContent>
      ))}
    </Tabs>
  );
}
