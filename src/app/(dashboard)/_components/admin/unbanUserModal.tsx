"use client";

import { CheckCircle2 } from "lucide-react";
import { Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export function UnbanUserModal({
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
  const isPending = false;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-90 text-center">
        <AlertDialogHeader className="sm:place-items-center! sm:text-center!">
          <div className="w-14 h-14 rounded-full bg-[#d7f5e9] flex items-center justify-center mb-3">
            <CheckCircle2 size={24} className="text-[#006c49]" />
          </div>
          <AlertDialogTitle className="text-lg font-bold text-[#0b1c30]">
            Unban User
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-[#515f74]">
            Are you sure you want to unban{" "}
            <strong className="text-[#0b1c30]">
              {userName ?? "this user"}
            </strong>
            ?
            <br />
            This user will regain access to their account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col gap-2 sm:flex-col">
          <Button
            // onClick={() => unbanUser()}
            // disabled={isPending}
            className="w-full bg-[#006c49] hover:bg-[#006c49]/90 text-white font-semibold h-auto py-2.5 rounded-lg cursor-pointer"
          >
            {isPending ? (
              <>
                <Loader2 size={14} className="animate-spin mr-1.5" />
                Unbanning...
              </>
            ) : (
              "Unban User"
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            // disabled={isPending}
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
