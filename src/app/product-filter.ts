export interface ProductFilter {
  // Filtros básicos
  text?: string;
  category?: string;
  state?: string;
  // Filtros extendidos
  minPrice?: number;
  maxPrice?: number;
  // Ordenación básica
  name?: string;
  order?: boolean;
}
