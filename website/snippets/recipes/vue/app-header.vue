<script setup lang="ts">
import { useListCollection } from '@ark-ui/vue/collection';
import { useFilter } from '@ark-ui/vue/locale';
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
import { Avatar, AvatarFallback, AvatarImage } from '@moduix/vue/avatar';
import { Button } from '@moduix/vue/button';
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
} from '@moduix/vue/command-palette';
import {
  Menu,
  MenuTrigger,
  MenuPositioner,
  MenuContent,
  MenuViewport,
  MenuItem,
  MenuItemGroup,
  MenuItemGroupLabel,
} from '@moduix/vue/menu';
import styles from './app-header.module.css';

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
    <header :class="styles.root">
      <div :class="styles.leading">
        <a :class="styles.brand" href="#overview" aria-label="Orbit home"
          ><span :class="styles.brandMark" aria-hidden="true"><OrbitIcon /></span
          ><span :class="styles.brandName">Orbit</span></a
        >
        <span :class="styles.workspace"
          ><span :class="styles.statusDot" aria-hidden="true" />Acme Studio</span
        >
      </div>
      <nav :class="styles.navigation" aria-label="Primary navigation">
        <a
          v-for="(item, index) in navigation"
          :key="item.href"
          :class="styles.navigationLink"
          :href="item.href"
          :aria-current="index === 0 ? 'page' : undefined"
          >{{ item.label }}</a
        >
      </nav>
      <div :class="styles.actions">
        <span :class="styles.mobileNavigation">
          <Menu :positioning="{ placement: 'bottom-end', gutter: 10 }">
            <MenuTrigger as-child
              ><Button variant="ghost" size="icon-sm" aria-label="Open navigation"
                ><MenuIcon /></Button
            ></MenuTrigger>
            <MenuPositioner
              ><MenuContent :class="styles.mobileNavigationMenu"
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
            :class="styles.searchTrigger"
            variant="ghost"
            size="icon-sm"
            aria-label="Search workspace"
            ><Search /></Button
        ></CommandPaletteTrigger>
        <Menu :positioning="{ placement: 'bottom-end', gutter: 10 }">
          <MenuTrigger as-child>
            <Button
              :class="styles.accountTrigger"
              variant="ghost"
              size="sm"
              :aria-label="`Open ${account.name}'s account menu`"
            >
              <Avatar :class="styles.avatar" size="sm"
                ><AvatarImage :src="account.image" alt="" /><AvatarFallback>{{
                  account.name.slice(0, 1)
                }}</AvatarFallback></Avatar
              >
              <span :class="styles.accountDetails"
                ><strong>{{ account.name }}</strong
                ><span>{{ account.role }}</span></span
              >
              <ChevronDown :class="styles.accountChevron" aria-hidden="true" />
            </Button>
          </MenuTrigger>
          <MenuPositioner
            ><MenuContent :class="styles.accountMenu"
              ><MenuViewport
                ><MenuItemGroup>
                  <MenuItemGroupLabel :class="styles.accountSummary"
                    ><strong>{{ account.name }}</strong
                    ><span>{{ account.email }}</span></MenuItemGroupLabel
                  >
                  <MenuItem value="profile" as-child
                    ><a :class="styles.menuLink" href="#profile"
                      ><UserRound aria-hidden="true" />Profile</a
                    ></MenuItem
                  >
                  <MenuItem value="workspace-settings" as-child
                    ><a :class="styles.menuLink" href="#workspace-settings"
                      ><Settings aria-hidden="true" />Workspace settings</a
                    ></MenuItem
                  >
                  <MenuItem value="help" as-child
                    ><a :class="styles.menuLink" href="#help"
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
    <CommandPalettePanel :class="styles.commandPalette">
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