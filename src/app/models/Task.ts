import {Order} from './Order';
import {User} from './User';

export class Task extends Order{

  constructor(workers: User[]) {
    super()
    this.workers = workers
  }

  workers: User[] = []

}
