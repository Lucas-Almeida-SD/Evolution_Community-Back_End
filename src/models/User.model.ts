import './config/config';

import {
  doc,
  setDoc,
  getFirestore,
} from 'firebase/firestore';
import { IUserDTO } from '../interfaces/User.interface';

export default class UserModel {
  constructor(private firestore = getFirestore()) {}

  public async create(user: IUserDTO): Promise<void> {
    const docRef = doc(this.firestore, `users/${user.email}`);
    await setDoc(docRef, user);
  }
}
