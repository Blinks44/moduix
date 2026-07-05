//#region demo
import { Avatar } from '@moduix/react';
import { Computer as ComputerIcon } from 'lucide-react';

const fallbackLabel = 'Workstation account';

export function AvatarIconFallbackDemo() {
  return (
    <Avatar size="lg" className="docs-avatar-icon">
      <Avatar.Fallback role="img" aria-label={fallbackLabel}>
        <ComputerIcon className="docs-avatar-icon-glyph" />
      </Avatar.Fallback>
    </Avatar>
  );
}
//#endregion