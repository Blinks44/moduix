import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from '@moduix/react/avatar';

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
      {members.map((member) => (
        <Avatar key={member.name}>
          <AvatarFallback>{member.initials}</AvatarFallback>
          {member.image && <AvatarImage src={member.image} alt={member.name} />}
        </Avatar>
      ))}
      <Avatar>
        <AvatarFallback>+3</AvatarFallback>
      </Avatar>
    </AvatarGroup>
  );
}