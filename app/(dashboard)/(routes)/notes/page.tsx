
import Note from "@/components/note";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

export const metadata = {
  title: "Notes",
};

export default async function NotesPage() {
  const { userId } = auth();

  if (!userId) throw Error("userId undefined");

  const allNotes = await prismadb.note.findMany({
    where: { userId: userId },
  });

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {allNotes.map((note) => (
        <Note key={note.id} note={note} />
      ))}
      {allNotes.length === 0 && <div className="col-span-full text-center">{"You don't have any notes yet."}</div>}
    </div>
  );
}
