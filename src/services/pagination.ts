export const paginationFn = <T>(
  sortedArray: T[],
  limit: number,
  page: number,
): T[] => {
  const startIndex = (Number(page) - 1) * Number(limit);
  const endIndex = startIndex + Number(limit);

  return sortedArray.slice(startIndex, endIndex);
};
