<script lang="ts">
  import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
  import { Tooltip, TooltipBody, TooltipTrigger } from '@/components/ui/tooltip';

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
</script>

<div class="inline-flex items-center p-3" role="group" aria-label="Project team">
  {#each members as member (member.name)}
    <Tooltip positioning={{ placement: 'top', gutter: 10 }} openDelay={120}>
      <TooltipTrigger>
        {#snippet asChild(props)}
          <button
            {...props()}
            class="relative m-0 grid cursor-pointer place-items-center rounded-full border-2 border-card bg-transparent p-0 transition-[margin-inline-start,transform,box-shadow] duration-200 ease-out not-first:-ms-3 hover:z-1 hover:-translate-y-1 hover:scale-108 hover:shadow-[0_0_0_3px_var(--color-background)] focus-visible:z-1 focus-visible:-translate-y-1 focus-visible:scale-108 focus-visible:shadow-[0_0_0_3px_var(--color-background)] focus-visible:outline-none motion-reduce:transition-none [&:has(~button:is(:hover,:focus-visible))]:-translate-x-3 [&:is(:hover,:focus-visible)~button]:translate-x-3"
            type="button"
            aria-label={`${member.name}, ${member.role}`}
          >
            <Avatar size="lg">
              <AvatarImage src={member.image} alt="" />
              <AvatarFallback>{member.name.slice(0, 1)}</AvatarFallback>
            </Avatar>
          </button>
        {/snippet}
      </TooltipTrigger>
      <TooltipBody
        class="grid gap-0.5 [&_span]:text-xs [&_span]:text-muted-foreground [&_strong]:font-semibold"
      >
        <strong>{member.name}</strong><span>{member.role}</span>
      </TooltipBody>
    </Tooltip>
  {/each}
</div>