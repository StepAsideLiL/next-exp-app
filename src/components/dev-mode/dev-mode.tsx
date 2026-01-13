import { Plus } from "lucide-react";
// import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateConfig from "./create-config";

export default function DevMode() {
  return (
    <div className="fixed top-10 right-10">
      <Dialog>
        <DialogTrigger asChild>
          <Button size={"icon"} className="cursor-pointer rounded-full">
            <Plus />
          </Button>
        </DialogTrigger>

        <DialogContent className="flex min-h-128 min-w-6xl flex-col gap-3">
          <DialogHeader>
            <DialogTitle>Dev Mode</DialogTitle>
          </DialogHeader>

          <CreateConfig />
        </DialogContent>
      </Dialog>
    </div>
  );
}
