import { Toggle } from '@moduix/solid/toggle';
import { Star as StarIcon } from 'lucide-solid';

export default function ToggleDemo() {
  return (
    <Toggle defaultPressed>
      <StarIcon />
      Favorite
    </Toggle>
  );
}