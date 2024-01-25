export const getPosts = async (id, token) => {
    const apiUrl = `http://localhost:5000/api/post/myposts/${id}`;
    return await fetch(apiUrl, {
      method: "GET", // or 'GET', 'PUT', etc.
      headers: {
        // "Content-Type": "application/json",
        Authorization : `Bearer ${token}`
        // Add any other headers if needed
      },
    //   body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => console.error("Error:", error));
  };

  export const getTimelinePosts = async (id, token) => {
    const apiUrl = `http://localhost:5000/api/post/feed/${id}`;
    return await fetch(apiUrl, {
      method: "GET", // or 'GET', 'PUT', etc.
      headers: {
        // "Content-Type": "application/json",
        Authorization : `Bearer ${token}`
        // Add any other headers if needed
      },
    //   body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => console.error("Error:", error));
  };

  export const updatePost = async (postId, userId, token, desc) => {
    const apiUrl = `http://localhost:5000/api/post/${postId}/${userId}`;
    return await fetch(apiUrl, {
      method: "PUT", // or 'GET', 'PUT', etc.
      headers: {
        "Content-Type": "application/json",
        Authorization : `Bearer ${token}`
        // Add any other headers if needed
      },
      body: JSON.stringify({desc}),
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => console.error("Error:", error));
  };

  export const deletePostById = async (postId, userId, token) => {
    const apiUrl = `http://localhost:5000/api/post/${postId}/${userId}`;
    return await fetch(apiUrl, {
      method: "DELETE", // or 'GET', 'PUT', etc.
      headers: {
        Authorization : `Bearer ${token}`
        // Add any other headers if needed
      },
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => console.error("Error:", error));
  };

  export const likePost = async (postId, userId, token) => {
    const apiUrl = `http://localhost:5000/api/post/${postId}/like/${userId}`;
    return await fetch(apiUrl, {
      method: "PUT", // or 'GET', 'PUT', etc.
      headers: {
        Authorization : `Bearer ${token}`
        // Add any other headers if needed
      },
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => console.error("Error:", error));
  };

  export const addCommentToPost = async (postId, userId, token, text) => {
    const apiUrl = `http://localhost:5000/api/post/${postId}/comment/${userId}`;
    return await fetch(apiUrl, {
      method: "PUT", // or 'GET', 'PUT', etc.
      headers: {
        "Content-Type": "application/json",
        Authorization : `Bearer ${token}`
        // Add any other headers if needed
      },
      body: JSON.stringify({text}),
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => console.error("Error:", error));
  };