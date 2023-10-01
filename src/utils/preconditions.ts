/**
 * I want to call this `require` but the collision with CommonJS is too confusing
 */
export const checkNotNull = <T>(item: T | null | undefined): T => {
  if (item === null || item === undefined) {
    throw new Error();
  }
  return item;
};

export const check = (condition: boolean) => {
  if (!condition) {
    throw new Error();
  }
};
