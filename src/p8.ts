async function squareAsync(n: number): Promise<number> {
  return new Promise(async (resolve, reject) => {
    if (n < 0) {
      reject(new Error("Negative number not allowed"));
    }

    setTimeout(() => {
      resolve(n * n);
    }, 1000);
  });
}
