import { createSignal, splitProps } from 'solid-js';
import type { ComponentProps, JSX } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Button } from '@/components/button/Button';
import {
  Menu,
  useMenu,
  MenuRootProvider,
  MenuTrigger,
  MenuIndicator,
  MenuPositioner,
  MenuContent,
  MenuViewport,
  MenuArrow,
  MenuItem,
  MenuTriggerItem,
  MenuTriggerItemIcon,
  MenuSeparator,
  MenuItemGroup,
  MenuItemGroupLabel,
  MenuRadioItemGroup,
  MenuRadioItem,
  MenuCheckboxItem,
  MenuItemIndicator,
  MenuItemText,
  MenuItemTextContent,
  MenuItemTextIcon,
  MenuItemTextLabel,
  MenuItemShortcut,
} from '@/components/menu/Menu';

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

function MenuButtonTrigger(props: ComponentProps<typeof MenuTrigger>) {
  const [local, others] = splitProps(props, ['children']);

  return (
    <MenuTrigger
      {...others}
      asChild={(triggerProps) => <Button {...triggerProps()}>{local.children}</Button>}
    />
  );
}

function DefaultPositionedContent(props: { children?: JSX.Element }) {
  return (
    <MenuPositioner>
      <MenuContent>
        <MenuViewport>{props.children}</MenuViewport>
      </MenuContent>
    </MenuPositioner>
  );
}

export const Basic: Story = {
  render: () => (
    <Menu>
      <MenuButtonTrigger>
        Song
        <MenuIndicator />
      </MenuButtonTrigger>
      <DefaultPositionedContent>
        <MenuItem value="add-library">Add to Library</MenuItem>
        <MenuItem value="add-playlist">Add to Playlist</MenuItem>
        <MenuSeparator />
        <MenuItem value="play-next">Play Next</MenuItem>
        <MenuItem value="play-last">Play Last</MenuItem>
        <MenuSeparator />
        <MenuItem value="share" disabled>
          Share
        </MenuItem>
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
          <MenuIndicator />
        </MenuButtonTrigger>
        <DefaultPositionedContent>
          <MenuItem value="edit">Edit</MenuItem>
          <MenuItem value="duplicate">Duplicate</MenuItem>
          <MenuItem value="archive">Archive</MenuItem>
          <MenuItem value="delete" tone="destructive">
            Delete
          </MenuItem>
        </DefaultPositionedContent>
      </Menu>
    );
  },
};

