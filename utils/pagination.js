export function getPaginationOptions(filter) {
  let options = null;
  const page = Number(filter.page);
  const size = Number(filter.size);

  if (page && size)
    options = {
      limit: Number(size),
      skip: (page - 1) * size,
    }

  return options;
}

export function getPaginationResult(filter, totalCount) {
  return {
    totalCount,
    currentPage: Number(filter.page) || 1,
    pageSize: Number(filter.size) || totalCount,
  }
}