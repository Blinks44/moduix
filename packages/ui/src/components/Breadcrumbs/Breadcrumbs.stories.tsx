import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties } from 'react';
import { SeparatorMarkIcon } from '@/icons/ui';
import { Menu, MenuContent, MenuLinkItem, MenuTrigger } from '../Menu';
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
  '--menu-item-padding-x-end': '0.75rem',
  '--menu-item-padding-x-start': '0.75rem',
  '--menu-item-padding-y': '0.375rem',
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
          <Menu>
            <MenuTrigger aria-label="Show hidden path items">
              <BreadcrumbsEllipsis />
            </MenuTrigger>
            <MenuContent align="start" style={collapsedMenuContentStyle}>
              <MenuLinkItem closeOnClick href="#">
                Engineering
              </MenuLinkItem>
              <MenuLinkItem closeOnClick href="#">
                Backend
              </MenuLinkItem>
              <MenuLinkItem closeOnClick href="#">
                Golang
              </MenuLinkItem>
            </MenuContent>
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