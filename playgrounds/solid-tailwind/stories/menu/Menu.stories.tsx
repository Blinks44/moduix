import { createSignal, splitProps } from 'solid-js';
import type { ComponentProps, JSX } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Button } from '@/components/button/Button';
import { Menu, useMenu } from '@/components/menu/Menu';

const accessibilityProps = { 'aria-hidden': 'true', focusable: 'false' } as const;

function InfoIcon(props: JSX.SvgSVGAttributes<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...accessibilityProps} {...props}>
      <path
        d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

function MapIcon(props: JSX.SvgSVGAttributes<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      {...accessibilityProps}
      {...props}
    >
      <path d="M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 0 1-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0 1 12 0" />
      <circle cx="12" cy="8" r="2" />
      <path d="M8.714 14h-3.71a1 1 0 0 0-.948.683l-2.004 6A1 1 0 0 0 3 22h18a1 1 0 0 0 .948-1.316l-2-6a1 1 0 0 0-.949-.684h-3.712" />
    </svg>
  );
}

const meta = {
  title: 'Components/Menu',
  component: Menu,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Menu>;

export default meta;

type Story = StoryObj<typeof meta>;

function MenuButtonTrigger(props: ComponentProps<typeof Menu.Trigger>) {
  const [local, others] = splitProps(props, ['children']);

  return (
    <Menu.Trigger
      {...others}
      asChild={(triggerProps) => <Button {...triggerProps()}>{local.children}</Button>}
    />
  );
}

function DefaultPositionedContent(props: { children?: JSX.Element }) {
  return (
    <Menu.Positioner>
      <Menu.Content>
        <Menu.Viewport>{props.children}</Menu.Viewport>
      </Menu.Content>
    </Menu.Positioner>
  );
}

export const Basic: Story = {
  render: () => (
    <Menu>
      <MenuButtonTrigger>
        Song
        <Menu.Indicator />
      </MenuButtonTrigger>
      <DefaultPositionedContent>
        <Menu.Item value="add-library">Add to Library</Menu.Item>
        <Menu.Item value="add-playlist">Add to Playlist</Menu.Item>
        <Menu.Separator />
        <Menu.Item value="play-next">Play Next</Menu.Item>
        <Menu.Item value="play-last">Play Last</Menu.Item>
        <Menu.Separator />
        <Menu.Item value="share" disabled>
          Share
        </Menu.Item>
      </DefaultPositionedContent>
    </Menu>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = createSignal(false);

    return (
      <Menu open={open()} onOpenChange={(details) => setOpen(details.open)}>
        <Button onClick={() => setOpen((value) => !value)}>Toggle</Button>
        <MenuButtonTrigger>
          Actions
          <Menu.Indicator />
        </MenuButtonTrigger>
        <DefaultPositionedContent>
          <Menu.Item value="edit">Edit</Menu.Item>
          <Menu.Item value="duplicate">Duplicate</Menu.Item>
          <Menu.Item value="archive">Archive</Menu.Item>
          <Menu.Item value="delete" tone="destructive">
            Delete
          </Menu.Item>
        </DefaultPositionedContent>
      </Menu>
    );
  },
};

export const RootProvider: Story = {
  render: () => {
    const menu = useMenu();

    return (
      <Menu.RootProvider value={menu}>
        <Button onClick={() => menu.api().setHighlightedValue('copy')}>Highlight Copy</Button>
        <MenuButtonTrigger>
          Edit
          <Menu.Indicator />
        </MenuButtonTrigger>
        <DefaultPositionedContent>
          <Menu.Item value="cut">Cut</Menu.Item>
          <Menu.Item value="copy">Copy</Menu.Item>
          <Menu.Item value="paste">Paste</Menu.Item>
          <Menu.Item value="delete" tone="destructive">
            Delete
          </Menu.Item>
        </DefaultPositionedContent>
      </Menu.RootProvider>
    );
  },
};

export const WithGroupsAndControls: Story = {
  render: () => {
    const [sortBy, setSortBy] = createSignal('date');
    const [showMinimap, setShowMinimap] = createSignal(true);
    const [showSearch, setShowSearch] = createSignal(true);
    const [showSidebar, setShowSidebar] = createSignal(false);

    return (
      <Menu>
        <MenuButtonTrigger>
          View
          <Menu.Indicator />
        </MenuButtonTrigger>
        <DefaultPositionedContent>
          <Menu.ItemGroup>
            <Menu.ItemGroupLabel>Sort</Menu.ItemGroupLabel>
            <Menu.RadioItemGroup
              value={sortBy()}
              onValueChange={(details) => setSortBy(details.value)}
            >
              <Menu.RadioItem value="date">
                <Menu.ItemIndicator />
                <Menu.ItemText>Date</Menu.ItemText>
              </Menu.RadioItem>
              <Menu.RadioItem value="name">
                <Menu.ItemIndicator />
                <Menu.ItemText>Name</Menu.ItemText>
              </Menu.RadioItem>
              <Menu.RadioItem value="type">
                <Menu.ItemIndicator />
                <Menu.ItemText>Type</Menu.ItemText>
              </Menu.RadioItem>
            </Menu.RadioItemGroup>
          </Menu.ItemGroup>
          <Menu.Separator />
          <Menu.ItemGroup>
            <Menu.ItemGroupLabel>Workspace</Menu.ItemGroupLabel>
            <Menu.CheckboxItem
              checked={showMinimap()}
              value="minimap"
              onCheckedChange={(checked) => setShowMinimap(checked)}
            >
              <Menu.ItemIndicator />
              <Menu.ItemText>Minimap</Menu.ItemText>
            </Menu.CheckboxItem>
            <Menu.CheckboxItem
              checked={showSearch()}
              value="search"
              onCheckedChange={(checked) => setShowSearch(checked)}
            >
              <Menu.ItemIndicator />
              <Menu.ItemText>Search</Menu.ItemText>
            </Menu.CheckboxItem>
            <Menu.CheckboxItem
              checked={showSidebar()}
              value="sidebar"
              onCheckedChange={(checked) => setShowSidebar(checked)}
            >
              <Menu.ItemIndicator />
              <Menu.ItemText>Sidebar</Menu.ItemText>
            </Menu.CheckboxItem>
          </Menu.ItemGroup>
        </DefaultPositionedContent>
      </Menu>
    );
  },
};

export const WithShortcuts: Story = {
  render: () => (
    <Menu>
      <MenuButtonTrigger>
        Edit
        <Menu.Indicator />
      </MenuButtonTrigger>
      <DefaultPositionedContent>
        <Menu.Item value="copy">
          Copy
          <Menu.ItemShortcut>Ctrl+C</Menu.ItemShortcut>
        </Menu.Item>
        <Menu.Item value="paste">
          Paste
          <Menu.ItemShortcut>Ctrl+V</Menu.ItemShortcut>
        </Menu.Item>
        <Menu.Separator />
        <Menu.Item value="rename">
          Rename
          <Menu.ItemShortcut>F2</Menu.ItemShortcut>
        </Menu.Item>
      </DefaultPositionedContent>
    </Menu>
  ),
};

export const IndicatorRightWithIcon: Story = {
  render: () => {
    const [showMinimap, setShowMinimap] = createSignal(true);
    const [showSearch, setShowSearch] = createSignal(true);

    return (
      <Menu>
        <MenuButtonTrigger>
          View
          <Menu.Indicator />
        </MenuButtonTrigger>
        <DefaultPositionedContent>
          <Menu.CheckboxItem
            checked={showMinimap()}
            value="minimap"
            onCheckedChange={(checked) => setShowMinimap(checked)}
            indicator="end"
          >
            <Menu.ItemText>
              <Menu.ItemTextContent>
                <Menu.ItemTextIcon>
                  <InfoIcon />
                </Menu.ItemTextIcon>
                <Menu.ItemTextLabel>Minimap</Menu.ItemTextLabel>
              </Menu.ItemTextContent>
            </Menu.ItemText>
            <Menu.ItemIndicator />
          </Menu.CheckboxItem>
          <Menu.CheckboxItem
            checked={showSearch()}
            value="search"
            onCheckedChange={(checked) => setShowSearch(checked)}
            indicator="end"
          >
            <Menu.ItemText>
              <Menu.ItemTextContent>
                <Menu.ItemTextIcon>
                  <MapIcon />
                </Menu.ItemTextIcon>
                <Menu.ItemTextLabel>Search</Menu.ItemTextLabel>
              </Menu.ItemTextContent>
            </Menu.ItemText>
            <Menu.ItemIndicator />
          </Menu.CheckboxItem>
        </DefaultPositionedContent>
      </Menu>
    );
  },
};

export const Nested: Story = {
  render: () => (
    <Menu>
      <MenuButtonTrigger>
        Song
        <Menu.Indicator />
      </MenuButtonTrigger>
      <DefaultPositionedContent>
        <Menu.Item value="add-library">Add to Library</Menu.Item>
        <Menu>
          <Menu.TriggerItem>
            Add to Playlist
            <Menu.TriggerItemIcon />
          </Menu.TriggerItem>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.Viewport>
                <Menu.Item value="get-up">Get Up!</Menu.Item>
                <Menu.Item value="inside-out">Inside Out</Menu.Item>
                <Menu.Item value="night-beats">Night Beats</Menu.Item>
                <Menu.Separator />
                <Menu.Item value="new-playlist">New Playlist...</Menu.Item>
              </Menu.Viewport>
            </Menu.Content>
          </Menu.Positioner>
        </Menu>
        <Menu.Separator />
        <Menu.Item value="favorite">Favorite</Menu.Item>
        <Menu.Item value="share">Share</Menu.Item>
      </DefaultPositionedContent>
    </Menu>
  ),
};

export const WithArrow: Story = {
  render: () => (
    <Menu positioning={{ placement: 'right-start', gutter: 12 }}>
      <MenuButtonTrigger>
        Export
        <Menu.Indicator />
      </MenuButtonTrigger>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.Arrow />
          <Menu.Viewport>
            <Menu.Item value="png">Export PNG</Menu.Item>
            <Menu.Item value="pdf">Export PDF</Menu.Item>
            <Menu.Separator />
            <Menu.Item value="copy-link">Copy share link</Menu.Item>
          </Menu.Viewport>
        </Menu.Content>
      </Menu.Positioner>
    </Menu>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <Menu positioning={{ placement: 'right-start', gutter: 12 }}>
      <MenuButtonTrigger>
        Export
        <Menu.Indicator />
      </MenuButtonTrigger>
      <Menu.Positioner>
        <Menu.Content class="min-w-52 bg-background outline-primary [&_[data-highlighted]]:text-primary-foreground [&_[data-highlighted]]:before:bg-primary [&_[data-slot='menu-separator']]:bg-primary">
          <Menu.Viewport>
            <Menu.Item value="png">Export PNG</Menu.Item>
            <Menu.Item value="pdf">Export PDF</Menu.Item>
            <Menu.Separator />
            <Menu.Item value="copy-link">Copy share link</Menu.Item>
          </Menu.Viewport>
        </Menu.Content>
      </Menu.Positioner>
    </Menu>
  ),
};

export const LinkItems: Story = {
  name: 'Link Items',
  render: () => (
    <Menu>
      <MenuButtonTrigger>
        Navigate
        <Menu.Indicator />
      </MenuButtonTrigger>
      <DefaultPositionedContent>
        <Menu.Item value="projects" asChild={(props) => <a {...props()} href="#projects" />}>
          Projects
        </Menu.Item>
        <Menu.Item value="teams" asChild={(props) => <a {...props()} href="#teams" />}>
          Teams
        </Menu.Item>
        <Menu.Item value="billing" asChild={(props) => <a {...props()} href="#billing" />}>
          Billing
        </Menu.Item>
        <Menu.Separator />
        <Menu.Item value="copy-link">Copy Link</Menu.Item>
      </DefaultPositionedContent>
    </Menu>
  ),
};