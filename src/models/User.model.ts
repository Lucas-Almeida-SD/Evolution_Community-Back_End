import './config/config';

import {
  doc,
  setDoc,
  getFirestore,
  getDoc,
  DocumentData,
} from 'firebase/firestore';
import { IUserDTO } from '../interfaces/User.interface';
import encryptPassword from '../helpers/encryptPassword';

export default class UserModel {
  constructor(private firestore = getFirestore()) {}

  public async create(user: IUserDTO): Promise<void> {
    const hashPassword = encryptPassword(user.password);

    const docRef = doc(this.firestore, `users/${user.email}`);
    await setDoc(docRef, { ...user, password: hashPassword });
  }

  public async getUser(email: string): Promise<DocumentData | null> {
    const docRef = doc(this.firestore, `users/${email}`);
    const user = await getDoc(docRef);

    if (user.exists()) return user.data();

    return null;
  }
}
