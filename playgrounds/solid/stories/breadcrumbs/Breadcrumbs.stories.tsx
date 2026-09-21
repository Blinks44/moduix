import type { JSX } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
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
import { Menu, MenuTrigger, MenuPositioner, MenuContent, MenuViewport, MenuItem } from '@/components/menu/Menu';

const accessibilityProps = { 'aria-hidden': 'true', focusable: 'false' } as const;

function SeparatorMarkIcon(props: JSX.SvgSVGAttributes<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 4" fill="none" {...accessibilityProps} {...props}>
      <path d="M1 2h14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
    </svg>
  );
}

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
} as JSX.CSSProperties;

const collapsedMenuTriggerStyle = {
  minWidth: 'auto',
  minHeight: 'auto',
  padding: 0,
  border: 'none',
  background: 'transparent',
  color: 'inherit',
} as JSX.CSSProperties;

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
            <MenuTrigger
              asChild={(props) => (
                <button
                  {...props()}
                  type="button"
                  aria-label="Show hidden path items"
                  style={collapsedMenuTriggerStyle}
                >
                  <BreadcrumbsEllipsis />
                </button>
              )}
            />
            <MenuPositioner>
              <MenuContent style={collapsedMenuContentStyle}>
                <MenuViewport>
                  <MenuItem
                    value="engineering"
                    asChild={(props) => (
                      <a {...props()} href="#">
                        Engineering
                      </a>
                    )}
                  />
                  <MenuItem
                    value="backend"
                    asChild={(props) => (
                      <a {...props()} href="#">
                        Backend
                      </a>
                    )}
                  />
                  <MenuItem
                    value="golang"
                    asChild={(props) => (
                      <a {...props()} href="#">
                        Golang
                      </a>
                    )}
                  />
                </MenuViewport>
              </MenuContent>
            </MenuPositioner>
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
          <BreadcrumbsLink
            asChild={(props) => (
              <a {...props()} href="#home" data-framework-link>
                Home
              </a>
            )}
          />
        </BreadcrumbsItem>
        <BreadcrumbsSeparator />
        <BreadcrumbsItem>
          <BreadcrumbsLink
            asChild={(props) => (
              <a {...props()} href="#vacancies" data-framework-link>
                Vacancies
              </a>
            )}
          />
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
          <BreadcrumbsLink
            asChild={(props) => (
              <a {...props()} href="#home" data-framework-link>
                Home
              </a>
            )}
          />
        </BreadcrumbsItem>
        <BreadcrumbsSeparator />
        <BreadcrumbsItem>
          <BreadcrumbsLink
            asChild={(props) => (
              <a {...props()} href="#engineering" data-framework-link>
                Engineering
              </a>
            )}
          />
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
