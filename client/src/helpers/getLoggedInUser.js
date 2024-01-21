export const getLoggedInUser = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token; // Optional chaining for safety
    const tokenExpiryTime = localStorage.getItem('userExpiry');
  
    if (token && tokenExpiryTime) {
      const isTokenValid = new Date().getTime() < parseInt(tokenExpiryTime, 10);
      return isTokenValid ? user : false;
    } else {
      return false;
    }
  };