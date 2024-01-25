export const getUserDetails = async (id, token) => {
    const apiUrl = `http://localhost:5000/api/user/${id}`;
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

  export const updateUser = async (id, token, userData) => {
    console.log(userData)
    const apiUrl = `http://localhost:5000/api/user/${id}`;
    return await fetch(apiUrl, {
      method: "PUT", // or 'GET', 'PUT', etc.
      headers: {
        "Content-Type": "application/json",
        Authorization : `Bearer ${token}`
        // Add any other headers if needed
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => console.error("Error:", error));
  };

  export const getSuggestedPeople = async (id, token) => {
    const apiUrl = `http://localhost:5000/api/user/people/${id}`;
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

  export const followUser = async (id, token, followId) => {
    const apiUrl = `http://localhost:5000/api/user/follow/${id}`;
    return await fetch(apiUrl, {
      method: "PUT", // or 'GET', 'PUT', etc.
      headers: {
        "Content-Type": "application/json",
        Authorization : `Bearer ${token}`
        // Add any other headers if needed
      },
      body: JSON.stringify({followId}),
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => console.error("Error:", error));
  };

  export const unFollowUser = async (id, token, unFollowId) => {
    const apiUrl = `http://localhost:5000/api/user/unfollow/${id}`;
    return await fetch(apiUrl, {
      method: "PUT", // or 'GET', 'PUT', etc.
      headers: {
        "Content-Type": "application/json",
        Authorization : `Bearer ${token}`
        // Add any other headers if needed
      },
      body: JSON.stringify({unFollowId}),
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => console.error("Error:", error));
  };