export const RootProvider: Story = {
  render: () => {
    const menu = useMenu();

    return (
      <MenuRootProvider value={menu}>
        <Button onClick={() => menu.api().setHighlightedValue('copy')}>Highlight Copy</Button>
        <MenuButtonTrigger>
          Edit
          <MenuIndicator />
        </MenuButtonTrigger>
        <DefaultPositionedContent>
          <MenuItem value="cut">Cut</MenuItem>
          <MenuItem value="copy">Copy</MenuItem>
          <MenuItem value="paste">Paste</MenuItem>
          <MenuItem value="delete" tone="destructive">
            Delete
          </MenuItem>
        </DefaultPositionedContent>
      </MenuRootProvider>
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
          <MenuIndicator />
        </MenuButtonTrigger>
        <DefaultPositionedContent>
          <MenuItemGroup>
            <MenuItemGroupLabel>Sort</MenuItemGroupLabel>
            <MenuRadioItemGroup
              value={sortBy()}
              onValueChange={(details) => setSortBy(details.value)}
            >
              <MenuRadioItem value="date">
                <MenuItemIndicator />
                <MenuItemText>Date</MenuItemText>
              </MenuRadioItem>
              <MenuRadioItem value="name">
                <MenuItemIndicator />
                <MenuItemText>Name</MenuItemText>
              </MenuRadioItem>
              <MenuRadioItem value="type">
                <MenuItemIndicator />
                <MenuItemText>Type</MenuItemText>
              </MenuRadioItem>
            </MenuRadioItemGroup>
          </MenuItemGroup>
          <MenuSeparator />
          <MenuItemGroup>
            <MenuItemGroupLabel>Workspace</MenuItemGroupLabel>
            <MenuCheckboxItem
              checked={showMinimap()}
              value="minimap"
              onCheckedChange={(checked) => setShowMinimap(checked)}
            >
              <MenuItemIndicator />
              <MenuItemText>Minimap</MenuItemText>
            </MenuCheckboxItem>
            <MenuCheckboxItem
              checked={showSearch()}
              value="search"
              onCheckedChange={(checked) => setShowSearch(checked)}
            >
              <MenuItemIndicator />
              <MenuItemText>Search</MenuItemText>
            </MenuCheckboxItem>
            <MenuCheckboxItem
              checked={showSidebar()}
              value="sidebar"
              onCheckedChange={(checked) => setShowSidebar(checked)}
            >
              <MenuItemIndicator />
              <MenuItemText>Sidebar</MenuItemText>
            </MenuCheckboxItem>
          </MenuItemGroup>
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
        <MenuIndicator />
      </MenuButtonTrigger>
      <DefaultPositionedContent>
        <MenuItem value="copy">
          Copy
          <MenuItemShortcut>Ctrl+C</MenuItemShortcut>
        </MenuItem>
        <MenuItem value="paste">
          Paste
          <MenuItemShortcut>Ctrl+V</MenuItemShortcut>
        </MenuItem>
        <MenuSeparator />
        <MenuItem value="rename">
          Rename
          <MenuItemShortcut>F2</MenuItemShortcut>
        </MenuItem>
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
          <MenuIndicator />
        </MenuButtonTrigger>
        <DefaultPositionedContent>
          <MenuCheckboxItem
            checked={showMinimap()}
            value="minimap"
            onCheckedChange={(checked) => setShowMinimap(checked)}
            indicator="end"
          >
            <MenuItemText>
              <MenuItemTextContent>
                <MenuItemTextIcon>
                  <InfoIcon />
                </MenuItemTextIcon>
                <MenuItemTextLabel>Minimap</MenuItemTextLabel>
              </MenuItemTextContent>
            </MenuItemText>
            <MenuItemIndicator />
          </MenuCheckboxItem>
          <MenuCheckboxItem
            checked={showSearch()}
            value="search"
            onCheckedChange={(checked) => setShowSearch(checked)}
            indicator="end"
          >
            <MenuItemText>
              <MenuItemTextContent>
                <MenuItemTextIcon>
                  <MapIcon />
                </MenuItemTextIcon>
                <MenuItemTextLabel>Search</MenuItemTextLabel>
              </MenuItemTextContent>
            </MenuItemText>
            <MenuItemIndicator />
          </MenuCheckboxItem>
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
        <MenuIndicator />
      </MenuButtonTrigger>
      <DefaultPositionedContent>
        <MenuItem value="add-library">Add to Library</MenuItem>
        <Menu>
          <MenuTriggerItem>
            Add to Playlist
            <MenuTriggerItemIcon />
          </MenuTriggerItem>
          <MenuPositioner>
            <MenuContent>
              <MenuViewport>
                <MenuItem value="get-up">Get Up!</MenuItem>
                <MenuItem value="inside-out">Inside Out</MenuItem>
                <MenuItem value="night-beats">Night Beats</MenuItem>
                <MenuSeparator />
                <MenuItem value="new-playlist">New Playlist...</MenuItem>
              </MenuViewport>
            </MenuContent>
          </MenuPositioner>
        </Menu>
        <MenuSeparator />
        <MenuItem value="favorite">Favorite</MenuItem>
        <MenuItem value="share">Share</MenuItem>
      </DefaultPositionedContent>
    </Menu>
  ),
};

export const WithArrow: Story = {
  render: () => (
    <Menu positioning={{ placement: 'right-start', gutter: 12 }}>
      <MenuButtonTrigger>
        Export
        <MenuIndicator />
      </MenuButtonTrigger>
      <MenuPositioner>
        <MenuContent>
          <MenuArrow />
          <MenuViewport>
            <MenuItem value="png">Export PNG</MenuItem>
            <MenuItem value="pdf">Export PDF</MenuItem>
            <MenuSeparator />
            <MenuItem value="copy-link">Copy share link</MenuItem>
          </MenuViewport>
        </MenuContent>
      </MenuPositioner>
    </Menu>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <Menu positioning={{ placement: 'right-start', gutter: 12 }}>
      <MenuButtonTrigger>
        Export
        <MenuIndicator />
      </MenuButtonTrigger>
      <MenuPositioner>
        <MenuContent class="min-w-52 bg-background outline-primary [&_[data-highlighted]]:text-primary-foreground [&_[data-highlighted]]:before:bg-primary [&_[data-slot='menu-separator']]:bg-primary">
          <MenuViewport>
            <MenuItem value="png">Export PNG</MenuItem>
            <MenuItem value="pdf">Export PDF</MenuItem>
            <MenuSeparator />
            <MenuItem value="copy-link">Copy share link</MenuItem>
          </MenuViewport>
        </MenuContent>
      </MenuPositioner>
    </Menu>
  ),
};

export const LinkItems: Story = {
  name: 'Link Items',
  render: () => (
    <Menu>
      <MenuButtonTrigger>
        Navigate
        <MenuIndicator />
      </MenuButtonTrigger>
      <DefaultPositionedContent>
        <MenuItem value="projects" asChild={(props) => <a {...props()} href="#projects" />}>
          Projects
        </MenuItem>
        <MenuItem value="teams" asChild={(props) => <a {...props()} href="#teams" />}>
          Teams
        </MenuItem>
        <MenuItem value="billing" asChild={(props) => <a {...props()} href="#billing" />}>
          Billing
        </MenuItem>
        <MenuSeparator />
        <MenuItem value="copy-link">Copy Link</MenuItem>
      </DefaultPositionedContent>
    </Menu>
  ),
};