import {
  CalendarDays,
  Check,
  ChevronDown,
  CloudUpload,
  Eye,
  Minus,
  Pipette,
  Plus,
  Search,
  Star,
  X,
} from 'lucide-react';
import type { ReactNode } from 'react';
import styles from './component-card-preview.module.css';

function Line({
  size = 'md',
  faint = false,
}: {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  faint?: boolean;
}) {
  return <span className={styles.line} data-faint={faint || undefined} data-size={size} />;
}

function Surface({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`${styles.surface} ${className}`}>{children}</div>;
}

function ChoiceList({ radio = false }: { radio?: boolean }) {
  return (
    <div className={styles.choiceList} data-radio={radio || undefined}>
      {[false, true].map((checked, index) => (
        <div key={String(checked)} className={styles.row}>
          <span className={styles.choice} data-checked={checked || undefined}>
            {checked && !radio ? <Check /> : null}
          </span>
          <Line size={index === 0 ? 'md' : 'lg'} />
        </div>
      ))}
    </div>
  );
}

function ColorPicker() {
  return (
    <div className={styles.picker}>
      <Surface className={styles.dashedField}>
        <Line size="lg" />
      </Surface>
      <span className={styles.primaryButton}>
        <Pipette />
      </span>
    </div>
  );
}

function Combobox() {
  return (
    <div className={styles.popupStack}>
      <Surface className={styles.tagField}>
        <span className={styles.chip}>
          <Line size="xs" />
          <X />
        </span>
        <span className={styles.chip}>
          <Line size="sm" />
          <X />
        </span>
      </Surface>
      <Surface className={`${styles.menu} ${styles.dashed}`}>
        {[0, 1].map((item) => (
          <span key={item} className={styles.option}>
            <i />
            <Line size={item === 0 ? 'md' : 'lg'} />
            <Line size="xs" faint />
          </span>
        ))}
      </Surface>
    </div>
  );
}

function DateInput() {
  return (
    <Surface className={styles.dateInput}>
      {[0, 1, 2].map((segment) => (
        <span key={segment} className={styles.datePart}>
          {segment > 0 ? <b>/</b> : null}
          <span className={styles.dateSegment}>
            <Line size="xs" />
          </span>
        </span>
      ))}
    </Surface>
  );
}

function DatePicker() {
  return (
    <div className={styles.popupStack}>
      <Surface className={styles.iconField}>
        <CalendarDays />
        <Line size="md" />
      </Surface>
      <Surface className={`${styles.calendar} ${styles.dashed}`}>
        <div className={styles.calendarHead}>
          {Array.from({ length: 5 }, (_, index) => (
            <i key={index} />
          ))}
        </div>
        <div className={styles.calendarGrid}>
          {Array.from({ length: 10 }, (_, index) => (
            <i key={index} data-active={index === 7 || undefined} />
          ))}
        </div>
      </Surface>
    </div>
  );
}

function Editable() {
  return (
    <div className={styles.row}>
      <Surface className={styles.textField}>
        <Line size="lg" />
      </Surface>
      <Surface className={styles.iconButton}>
        <Check />
      </Surface>
    </div>
  );
}

function Field() {
  return (
    <div className={styles.fieldStack}>
      <Line size="sm" />
      <Surface className={styles.textField}>
        <Line size="lg" />
      </Surface>
      <Line size="md" faint />
    </div>
  );
}

function Fieldset() {
  return (
    <fieldset className={styles.fieldset}>
      <legend>
        <Line size="sm" />
      </legend>
      {[0, 1].map((item) => (
        <div key={item} className={styles.fieldsetRow}>
          <Line size="sm" />
          <span />
        </div>
      ))}
    </fieldset>
  );
}

function FileUpload() {
  return (
    <Surface className={styles.upload}>
      <span className={styles.uploadIcon}>
        <CloudUpload />
      </span>
      <Line size="lg" />
    </Surface>
  );
}

function Input() {
  return (
    <Surface className={styles.textField}>
      <Line size="lg" />
    </Surface>
  );
}

function InputGroup() {
  return (
    <Surface className={styles.inputGroup}>
      <span>
        <Search />
      </span>
      <i>
        <Line size="md" />
      </i>
      <span>
        <b />
      </span>
    </Surface>
  );
}

