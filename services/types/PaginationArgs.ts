type PaginationArgs<Filter extends Record<string, any> = {}> = {
  filter?: Filter;
  limit?: number;
  page?: number;
};

export default PaginationArgs;
