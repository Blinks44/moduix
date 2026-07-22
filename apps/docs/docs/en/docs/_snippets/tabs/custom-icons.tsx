import { Tabs } from '@moduix/react';
import { Handshake as HandshakeIcon, Map as MapIcon, Gift as PresentIcon } from 'lucide-react';
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

export default function IconTabsDemo() {
  return (
    <PreviewLayout maxWidth="32rem">
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
          <Tabs.Content key={item.value} value={item.value}>
            {item.content}
          </Tabs.Content>
        ))}
      </Tabs>
    </PreviewLayout>
  );
}