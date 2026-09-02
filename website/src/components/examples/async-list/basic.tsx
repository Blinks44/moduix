import { useAsyncList } from '@ark-ui/react/collection';
import { Button } from '@moduix/react/button';

type User = {
  id: number;
  name: string;
};

const users: User[] = [
  { id: 1, name: 'Avery Stone' },
  { id: 2, name: 'Morgan Lee' },
  { id: 3, name: 'Sam Ortiz' },
];

export default function AsyncListDemo() {
  const list = useAsyncList<User>({
    autoReload: true,
    async load() {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return { items: users };
    },
  });

  if (list.loading && list.items.length === 0) return <p role="status">Loading users…</p>;

  if (list.error) {
    return (
      <div>
        <p role="alert">Users could not be loaded.</p>
        <Button type="button" variant="outline" onClick={() => list.reload()}>
          Try again
        </Button>
      </div>
    );
  }

  return (
    <section aria-labelledby="users-heading">
      <h3 id="users-heading">Project members</h3>
      {list.empty ? (
        <p>No members found.</p>
      ) : (
        <ul>
          {list.items.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
      <Button type="button" onClick={() => list.reload()} loading={list.loading}>
        {list.loading ? 'Refreshing…' : 'Refresh'}
      </Button>
    </section>
  );
}