import { createListCollection } from '@ark-ui/solid/collection';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
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

export const FocusAndDisabled: Story = {
  play: focusAndDisabled,
  render: () => (
    <div style={{ display: 'grid', gap: '2rem', 'max-width': '36rem' }}>
      <p>Tab through the filter and both dividers. Drag a divider, release, then move away.</p>
      <Listbox collection={collection}>
        <ListboxFilter>
          <ListboxInput placeholder="Filter fruit" aria-label="Filter fruit" />
        </ListboxFilter>
        <ListboxContent>
          {collection.items.map((item) => (
            <ListboxItem item={item}>
              <ListboxItemText>{item}</ListboxItemText>
            </ListboxItem>
          ))}
        </ListboxContent>
      </Listbox>
      <Splitter panels={panels} defaultSize={[50, 50]} style={{ height: '8rem' }}>
        <SplitterPanel id="a">Default handle</SplitterPanel>
        <SplitterResizeTrigger id="a:b" aria-label="Default divider" />
        <SplitterPanel id="b">Keyboard and mouse</SplitterPanel>
      </Splitter>
      <Splitter panels={panels} defaultSize={[50, 50]} style={{ height: '8rem' }}>
        <SplitterPanel id="a">No indicator</SplitterPanel>
        <SplitterResizeTrigger id="a:b" aria-label="Bare divider">
          {null}
        </SplitterResizeTrigger>
        <SplitterPanel id="b">Keyboard focus still visible</SplitterPanel>
      </Splitter>
      <Input disabled value="Standalone disabled input" />
      <InputGroup>
        <InputGroupAddon>Group</InputGroupAddon>
        <InputGroupInput disabled value="Disabled group input" />
      </InputGroup>
      <Fieldset disabled>
        <Field>
          <FieldLabel>Nested disabled input</FieldLabel>
          <InputGroup>
            <InputGroupInput value="Fieldset / Field / InputGroup" />
          </InputGroup>
        </Field>
      </Fieldset>
    </div>
  ),
};
export const SwitchGeometry: Story = {
  play: switchGeometry,
  render: () => (
    <div style={{ display: 'grid', gap: '1rem' }}>
      {(['ltr', 'rtl'] as const).map((dir) => (
        <LocaleProvider locale={dir === 'rtl' ? 'ar' : 'en-US'}>
          <section dir={dir} style={{ display: 'grid', gap: '1rem' }}>
            {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
              <Switch size={size} defaultChecked>
                <SwitchControl />
                <SwitchLabel>
                  {dir} / {size}
                </SwitchLabel>
                <SwitchHiddenInput />
              </Switch>
            ))}
            <LocaleProvider locale={dir === 'rtl' ? 'en-US' : 'ar'}>
              <div dir={dir === 'rtl' ? 'ltr' : 'rtl'}>
                <Switch defaultChecked>
                  <SwitchControl />
                  <SwitchLabel>Opposite direction island</SwitchLabel>
                  <SwitchHiddenInput />
                </Switch>
              </div>
            </LocaleProvider>
          </section>
        </LocaleProvider>
      ))}
    </div>
  ),
};
export const OverlayStack: Story = {
  play: overlayStack,
  render: () => (
    <Popover>
      <PopoverTrigger>Open popover</PopoverTrigger>
      <PopoverPositioner>
        <PopoverContent>
          <PopoverBody>
            <Dialog>
              <DialogTrigger>Open dialog from popover</DialogTrigger>
              <DialogBackdrop />
              <DialogPositioner>
                <DialogContent>
                  <DialogTitle>First dialog</DialogTitle>
                  <Dialog>
                    <DialogTrigger>Open nested dialog</DialogTrigger>
                    <DialogBackdrop data-testid="nested-backdrop" />
                    <DialogPositioner>
                      <DialogContent>
                        <DialogTitle>Nested dialog</DialogTitle>
                        <DialogCloseTrigger>Close nested</DialogCloseTrigger>
                      </DialogContent>
                    </DialogPositioner>
                  </Dialog>
                  <DialogCloseTrigger>Close first</DialogCloseTrigger>
                </DialogContent>
              </DialogPositioner>
            </Dialog>
          </PopoverBody>
        </PopoverContent>
      </PopoverPositioner>
    </Popover>
  ),
};
export const NarrowLeftToc: Story = {
  play: narrowLeftToc,
  render: () => (
    <Toc items={[{ value: 'style-audit-heading', depth: 2 }]}>
      <TocContent>
        <h2 id="style-audit-heading">Document content</h2>
        <Button>Focusable content</Button>
      </TocContent>
      <TocNav placement="left">
        <TocTitle>Navigation on the left</TocTitle>
      </TocNav>
    </Toc>
  ),
};