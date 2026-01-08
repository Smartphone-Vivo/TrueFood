import {Order} from './Order';
import {User} from './User';

export class Task extends Order{

  constructor(workers: User[], acceptedWorker: User) {
    super()
    this.workers = workers
    this.acceptedWorker = acceptedWorker
  }

  workers: User[]

  acceptedWorker: User
}
