import { createListCollection } from '@ark-ui/react/collection';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, screen, waitFor } from 'storybook/test';
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

const meta = { title: 'Review/Style Audit', parameters: { layout: 'padded' } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
const collection = createListCollection({ items: ['Apple', 'Pear', 'Orange'] });
const panels = [
  { id: 'a', minSize: 20 },
  { id: 'b', minSize: 20 },
];

export const FocusAndDisabled: Story = {
  play: async ({ canvas, canvasElement, userEvent }) => {
    const standalone = canvas.getByDisplayValue('Standalone disabled input');
    const grouped = canvas.getByDisplayValue('Disabled group input');
    const nested = canvas.getByDisplayValue('Fieldset / Field / InputGroup');
    await expect(getComputedStyle(standalone).opacity).toBe('0.5');
    await expect(getComputedStyle(grouped).opacity).toBe('1');
    await expect(getComputedStyle(nested).opacity).toBe('1');
    await expect(getComputedStyle(nested.closest('[data-slot=field-root]')!).opacity).toBe('1');
    await expect(getComputedStyle(nested.closest('[data-slot=input-group-root]')!).opacity).toBe(
      '1',
    );
    await expect(
      getComputedStyle(canvasElement.querySelector('[data-slot=fieldset-root]')!).opacity,
    ).toBe('0.5');

    const input = canvas.getByRole('textbox', { name: 'Filter fruit' });
    const content = canvas.getByRole('listbox');
    const idleBorder = getComputedStyle(input).borderTopColor;
    const expectJoinedFocus = async () => {
      await waitFor(() => {
        const inputStyle = getComputedStyle(input);
        const contentStyle = getComputedStyle(content);
        expect(inputStyle.borderTopColor).not.toBe(idleBorder);
        expect(contentStyle.borderLeftColor).toBe(inputStyle.borderTopColor);
        expect(contentStyle.borderRightColor).toBe(inputStyle.borderTopColor);
        expect(contentStyle.borderBottomColor).toBe(inputStyle.borderTopColor);
        expect(contentStyle.borderTopColor).toBe(idleBorder);
        expect(inputStyle.borderBottomWidth).toBe('0px');
        expect(inputStyle.outlineColor).toBe('rgba(0, 0, 0, 0)');
        expect(contentStyle.outlineColor).toBe('rgba(0, 0, 0, 0)');
      });
    };
    await userEvent.click(input);
    await expectJoinedFocus();
    await userEvent.tab();
    await waitFor(() => expect(content).toHaveFocus());
    await expect(content.matches(':focus-visible')).toBe(true);
    await expectJoinedFocus();
    await userEvent.keyboard('{ArrowDown}');
    await expect(content).toHaveAttribute('aria-activedescendant');
    const pear = canvas.getByRole('option', { name: 'Pear' });
    await userEvent.click(pear);
    await expect(pear).toHaveAttribute('aria-selected', 'true');
    await expect(getComputedStyle(content).outlineColor).toBe('rgba(0, 0, 0, 0)');
    await userEvent.click(canvas.getByText(/Tab through the filter/));
    await waitFor(() => {
      expect(getComputedStyle(input).borderTopColor).toBe(idleBorder);
      expect(getComputedStyle(content).borderColor).toBe(idleBorder);
    });
  },
  render: () => (
    <div style={{ display: 'grid', gap: '2rem', maxWidth: '36rem' }}>
      <p>Tab through the filter and both dividers. Drag a divider, release, then move away.</p>
      <Listbox collection={collection}>
        <ListboxFilter>
          <ListboxInput placeholder="Filter fruit" aria-label="Filter fruit" />
        </ListboxFilter>
        <ListboxContent>
          {collection.items.map((item) => (
            <ListboxItem key={item} item={item}>
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
      <Input disabled defaultValue="Standalone disabled input" />
      <InputGroup>
        <InputGroupAddon>Group</InputGroupAddon>
        <InputGroupInput disabled defaultValue="Disabled group input" />
      </InputGroup>
      <Fieldset disabled>
        <Field>
          <FieldLabel>Nested disabled input</FieldLabel>
          <InputGroup>
            <InputGroupInput defaultValue="Fieldset / Field / InputGroup" />
          </InputGroup>
        </Field>
      </Fieldset>
    </div>
  ),
};

export const SwitchGeometry: Story = {
  play: async ({ canvasElement }) => {
    for (const root of canvasElement.querySelectorAll('[data-slot=switch-root]')) {
      const control = root.querySelector('[data-slot=switch-control]')!;
      const thumb = root.querySelector('[data-slot=switch-thumb]')!;
      const trackRect = control.getBoundingClientRect();
      const thumbRect = thumb.getBoundingClientRect();
      const style = getComputedStyle(control);
      const inset = parseFloat(style.paddingTop) + parseFloat(style.borderTopWidth);
      await expect(thumbRect.width).toBeCloseTo(thumbRect.height, 1);
      await expect(thumbRect.top - trackRect.top).toBeCloseTo(inset, 1);
      await expect(trackRect.bottom - thumbRect.bottom).toBeCloseTo(inset, 1);
      const endGap =
        style.direction === 'rtl'
          ? thumbRect.left - trackRect.left
          : trackRect.right - thumbRect.right;
      await expect(endGap).toBeCloseTo(inset, 1);
    }
  },
  render: () => (
    <div style={{ display: 'grid', gap: '1rem' }}>
      {(['ltr', 'rtl'] as const).map((dir) => (
        <LocaleProvider key={dir} locale={dir === 'rtl' ? 'ar' : 'en-US'}>
          <section dir={dir} style={{ display: 'grid', gap: '1rem' }}>
            {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
              <Switch key={size} size={size} defaultChecked>
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
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Open popover' }));
    await userEvent.click(await screen.findByRole('button', { name: 'Open dialog from popover' }));
    const first = await screen.findByRole('dialog', { name: 'First dialog' });
    await userEvent.click(screen.getByRole('button', { name: 'Open nested dialog' }));
    const nested = await screen.findByRole('dialog', { name: 'Nested dialog' });
    await waitFor(async () => {
      const firstZ = Number(getComputedStyle(first).zIndex);
      const nestedZ = Number(getComputedStyle(nested).zIndex);
      await expect(Number.isFinite(firstZ)).toBe(true);
      await expect(nestedZ).toBe(firstZ + 1);
      await expect(Number(getComputedStyle(nested.parentElement!).zIndex)).toBe(nestedZ);
      const backdrop = nested.parentElement!.previousElementSibling!;
      await expect(Number(getComputedStyle(backdrop).zIndex)).toBe(nestedZ - 1);
    });
    await userEvent.click(screen.getByRole('button', { name: 'Close nested' }));
    await waitFor(() =>
      expect(screen.queryByRole('dialog', { name: 'Nested dialog' })).not.toBeInTheDocument(),
    );
    await userEvent.click(screen.getByRole('button', { name: 'Close first' }));
    await waitFor(() =>
      expect(screen.queryByRole('dialog', { name: 'First dialog' })).not.toBeInTheDocument(),
    );
    await userEvent.click(canvas.getByRole('button', { name: 'Open popover' }));
  },
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
                    <DialogBackdrop />
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
  play: async ({ canvasElement }) => {
    const root = canvasElement.querySelector('[data-slot=toc-root]')!;
    const columns = getComputedStyle(root).gridTemplateColumns.split(' ').length;
    await expect(columns).toBe(window.matchMedia('(width < 48rem)').matches ? 1 : 2);
  },
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