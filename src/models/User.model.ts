import './config/config';

import {
  doc,
  setDoc,
  getFirestore,
  getDoc,
  DocumentData,
  deleteDoc,
} from 'firebase/firestore';
import { IUserDTO, IUserEdit } from '../interfaces/User.interface';

export default class UserModel {
  constructor(private firestore = getFirestore()) {}

  public async create(user: IUserDTO): Promise<void> {
    const docRef = doc(this.firestore, `users/${user.email}`);
    await setDoc(docRef, user);
  }

  public async getUser(email: string): Promise<DocumentData | null> {
    const docRef = doc(this.firestore, `users/${email}`);
    const user = await getDoc(docRef);

    if (user.exists()) return user.data();

    return null;
  }

  public async edit(editUser: IUserEdit, userToken: UserToken): Promise<void> {
    const docRef = doc(this.firestore, `users/${userToken.email}`);
    await setDoc(docRef, editUser, { merge: true });
  }

  public async remove(userToken: UserToken): Promise<void> {
    const docRef = doc(this.firestore, `users/${userToken.email}`);
    await deleteDoc(docRef);
  }
}
