import { delay, http, HttpResponse } from 'msw';
import { WorkerEntity } from '../outbox-demo/stores/workers';

const workers: WorkerEntity[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'bob@aol.com',
    phone: '123-456-7890',
    position: 'Developer',
    department: 'Engineering',
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@aol.com',
    phone: '987-654-3210',
    position: 'Designer',
    department: 'Design',
  },
  {
    id: '3',
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice@aol.com',
    phone: '555-555-5555',
    position: 'Manager',
    department: 'Management',
  },
];

export const WorkersHandler = [
  http.get('/api/workers', async () => {
    await delay();
    return HttpResponse.json(workers);
  }),
];
