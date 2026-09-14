import { Tabs } from '@moduix/solid/tabs';
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
      <Tabs.List>
        <Tabs.Trigger value="overview">
          <HandshakeIcon />
          <span>Overview</span>
        </Tabs.Trigger>
        <Tabs.Trigger value="projects">
          <PresentIcon />
          <span>Projects</span>
        </Tabs.Trigger>
        <Tabs.Trigger value="account">
          <MapIcon />
          <span>Account</span>
        </Tabs.Trigger>
      </Tabs.List>

      {items.map((item) => (
        <Tabs.Content value={item.value}>{item.content}</Tabs.Content>
      ))}
    </Tabs>
  );
}