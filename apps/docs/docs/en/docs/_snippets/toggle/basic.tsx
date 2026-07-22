import { Toggle } from '@moduix/react';
import { Star as StarIcon } from 'lucide-react';

export default function ToggleDemo() {
  return (
    <Toggle defaultPressed>
      <StarIcon />
      Favorite
    </Toggle>
  );
}