export function paginate(items = [], pageNumber, pageSize) {
  const start = pageNumber * pageSize;
  return items.slice(start, start + pageSize);
}
