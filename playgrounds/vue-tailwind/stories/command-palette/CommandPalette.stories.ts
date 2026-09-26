import { useListCollection } from '@ark-ui/vue/collection';
import { useFilter } from '@ark-ui/vue/locale';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent, ref } from 'vue';
import type { Component, PropType } from 'vue';
import { Button } from '@/components/button';
import {
  CommandPalette,
  CommandPaletteCombobox,
  CommandPaletteEmpty,
  CommandPaletteFooter,
  CommandPaletteItem,
  CommandPaletteItemDescription,
  CommandPaletteItemGroup,
  CommandPaletteItemGroupLabel,
  CommandPaletteItemIcon,
  CommandPaletteItemLabel,
  CommandPaletteItemMeta,
  CommandPaletteItemText,
  CommandPaletteKbd,
  CommandPaletteList,
  CommandPalettePanel,
  CommandPaletteSearch,
  CommandPaletteTrigger,
} from '@/components/command-palette';
import { PlusIcon } from '@/internal/icons/ui/Icons';

const meta = {
  title: 'Components/CommandPalette',
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

type CommandItem = {
  id: string;
  section: string;
  label: string;
  description: string;
  shortcut?: string;
  icon: Component;
};

type ActionCommandItem = CommandItem & { onSelect: () => void };

const ArrowUpRightIcon = defineComponent({
  template:
    '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>',
});

const StarIcon = defineComponent({
  template:
    '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false"><path d="M12 3.75 14.7 9.22l5.93.86-4.29 4.18 1.01 5.9L12 17.32l-5.35 2.84 1.02-5.9-4.3-4.18 5.94-.86L12 3.75Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>',
});

const commandItems: CommandItem[] = [
  {
    id: 'new-project',
    section: 'Create',
    label: 'New project',
    description: 'Start a blank workspace',
    shortcut: 'N',
    icon: PlusIcon,
  },
  {
    id: 'invite-team',
    section: 'Create',
    label: 'Invite teammates',
    description: 'Send access to the current organization',
    shortcut: 'I',
    icon: PlusIcon,
  },
  {
    id: 'recent',
    section: 'Navigate',
    label: 'Open recent work',
    description: 'Jump back to a recently edited file',
    shortcut: 'R',
    icon: ArrowUpRightIcon,
  },
  {
    id: 'favorites',
    section: 'Navigate',
    label: 'View favorites',
    description: 'Show pinned dashboards and docs',
    shortcut: 'F',
    icon: StarIcon,
  },
  {
    id: 'notifications',
    section: 'System',
    label: 'Notification settings',
    description: 'Tune email and product alerts',
    icon: StarIcon,
  },
  {
    id: 'release-notes',
    section: 'System',
    label: 'Release notes',
    description: 'Read the latest product changes',
    icon: ArrowUpRightIcon,
  },
];

const paletteComponents = {
  Button,
  CommandPalette,
  CommandPaletteCombobox,
  CommandPaletteEmpty,
  CommandPaletteFooter,
  CommandPaletteItem,
  CommandPaletteItemDescription,
  CommandPaletteItemGroup,
  CommandPaletteItemGroupLabel,
  CommandPaletteItemIcon,
  CommandPaletteItemLabel,
  CommandPaletteItemMeta,
  CommandPaletteItemText,
  CommandPaletteKbd,
  CommandPaletteList,
  CommandPalettePanel,
  CommandPaletteSearch,
  CommandPaletteTrigger,
};
const componentRegistry = paletteComponents as Record<string, Component>;

const CommandPaletteItems = defineComponent({
  components: componentRegistry,
  props: {
    collection: {
      type: Object as PropType<{ group: () => [string, CommandItem[]][] }>,
      required: true,
    },
  },
  template: `
    <CommandPaletteList>
      <CommandPaletteEmpty>No commands found.</CommandPaletteEmpty>
      <CommandPaletteItemGroup v-for="([section, items]) in collection.group()" :key="section">
        <CommandPaletteItemGroupLabel>{{ section }}</CommandPaletteItemGroupLabel>
        <CommandPaletteItem v-for="item in items" :key="item.id" :item="item">
          <CommandPaletteItemIcon><component :is="item.icon" /></CommandPaletteItemIcon>
          <CommandPaletteItemText>
            <CommandPaletteItemLabel>{{ item.label }}</CommandPaletteItemLabel>
            <CommandPaletteItemDescription>{{ item.description }}</CommandPaletteItemDescription>
          </CommandPaletteItemText>
          <CommandPaletteItemMeta v-if="item.shortcut">{{ item.shortcut }}</CommandPaletteItemMeta>
        </CommandPaletteItem>
      </CommandPaletteItemGroup>
    </CommandPaletteList>
  `,
});

const CommandPaletteShell = defineComponent({
  components: componentRegistry,
  props: {
    collection: { type: Object as PropType<{ items: CommandItem[] }>, required: true },
    filter: { type: Function as PropType<(value: string) => void>, required: true },
    label: { type: String, required: true },
    placeholder: { type: String, required: true },
    shortcut: { type: [String, Boolean] as PropType<false | string>, default: false },
    onSelect: {
      type: Function as PropType<(details: { itemValue: string }) => void>,
      default: undefined,
    },
  },
  template: `
    <CommandPalette :aria-label="label" :shortcut="shortcut">
      <CommandPaletteTrigger as-child><Button><slot name="trigger" /></Button></CommandPaletteTrigger>
      <CommandPalettePanel>
        <CommandPaletteCombobox :collection="collection" @input-value-change="filter($event.inputValue)" @select="onSelect">
          <CommandPaletteSearch :placeholder="placeholder" />
          <slot />
        </CommandPaletteCombobox>
      </CommandPalettePanel>
    </CommandPalette>
  `,
});

const storyComponents = { ...paletteComponents, CommandPaletteItems, CommandPaletteShell };
const storyComponentRegistry = storyComponents as Record<string, Component>;

function useCommandCollection<T extends CommandItem>(items: T[]) {
  const filterOptions = useFilter({ sensitivity: 'base' });
  return useListCollection({
    initialItems: items,
    itemToString: (item) => `${item.label} ${item.description} ${item.section}`,
    itemToValue: (item) => item.id,
    filter: (itemText, filterText) => filterOptions.value.contains(itemText, filterText),
    groupBy: (item) => item.section,
  });
}

function renderStory(template: string, setup: () => Record<string, unknown>) {
  return () =>
    defineComponent({
      components: storyComponentRegistry,
      setup() {
        return setup();
      },
      template,
    });
}

export const Basic: Story = {
  render: renderStory(
    `
      <CommandPaletteShell :collection="collection" :filter="filter" label="Command palette" placeholder="Search commands, pages, and settings..." shortcut="alt+k">
        <template #trigger>Open palette <span class="text-muted-foreground">Alt+K</span></template>
        <CommandPaletteItems :collection="collection" />
        <CommandPaletteFooter>
          <span class="inline-flex min-w-0 items-center gap-1"><CommandPaletteKbd>Enter</CommandPaletteKbd> run</span>
          <span class="inline-flex min-w-0 items-center gap-1"><CommandPaletteKbd>Esc</CommandPaletteKbd> close</span>
        </CommandPaletteFooter>
      </CommandPaletteShell>
    `,
    () => {
      const state = useCommandCollection(commandItems);
      return { collection: state.collection, filter: state.filter };
    },
  ),
};

export const Actions: Story = {
  render: renderStory(
    `
      <CommandPaletteShell :collection="collection" :filter="filter" :on-select="onSelect" label="Command palette with actions" placeholder="Search and run...">
        <template #trigger>Open actions</template>
        <CommandPaletteItems :collection="collection" />
        <CommandPaletteFooter><span class="inline-flex min-w-0 items-center gap-1"><CommandPaletteKbd>Enter</CommandPaletteKbd> run</span><span>{{ lastCommand }}</span></CommandPaletteFooter>
      </CommandPaletteShell>
    `,
    () => {
      const lastCommand = ref('No command executed yet.');
      const actionItems = commandItems.map<ActionCommandItem>((item) => ({
        ...item,
        onSelect: () => (lastCommand.value = `Executed: ${item.label}`),
      }));
      const state = useCommandCollection(actionItems);
      const onSelect = (details: { itemValue: string }) => {
        state.collection.value.items.find((item) => item.id === details.itemValue)?.onSelect();
      };
      return { collection: state.collection, filter: state.filter, lastCommand, onSelect };
    },
  ),
};

export const CustomComposition: Story = {
  render: renderStory(
    `
      <CommandPaletteShell :collection="collection" :filter="filter" label="Custom command palette" placeholder="Jump to places, pages, and settings...">
        <template #trigger>Open custom palette</template>
        <CommandPaletteList>
          <CommandPaletteEmpty>No commands found.</CommandPaletteEmpty>
          <CommandPaletteItem v-for="item in collection.items" :key="item.id" :item="item">
            <CommandPaletteItemText><CommandPaletteItemLabel>{{ item.label }}</CommandPaletteItemLabel><CommandPaletteItemDescription>{{ item.description }}</CommandPaletteItemDescription></CommandPaletteItemText>
            <CommandPaletteItemMeta v-if="item.shortcut">{{ item.shortcut }}</CommandPaletteItemMeta>
          </CommandPaletteItem>
        </CommandPaletteList>
        <CommandPaletteFooter><span class="inline-flex min-w-0 items-center gap-1"><CommandPaletteKbd>Alt</CommandPaletteKbd> + <CommandPaletteKbd>K</CommandPaletteKbd></span></CommandPaletteFooter>
      </CommandPaletteShell>
    `,
    () => {
      const state = useCommandCollection(commandItems);
      return { collection: state.collection, filter: state.filter };
    },
  ),
};