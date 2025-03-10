import { useState } from "react";
import PostModel from "../../types/Post";
import Posts from "../posts/Posts";
import PostDetails from "../posts/PostDetails";

const postData: PostModel[] = [
  {
    id: 1,
    title: "Post 1",
    author: "Author 1",
  },
  {
    id: 2,
    title: "Post 2",
    author: "Author 2",
  },
  {
    id: 3,
    title: "Post 3",
    author: "Author 3",
  },
];

export default function Dashboard() {
  const [posts, setPosts] = useState<PostModel[]>(postData);
  const [input, setInput] = useState<string>("");
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const updateFirstTitle = (title: string) => {
    return setPosts((p) =>
      p.map((post, index) => {
        if (index == 0) return { ...post, title };
        return post;
      })
    );
  };

  const onPostClicked = (id: number) => {
    setSelectedPostId(id);
  };

  const editSelectedPostTitle = (title: string) => {
    if (selectedPostId !== null) {
      setPosts((p) =>
        p.map((post) => {
          if (post.id === selectedPostId) return { ...post, title };
          return post;
        })
      );
      setSelectedPostId(null);
    }
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
      </div>
      {selectedPostId && (
        <PostDetails
          title={posts.find((p) => p.id == selectedPostId)!.title}
          onEdit={editSelectedPostTitle}
          onDelete={deleteSelectedPost}
        />
      )}
    </div>
  );
}
