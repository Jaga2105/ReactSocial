const url = import.meta.env.VITE_API_URL;
export const getUserDetails = async (id, token) => {
    return await fetch(`${url}/user/${id}`, {
      method: "GET",
      headers: {
        Authorization : `Bearer ${token}`
      },
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => console.error("Error:", error));
  };

  export const searchUser = async (searchQuery) => {
    return await fetch(`${url}/user/?username=${searchQuery}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => console.error("Error:", error));
  };

  export const updateUser = async (id, token, userData) => {
    return await fetch(`${url}/user/${id}`, {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
        Authorization : `Bearer ${token}`
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => console.error("Error:", error));
  };

  export const getSuggestedPeople = async (id, token) => {
    return await fetch(`${url}/user/people/${id}`, {
      method: "GET", 
      headers: {
        Authorization : `Bearer ${token}`
      },
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => console.error("Error:", error));
  };

  export const followUser = async (id, token, followId) => {
    return await fetch(`${url}/user/follow/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization : `Bearer ${token}`
      },
      body: JSON.stringify({followId}),
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => console.error("Error:", error));
  };

  export const unFollowUser = async (id, token, unFollowId) => {
    return await fetch(`${url}/user/unfollow/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization : `Bearer ${token}`
      },
      body: JSON.stringify({unFollowId}),
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => console.error("Error:", error));
  };
