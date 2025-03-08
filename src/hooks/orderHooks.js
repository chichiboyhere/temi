import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "../apiClient";
export const useGetOrderDetailsQuery = (id) => useQuery({
    queryKey: ["orders", id],
    queryFn: async () => (await apiClient.get(`api/orders/${id}`)).data,
});
export const useGetOrderSummaryQuery = () => useQuery({
    queryKey: ["order-summary"],
    queryFn: async () => (await apiClient.get(`api/orders/summary`)).data,
});
export const useGetOrderListQuery = () => useQuery({
    queryKey: ["order-list"],
    queryFn: async () => (await apiClient.get(`api/orders`)).data,
});
// export const useDeleteOrderMutation = () =>
//   useMutation({
//     mutationFn: async (details: { orderId: string }) =>
//       (
//         await apiClient.delete<{ message: string; order: Order }>(
//           `/api/orders/${details.orderId}`
//         )
//       ).data,
//   });
// export const useDeleteOrderMutation = () =>
//   useMutation({
//     mutationFn: async ({ orderId }: { orderId: string }) => {
//       const response = await apiClient.delete<{
//         message: string;
//         order: Order;
//       }>(`/api/orders/${orderId}`);
//       return response.data;
//     },
//     onError: (error) => {
//       console.error("Error deleting order:", error);
//     },
//   });
export const useDeleteOrderMutation = () => useMutation({
    mutationFn: async ({ orderId }) => {
        console.log("Deleting order:", orderId); // Debugging
        if (!orderId)
            throw new Error("Order ID is missing!");
        return (await apiClient.delete(`/api/orders/${orderId}`)).data;
    },
    onError: (error) => console.error("Error deleting order:", error),
    onSuccess: () => {
        // Invalidate and refetch the orders query
        const queryClient = useQueryClient();
        queryClient.invalidateQueries(["order-list"]);
    },
    networkMode: "online",
    retry: 1,
});
export const useGetPaypalClientIdQuery = () => useQuery({
    queryKey: ["paypal-clientId"],
    queryFn: async () => (await apiClient.get(`/api/keys/paypal`)).data,
});
export const usePayOrderMutation = () => useMutation({
    mutationFn: async (details) => (await apiClient.put(`api/orders/${details.orderId}/pay`, details)).data,
});
export const useCreateOrderMutation = () => useMutation({
    mutationFn: async (order) => (await apiClient.post(`api/orders`, order)).data,
});
export const useGetOrderHistoryQuery = () => useQuery({
    queryKey: ["order-history"],
    queryFn: async () => (await apiClient.get(`/api/orders/mine`)).data,
});
