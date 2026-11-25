import { Badge } from '@moduix/react/badge';
import { Button } from '@moduix/react/button';
import {
  ColorPicker,
  ColorPickerArea,
  ColorPickerChannelInput,
  ColorPickerContent,
  ColorPickerControl,
  ColorPickerHiddenInput,
  ColorPickerPositioner,
  ColorPickerSliders,
  ColorPickerSwatchGroup,
  ColorPickerSwatchTrigger,
  ColorPickerTrigger,
  parseColor,
} from '@moduix/react/color-picker';
import {
  Combobox,
  ComboboxDropdown,
  ComboboxEmpty,
  ComboboxField,
  ComboboxList,
  ComboboxOption,
  useFilteredCollection,
} from '@moduix/react/combobox';
import { DatePicker, DatePickerField, DatePickerPanel, parseDate } from '@moduix/react/date-picker';
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadHiddenInput,
  FileUploadItemGroup,
  FileUploadItems,
  FileUploadTrigger,
} from '@moduix/react/file-upload';
import { SignaturePad, SignaturePadCanvas } from '@moduix/react/signature-pad';
import {
  TagsInput,
  TagsInputClearTrigger,
  TagsInputControl,
  TagsInputHiddenInput,
  TagsInputInput,
  TagsInputItems,
} from '@moduix/react/tags-input';
import { toast } from '@moduix/react/toast';
import { Bell, CheckCircle2, Upload } from 'lucide-react';
import { useState } from 'react';
import styles from './home-tiles.module.css';

const swatches = ['#3d63f5', '#10b981', '#f59e0b', '#8b5cf6'];

function ColorPickerTile() {
  return (
    <div className={styles.tileInner}>
      <ColorPicker defaultValue={parseColor('#3d63f5')}>
        <ColorPickerControl>
          <ColorPickerChannelInput channel="hex" aria-label="Hex color" />
          <ColorPickerTrigger aria-label="Open color picker" />
        </ColorPickerControl>
        <ColorPickerSwatchGroup className={styles.swatchRow}>
          {swatches.map((color) => (
            <ColorPickerSwatchTrigger key={color} value={color} />
          ))}
        </ColorPickerSwatchGroup>
        <ColorPickerPositioner>
          <ColorPickerContent>
            <ColorPickerArea />
            <ColorPickerSliders />
          </ColorPickerContent>
        </ColorPickerPositioner>
        <ColorPickerHiddenInput />
      </ColorPicker>
    </div>
  );
}

function DatePickerTile() {
  return (
    <div className={styles.tileInner}>
      <DatePicker defaultValue={[parseDate('2026-10-14')]} name="home-release-date">
        <DatePickerField placeholder="Select date" />
        <DatePickerPanel />
      </DatePicker>
    </div>
  );
}

const tourSteps = [
  { title: 'Invite your team', body: 'Share workspaces with role-based permissions.' },
  { title: 'Pick a preset', body: 'Switch Calm, Dense, Soft, or Contrast in one attribute.' },
  { title: 'Copy or install', body: 'Use npm packages or the shadcn CLI with the same API.' },
] as const;

function TourTile() {
  const [step, setStep] = useState(0);
  const current = tourSteps[step];
  const isLast = step === tourSteps.length - 1;

  return (
    <div className={styles.tourCard}>
      <div className={styles.tourHeader}>
        <Badge variant="secondary">
          Step {step + 1} of {tourSteps.length}
        </Badge>
      </div>
      <strong className={styles.tourTitle}>{current.title}</strong>
      <p className={styles.tourBody}>{current.body}</p>
      <div className={styles.tourActions}>
        <Button
          size="xs"
          variant="ghost"
          onClick={() => setStep((value) => (value > 0 ? value - 1 : tourSteps.length - 1))}
        >
          Back
        </Button>
        <Button size="xs" onClick={() => setStep((value) => (isLast ? 0 : value + 1))}>
          {isLast ? 'Restart' : 'Next'}
        </Button>
      </div>
    </div>
  );
}

const signatureTranslations = {
  control: 'Signature drawing area',
  clearTrigger: 'Clear signature',
};

function SignaturePadTile() {
  return (
    <div className={styles.signatureWrap}>
      <SignaturePad translations={signatureTranslations}>
        <SignaturePadCanvas className={styles.signatureCanvas} />
      </SignaturePad>
    </div>
  );
}

const people = [
  { label: 'Grace Hopper', value: 'grace' },
  { label: 'Ada Lovelace', value: 'ada' },
  { label: 'Alan Turing', value: 'alan' },
  { label: 'Margaret Hamilton', value: 'margaret' },
];

function ComboboxTile() {
  const { collection, filter } = useFilteredCollection({ initialItems: people });

  return (
    <div className={styles.tileInner}>
      <Combobox collection={collection} filter={filter} defaultValue={['grace']}>
        <ComboboxField
          placeholder="Assign to…"
          clearLabel="Clear assignee"
          triggerLabel="Open people"
        />
        <ComboboxDropdown>
          <ComboboxEmpty>No matches</ComboboxEmpty>
          <ComboboxList>
            {collection.items.map((item) => (
              <ComboboxOption key={item.value} item={item}>
                {item.label}
              </ComboboxOption>
            ))}
          </ComboboxList>
        </ComboboxDropdown>
      </Combobox>
    </div>
  );
}

function FileUploadTile() {
  return (
    <div className={styles.tileInner}>
      <FileUpload maxFiles={2} className={styles.upload}>
        <FileUploadHiddenInput />
        <FileUploadDropzone className={styles.dropzone}>
          <Upload className={styles.uploadIcon} aria-hidden="true" />
          <span className={styles.uploadText}>Drop files or</span>
          <FileUploadTrigger asChild>
            <Button size="xs" variant="outline">
              Browse
            </Button>
          </FileUploadTrigger>
        </FileUploadDropzone>
        <FileUploadItemGroup>
          <FileUploadItems />
        </FileUploadItemGroup>
      </FileUpload>
    </div>
  );
}

function ToastTile() {
  return (
    <div className={styles.toastTile}>
      <div className={styles.toastPreview}>
        <CheckCircle2 className={styles.toastIcon} aria-hidden="true" />
        <span className={styles.toastCopy}>
          <strong>Changes saved</strong>
          <small>Your profile is up to date.</small>
        </span>
      </div>
      <div className={styles.toastTriggers}>
        <Button
          size="xs"
          onClick={() =>
            toast.success('Changes saved', {
              description: 'Your profile is up to date.',
            })
          }
        >
          <Bell aria-hidden="true" />
          Trigger toast
        </Button>
      </div>
    </div>
  );
}

function TagsInputTile() {
  return (
    <div className={styles.tileInner}>
      <TagsInput defaultValue={['React', 'Vue']} name="home-tags">
        <TagsInputControl>
          <TagsInputItems />
          <TagsInputInput placeholder="Add tag…" aria-label="Add tag" />
          <TagsInputClearTrigger aria-label="Clear tags" />
        </TagsInputControl>
        <TagsInputHiddenInput />
      </TagsInput>
    </div>
  );
}

export {
  ColorPickerTile,
  ComboboxTile,
  DatePickerTile,
  FileUploadTile,
  SignaturePadTile,
  TagsInputTile,
  ToastTile,
  TourTile,
};