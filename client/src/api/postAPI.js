const url = import.meta.env.VITE_API_URL;
export const getPosts = async (id, token) => {
  return await fetch(`${url}/post/myposts/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.error("Error:", error));
};

export const createNewPost = async (id, token, newPost) => {
  return await fetch(`${url}/post/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newPost),
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.error("Error:", error));
};

export const getTimelinePosts = async (id, token) => {
  console.log(url)
  return await fetch(`${url}/post/feed/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.error("Error:", error));
};

export const updatePost = async (postId, userId, token, desc) => {
  return await fetch(`${url}/post/${postId}/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ desc }),
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.error("Error:", error));
};

export const deletePostById = async (postId, userId, token) => {
  return await fetch(`${url}/post/${postId}/${userId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      // Add any other headers if needed
    },
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.error("Error:", error));
};

export const likePost = async (postId, userId, token) => {
  return await fetch(`${url}/post/${postId}/like/${userId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.error("Error:", error));
};

export const addCommentToPost = async (postId, userId, token, text) => {
  return await fetch(`${url}/post/${postId}/comment/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ text }),
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.error("Error:", error));
};
