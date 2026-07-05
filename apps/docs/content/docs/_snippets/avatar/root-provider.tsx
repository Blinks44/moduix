//#region demo
import { useAvatar } from '@ark-ui/react/avatar';
import { Avatar } from '@moduix/react';
import { useState } from 'react';

const avatarImage =
  'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80';

export function AvatarRootProviderDemo() {
  const [count, setCount] = useState(0);
  const avatar = useAvatar();

  return (
    <div className="docs-avatar-provider">
      <button
        type="button"
        className="docs-avatar-provider-button"
        onClick={() => setCount(count + 1)}
      >
        Change avatar
      </button>
      <Avatar.RootProvider value={avatar}>
        <Avatar.Fallback>LT</Avatar.Fallback>
        <Avatar.Image src={`${avatarImage}&seed=${count}`} alt="Alex T." />
      </Avatar.RootProvider>
    </div>
  );
}
//#endregion