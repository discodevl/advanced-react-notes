import { FC } from "react";
import NoteForm from "../NoteForm/NoteForm";
import { NoteData, Tag } from "../../types/types";

type NewNoteProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[]
};

const NewNote: FC<NewNoteProps> = ({ onSubmit, onAddTag, availableTags }) => {
  return (
    <>
      <h1 className="mb-2">NewNote</h1>
      <NoteForm onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags}/>
    </>
  );
};

export default NewNote;
