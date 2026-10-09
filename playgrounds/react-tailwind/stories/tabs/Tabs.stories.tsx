import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import {
  Tabs,
  TabsContent,
  TabsIndicator,
  TabsList,
  TabsRootProvider,
  TabsTrigger,
  useTabs,
} from '@/components/tabs/Tabs';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

const tabItems = [
  {
    value: 'overview',
    title: 'Overview',
    content:
      'Review project status, team velocity, workloads and activity highlights in one place.',
  },
  {
    value: 'projects',
    title: 'Projects',
    content: 'Track active workstreams, owners and milestones across all departments.',
  },
  {
    value: 'account',
    title: 'Account',
    content: 'Manage personal settings, team settings, notifications and access preferences.',
  },
];

const demoRootClassName = 'w-88 min-[32rem]:w-128';
const panelTextClassName = 'm-0';

function HandshakeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  );
}

function PresentIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 7v14" />
      <path d="M20 11v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8" />
      <path d="M7.5 7a1 1 0 0 1 0-5A4.8 8 0 0 1 12 7a4.8 8 0 0 1 4.5-5 1 1 0 0 1 0 5" />
      <rect x="3" y="7" width="18" height="4" rx="1" />
    </svg>
  );
}

function MapIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 0 1-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0 1 12 0" />
      <circle cx="12" cy="8" r="2" />
      <path d="M8.714 14h-3.71a1 1 0 0 0-.948.683l-2.004 6A1 1 0 0 0 3 22h18a1 1 0 0 0 .948-1.316l-2-6a1 1 0 0 0-.949-.684h-3.712" />
    </svg>
  );
}

function TabsStoryContent() {
  return (
    <>
      <TabsList>
        {tabItems.map((item) => (
          <TabsTrigger key={item.value} value={item.value}>
            {item.title}
          </TabsTrigger>
        ))}
        <TabsIndicator />
      </TabsList>
      {tabItems.map((item) => (
        <TabsContent key={item.value} value={item.value}>
          <p className={panelTextClassName}>{item.content}</p>
        </TabsContent>
      ))}
    </>
  );
}

export const Basic: Story = {
  render: () => (
    <Tabs defaultValue="overview" className={demoRootClassName}>
      <TabsStoryContent />
    </Tabs>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('projects');

    return (
      <Tabs
        value={value}
        onValueChange={(details) => setValue(details.value)}
        className={demoRootClassName}
      >
        <TabsStoryContent />
      </Tabs>
    );
  },
};

export const Vertical: Story = {
  render: () => (
    <Tabs defaultValue="overview" orientation="vertical" className={demoRootClassName}>
      <TabsStoryContent />
    </Tabs>
  ),
};

export const ManualActivation: Story = {
  render: () => (
    <Tabs defaultValue="overview" activationMode="manual" className={demoRootClassName}>
      <TabsStoryContent />
    </Tabs>
  ),
};

export const Indicator: Story = {
  render: () => (
    <Tabs defaultValue="overview" className={demoRootClassName}>
      <TabsList>
        {tabItems.map((item) => (
          <TabsTrigger key={item.value} value={item.value}>
            {item.title}
          </TabsTrigger>
        ))}
        <TabsIndicator />
      </TabsList>
      {tabItems.map((item) => (
        <TabsContent key={item.value} value={item.value}>
          <p className={panelTextClassName}>{item.content}</p>
        </TabsContent>
      ))}
    </Tabs>
  ),
};

export const Line: Story = {
  render: () => (
    <Tabs defaultValue="overview" variant="line" className={demoRootClassName}>
      <TabsStoryContent />
    </Tabs>
  ),
};

export const Links: Story = {
  render: () => (
    <Tabs defaultValue="overview" className={demoRootClassName}>
      <TabsList>
        {tabItems.map((item) => (
          <TabsTrigger key={item.value} value={item.value} asChild>
            <a href={`#${item.value}`}>{item.title}</a>
          </TabsTrigger>
        ))}
      </TabsList>
      {tabItems.map((item) => (
        <TabsContent key={item.value} value={item.value}>
          <p id={item.value} className={panelTextClassName}>
            {item.content}
          </p>
        </TabsContent>
      ))}
    </Tabs>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Tabs defaultValue="overview" className={demoRootClassName}>
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
      {tabItems.map((item) => (
        <TabsContent key={item.value} value={item.value}>
          <p className={panelTextClassName}>{item.content}</p>
        </TabsContent>
      ))}
    </Tabs>
  ),
};

export const DisabledTab: Story = {
  render: () => (
    <Tabs defaultValue="overview" className={demoRootClassName}>
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="projects" disabled>
          Projects
        </TabsTrigger>
        <TabsTrigger value="account">Account</TabsTrigger>
      </TabsList>
      {tabItems.map((item) => (
        <TabsContent key={item.value} value={item.value}>
          <p className={panelTextClassName}>{item.content}</p>
        </TabsContent>
      ))}
    </Tabs>
  ),
};

export const LazyMount: Story = {
  render: () => (
    <Tabs defaultValue="overview" lazyMount unmountOnExit className={demoRootClassName}>
      <TabsStoryContent />
    </Tabs>
  ),
};

export const RootProvider: Story = {
  render: () => {
    const tabs = useTabs({ defaultValue: 'overview' });

    return (
      <div className="grid gap-3">
        <output className="text-sm leading-5 text-muted-foreground">selected: {tabs.value}</output>
        <TabsRootProvider value={tabs} className={demoRootClassName}>
          <TabsStoryContent />
        </TabsRootProvider>
      </div>
    );
  },
};

export const RootProviderVertical: Story = {
  render: () => {
    const tabs = useTabs({ defaultValue: 'overview', orientation: 'vertical' });

    return (
      <TabsRootProvider value={tabs} variant="line" className={demoRootClassName}>
        <TabsStoryContent />
      </TabsRootProvider>
    );
  },
};

export const CustomStyling: Story = {
  render: () => (
    <Tabs
      defaultValue="name"
      className="w-88 flex-row items-center justify-between gap-4 min-[32rem]:w-128"
    >
      <TabsList className="shrink-0 rounded-none border-0 bg-transparent p-0">
        <TabsTrigger value="name" className="rounded-sm">
          Name
        </TabsTrigger>
        <TabsTrigger value="email" className="rounded-sm">
          Email
        </TabsTrigger>
        <TabsIndicator className="top-auto bottom-0 h-0.5 [translate:none] rounded-full bg-foreground" />
      </TabsList>
      <TabsContent value="name" className="min-w-0 flex-1 border-0 bg-transparent p-0">
        <input
          className="box-border h-9 w-full rounded-sm border border-border bg-background px-2 text-sm text-foreground"
          placeholder="Full name"
          aria-label="Full name"
        />
      </TabsContent>
      <TabsContent value="email" className="min-w-0 flex-1 border-0 bg-transparent p-0">
        <input
          className="box-border h-9 w-full rounded-sm border border-border bg-background px-2 text-sm text-foreground"
          placeholder="Email"
          aria-label="Email"
        />
      </TabsContent>
    </Tabs>
  ),
};