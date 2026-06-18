import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties } from 'react';
import { Portal } from '@ark-ui/react/portal';
import { SeparatorMarkIcon } from '@/lib/moduix/icons/ui';
import { Menu, MenuContent, MenuItem, MenuPositioner, MenuTrigger } from '../menu';
import {
  Breadcrumbs,
  BreadcrumbsEllipsis,
  BreadcrumbsItem,
  BreadcrumbsLink,
  BreadcrumbsList,
  BreadcrumbsPage,
  BreadcrumbsSeparator,
} from './Breadcrumbs';

const collapsedMenuContentStyle = {
  '--menu-item-font-size': 'var(--text-xs)',
  '--menu-item-padding-x-end': '0.625rem',
  '--menu-item-padding-x-start': '0.625rem',
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
      <BreadcrumbsList>
        <BreadcrumbsItem>
          <BreadcrumbsLink href="#">Home</BreadcrumbsLink>
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
            <MenuTrigger aria-label="Show hidden path items" style={collapsedMenuTriggerStyle}>
              <BreadcrumbsEllipsis />
            </MenuTrigger>
            <Portal>
              <MenuPositioner>
                <MenuContent style={collapsedMenuContentStyle}>
                  <MenuItem value="engineering" asChild>
                    <a href="#">Engineering</a>
                  </MenuItem>
                  <MenuItem value="backend" asChild>
                    <a href="#">Backend</a>
                  </MenuItem>
                  <MenuItem value="golang" asChild>
                    <a href="#">Golang</a>
                  </MenuItem>
                </MenuContent>
              </MenuPositioner>
            </Portal>
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
      <BreadcrumbsList>
        <BreadcrumbsItem>
          <BreadcrumbsLink href="#">Home</BreadcrumbsLink>
        </BreadcrumbsItem>
        <BreadcrumbsSeparator>
          <SeparatorMarkIcon style={{ width: '0.75rem', height: '0.25rem' }} />
        </BreadcrumbsSeparator>
        <BreadcrumbsItem>
          <BreadcrumbsLink href="#">Vacancies</BreadcrumbsLink>
        </BreadcrumbsItem>
        <BreadcrumbsSeparator>
          <SeparatorMarkIcon style={{ width: '0.75rem', height: '0.25rem' }} />
        </BreadcrumbsSeparator>
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
      <BreadcrumbsList>
        <BreadcrumbsItem>
          <BreadcrumbsLink href="#">Home</BreadcrumbsLink>
        </BreadcrumbsItem>
        <BreadcrumbsSeparator />
        <BreadcrumbsItem>
          <BreadcrumbsLink href="#">Vacancies</BreadcrumbsLink>
        </BreadcrumbsItem>
        <BreadcrumbsSeparator />
        <BreadcrumbsItem>
          <BreadcrumbsPage>
            Go lang developer to production team with cross-functional ownership and platform
            support
          </BreadcrumbsPage>
        </BreadcrumbsItem>
      </BreadcrumbsList>
    </Breadcrumbs>
  ),
};

export const FrameworkLink: Story = {
  render: () => (
    <Breadcrumbs>
      <BreadcrumbsList>
        <BreadcrumbsItem>
          <BreadcrumbsLink render={<a href="#home" data-framework-link />}>Home</BreadcrumbsLink>
        </BreadcrumbsItem>
        <BreadcrumbsSeparator />
        <BreadcrumbsItem>
          <BreadcrumbsLink render={<a href="#vacancies" data-framework-link />}>
            Vacancies
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