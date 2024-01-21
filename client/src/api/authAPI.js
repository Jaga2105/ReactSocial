export const registerUser = async (userData) => {
  const apiUrl = "http://localhost:5000/api/auth/register";
  return await fetch(apiUrl, {
    method: "POST", // or 'GET', 'PUT', etc.
    headers: {
      "Content-Type": "application/json",
      // Add any other headers if needed
    },
    body: JSON.stringify(userData),
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.error("Error:", error));
};
