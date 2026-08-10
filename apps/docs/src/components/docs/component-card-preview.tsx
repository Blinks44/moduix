import {
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CloudUpload,
  Ellipsis,
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

function Accordion() {
  return (
    <Surface className={styles.accordion}>
      {[0, 1, 2].map((item) => (
        <div key={item} data-open={item === 0 || undefined}>
          <span>
            <ChevronDown />
            <Line size={item === 1 ? 'md' : 'lg'} />
          </span>
          {item === 0 ? <Line size="md" faint /> : null}
        </div>
      ))}
    </Surface>
  );
}

function AspectRatio() {
  return (
    <Surface className={styles.aspectRatio}>
      <span>16:9</span>
    </Surface>
  );
}

function Bleed() {
  return (
    <Surface className={styles.bleed}>
      <Line size="sm" />
      <span />
      <Line size="lg" faint />
    </Surface>
  );
}

function Breadcrumbs() {
  return (
    <Surface className={styles.breadcrumbs}>
      {[0, 1, 2].map((item) => (
        <span key={item}>
          <Line size={item === 1 ? 'sm' : 'md'} />
          {item < 2 ? <ChevronRight /> : null}
        </span>
      ))}
    </Surface>
  );
}

function ContainerDrawing() {
  return (
    <Surface className={styles.containerDrawing}>
      <Line size="lg" />
      <Line size="md" faint />
      <span>
        <Line size="sm" />
      </span>
    </Surface>
  );
}

function MenuDrawing() {
  return (
    <div className={styles.layoutMenu}>
      <Surface className={styles.menuTrigger}>
        <Ellipsis />
      </Surface>
      <Surface className={`${styles.menuPopup} ${styles.dashed}`}>
        {[0, 1].map((item) => (
          <span key={item}>
            <i />
            <Line size={item === 0 ? 'md' : 'lg'} />
          </span>
        ))}
      </Surface>
    </div>
  );
}

function Pagination() {
  return (
    <div className={styles.pagination}>
      <Surface>
        <ChevronLeft />
      </Surface>
      <span>
        {[0, 1, 2].map((item) => (
          <i key={item} data-active={item === 1 || undefined} />
        ))}
      </span>
      <Surface>
        <ChevronRight />
      </Surface>
    </div>
  );
}

function ScrollArea() {
  return (
    <Surface className={styles.scrollArea}>
      <div>
        <Line size="lg" />
        <Line size="md" faint />
        <Line size="lg" faint />
        <Line size="sm" faint />
      </div>
      <span>
        <i />
      </span>
    </Surface>
  );
}

function SeparatorDrawing() {
  return (
    <Surface className={styles.separatorDrawing}>
      <div>
        <Line size="lg" />
        <Line size="md" faint />
      </div>
      <hr />
      <span>
        <Line size="sm" faint />
        <i />
        <Line size="sm" faint />
      </span>
    </Surface>
  );
}

function Sidebar() {
  return (
    <Surface className={styles.sidebar}>
      <aside>
        <Line size="sm" />
        <div>
          <Line size="md" faint />
          <Line size="sm" faint />
          <Line size="md" faint />
        </div>
        <Line size="md" />
      </aside>
      <main />
    </Surface>
  );
}

function SimpleGrid() {
  return (
    <div className={styles.simpleGrid}>
      {Array.from({ length: 6 }, (_, index) => (
        <Surface key={index}>
          <span />
        </Surface>
      ))}
    </div>
  );
}

function Splitter() {
  return (
    <div className={styles.splitter}>
      <Surface>A</Surface>
      <span>
        <i />
      </span>
      <Surface>B</Surface>
    </div>
  );
}

function StackDrawing() {
  return (
    <div className={styles.stackDrawing}>
      {[0, 1, 2].map((item) => (
        <Surface key={item}>
          <i />
          <Line size={item === 1 ? 'lg' : 'md'} faint={item === 2} />
        </Surface>
      ))}
    </div>
  );
}

function StepsDrawing() {
  return (
    <Surface className={styles.stepsDrawing}>
      {[0, 1, 2].map((item) => (
        <span key={item} data-active={item < 2 || undefined}>
          <i />
          {item < 2 ? <b /> : null}
        </span>
      ))}
    </Surface>
  );
}

function TabsDrawing() {
  return (
    <div className={styles.tabsDrawing}>
      <Surface>
        {[0, 1, 2].map((item) => (
          <span key={item} data-active={item === 0 || undefined}>
            <Line size="sm" />
          </span>
        ))}
      </Surface>
      <div>
        <Line size="lg" />
        <Line size="md" faint />
      </div>
    </div>
  );
}

function TreeView() {
  return (
    <Surface className={styles.treeView}>
      {[0, 1, 1].map((level, item) => (
        <span key={item} data-level={level}>
          <ChevronRight data-open={item === 0 || undefined} />
          <i />
          <Line size={item === 1 ? 'sm' : 'md'} faint={item === 2} />
        </span>
      ))}
    </Surface>
  );
}

function ComponentDrawing({ component }: { component: string }) {
  switch (component) {
    case 'accordion':
      return <Accordion />;
    case 'aspect-ratio':
      return <AspectRatio />;
    case 'bleed':
      return <Bleed />;
    case 'breadcrumbs':
      return <Breadcrumbs />;
    case 'container':
      return <ContainerDrawing />;
    case 'menu':
      return <MenuDrawing />;
    case 'pagination':
      return <Pagination />;
    case 'scroll-area':
      return <ScrollArea />;
    case 'separator':
      return <SeparatorDrawing />;
    case 'sidebar':
      return <Sidebar />;
    case 'simple-grid':
      return <SimpleGrid />;
    case 'splitter':
      return <Splitter />;
    case 'stack':
      return <StackDrawing />;
    case 'steps':
      return <StepsDrawing />;
    case 'tabs':
      return <TabsDrawing />;
    case 'tree-view':
      return <TreeView />;
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