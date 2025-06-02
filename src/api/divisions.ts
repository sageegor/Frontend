import { Division } from '../types/division';

// Для получения списка
export const fetchDivisions = async (searchQuery: string): Promise<Division[]> => {
  const response = await fetch(`/api/divisions?search=${encodeURIComponent(searchQuery)}`);
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
};

// Для получения одного подразделения
export const fetchDivisionById = async (id: number): Promise<Division> => {
  const response = await fetch(`/api/divisions/${id}`);
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
};