function Select() {
  return (
    <Surface className={styles.select}>
      <Line size="lg" />
      <ChevronDown />
    </Surface>
  );
}

function NumberInput() {
  return (
    <Surface className={styles.numberInput}>
      <span>
        <Minus />
      </span>
      <i>
        <Line size="sm" />
      </i>
      <span>
        <Plus />
      </span>
    </Surface>
  );
}

function PasswordInput() {
  return (
    <Surface className={styles.passwordInput}>
      <span className={styles.passwordDots}>
        {Array.from({ length: 6 }, (_, index) => (
          <i key={index} />
        ))}
      </span>
      <Eye />
    </Surface>
  );
}

function PinInput() {
  return (
    <div className={styles.pinInput}>
      {Array.from({ length: 4 }, (_, index) => (
        <Surface key={index} className={styles.pinCell}>
          {index < 3 ? <i /> : null}
        </Surface>
      ))}
    </div>
  );
}

function Rating() {
  return (
    <div className={styles.rating}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star key={index} data-filled={index < 3 || undefined} />
      ))}
    </div>
  );
}

function Segmented() {
  return (
    <Surface className={styles.segmented}>
      {[0, 1, 2].map((segment) => (
        <span key={segment} data-active={segment === 0 || undefined}>
          <Line size="sm" />
        </span>
      ))}
    </Surface>
  );
}

function SignaturePad() {
  return (
    <Surface className={styles.signaturePad}>
      <span className={styles.signatureAction} />
      <span className={styles.signatureLine} />
    </Surface>
  );
}

function Slider() {
  return (
    <div className={styles.slider}>
      <span />
      <i />
      <b />
    </div>
  );
}

function Switch() {
  return (
    <span className={styles.switchControl}>
      <i />
    </span>
  );
}

function TagsInput() {
  return (
    <Surface className={styles.tagsInput}>
      {[0, 1].map((tag) => (
        <span key={tag}>
          <Line size={tag === 0 ? 'xs' : 'sm'} />
          <X />
        </span>
      ))}
      <i />
    </Surface>
  );
}

function Textarea() {
  return (
    <Surface className={styles.textarea}>
      <Line size="lg" />
      <i className={styles.resizeHandle} />
    </Surface>
  );
}

function Toggle() {
  return (
    <div className={styles.toggle}>
      {[true, false].map((active) => (
        <Surface key={String(active)} className={styles.toggleButton}>
          <i data-active={active || undefined} />
        </Surface>
      ))}
    </div>
  );
}

function ToggleGroup() {
  return (
    <Surface className={styles.toggleGroup}>
      {[0, 1, 2].map((item) => (
        <span key={item} data-active={item === 1 || undefined}>
          <Line size="sm" />
        </span>
      ))}
    </Surface>
  );
}

function ComponentDrawing({ component }: { component: string }) {
  switch (component) {
    case 'checkbox':
      return <ChoiceList />;
    case 'color-picker':
      return <ColorPicker />;
    case 'combobox':
      return <Combobox />;
    case 'date-input':
      return <DateInput />;
    case 'date-picker':
      return <DatePicker />;
    case 'editable':
      return <Editable />;
    case 'field':
      return <Field />;
    case 'fieldset':
      return <Fieldset />;
    case 'file-upload':
      return <FileUpload />;
    case 'input':
      return <Input />;
    case 'input-group':
      return <InputGroup />;
    case 'native-select':
    case 'select':
      return <Select />;
    case 'number-input':
      return <NumberInput />;
    case 'password-input':
      return <PasswordInput />;
    case 'pin-input':
      return <PinInput />;
    case 'radio-group':
      return <ChoiceList radio />;
    case 'rating-group':
      return <Rating />;
    case 'segment-group':
      return <Segmented />;
    case 'signature-pad':
      return <SignaturePad />;
    case 'slider':
      return <Slider />;
    case 'switch':
      return <Switch />;
    case 'tags-input':
      return <TagsInput />;
    case 'textarea':
      return <Textarea />;
    case 'toggle':
      return <Toggle />;
    case 'toggle-group':
      return <ToggleGroup />;
    default:
      return <Input />;
  }
}

function ComponentCardPreview({ component }: { component: string }) {
  return (
    <div className={styles.preview}>
      <div className={styles.canvas}>
        <ComponentDrawing component={component} />
      </div>
    </div>
  );
}

export { ComponentCardPreview };