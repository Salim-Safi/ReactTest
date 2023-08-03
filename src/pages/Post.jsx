import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts/" + id)
      .then((result) => setPost(result.data));
  }, [id]);
  return (
    <div>
      <div>
        <b>UserId:</b> {post.userId}
      </div>
      <div>
        <b>Titre:</b> {post.title}
      </div>
      <div>
        <b>Corps:</b> {post.body}
      </div>
    </div>
  );
};

export default Post;
