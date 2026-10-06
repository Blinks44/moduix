<script setup lang="ts">
import { createListCollection } from '@ark-ui/vue/collection';
import type { ComboboxRootEmits } from '@ark-ui/vue/combobox';
import { useSignaturePad as useArkSignaturePad } from '@ark-ui/vue/signature-pad';
import { Button } from '@moduix/vue/button';
import { ChartPlot } from '@moduix/vue/chart';
import { Clipboard, ClipboardInput } from '@moduix/vue/clipboard';
import {
  CommandPalette,
  CommandPaletteCombobox,
  CommandPaletteRootProvider,
} from '@moduix/vue/command-palette';
import {
  DatePicker,
  DatePickerField,
  DatePickerRangeField,
  DatePickerDayTable,
  DatePickerMonthSelect,
  DatePickerYearSelect,
  DatePickerValueText,
} from '@moduix/vue/date-picker';
import { Dialog, DialogCloseIcon, useDialog } from '@moduix/vue/dialog';
import { Drawer, DrawerCloseIcon } from '@moduix/vue/drawer';
import { FieldInput, FieldSelect, FieldTextarea } from '@moduix/vue/field';
import { FileUpload, FileUploadClearTrigger } from '@moduix/vue/file-upload';
import { FloatingPanel, FloatingPanelCloseIcon } from '@moduix/vue/floating-panel';
import { InputGroup, InputGroupInput } from '@moduix/vue/input-group';
import { Lightbox, LightboxCloseIcon } from '@moduix/vue/lightbox';
import {
  ListboxClearTrigger,
  ListboxContext,
  ListboxRootProvider,
  useListbox,
} from '@moduix/vue/listbox';
import { usePinInput } from '@moduix/vue/pin-input';
import { Popover, PopoverCloseIcon } from '@moduix/vue/popover';
import { SelectContext, SelectRootProvider, SelectValueText, useSelect } from '@moduix/vue/select';
import {
  SignaturePadCanvas,
  SignaturePadClearTrigger,
  SignaturePadRootProvider,
  useSignaturePad,
} from '@moduix/vue/signature-pad';
import type { SignaturePadRootProviderProps } from '@moduix/vue/signature-pad';
import { Spinner } from '@moduix/vue/spinner';
import {
  Tour,
  TourArrow,
  TourCloseIcon,
  TourDescription,
  TourProgressText,
  TourTitle,
  useTour,
} from '@moduix/vue/tour';
import { barY, defineChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { ref } from 'vue';

const rawApi = useArkSignaturePad();
const query = ref('project');
const fieldDefaultPropsRemoved: Extract<
  | keyof InstanceType<typeof FieldInput>['$props']
  | keyof InstanceType<typeof FieldSelect>['$props'],
  'defaultValue'
> extends never
  ? true
  : false = true;
const clearDisabled = ref<boolean>();
type ChartDatum = { month: string; value: number; note: string };
const chartDefinition = defineChart({
  marks: [barY([{ month: 'Jan', value: 42, note: 'Forecast' }], { x: 'month', y: 'value' })],
  scales: { x: { scale: scaleBand }, y: { scale: scaleLinear } },
});
const dialog = useDialog();
const tour = useTour({
  steps: [{ id: 'welcome', type: 'dialog', title: 'Welcome', description: 'Start the tour.' }],
});
const commands = createListCollection({
  items: [{ value: 'settings', label: 'Settings', rank: 1 }],
});
type Command = (typeof commands.items)[number];
const listbox = useListbox({ collection: commands });
const select = useSelect({ collection: commands });
const readRank = (items: Command[]) => items[0]?.rank;
const handleHighlight = (
  details: ComboboxRootEmits<(typeof commands.items)[number]>['highlightChange'][0],
) => {
  const rank: number | undefined = details.highlightedItem?.rank;
  return rank;
};
usePinInput({ count: 4 }, () => undefined);
const enhancedApi = useSignaturePad({ readOnly: true }, () => undefined);
const providerProps: SignaturePadRootProviderProps = { value: rawApi.value };
const fixedPropTypes: Extract<
  | keyof InstanceType<typeof DatePickerField>['$props']
  | keyof InstanceType<typeof DatePickerRangeField>['$props']
  | keyof InstanceType<typeof DatePickerDayTable>['$props'],
  'asChild'
> extends never
  ? true
  : false = true;
const fixedSlotTypes: Extract<
  | keyof InstanceType<typeof DatePickerField>['$slots']
  | keyof InstanceType<typeof DatePickerRangeField>['$slots']
  | keyof InstanceType<typeof DatePickerDayTable>['$slots'],
  'default'
> extends never
  ? true
  : false = true;
</script>

<template>
  <FieldInput v-model="query" :size="8" @update:model-value="($event) => $event?.toString()" />
  <FieldTextarea v-model="query" autoresize />
  <FieldSelect v-model="query"><option value="project">Project</option></FieldSelect>
  <output>{{ fieldDefaultPropsRemoved }}</output>
  <DatePicker selection-mode="multiple">
    <DatePickerMonthSelect :multiple="false" :size="'4'" aria-label="Month" />
    <DatePickerYearSelect :size="4" aria-label="Year" />
    <DatePickerValueText v-slot="entry">
      <button type="button" @click="entry.remove()">
        {{ entry.index.toFixed() }}: {{ entry.valueAsString.toUpperCase() }} (day
        {{ entry.value.day.toFixed() }})
      </button>
    </DatePickerValueText>
  </DatePicker>
  <!-- @vue-generic {ChartDatum, string, number} -->
  <ChartPlot
    v-bind="{ ariaLabel: 'Forecast' }"
    :definition="chartDefinition"
    :motion="false"
    :on-select="(point) => point?.datum.note.toUpperCase()"
    :on-render="(context) => context.surface.element"
    :render-tooltip-body="(context) => context.points[0]?.datum.note ?? context.defaultBody()"
  />
  <Dialog><DialogCloseIcon :aria-label="query" title="Dismiss dialog" /></Dialog>
  <Drawer><DrawerCloseIcon aria-label="Dismiss drawer" /></Drawer>
  <Popover><PopoverCloseIcon aria-label="Dismiss popover" /></Popover>
  <FloatingPanel>
    <FloatingPanelCloseIcon aria-label="Dismiss panel"><span>Dismiss</span></FloatingPanelCloseIcon>
  </FloatingPanel>
  <Lightbox><LightboxCloseIcon aria-labelledby="preview-dismiss-label" /></Lightbox>
  <FileUpload>
    <FileUploadClearTrigger :aria-label="query" aria-labelledby="clear-files-label">
      Clear files
    </FileUploadClearTrigger>
    <FileUploadClearTrigger as-child
      ><button type="button">Clear files</button></FileUploadClearTrigger
    >
  </FileUpload>
  <Clipboard
    v-model="query"
    @value-change="($event) => $event.value.toUpperCase()"
    @status-change="($event) => $event.copied.valueOf()"
  >
    <ClipboardInput :class="['consumer-input', { highlighted: true }]" readonly />
  </Clipboard>
  <InputGroup size="xl">
    <InputGroupInput v-model="query" size="xs" :html-size="22" aria-label="Project" />
  </InputGroup>
  <ListboxRootProvider :value="listbox">
    <!-- @vue-generic {Command} -->
    <ListboxContext v-slot="context"
      ><output>{{ readRank(context.selectedItems) }}</output></ListboxContext
    >
  </ListboxRootProvider>
  <SelectRootProvider :value="select" :portalled="false">
    <SelectValueText placeholder="Choose command"
      ><span>{{ query }}</span></SelectValueText
    >
    <!-- @vue-generic {Command} -->
    <SelectContext v-slot="context"
      ><output>{{ readRank(context.selectedItems) }}</output></SelectContext
    >
  </SelectRootProvider>
  <Tour :tour="tour" :portalled="false">
    <TourTitle
      ><span>{{ query }}</span></TourTitle
    >
    <TourDescription><span>Custom description</span></TourDescription>
    <TourProgressText><span>Custom progress</span></TourProgressText>
    <TourArrow><span>Custom arrow</span></TourArrow>
    <TourCloseIcon :aria-label="query" aria-labelledby="dismiss-label">
      <span>Dismiss</span>
    </TourCloseIcon>
  </Tour>
  <CommandPalette :portalled="false">
    <CommandPaletteCombobox
      :collection="commands"
      @highlight-change="handleHighlight"
      @input-value-change="($event) => $event.inputValue.toUpperCase()"
      @update:input-value="($event) => $event.toUpperCase()"
      @select="($event) => $event.value.map((value) => value.toUpperCase())"
    />
  </CommandPalette>
  <CommandPaletteRootProvider :value="dialog" @exit-complete="() => undefined" />
  <Button
    aria-disabled="false"
    :aria-busy="false"
    @click="($event) => $event.preventDefault()"
    @click.capture="($event) => $event.preventDefault()"
    >Continue</Button
  >
  <Button as-child :aria-disabled="false"><a href="#docs">Docs</a></Button>
  <Spinner aria-label="Syncing" aria-labelledby="progress-label" />
  <ListboxClearTrigger aria-label="Clear fruit" />
  <output>{{ fixedPropTypes }} {{ fixedSlotTypes }}</output>
  <DatePicker><DatePickerField placeholder="yyyy-mm-dd" /></DatePicker>
  <DatePicker selection-mode="range"><DatePickerRangeField /></DatePicker>
  <SignaturePadRootProvider v-bind="providerProps">
    <SignaturePadCanvas />
    <SignaturePadClearTrigger :disabled="clearDisabled" :aria-label="query" />
  </SignaturePadRootProvider>
  <SignaturePadRootProvider :value="enhancedApi">
    <SignaturePadCanvas />
    <SignaturePadClearTrigger as-child :disabled="false" aria-labelledby="clear-signature-label">
      <button type="button">Reset signature</button>
    </SignaturePadClearTrigger>
  </SignaturePadRootProvider>
</template>