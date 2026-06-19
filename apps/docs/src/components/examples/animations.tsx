import { Button, Popover } from 'moduix';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';
import styles from './animations.module.css';

export const animationMotionCssProperties: CssPropertyInput[] = [
  ['--popover-transition', 'var(--duration-fast)', 'Controls content animation duration.'],
  [
    '--popover-content-starting-opacity',
    '0',
    'Controls content opacity while the element is entering.',
  ],
  ['--popover-content-ending-opacity', '0', 'Controls content exit opacity.'],
  [
    '--popover-content-starting-scale',
    'var(--scale-popup)',
    'Controls content scale while the element is entering.',
  ],
  [
    '--popover-content-ending-scale',
    'var(--scale-popup)',
    'Controls content scale while the element is leaving.',
  ],
  [
    '--popover-content-starting-translate-x',
    '0',
    'Controls content horizontal offset while the element is entering.',
  ],
  [
    '--popover-content-ending-translate-x',
    '0',
    'Controls content horizontal offset while the element is leaving.',
  ],
  [
    '--popover-content-starting-translate-y',
    '0',
    'Controls content vertical offset while the element is entering.',
  ],
  [
    '--popover-content-ending-translate-y',
    '0',
    'Controls content vertical offset while the element is leaving.',
  ],
];

export const animationMotionPlaygroundCssProperties: CssPropertyInput[] = [
  ['--popover-transition', '180ms ease', 'Quick way to retune content timing.'],
  ['--popover-content-starting-opacity', '0', 'Content enter opacity.'],
  ['--popover-content-ending-opacity', '0', 'Content exit opacity.'],
  ['--popover-content-starting-scale', '1', 'Content enter scale.'],
  ['--popover-content-ending-scale', '1', 'Content exit scale.'],
  ['--popover-content-starting-translate-y', '0.75rem', 'Content enter vertical offset.'],
  ['--popover-content-ending-translate-y', '0.75rem', 'Content exit vertical offset.'],
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

      <Popover positioning={{ gutter: 10 }}>
        <Popover.Trigger asChild>
          <Button variant="outline">Preview</Button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Positioner>
            <Popover.Content className={`${styles.popup} ${popupClassName}`}>
              <div className={styles.popupHeader}>
                <p className={styles.label}>{title}</p>
                <p className={styles.caption}>Same structure, different motion recipe.</p>
              </div>
            </Popover.Content>
          </Popover.Positioner>
        </Popover.Portal>
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
      <Popover positioning={{ gutter: 12 }}>
        <div className={styles.playgroundTrigger}>
          <Popover.Trigger asChild>
            <Button>Open motion playground</Button>
          </Popover.Trigger>
        </div>
        <Popover.Portal>
          <Popover.Positioner>
            <Popover.Content className={styles.playgroundPopup}>
              <div className={styles.playgroundHeader}>
                <span className={styles.playgroundKicker}>Animations</span>
                <p className={styles.playgroundTitle}>Tune motion with variables</p>
                <p className={styles.playgroundDescription}>
                  Change the phase-specific popover tokens in the Playground tab to test fade,
                  slide, zoom, or mixed motion on the live component.
                </p>
              </div>
            </Popover.Content>
          </Popover.Positioner>
        </Popover.Portal>
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