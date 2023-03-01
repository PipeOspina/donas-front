import { db } from '@/firebase/config/front';
import { docWithId } from '@/firebase/firestore/utils';
import { ModelWithId } from '@/types/Firestore';
import {
  DocumentData,
  DocumentSnapshot,
  onSnapshot,
  Unsubscribe,
} from 'firebase/firestore';
import { useCallback, useEffect, useRef, useState } from 'react';

const useDoc = <Model extends object = DocumentData>(
  collection: string,
  id: string,
  ...path: string[]
) => {
  const [snapshot, setSnapshot] = useState<null | DocumentSnapshot<
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
      docWithId<Model>(db, collection, ...path, id),
      {
        complete: handleComplete,
        error: () => setLoading(false),
        next: setSnapshot,
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collection, id, path]);

  return [snapshot, { loading }];
};

export default useDoc;
