import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent, h } from 'vue';
import {
  Breadcrumbs,
  BreadcrumbsEllipsis,
  BreadcrumbsItem,
  BreadcrumbsLink,
  BreadcrumbsList,
  BreadcrumbsPage,
  BreadcrumbsPath,
  BreadcrumbsSeparator,
} from '@/components/breadcrumbs';
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuPositioner,
  MenuTrigger,
  MenuViewport,
} from '@/components/menu';
import { SeparatorMarkIcon } from '@/lib/moduix/icons/ui/Icons';

const defaultLinks = [
  { href: '#', label: 'Home' },
  { href: '#', label: 'Vacancies' },
] as const;

const defaultPage = 'Go Developer';
const longCurrentLabel =
  'Go lang developer to production team with cross-functional ownership and platform support';

const collapsedMenuContentStyle = {
  '--moduix-menu-item-font-size': 'var(--moduix-text-xs)',
  '--moduix-menu-item-padding-x-end': '0.5rem',
  '--moduix-menu-item-padding-x-start': '0.5rem',
  '--moduix-menu-item-padding-y': '0.25rem',
};

const collapsedMenuTriggerStyle = {
  minWidth: 'auto',
  minHeight: 'auto',
  padding: 0,
  border: 'none',
  background: 'transparent',
  color: 'inherit',
};

const storyComponents = {
  Breadcrumbs,
  BreadcrumbsEllipsis,
  BreadcrumbsItem,
  BreadcrumbsLink,
  BreadcrumbsList,
  BreadcrumbsPage,
  BreadcrumbsPath,
  BreadcrumbsSeparator,
  Menu,
  MenuContent,
  MenuItem,
  MenuPositioner,
  MenuTrigger,
  MenuViewport,
  SeparatorMarkIcon,
};

const meta = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Breadcrumbs>;

export default meta;

type Story = StoryObj<typeof meta>;

function renderStory(template: string, setup?: () => Record<string, unknown>) {
  return () =>
    defineComponent({
      components: storyComponents,
      setup() {
        return {
          collapsedMenuContentStyle,
          collapsedMenuTriggerStyle,
          defaultLinks,
          defaultPage,
          longCurrentLabel,
          ...setup?.(),
        };
      },
      template,
    });
}

export const Default: Story = {
  render: renderStory(
    `
      <Breadcrumbs>
        <BreadcrumbsPath :links="defaultLinks" :page="defaultPage" />
      </Breadcrumbs>
    `,
  ),
};

export const Collapsed: Story = {
  render: renderStory(
    `
      <Breadcrumbs>
        <BreadcrumbsList>
          <BreadcrumbsItem><BreadcrumbsLink href="#">Home</BreadcrumbsLink></BreadcrumbsItem>
          <BreadcrumbsSeparator />
          <BreadcrumbsItem>
            <Menu :positioning="{ placement: 'bottom-start' }">
              <MenuTrigger as-child>
                <button
                  type="button"
                  aria-label="Show hidden path items"
                  :style="collapsedMenuTriggerStyle"
                >
                  <BreadcrumbsEllipsis />
                </button>
              </MenuTrigger>
              <MenuPositioner>
                <MenuContent :style="collapsedMenuContentStyle">
                  <MenuViewport>
                    <MenuItem value="engineering" as-child><a href="#">Engineering</a></MenuItem>
                    <MenuItem value="backend" as-child><a href="#">Backend</a></MenuItem>
                    <MenuItem value="golang" as-child><a href="#">Golang</a></MenuItem>
                  </MenuViewport>
                </MenuContent>
              </MenuPositioner>
            </Menu>
          </BreadcrumbsItem>
          <BreadcrumbsSeparator />
          <BreadcrumbsItem><BreadcrumbsLink href="#">Vacancies</BreadcrumbsLink></BreadcrumbsItem>
          <BreadcrumbsSeparator />
          <BreadcrumbsItem><BreadcrumbsPage>Go Developer</BreadcrumbsPage></BreadcrumbsItem>
        </BreadcrumbsList>
      </Breadcrumbs>
    `,
  ),
};

export const CustomSeparator: Story = {
  render: renderStory(
    `
      <Breadcrumbs>
        <BreadcrumbsPath :links="defaultLinks" :page="defaultPage" :separator="separator" />
      </Breadcrumbs>
    `,
    () => ({
      separator: h(SeparatorMarkIcon, { style: { width: '0.75rem', height: '0.25rem' } }),
    }),
  ),
};

export const RightToLeft: Story = {
  render: renderStory(
    `
      <Breadcrumbs dir="rtl" aria-label="مسار التنقل">
        <BreadcrumbsPath :links="links" :page="page" />
      </Breadcrumbs>
    `,
    () => ({
      links: [
        { href: '#', label: 'الرئيسية' },
        { href: '#', label: 'الوظائف' },
      ],
      page: 'مطور Go',
    }),
  ),
};

export const FrameworkLink: Story = {
  render: renderStory(`
    <Breadcrumbs>
      <BreadcrumbsList>
        <BreadcrumbsItem>
          <BreadcrumbsLink as-child><a href="#home" data-framework-link>Home</a></BreadcrumbsLink>
        </BreadcrumbsItem>
        <BreadcrumbsSeparator />
        <BreadcrumbsItem>
          <BreadcrumbsLink as-child><a href="#vacancies" data-framework-link>Vacancies</a></BreadcrumbsLink>
        </BreadcrumbsItem>
        <BreadcrumbsSeparator />
        <BreadcrumbsItem><BreadcrumbsPage>Go Developer</BreadcrumbsPage></BreadcrumbsItem>
      </BreadcrumbsList>
    </Breadcrumbs>
  `),
};

export const LongCurrentLabel: Story = {
  render: renderStory(
    `
      <Breadcrumbs>
        <BreadcrumbsPath :links="defaultLinks" :page="page" />
      </Breadcrumbs>
    `,
    () => ({
      page: h('span', { title: longCurrentLabel }, longCurrentLabel),
    }),
  ),
};

export const AdvancedCustomization: Story = {
  render: renderStory(`
    <Breadcrumbs>
      <BreadcrumbsList>
        <BreadcrumbsItem>
          <BreadcrumbsLink as-child><a href="#home" data-framework-link>Home</a></BreadcrumbsLink>
        </BreadcrumbsItem>
        <BreadcrumbsSeparator />
        <BreadcrumbsItem>
          <BreadcrumbsLink as-child><a href="#engineering" data-framework-link>Engineering</a></BreadcrumbsLink>
        </BreadcrumbsItem>
        <BreadcrumbsSeparator>
          <SeparatorMarkIcon :style="{ width: '0.75rem', height: '0.25rem' }" />
        </BreadcrumbsSeparator>
        <BreadcrumbsItem>
          <BreadcrumbsPage>
            <span :title="longCurrentLabel">{{ longCurrentLabel }}</span>
          </BreadcrumbsPage>
        </BreadcrumbsItem>
      </BreadcrumbsList>
    </Breadcrumbs>
  `),
};