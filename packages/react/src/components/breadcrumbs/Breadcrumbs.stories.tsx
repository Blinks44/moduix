import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties } from 'react';
import { Portal } from '@ark-ui/react/portal';
import { SeparatorMarkIcon } from '@/lib/moduix/icons/ui';
import { Menu } from '../menu';
import { Breadcrumbs } from './Breadcrumbs';

const collapsedMenuContentStyle = {
  '--menu-item-font-size': 'var(--text-xs)',
  '--menu-item-padding-x-end': '0.5rem',
  '--menu-item-padding-x-start': '0.5rem',
  '--menu-item-padding-y': '0.25rem',
} as CSSProperties;

const collapsedMenuTriggerStyle = {
  minWidth: 'auto',
  minHeight: 'auto',
  padding: 0,
  border: 'none',
  background: 'transparent',
  color: 'inherit',
} as CSSProperties;

function DefaultBreadcrumbs() {
  return (
    <Breadcrumbs>
      <Breadcrumbs.List>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="#">Home</Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Separator />
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="#">Vacancies</Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Separator />
        <Breadcrumbs.Item>
          <Breadcrumbs.Page>Go Developer</Breadcrumbs.Page>
        </Breadcrumbs.Item>
      </Breadcrumbs.List>
    </Breadcrumbs>
  );
}

const meta = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Breadcrumbs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <DefaultBreadcrumbs />,
};

export const Collapsed: Story = {
  render: () => (
    <Breadcrumbs>
      <Breadcrumbs.List>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="#">Home</Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Separator />
        <Breadcrumbs.Item>
          <Menu positioning={{ placement: 'bottom-start' }}>
            <Menu.Trigger aria-label="Show hidden path items" style={collapsedMenuTriggerStyle}>
              <Breadcrumbs.Ellipsis />
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content style={collapsedMenuContentStyle}>
                  <Menu.Item value="engineering" asChild>
                    <a href="#">Engineering</a>
                  </Menu.Item>
                  <Menu.Item value="backend" asChild>
                    <a href="#">Backend</a>
                  </Menu.Item>
                  <Menu.Item value="golang" asChild>
                    <a href="#">Golang</a>
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu>
        </Breadcrumbs.Item>
        <Breadcrumbs.Separator />
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="#">Vacancies</Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Separator />
        <Breadcrumbs.Item>
          <Breadcrumbs.Page>Go Developer</Breadcrumbs.Page>
        </Breadcrumbs.Item>
      </Breadcrumbs.List>
    </Breadcrumbs>
  ),
};

export const CustomSeparator: Story = {
  render: () => (
    <Breadcrumbs>
      <Breadcrumbs.List>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="#">Home</Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Separator>
          <SeparatorMarkIcon style={{ width: '0.75rem', height: '0.25rem' }} />
        </Breadcrumbs.Separator>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="#">Vacancies</Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Separator>
          <SeparatorMarkIcon style={{ width: '0.75rem', height: '0.25rem' }} />
        </Breadcrumbs.Separator>
        <Breadcrumbs.Item>
          <Breadcrumbs.Page>Go Developer</Breadcrumbs.Page>
        </Breadcrumbs.Item>
      </Breadcrumbs.List>
    </Breadcrumbs>
  ),
};

export const LongCurrentLabel: Story = {
  render: () => (
    <Breadcrumbs>
      <Breadcrumbs.List>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="#">Home</Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Separator />
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="#">Vacancies</Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Separator />
        <Breadcrumbs.Item>
          <Breadcrumbs.Page>
            Go lang developer to production team with cross-functional ownership and platform
            support
          </Breadcrumbs.Page>
        </Breadcrumbs.Item>
      </Breadcrumbs.List>
    </Breadcrumbs>
  ),
};

export const FrameworkLink: Story = {
  render: () => (
    <Breadcrumbs>
      <Breadcrumbs.List>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link asChild>
            <a href="#home" data-framework-link>
              Home
            </a>
          </Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Separator />
        <Breadcrumbs.Item>
          <Breadcrumbs.Link asChild>
            <a href="#vacancies" data-framework-link>
              Vacancies
            </a>
          </Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Separator />
        <Breadcrumbs.Item>
          <Breadcrumbs.Page>Go Developer</Breadcrumbs.Page>
        </Breadcrumbs.Item>
      </Breadcrumbs.List>
    </Breadcrumbs>
  ),
};