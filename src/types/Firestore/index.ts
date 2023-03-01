export type ModelWithId<Model extends object> = Model & {
  id: string;
};
