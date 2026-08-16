import { sendBookingRequests } from "@/lib/api/public";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";


export function useSendBookingRequest() {
    return useMutation({
        mutationFn: ({ propertyId }: { propertyId: number }) => sendBookingRequests(propertyId),
        onSuccess: () => {
            toast.success("Booking requests sent to the Landlord!");
        },
        onError: (error: Error) => {
            toast.error(error.message)
        }
    });
};