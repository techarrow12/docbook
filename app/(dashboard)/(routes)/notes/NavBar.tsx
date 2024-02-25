"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/heading";
import { NotebookPen, Plus } from "lucide-react";
import { useState } from "react";
import AddEditNoteDialog from "@/components/add-edit-note-dialog";
import AIChatButton from "@/components/aI-chat-button";

export default function NavBar() {
  const [showAddEditNoteDialog, setShowAddEditNoteDialog] = useState(false);

  return (
      <div>
      <Heading title="Medical Notes"
      description="AI intergrated patient note summary."
      icon={NotebookPen}
      iconColor="text-violet-500"
      bgColor="bg-violet-500/10"
      />
      <div className="px-4 m-auto flex items-center gap-1">
          <Button variant={"premium"} onClick={() => setShowAddEditNoteDialog(true)}>
            <Plus size={15} className="mr-2" />
            Add Note
          </Button>
          <AIChatButton />
          </div>
    <AddEditNoteDialog
          open={showAddEditNoteDialog}
          setOpen={setShowAddEditNoteDialog}
        />
    </div>
  )
}
