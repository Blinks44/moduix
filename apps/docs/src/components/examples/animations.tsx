import {
  Button,
  Popover,
  PopoverBackdrop,
  PopoverPopup,
  PopoverPortal,
  PopoverPositioner,
  PopoverTrigger,
} from 'moduix';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';
import styles from './animations.module.css';

export const animationMotionCssProperties: CssPropertyInput[] = [
  ['--popover-transition', 'var(--transition-default)', 'Controls popup transition timing.'],
  [
    '--popover-backdrop-transition',
    'var(--transition-default)',
    'Controls backdrop transition timing.',
  ],
  [
    '--popover-popup-starting-opacity',
    '0',
    'Controls popup opacity while the element is entering.',
  ],
  ['--popover-popup-ending-opacity', '0', 'Controls popup opacity while the element is leaving.'],
  [
    '--popover-popup-starting-scale',
    'var(--scale-popup)',
    'Controls popup scale while the element is entering.',
  ],
  [
    '--popover-popup-ending-scale',
    'var(--scale-popup)',
    'Controls popup scale while the element is leaving.',
  ],
  [
    '--popover-popup-starting-translate-x',
    '0',
    'Controls popup horizontal offset while the element is entering.',
  ],
  [
    '--popover-popup-ending-translate-x',
    '0',
    'Controls popup horizontal offset while the element is leaving.',
  ],
  [
    '--popover-popup-starting-translate-y',
    '0',
    'Controls popup vertical offset while the element is entering.',
  ],
  [
    '--popover-popup-ending-translate-y',
    '0',
    'Controls popup vertical offset while the element is leaving.',
  ],
  [
    '--popover-backdrop-starting-opacity',
    '0',
    'Controls backdrop opacity while the element is entering.',
  ],
  [
    '--popover-backdrop-ending-opacity',
    '0',
    'Controls backdrop opacity while the element is leaving.',
  ],
  [
    '--popover-backdrop-starting-blur',
    'none',
    'Controls backdrop blur while the element is entering.',
  ],
  [
    '--popover-backdrop-ending-blur',
    'none',
    'Controls backdrop blur while the element is leaving.',
  ],
];

export const animationMotionPlaygroundCssProperties: CssPropertyInput[] = [
  ['--popover-transition', '180ms ease', 'Quick way to retune popup timing.'],
  ['--popover-backdrop-transition', '180ms ease', 'Quick way to retune backdrop timing.'],
  ['--popover-popup-starting-opacity', '0', 'Popup enter opacity.'],
  ['--popover-popup-ending-opacity', '0', 'Popup exit opacity.'],
  ['--popover-popup-starting-scale', '1', 'Popup enter scale.'],
  ['--popover-popup-ending-scale', '1', 'Popup exit scale.'],
  ['--popover-popup-starting-translate-y', '0.75rem', 'Popup enter vertical offset.'],
  ['--popover-popup-ending-translate-y', '0.75rem', 'Popup exit vertical offset.'],
  ['--popover-backdrop-starting-opacity', '0', 'Backdrop enter opacity.'],
  ['--popover-backdrop-ending-opacity', '0', 'Backdrop exit opacity.'],
];

type RecipeCardProps = {
  title: string;
  description: string;
  popupClassName: string;
};

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}

function RecipeCard({ title, description, popupClassName }: RecipeCardProps) {
  return (
    <div className={styles.recipeCard}>
      <div>
        <p className={styles.recipeTitle}>{title}</p>
        <p className={styles.recipeDescription}>{description}</p>
      </div>

      <Popover>
        <PopoverTrigger render={<Button variant="outline" />}>Preview</PopoverTrigger>
        <PopoverPortal>
          <PopoverPositioner sideOffset={10}>
            <PopoverPopup className={`${styles.popup} ${popupClassName}`}>
              <div className={styles.popupHeader}>
                <p className={styles.label}>{title}</p>
                <p className={styles.caption}>Same structure, different motion recipe.</p>
              </div>
            </PopoverPopup>
          </PopoverPositioner>
        </PopoverPortal>
      </Popover>
    </div>
  );
}

export function MotionRecipesExample() {
  return (
    <div className={styles.recipesGrid}>
      <RecipeCard
        title="Fade"
        description="No scale or offset, only opacity."
        popupClassName={styles.fadePopup}
      />
      <RecipeCard
        title="Slide Up"
        description="Moves upward into place without zoom."
        popupClassName={styles.slideUpPopup}
      />
      <RecipeCard
        title="Slide Down"
        description="Drops into place from above."
        popupClassName={styles.slideDownPopup}
      />
      <RecipeCard
        title="Slide Left"
        description="Moves in from the right edge into place."
        popupClassName={styles.slideLeftPopup}
      />
      <RecipeCard
        title="Slide Right"
        description="Moves in from the left edge into place."
        popupClassName={styles.slideRightPopup}
      />
      <RecipeCard
        title="Zoom"
        description="Keeps the current scale-in feel."
        popupClassName={styles.zoomPopup}
      />
      <RecipeCard
        title="Lift"
        description="Small upward slide plus subtle zoom for menus and cards."
        popupClassName={styles.liftPopup}
      />
      <RecipeCard
        title="Drop In"
        description="Small downward slide plus scale for heavier overlays."
        popupClassName={styles.dropInPopup}
      />
    </div>
  );
}

export function MotionPlaygroundExample() {
  return (
    <div className={styles.stack}>
      <Popover>
        <div className={styles.playgroundTrigger}>
          <PopoverTrigger render={<Button />}>Open motion playground</PopoverTrigger>
        </div>
        <PopoverPortal>
          <PopoverBackdrop className={styles.playgroundBackdrop} />
          <PopoverPositioner sideOffset={12}>
            <PopoverPopup className={styles.playgroundPopup}>
              <div className={styles.playgroundHeader}>
                <span className={styles.playgroundKicker}>Animations</span>
                <p className={styles.playgroundTitle}>Tune motion with variables</p>
                <p className={styles.playgroundDescription}>
                  Change the phase-specific popover tokens in the Playground tab to test fade,
                  slide, zoom, or mixed motion on the live component.
                </p>
              </div>
            </PopoverPopup>
          </PopoverPositioner>
        </PopoverPortal>
      </Popover>
    </div>
  );
}

export function AnimationMotionPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={animationMotionCssProperties.map(normalizeCssProperty)}
    />
  );
}

export function AnimationMotionPlaygroundPanel({
  values,
  onChange,
  onReset,
}: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesEditor
      properties={animationMotionPlaygroundCssProperties.map(normalizeCssProperty)}
      values={values}
      onChange={onChange}
      onReset={onReset}
    />
  );
}