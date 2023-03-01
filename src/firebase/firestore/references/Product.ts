import { ProductModel } from '@/types/Products/Product';
import { CollectionReference, Firestore } from 'firebase/firestore';
import { collectionWithIds, docWithId } from '../utils';

export const ProductCollection = (db: Firestore) =>
  collectionWithIds(db, 'products') as CollectionReference<ProductModel>;

export const ProductDoc = (db: Firestore, id: string) => docWithId(db, id);
