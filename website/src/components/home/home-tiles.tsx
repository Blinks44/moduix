import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  RotateCcw,
  Upload,
  X,
} from 'lucide-react';
import styles from './home-tiles.module.css';

// Home · Components tiles from Moduix.sketch. Compact illustrations at their real size: scaled-down
// examples are unreadable, and open popups cannot render inside the tile.
function ComboboxTile() {
  const people = [
    ['Grace Hopper', '#f59e0b', true],
    ['Graham Bell', '#10b981', false],
    ['Ingrid Daubechies', '#8b5cf6', false],
  ] as const;
  return (
    <div className={styles.combobox}>
      <span className={styles.label}>Assign to</span>
      <span className={styles.input}>
        gra
        <ChevronDown aria-hidden="true" />
      </span>
      <ul className={styles.list}>
        {people.map(([name, color, selected]) => (
          <li key={name} data-selected={selected ? '' : undefined}>
            <span className={styles.avatar} style={{ background: color }} />
            {name}
            {selected ? <Check aria-hidden="true" /> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

function TourTile() {
  return (
    <div className={styles.tour}>
      <span className={styles.tourTarget}>Invite</span>
      <span className={styles.tourLine} />
      <span className={styles.tourLine} />
      <div className={styles.tourStep}>
        <span className={styles.tourProgress}>Step 2 of 4</span>
        <strong>Invite your team</strong>
        <span className={styles.tourActions}>
          <span>Skip</span>
          <span className={styles.tourNext}>Next</span>
        </span>
      </div>
    </div>
  );
}

function ToastTile() {
  return (
    <div className={styles.toastStack}>
      <span className={styles.toastBehind} />
      <div className={styles.toast}>
        <CircleCheck aria-hidden="true" />
        <span>
          <strong>Changes saved</strong>
          Your profile is up to date.
        </span>
        <X aria-hidden="true" />
      </div>
    </div>
  );
}

function ColorPickerTile() {
  return (
    <div className={styles.colorPicker}>
      <span className={styles.colorArea}>
        <span className={styles.colorThumb} />
      </span>
      <span className={styles.hue}>
        <span className={styles.hueThumb} />
      </span>
      <span className={styles.colorRow}>
        <span className={styles.swatch} />
        <span className={styles.field}>#3D63F5</span>
      </span>
    </div>
  );
}

function DatePickerTile() {
  const weeks = [
    [1, 2, 3, 4, 5, 6, 7],
    [8, 9, 10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19, 20, 21],
    [22, 23, 24, 25, 26, 27, 28],
  ];
  const state = (day: number) =>
    day === 14 || day === 18 ? 'selected' : day > 14 && day < 18 ? 'range' : undefined;
  return (
    <div className={styles.calendar}>
      <span className={styles.calendarHeader}>
        October 2026
        <span>
          <ChevronLeft aria-hidden="true" />
          <ChevronRight aria-hidden="true" />
        </span>
      </span>
      <span className={styles.calendarGrid}>
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
          <span key={index} className={styles.weekday}>
            {day}
          </span>
        ))}
        {weeks.flat().map((day) => (
          <span key={day} data-state={state(day)}>
            {day}
          </span>
        ))}
      </span>
    </div>
  );
}

function SignaturePadTile() {
  return (
    <div className={styles.signature}>
      <svg viewBox="0 0 160 60" aria-hidden="true">
        <path d="M6 44c8-10 12-34 20-34s6 40 14 40 10-46 18-46 6 44 14 44 8-26 16-26 6 22 14 22 10-14 18-16 12 0 20-6" />
      </svg>
      <span className={styles.signatureLine} />
      <span className={styles.signatureClear}>
        <RotateCcw aria-hidden="true" />
      </span>
    </div>
  );
}

function FileUploadTile() {
  return (
    <div className={styles.upload}>
      <span className={styles.dropzone}>
        <Upload aria-hidden="true" />
        <span>
          Drop files or <em>browse</em>
        </span>
        <small>PNG, PDF up to 10 MB</small>
      </span>
      <span className={styles.file}>
        <span className={styles.fileBadge}>PDF</span>
        <span className={styles.fileInfo}>
          <strong>q3-report.pdf</strong>
          <small>2.4 MB · 68%</small>
          <span className={styles.progress}>
            <span />
          </span>
        </span>
      </span>
    </div>
  );
}

function TagsInputTile() {
  return (
    <div className={styles.tags}>
      <span className={styles.label}>Topics</span>
      <span className={styles.tagsBox}>
        {['design', 'a11y', 'react', 'vue'].map((tag) => (
          <span key={tag} className={styles.tag}>
            {tag}
            <X aria-hidden="true" />
          </span>
        ))}
        <span className={styles.tagsPlaceholder}>Add topic…</span>
      </span>
      <small>Press Enter to add, Backspace to remove</small>
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