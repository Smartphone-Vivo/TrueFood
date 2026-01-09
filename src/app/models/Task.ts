import {Advertisement} from './Advertisement';
import {User} from './User';

export class Task extends Advertisement{

  constructor(workers: User[], acceptedWorker: User) {
    super()
    this.workers = workers
    this.acceptedWorker = acceptedWorker
  }

  workers: User[]

  acceptedWorker: User
}
