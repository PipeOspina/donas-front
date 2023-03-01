import { db } from '@/firebase/config/front';
import { collectionWithIds } from '@/firebase/firestore/utils';
import { ModelWithId } from '@/types/Firestore';
import {
  DocumentData,
  onSnapshot,
  query,
  QueryConstraint,
  QuerySnapshot,
  Unsubscribe,
} from 'firebase/firestore';
import { useCallback, useEffect, useRef, useState } from 'react';

const useCollection = <Model extends object = DocumentData>(
  queryConstraints: QueryConstraint[],
  collection: string,
  ...path: string[]
): [QuerySnapshot<ModelWithId<Model>> | null, { loading: boolean }] => {
  const [snapshot, setSnapshot] = useState<null | QuerySnapshot<
    ModelWithId<Model>
  >>(null);
  const [loading, setLoading] = useState(true);

  const unsubRef = useRef<Unsubscribe>();

  const handleUnsubscribe = useCallback(() => {
    if (unsubRef.current) unsubRef.current();
  }, [unsubRef]);

  const handleComplete = useCallback(() => {
    handleUnsubscribe();
    unsubRef.current = undefined;
    setLoading(false);
  }, [unsubRef, handleUnsubscribe]);

  useEffect(() => {
    setLoading(true);
    handleUnsubscribe();
    unsubRef.current = onSnapshot(
      query(
        collectionWithIds<Model>(db, collection, ...path),
        ...queryConstraints,
      ),
      {
        complete: handleComplete,
        error: () => setLoading(false),
        next: (snap) => {
          setSnapshot(snap);
          setLoading(false);
        },
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [snapshot, { loading }];
};

export default useCollection;
