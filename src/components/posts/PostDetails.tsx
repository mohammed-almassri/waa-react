import React, { useState } from "react";

interface PostDetailsProps {
  title: string;
  onEdit: (newTitle: string) => void;
  onDelete: () => void;
}

export default function PostDetails({
  title,
  onEdit,
  onDelete,
}: PostDetailsProps) {
  const [newTitle, setNewTitle] = useState(title);

  return (
    <div className="p-4 rounded shadow-md">
      <textarea
        className="w-full p-2 border rounded"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <div className="mt-4 flex space-x-2">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => onEdit(newTitle)}
        >
          Save
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
