import { useEffect, useState } from "react";
import PostModel from "../../types/Post";
import Posts from "../posts/Posts";
import PostDetails from "../posts/PostDetails";

export default function Dashboard() {
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [input, setInput] = useState<string>("");
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [addNew, setAddNew] = useState<boolean>(false);
  const updateFirstTitle = (title: string) => {
    return setPosts((p) =>
      p.map((post, index) => {
        if (index == 0) return { ...post, title };
        return post;
      })
    );
  };

  useEffect(() => {
    fetch("http://localhost:8080/posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(
          data.map((post: PostModel) => {
            return {
              id: post.id,
              title: post.title,
            };
          })
        );
      });
  }, []);

  const onPostClicked = (id: number) => {
    setSelectedPostId(id);
  };

  const editSelectedPostTitle = (updatedPost: PostModel) => {
    if (selectedPostId !== null) {
      setPosts((p) =>
        p.map((post) => {
          if (post.id === selectedPostId) return updatedPost;
          return post;
        })
      );
      setSelectedPostId(null);
    }
  };

  const onCreate = (post: PostModel) => {
    setPosts((p) => [...p, post]);
    setAddNew(false);
  };

  const deleteSelectedPost = () => {
    if (selectedPostId !== null) {
      setPosts((p) => p.filter((post) => post.id !== selectedPostId));
      setSelectedPostId(null);
    }
  };

  return (
    <div className="p-4">
      <span className="text-gray-500">click a post to show details</span>
      <Posts onClick={onPostClicked} posts={posts} />
      <div className="mt-4">
        <input
          type="text"
          className="border rounded p-2 w-full"
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <button
          className="mt-2 bg-blue-500 text-white p-2 rounded"
          onClick={() => {
            updateFirstTitle(input);
          }}
        >
          Submit
        </button>
        <button
          className="mt-2 bg-red-500 text-white p-2 rounded"
          onClick={() => {
            setAddNew(true);
          }}
        >
          Add New
        </button>
      </div>
      {(selectedPostId || addNew) && (
        <PostDetails
          id={selectedPostId}
          onEdit={editSelectedPostTitle}
          onCreate={onCreate}
          onDelete={deleteSelectedPost}
        />
      )}
    </div>
  );
}
