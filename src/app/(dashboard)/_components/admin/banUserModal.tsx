"use client";

import { AlertTriangle, Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useIsBannedUser } from "@/hooks/useIsBannedUser";

export function BanUserModal({
  open,
  onOpenChange,
  userId,
  userName,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: number | null;
  userName?: string;
}) {
  
  const { mutateAsync: banUser, isPending } = useIsBannedUser();

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-90 text-center cursor-pointer">
        <AlertDialogHeader className="sm:place-items-center! sm:text-center!">
          <div className="w-14 h-14 rounded-full bg-[#ffdad6] flex items-center justify-center mb-3">
            <AlertTriangle size={24} className="text-[#ba1a1a]" />
          </div>
          <AlertDialogTitle className="text-lg font-bold text-[#0b1c30]">
            Ban User
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-[#515f74]">
            Are you sure you want to ban{" "}
            <strong className="text-[#0b1c30]">
              {userName ?? "this user"}
            </strong>
            ?
            <br />
            This user will no longer be able to access their account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col gap-2 sm:flex-col">
          <Button
            onClick={async () => {
              await banUser({userId, isBanned: true})
              if (!isPending) onOpenChange(false);
            }}
            disabled={isPending}
            className="w-full bg-[#ba1a1a] hover:bg-[#ba1a1a]/90 text-white font-semibold h-auto py-2.5 rounded-lg cursor-pointer"
          >
            {isPending ? (
              <>
                <Loader2 size={14} className="animate-spin mr-1.5" />
                Banning...
              </>
            ) : (
              "Ban User"
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled={isPending}
            onClick={() => onOpenChange(false)}
            className="w-full border-[#bbcabf] text-[#0b1c30] h-auto py-2.5 rounded-lg cursor-pointer"
          >
            Cancel
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
