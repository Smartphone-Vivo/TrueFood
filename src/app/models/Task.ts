import {Advertisement} from './Advertisement';
import {User} from './User';

export class Task extends Advertisement{

  constructor() {
    super()
    this.workers = []
    this.acceptedWorker = new User
  }

  workers: User[]

  acceptedWorker: User
}
