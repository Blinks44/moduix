import { Tabs, TabsContent, TabsList, TabsTrigger } from '@moduix/solid/tabs';
import { Gift as PresentIcon, Handshake as HandshakeIcon, Map as MapIcon } from 'lucide-solid';

const items = [
  {
    value: 'overview',
    content:
      'Review project status, team velocity, workloads and activity highlights in one place.',
  },
  {
    value: 'projects',
    content:
      'Track active workstreams, owners and milestones across all departments and align delivery timelines.',
  },
  {
    value: 'account',
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
        <TabsContent value={item.value}>{item.content}</TabsContent>
      ))}
    </Tabs>
  );
}