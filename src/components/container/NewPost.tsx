import { useNavigate } from "react-router";
import { usePost } from "../../context/PostContext";
import PostDetails from "../posts/PostDetails";

export default function NewPost() {
  const { selectedId, setSelectedId } = usePost();
  const navigate = useNavigate();
  const editSelectedPostTitle = (updatedPost: PostModel) => {
    if (selectedId !== null) {
      setSelectedId(null);
      navigate("/");
    }
  };

  const onCreate = (post: PostModel) => {
    navigate("/");
  };

  const deleteSelectedPost = () => {
    if (selectedId !== null) {
      setSelectedId(null);
      navigate("/");
    }
  };

  return (
    <PostDetails
      id={selectedId}
      onEdit={editSelectedPostTitle}
      onCreate={onCreate}
      onDelete={deleteSelectedPost}
    />
  );
}
