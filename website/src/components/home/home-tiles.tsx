import { Check, ChevronDown, CircleCheck, X } from 'lucide-react';
import styles from './home-tiles.module.css';

// Open-state illustrations for home tiles whose real popups cannot render inside a scaled preview.
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
    <div className={styles.toast}>
      <CircleCheck aria-hidden="true" />
      <span>
        <strong>Changes saved</strong>
        Your profile is up to date.
      </span>
      <X aria-hidden="true" />
    </div>
  );
}

export { ComboboxTile, ToastTile, TourTile };