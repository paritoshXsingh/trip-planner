"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { logout } from "@/lib/auth";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function LogoutDialog({ open, onClose }: Props) {
  const handleLogout = () => {
    logout();

    window.location.href = "/";
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Logout</DialogTitle>
        </DialogHeader>

        <p className="text-slate-500">Are you sure you want to logout?</p>

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="
              border
              px-4
              py-2
              rounded-lg
              hover:bg-slate-50
              transition
            "
          >
            Cancel
          </button>

          <button
            onClick={handleLogout}
            className="
              bg-red-600
              text-white
              px-4
              py-2
              rounded-lg
              hover:bg-red-700
              transition
            "
          >
            Logout
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
