import { Button } from '@moduix/react/button';
import { Popover } from '@moduix/react/popover';
import styles from './animations.module.css';

type RecipeCardProps = {
  title: string;
  description: string;
  popupClassName: string;
};

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
        <Popover.Positioner>
          <Popover.Content className={`${styles.popup} ${popupClassName}`}>
            <div className={styles.popupHeader}>
              <p className={styles.label}>{title}</p>
              <p className={styles.caption}>Same structure, different motion recipe.</p>
            </div>
          </Popover.Content>
        </Popover.Positioner>
      </Popover>
    </div>
  );
}

const recipes: RecipeCardProps[] = [
  {
    title: 'Fade',
    description: 'No scale or offset, only opacity.',
    popupClassName: styles.fadePopup,
  },
  {
    title: 'Slide Up',
    description: 'Moves upward into place without zoom.',
    popupClassName: styles.slideUpPopup,
  },
  {
    title: 'Slide Down',
    description: 'Drops into place from above.',
    popupClassName: styles.slideDownPopup,
  },
  {
    title: 'Slide Left',
    description: 'Moves in from the right edge into place.',
    popupClassName: styles.slideLeftPopup,
  },
  {
    title: 'Slide Right',
    description: 'Moves in from the left edge into place.',
    popupClassName: styles.slideRightPopup,
  },
  {
    title: 'Zoom',
    description: 'Keeps the current scale-in feel.',
    popupClassName: styles.zoomPopup,
  },
  {
    title: 'Lift',
    description: 'Small upward slide plus subtle zoom for menus and cards.',
    popupClassName: styles.liftPopup,
  },
  {
    title: 'Drop In',
    description: 'Small downward slide plus scale for heavier overlays.',
    popupClassName: styles.dropInPopup,
  },
  {
    title: 'Soft Pop',
    description: 'A slower, more expressive scale-in for short confirmation surfaces.',
    popupClassName: styles.softPopPopup,
  },
];

export function MotionRecipesExample() {
  return (
    <div className={styles.recipesGrid}>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.popupClassName} {...recipe} />
      ))}
    </div>
  );
}