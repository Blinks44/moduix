import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@moduix/react/tabs';
import { Handshake as HandshakeIcon, Map as MapIcon, Gift as PresentIcon } from 'lucide-react';

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

export default function IconTabsDemo() {
  return (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">
          <HandshakeIcon />
          <span>Overview</span>
        </TabsTrigger>
        <TabsTrigger value="projects">
          <PresentIcon />
          <span>Projects</span>
        </TabsTrigger>
        <TabsTrigger value="account">
          <MapIcon />
          <span>Account</span>
        </TabsTrigger>
      </TabsList>

      {items.map((item) => (
        <TabsContent key={item.value} value={item.value}>
          {item.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
