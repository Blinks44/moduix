<script setup lang="ts">
import {
  ChevronDown,
  CircleHelp,
  FolderKanban,
  LayoutDashboard,
  Menu as MenuIcon,
  Orbit as OrbitIcon,
  Search,
  Settings,
  UserRound,
} from '@lucide/vue';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  CommandPalette,
  CommandPaletteCombobox,
  CommandPaletteEmpty,
  CommandPaletteItem,
  CommandPaletteItemDescription,
  CommandPaletteItemGroup,
  CommandPaletteItemGroupLabel,
  CommandPaletteItemIcon,
  CommandPaletteItemLabel,
  CommandPaletteItemText,
  CommandPaletteList,
  CommandPalettePanel,
  CommandPaletteSearch,
  CommandPaletteTrigger,
  useListCollection,
  useFilter,
} from '@/components/ui/command-palette';
import {
  Menu,
  MenuTrigger,
  MenuPositioner,
  MenuContent,
  MenuViewport,
  MenuItem,
  MenuItemGroup,
  MenuItemGroupLabel,
} from '@/components/ui/menu';

const navigation = [
  { label: 'Overview', href: '#overview' },
  { label: 'Projects', href: '#projects' },
  { label: 'Team', href: '#team' },
];

const commandItems = [
  {
    id: 'overview',
    section: 'Navigate',
    label: 'Overview',
    description: 'View your workspace summary',
    href: '#overview',
    icon: LayoutDashboard,
  },
  {
    id: 'projects',
    section: 'Navigate',
    label: 'Projects',
    description: 'Browse active projects',
    href: '#projects',
    icon: FolderKanban,
  },
  {
    id: 'team',
    section: 'Navigate',
    label: 'Team',
    description: 'See your teammates',
    href: '#team',
    icon: UserRound,
  },
  {
    id: 'workspace-settings',
    section: 'Workspace',
    label: 'Workspace settings',
    description: 'Manage your workspace preferences',
    href: '#workspace-settings',
    icon: Settings,
  },
  {
    id: 'help',
    section: 'Workspace',
    label: 'Help and support',
    description: 'Find product help',
    href: '#help',
    icon: CircleHelp,
  },
];

