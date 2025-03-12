import React, { use, useCallback, useEffect, useState } from "react";
import PostModel from "../../types/Post";
interface PostDetailsProps {
  id: number | null;
  onEdit: (newPost: PostModel) => void;
  onCreate: (newPost: PostModel) => void;
  onDelete: () => void;
}

export default function PostDetails({
  id,
  onEdit,
  onCreate,
  onDelete,
}: PostDetailsProps) {
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [loading, setLoading] = useState(true);
  const fetchPost = async () => {
    try {
      console.log("data");
      const response = await fetch(`http://localhost:8080/posts/${id}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error("failed to fetch post");
      }
      setNewTitle(data.title);
      setNewContent(data.content);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const updatePost = async (): Promise<PostModel> => {
    const response = await fetch("http://localhost:8080/posts/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTitle, content: newContent }),
    });
    if (response.ok) {
      console.log("updated");
    }
    return response.json();
  };

  const createPost = async (): Promise<PostModel> => {
    const response = await fetch("http://localhost:8080/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newTitle,
        content: newContent,
        userId: 1,
      }),
    });
    if (response.ok) {
      console.log("created");
    }
    return response.json();
  };

  const deletePost = async () => {
    try {
      const response = await fetch("http://localhost:8080/posts/" + id, {
        method: "DELETE",
      });
      if (response.ok) {
        console.log("deleted");
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (id) {
      fetchPost();
    } else {
      setLoading(false);
    }
  }, [id]);

  return loading ? (
    <div>loading</div>
  ) : (
    <div className="p-4 rounded shadow-md">
      <textarea
        className="w-full p-2 border rounded"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <textarea
        className="w-full p-2 border rounded mt-2"
        value={newContent}
        onChange={(e) => setNewContent(e.target.value)}
      />
      <div className="mt-4 flex space-x-2">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={async () => {
            if (id) {
              onEdit(await updatePost());
            } else {
              onCreate(await createPost());
            }
          }}
        >
          Save
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={() => {
            deletePost();
            onDelete();
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
