import { ModelWithId } from '@/types/Firestore';
import {
  collection,
  doc,
  DocumentData,
  DocumentReference,
  Firestore,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
} from 'firebase/firestore';

export const getConverter = <
  Model extends object = DocumentData,
>(): FirestoreDataConverter<ModelWithId<Model>> => ({
  toFirestore: ({ id: _, ...objectModel }) => objectModel,
  fromFirestore: (snapshot: QueryDocumentSnapshot<Model>, options) => {
    const data = snapshot.data(options);
    return {
      ...data,
      id: snapshot.id,
    };
  },
});

export const collectionWithIds = <Model extends object = DocumentData>(
  firestore: Firestore,
  path: string,
  ...pathSegments: string[]
) =>
  collection(firestore, path, ...pathSegments).withConverter<
    ModelWithId<Model>
  >(getConverter<Model>());

export const docWithId = <Model extends object = DocumentData>(
  firestore: Firestore,
  path: string,
  ...pathSegments: string[]
) =>
  doc(firestore, path, ...pathSegments).withConverter<ModelWithId<Model>>(
    getConverter<Model>(),
  ) as DocumentReference<ModelWithId<Model>>;
