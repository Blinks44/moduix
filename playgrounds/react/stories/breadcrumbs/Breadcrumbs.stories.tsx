import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties } from 'react';
import {
  Breadcrumbs,
  BreadcrumbsEllipsis,
  BreadcrumbsItem,
  BreadcrumbsLink,
  BreadcrumbsList,
  BreadcrumbsPage,
  BreadcrumbsPath,
  BreadcrumbsSeparator,
} from '@/components/breadcrumbs/Breadcrumbs';
import { Menu } from '@/components/menu/Menu';
import { SeparatorMarkIcon } from '@/lib/moduix/icons/ui';

const defaultLinks = [
  { href: '#', label: 'Home' },
  { href: '#', label: 'Vacancies' },
] as const;

const defaultPage = 'Go Developer';

const collapsedMenuContentStyle = {
  '--moduix-menu-item-font-size': 'var(--moduix-text-xs)',
  '--moduix-menu-item-padding-x-end': '0.5rem',
  '--moduix-menu-item-padding-x-start': '0.5rem',
  '--moduix-menu-item-padding-y': '0.25rem',
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
      <BreadcrumbsPath links={defaultLinks} page={defaultPage} />
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
      <BreadcrumbsList>
        <BreadcrumbsItem>
          <BreadcrumbsLink href="#">Home</BreadcrumbsLink>
        </BreadcrumbsItem>
        <BreadcrumbsSeparator />
        <BreadcrumbsItem>
          <Menu positioning={{ placement: 'bottom-start' }}>
            <Menu.Trigger asChild>
              <button
                type="button"
                aria-label="Show hidden path items"
                style={collapsedMenuTriggerStyle}
              >
                <BreadcrumbsEllipsis />
              </button>
            </Menu.Trigger>
            <Menu.Positioner>
              <Menu.Content style={collapsedMenuContentStyle}>
                <Menu.Viewport>
                  <Menu.Item value="engineering" asChild>
                    <a href="#">Engineering</a>
                  </Menu.Item>
                  <Menu.Item value="backend" asChild>
                    <a href="#">Backend</a>
                  </Menu.Item>
                  <Menu.Item value="golang" asChild>
                    <a href="#">Golang</a>
                  </Menu.Item>
                </Menu.Viewport>
              </Menu.Content>
            </Menu.Positioner>
          </Menu>
        </BreadcrumbsItem>
        <BreadcrumbsSeparator />
        <BreadcrumbsItem>
          <BreadcrumbsLink href="#">Vacancies</BreadcrumbsLink>
        </BreadcrumbsItem>
        <BreadcrumbsSeparator />
        <BreadcrumbsItem>
          <BreadcrumbsPage>Go Developer</BreadcrumbsPage>
        </BreadcrumbsItem>
      </BreadcrumbsList>
    </Breadcrumbs>
  ),
};

export const CustomSeparator: Story = {
  render: () => (
    <Breadcrumbs>
      <BreadcrumbsPath
        links={defaultLinks}
        page={defaultPage}
        separator={<SeparatorMarkIcon style={{ width: '0.75rem', height: '0.25rem' }} />}
      />
    </Breadcrumbs>
  ),
};

export const RightToLeft: Story = {
  render: () => (
    <Breadcrumbs dir="rtl" aria-label="مسار التنقل">
      <BreadcrumbsPath
        links={[
          { href: '#', label: 'الرئيسية' },
          { href: '#', label: 'الوظائف' },
        ]}
        page="مطور Go"
      />
    </Breadcrumbs>
  ),
};

export const FrameworkLink: Story = {
  render: () => (
    <Breadcrumbs>
      <BreadcrumbsList>
        <BreadcrumbsItem>
          <BreadcrumbsLink asChild>
            <a href="#home" data-framework-link>
              Home
            </a>
          </BreadcrumbsLink>
        </BreadcrumbsItem>
        <BreadcrumbsSeparator />
        <BreadcrumbsItem>
          <BreadcrumbsLink asChild>
            <a href="#vacancies" data-framework-link>
              Vacancies
            </a>
          </BreadcrumbsLink>
        </BreadcrumbsItem>
        <BreadcrumbsSeparator />
        <BreadcrumbsItem>
          <BreadcrumbsPage>Go Developer</BreadcrumbsPage>
        </BreadcrumbsItem>
      </BreadcrumbsList>
    </Breadcrumbs>
  ),
};

export const LongCurrentLabel: Story = {
  render: () => (
    <Breadcrumbs>
      <BreadcrumbsPath
        links={[
          { href: '#', label: 'Home' },
          { href: '#', label: 'Vacancies' },
        ]}
        page="Go lang developer to production team with cross-functional ownership and platform support"
      />
    </Breadcrumbs>
  ),
};

export const AdvancedCustomization: Story = {
  render: () => (
    <Breadcrumbs>
      <BreadcrumbsList>
        <BreadcrumbsItem>
          <BreadcrumbsLink asChild>
            <a href="#home" data-framework-link>
              Home
            </a>
          </BreadcrumbsLink>
        </BreadcrumbsItem>
        <BreadcrumbsSeparator />
        <BreadcrumbsItem>
          <BreadcrumbsLink asChild>
            <a href="#engineering" data-framework-link>
              Engineering
            </a>
          </BreadcrumbsLink>
        </BreadcrumbsItem>
        <BreadcrumbsSeparator>
          <SeparatorMarkIcon style={{ width: '0.75rem', height: '0.25rem' }} />
        </BreadcrumbsSeparator>
        <BreadcrumbsItem>
          <BreadcrumbsPage>
            <span title="Go lang developer to production team with cross-functional ownership and platform support">
              Go lang developer to production team with cross-functional ownership and platform
              support
            </span>
          </BreadcrumbsPage>
        </BreadcrumbsItem>
      </BreadcrumbsList>
    </Breadcrumbs>
  ),
};