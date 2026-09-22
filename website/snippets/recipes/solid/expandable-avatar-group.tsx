import { Avatar, AvatarFallback, AvatarImage } from '@moduix/solid/avatar';
import { Tooltip, TooltipBody, TooltipTrigger } from '@moduix/solid/tooltip';
import { For } from 'solid-js';
import styles from './expandable-avatar-group.module.css';

const members = [
  {
    name: 'Lena Ortiz',
    role: 'Product designer',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=128&h=128&q=80',
  },
  {
    name: 'Amir Patel',
    role: 'Frontend engineer',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=128&h=128&q=80',
  },
  {
    name: 'Mika Chen',
    role: 'Design engineer',
    image:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&h=128&q=80',
  },
  {
    name: 'Noah Williams',
    role: 'Product manager',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=128&h=128&q=80',
  },
  {
    name: 'Sofia Rossi',
    role: 'Brand designer',
    image:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=128&h=128&q=80',
  },
  {
    name: 'Elliot Park',
    role: 'Researcher',
    image:
      'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=128&h=128&q=80',
  },
  {
    name: 'Zoe Martin',
    role: 'Content designer',
    image:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=128&h=128&q=80',
  },
];

export function ExpandableAvatarGroup() {
  return (
    <div class={styles.group} role="group" aria-label="Project team">
      <For each={members}>
        {(member) => (
          <Tooltip positioning={{ placement: 'top', gutter: 10 }} openDelay={120}>
            <TooltipTrigger
              asChild={(props) => (
                <button
                  {...props()}
                  class={styles.member}
                  type="button"
                  aria-label={`${member.name}, ${member.role}`}
                />
              )}
            >
              <Avatar size="lg">
                <AvatarImage src={member.image} alt="" />
                <AvatarFallback>{member.name.slice(0, 1)}</AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipBody class={styles.tooltip}>
              <strong>{member.name}</strong>
              <span>{member.role}</span>
            </TooltipBody>
          </Tooltip>
        )}
      </For>
    </div>
  );
}