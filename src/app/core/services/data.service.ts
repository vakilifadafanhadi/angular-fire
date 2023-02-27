import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore"
import { Student } from '../models/student';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private _angularFirestore: AngularFirestore
  ) { }
  create(student: Student) {
    student.id = this._angularFirestore.createId();
    return this._angularFirestore.collection("/Students").add(student);
  }
  list() {
    return this._angularFirestore.collection("/Students").snapshotChanges();
  }
  delete(id: string) {
    return this._angularFirestore.doc(`/Students/${id}`).delete();
  }
  update(student: Student) {
    this.delete(student.id!);
    this.create(student);
  }
}
