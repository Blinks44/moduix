import { Pagination } from '@moduix/react';

const users = [
  {
    id: 1,
    name: 'Emma Wilson',
    email: 'emma@example.com',
  },
  {
    id: 2,
    name: 'Liam Johnson',
    email: 'liam@example.com',
  },
  {
    id: 3,
    name: 'Olivia Brown',
    email: 'olivia@example.com',
  },
  {
    id: 4,
    name: 'Noah Davis',
    email: 'noah@example.com',
  },
  {
    id: 5,
    name: 'Ava Martinez',
    email: 'ava@example.com',
  },
  {
    id: 6,
    name: 'Ethan Garcia',
    email: 'ethan@example.com',
  },
  {
    id: 7,
    name: 'Sophia Rodriguez',
    email: 'sophia@example.com',
  },
  {
    id: 8,
    name: 'Mason Lee',
    email: 'mason@example.com',
  },
  {
    id: 9,
    name: 'Isabella Walker',
    email: 'isabella@example.com',
  },
  {
    id: 10,
    name: 'James Hall',
    email: 'james@example.com',
  },
  {
    id: 11,
    name: 'Mia Allen',
    email: 'mia@example.com',
  },
  {
    id: 12,
    name: 'Benjamin Young',
    email: 'benjamin@example.com',
  },
];

export default function PaginationDataSlicingDemo() {
  return (
    <Pagination count={users.length} pageSize={4}>
      <Pagination.Context>
        {(pagination) => (
          <div className="pagination-stack">
            <div className="pagination-users">
              {pagination.slice(users).map((user) => (
                <div key={user.id} className="pagination-user">
                  <strong>{user.name}</strong>
                  <span className="pagination-muted">{user.email}</span>
                </div>
              ))}
            </div>
            <div className="pagination-row">
              <Pagination.PrevTrigger />
              {pagination.pages.map((page, index) =>
                page.type === 'page' ? (
                  <Pagination.Item key={index} {...page}>
                    {page.value}
                  </Pagination.Item>
                ) : (
                  <Pagination.Ellipsis key={index} index={index} />
                ),
              )}
              <Pagination.NextTrigger />
            </div>
          </div>
        )}
      </Pagination.Context>
    </Pagination>
  );
}