import { createListCollection } from '@ark-ui/vue/collection';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent, type Component } from 'vue';
import { Button } from '@/components/button';
import {
  Dialog,
  DialogBackdrop,
  DialogContent,
  DialogPositioner,
  DialogTitle,
  DialogTrigger,
  DialogCloseTrigger,
} from '@/components/dialog';
import { Field, FieldLabel } from '@/components/field';
import { Fieldset } from '@/components/fieldset';
import { Input } from '@/components/input';
import { InputGroup, InputGroupInput, InputGroupAddon } from '@/components/input-group';
import {
  Listbox,
  ListboxFilter,
  ListboxInput,
  ListboxContent,
  ListboxItem,
  ListboxItemText,
} from '@/components/listbox';
import {
  Popover,
  PopoverTrigger,
  PopoverPositioner,
  PopoverContent,
  PopoverBody,
} from '@/components/popover';
import { Splitter, SplitterPanel, SplitterResizeTrigger } from '@/components/splitter';
import { Switch, SwitchControl, SwitchLabel, SwitchHiddenInput } from '@/components/switch';
import { Toc, TocContent, TocNav, TocTitle } from '@/components/toc';
import { LocaleProvider } from '@/locale';
import { focusAndDisabled, switchGeometry, overlayStack, narrowLeftToc } from './StyleAudit.checks';

const meta = { title: 'Review/Style Audit', parameters: { layout: 'padded' } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
const collection = createListCollection({ items: ['Apple', 'Pear', 'Orange'] });
const panels = [
  { id: 'a', minSize: 20 },
  { id: 'b', minSize: 20 },
];
const focusAndDisabledComponents = {
  Field,
  FieldLabel,
  Fieldset,
  Input,
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  Listbox,
  ListboxFilter,
  ListboxInput,
  ListboxContent,
  ListboxItem,
  ListboxItemText,
  Splitter,
  SplitterPanel,
  SplitterResizeTrigger,
} as unknown as Record<string, Component>;

const FocusAndDisabledDemo = defineComponent({
  components: focusAndDisabledComponents,
  setup: () => ({ collection, panels }),
  template: `
      <div style="display: grid; gap: 2rem; max-width: 36rem">
        <p>Tab through the filter and both dividers. Drag a divider, release, then move away.</p>
        <Listbox :collection="collection">
          <ListboxFilter><ListboxInput placeholder="Filter fruit" aria-label="Filter fruit" /></ListboxFilter>
          <ListboxContent><ListboxItem v-for="item in collection.items" :key="item" :item="item"><ListboxItemText>{{ item }}</ListboxItemText></ListboxItem></ListboxContent>
        </Listbox>
        <Splitter :panels="panels" :default-size="[50, 50]" style="height: 8rem">
          <SplitterPanel id="a">Default handle</SplitterPanel><SplitterResizeTrigger id="a:b" aria-label="Default divider" /><SplitterPanel id="b">Keyboard and mouse</SplitterPanel>
        </Splitter>
        <Splitter :panels="panels" :default-size="[50, 50]" style="height: 8rem">
          <SplitterPanel id="a">No indicator</SplitterPanel><SplitterResizeTrigger id="a:b" aria-label="Bare divider">{{ null }}</SplitterResizeTrigger><SplitterPanel id="b">Keyboard focus still visible</SplitterPanel>
        </Splitter>
        <Input disabled value="Standalone disabled input" />
        <InputGroup><InputGroupAddon>Group</InputGroupAddon><InputGroupInput disabled value="Disabled group input" /></InputGroup>
        <Fieldset disabled><Field><FieldLabel>Nested disabled input</FieldLabel><InputGroup><InputGroupInput value="Fieldset / Field / InputGroup" /></InputGroup></Field></Fieldset>
      </div>
    `,
});

export const FocusAndDisabled: Story = {
  play: focusAndDisabled,
  render: () => FocusAndDisabledDemo,
};
const switchGeometryComponents = {
  LocaleProvider,
  Switch,
  SwitchControl,
  SwitchLabel,
  SwitchHiddenInput,
} as unknown as Record<string, Component>;

const SwitchGeometryDemo = defineComponent({
  components: switchGeometryComponents,
  setup: () => ({ directions: ['ltr', 'rtl'], sizes: ['xs', 'sm', 'md', 'lg', 'xl'] }),
  template: `
      <div style="display: grid; gap: 1rem">
        <LocaleProvider v-for="dir in directions" :key="dir" :locale="dir === 'rtl' ? 'ar' : 'en-US'">
          <section :dir="dir" style="display: grid; gap: 1rem">
            <Switch v-for="size in sizes" :key="size" :size="size" default-checked><SwitchControl /><SwitchLabel>{{ dir }} / {{ size }}</SwitchLabel><SwitchHiddenInput /></Switch>
            <LocaleProvider :locale="dir === 'rtl' ? 'en-US' : 'ar'">
              <div :dir="dir === 'rtl' ? 'ltr' : 'rtl'"><Switch default-checked><SwitchControl /><SwitchLabel>Opposite direction island</SwitchLabel><SwitchHiddenInput /></Switch></div>
            </LocaleProvider>
          </section>
        </LocaleProvider>
      </div>
    `,
});

export const SwitchGeometry: Story = {
  play: switchGeometry,
  render: () => SwitchGeometryDemo,
};
const OverlayStackDemo = defineComponent({
  components: {
    Popover,
    PopoverTrigger,
    PopoverPositioner,
    PopoverContent,
    PopoverBody,
    Dialog,
    DialogBackdrop,
    DialogContent,
    DialogPositioner,
    DialogTitle,
    DialogTrigger,
    DialogCloseTrigger,
  },
  template: `
      <Popover><PopoverTrigger>Open popover</PopoverTrigger><PopoverPositioner><PopoverContent><PopoverBody>
        <Dialog><DialogTrigger>Open dialog from popover</DialogTrigger><DialogBackdrop /><DialogPositioner><DialogContent>
          <DialogTitle>First dialog</DialogTitle>
          <Dialog><DialogTrigger>Open nested dialog</DialogTrigger><DialogBackdrop data-testid="nested-backdrop" /><DialogPositioner><DialogContent><DialogTitle>Nested dialog</DialogTitle><DialogCloseTrigger>Close nested</DialogCloseTrigger></DialogContent></DialogPositioner></Dialog>
          <DialogCloseTrigger>Close first</DialogCloseTrigger>
        </DialogContent></DialogPositioner></Dialog>
      </PopoverBody></PopoverContent></PopoverPositioner></Popover>
    `,
});

export const OverlayStack: Story = {
  play: overlayStack,
  render: () => OverlayStackDemo,
};
const NarrowLeftTocDemo = defineComponent({
  components: { Button, Toc, TocContent, TocNav, TocTitle },
  template: `
      <Toc :items="[{ value: 'style-audit-heading', depth: 2 }]">
        <TocContent><h2 id="style-audit-heading">Document content</h2><Button>Focusable content</Button></TocContent>
        <TocNav placement="left"><TocTitle>Navigation on the left</TocTitle></TocNav>
      </Toc>
    `,
});

export const NarrowLeftToc: Story = {
  play: narrowLeftToc,
  render: () => NarrowLeftTocDemo,
};