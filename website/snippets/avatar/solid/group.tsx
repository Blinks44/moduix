import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from '@moduix/solid/avatar';
import { For, Show } from 'solid-js';

const members = [
  {
    name: 'Alex T.',
    initials: 'AT',
    image: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80',
  },
  {
    name: 'Noah W.',
    initials: 'NW',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=128&h=128&dpr=2&q=80',
  },
  { name: 'Mia K.', initials: 'MK' },
];

export default function AvatarGroupDemo() {
  return (
    <AvatarGroup>
      <For each={members}>
        {(member) => (
          <Avatar>
            <AvatarFallback>{member.initials}</AvatarFallback>
            <Show when={member.image}>
              {(image) => <AvatarImage src={image()} alt={member.name} />}
            </Show>
          </Avatar>
        )}
      </For>
      <Avatar>
        <AvatarFallback>+3</AvatarFallback>
      </Avatar>
    </AvatarGroup>
  );
}