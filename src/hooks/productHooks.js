import { useQuery } from '@tanstack/react-query';
import apiClient from '../apiClient';
export const useGetProductsQuery = () => useQuery({
    queryKey: ['products'],
    queryFn: async () => (await apiClient.get(`api/products`)).data,
});
export const useGetProductDetailsBySlugQuery = (slug) => useQuery({
    queryKey: ['products', slug],
    queryFn: async () => (await apiClient.get(`api/products/slug/${slug}`)).data,
});
export const useGetCategoriesQuery = () => useQuery({
    queryKey: ['categories'],
    queryFn: async () => (await apiClient.get(`/api/products/categories`)).data,
});
