import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PaginatedResponse, Superhero } from '../types/superhero';

const API_BASE_URL = 'http://localhost:8080/api/v1';

// API functions
const createSuperhero = async (superhero: Superhero): Promise<Superhero> => {
  const response = await fetch(`${API_BASE_URL}/superheroes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(superhero),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create superhero');
  }
  
  return response.json();
};

const getAllSuperheroes = async ({ 
  page = 1, 
  pageSize = 10 
}: { 
  page?: number; 
  pageSize?: number; 
}): Promise<PaginatedResponse<Superhero>> => {
  const response = await fetch(
    `${API_BASE_URL}/superheroes?page=${page}&pageSize=${pageSize}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch superheroes');
  }
  
  return response.json();
};

// React Query hooks
export const useCreateSuperhero = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSuperhero,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['superheroes'] });
    },
  });
};

export const useGetSuperheroes = () => {
  return useInfiniteQuery({
    queryKey: ['superheroes'],
    queryFn: ({ pageParam = 1 }) => getAllSuperheroes({ page: pageParam, pageSize: 10 }),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return lastPage.items.length === 10 ? nextPage : undefined;
    },
    initialPageParam: 1,
  });
};
