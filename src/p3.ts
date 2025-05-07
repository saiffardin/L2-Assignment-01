function concatenateArrays<T>(...arrays: T[][]): T[] {
  let result: T[] = [];

  arrays.forEach((arr) => {
    result = [...result, ...arr];
  });

  return result;
}
