export interface Superhero {
  name: string;
  superpower: string;
  humilityScore: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  meta: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}