const account = {
  name: 'Alex Morgan',
  role: 'Product designer',
  email: 'alex@acme.studio',
  image:
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=128&h=128&q=80',
};
const filterOptions = useFilter({ sensitivity: 'base' });
const { collection, filter } = useListCollection({
  initialItems: commandItems,
  itemToString: (item) => `${item.label} ${item.description} ${item.section}`,
  itemToValue: (item) => item.href,
  filter: (text, query) => filterOptions.value.contains(text, query),
  groupBy: (item) => item.section,
});
const navigate = (value: string) => {
  window.location.hash = value;
};
</script>
<template>
  <CommandPalette aria-label="Search workspace" @open-change="!$event.open && filter('')">
    <header
      class="grid min-h-18 w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-2 rounded-xl border border-border/72 bg-card/96 p-2 text-card-foreground shadow-sm min-[36rem]:rounded-[calc(var(--radius-xl)+0.5rem)] md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:gap-4"
    >
      <div class="flex min-w-0 items-center gap-3">
        <a
          class="inline-flex shrink-0 items-center gap-2 text-inherit no-underline focus-visible:rounded-md focus-visible:outline-focus focus-visible:outline-offset-focus focus-visible:outline-ring"
          href="#overview"
          aria-label="Orbit home"
          ><span
            class="grid size-9 place-items-center rounded-lg bg-foreground text-background shadow-sm [&>svg]:size-4.5 [&>svg]:stroke-[2.25]"
            aria-hidden="true"
            ><OrbitIcon /></span
          ><span class="text-base font-semibold tracking-[-0.025em]">Orbit</span></a
        >
        <span
          class="hidden min-w-0 items-center gap-2 border-s border-border ps-3 text-sm whitespace-nowrap text-muted-foreground lg:inline-flex"
          ><span
            class="size-2 shrink-0 rounded-full bg-primary shadow-[0_0_0_2px_color-mix(in_oklab,var(--color-primary)_18%,transparent)]"
            aria-hidden="true"
          />Acme Studio</span
        >
      </div>
      <nav
        class="hidden items-center gap-0.5 rounded-full bg-[color-mix(in_oklab,var(--color-muted)_82%,var(--color-background)_18%)] p-1 md:flex"
        aria-label="Primary navigation"
      >
        <a
          v-for="(item, index) in navigation"
          :key="item.href"
          class="inline-flex min-h-9 items-center rounded-full px-3 text-sm font-medium text-muted-foreground no-underline transition-[background-color,box-shadow,color] duration-150 ease-in-out hover:text-foreground focus-visible:outline-focus focus-visible:outline-offset-focus focus-visible:outline-ring aria-[current=page]:bg-card aria-[current=page]:text-foreground aria-[current=page]:shadow-sm motion-reduce:transition-none"
          :href="item.href"
          :aria-current="index === 0 ? 'page' : undefined"
          >{{ item.label }}</a
        >
      </nav>
      <div class="flex min-w-0 items-center justify-end gap-1">
        <span class="inline-flex md:hidden">
          <Menu :positioning="{ placement: 'bottom-end', gutter: 10 }">
            <MenuTrigger as-child
              ><Button variant="ghost" size="icon-sm" aria-label="Open navigation"
                ><MenuIcon /></Button
            ></MenuTrigger>
            <MenuPositioner
              ><MenuContent class="min-w-48"
                ><MenuViewport
                  ><MenuItemGroup>
                    <MenuItemGroupLabel>Navigation</MenuItemGroupLabel>
                    <MenuItem
                      v-for="(item, index) in navigation"
                      :key="item.href"
                      :value="item.href"
                      as-child
                      ><a :href="item.href" :aria-current="index === 0 ? 'page' : undefined">{{
                        item.label
                      }}</a></MenuItem
                    >
                  </MenuItemGroup></MenuViewport
                ></MenuContent
              ></MenuPositioner
            >
          </Menu>
        </span>
        <CommandPaletteTrigger as-child
          ><Button
            class="rounded-full text-muted-foreground [&>svg]:size-4 [&>svg]:shrink-0"
            variant="ghost"
            size="icon-sm"
            aria-label="Search workspace"
            ><Search /></Button
        ></CommandPaletteTrigger>
        <Menu :positioning="{ placement: 'bottom-end', gutter: 10 }">
          <MenuTrigger as-child>
            <Button
              class="h-auto gap-2 rounded-full p-0 min-[36rem]:py-1 min-[36rem]:ps-1 min-[36rem]:pe-2"
              variant="ghost"
              size="sm"
              :aria-label="`Open ${account.name}'s account menu`"
            >
              <Avatar class="shrink-0 ring-1 ring-border" size="sm"
                ><AvatarImage :src="account.image" alt="" /><AvatarFallback>{{
                  account.name.slice(0, 1)
                }}</AvatarFallback></Avatar
              >
              <span
                class="hidden min-w-0 gap-0.5 text-start min-[36rem]:grid [&_span]:truncate [&_span]:text-xs [&_span]:leading-none [&_span]:font-normal [&_span]:text-muted-foreground [&_strong]:truncate [&_strong]:text-sm [&_strong]:leading-none [&_strong]:font-medium"
                ><strong>{{ account.name }}</strong><span>{{ account.role }}</span></span
              >
              <ChevronDown
                class="hidden size-4 shrink-0 text-muted-foreground min-[36rem]:block"
                aria-hidden="true"
              />
            </Button>
          </MenuTrigger>
          <MenuPositioner
            ><MenuContent class="min-w-60"
              ><MenuViewport
                ><MenuItemGroup>
                  <MenuItemGroupLabel
                    class="grid min-w-0 gap-0.5 py-1 text-start [&_span]:truncate [&_span]:text-xs [&_span]:font-normal [&_span]:text-muted-foreground [&_strong]:text-sm [&_strong]:font-medium [&_strong]:text-foreground"
                    ><strong>{{ account.name }}</strong
                    ><span>{{ account.email }}</span></MenuItemGroupLabel
                  >
                  <MenuItem value="profile" as-child
                    ><a
                      class="flex items-center gap-2 [&>svg]:size-4 [&>svg]:shrink-0"
                      href="#profile"
                      ><UserRound aria-hidden="true" />Profile</a
                    ></MenuItem
                  >
                  <MenuItem value="workspace-settings" as-child
                    ><a
                      class="flex items-center gap-2 [&>svg]:size-4 [&>svg]:shrink-0"
                      href="#workspace-settings"
                      ><Settings aria-hidden="true" />Workspace settings</a
                    ></MenuItem
                  >
                  <MenuItem value="help" as-child
                    ><a class="flex items-center gap-2 [&>svg]:size-4 [&>svg]:shrink-0" href="#help"
                      ><CircleHelp aria-hidden="true" />Help and support</a
                    ></MenuItem
                  >
                </MenuItemGroup></MenuViewport
              ></MenuContent
            ></MenuPositioner
          >
        </Menu>
      </div>
    </header>
    <CommandPalettePanel class="w-[min(34rem,calc(100vw-2rem))]">
      <CommandPaletteCombobox
        :collection="collection"
        @input-value-change="filter($event.inputValue)"
        @select="navigate($event.itemValue)"
      >
        <CommandPaletteSearch placeholder="Search workspace..." />
        <CommandPaletteList>
          <CommandPaletteEmpty>No commands found.</CommandPaletteEmpty>
          <CommandPaletteItemGroup v-for="[section, items] in collection.group()" :key="section">
            <CommandPaletteItemGroupLabel>{{ section }}</CommandPaletteItemGroupLabel>
            <CommandPaletteItem v-for="item in items" :key="item.id" :item="item">
              <CommandPaletteItemIcon><component :is="item.icon" /></CommandPaletteItemIcon>
              <CommandPaletteItemText
                ><CommandPaletteItemLabel>{{ item.label }}</CommandPaletteItemLabel
                ><CommandPaletteItemDescription>{{
                  item.description
                }}</CommandPaletteItemDescription></CommandPaletteItemText
              >
            </CommandPaletteItem>
          </CommandPaletteItemGroup>
        </CommandPaletteList>
      </CommandPaletteCombobox>
    </CommandPalettePanel>
  </CommandPalette>
</template>