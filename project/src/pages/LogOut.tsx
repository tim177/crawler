import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logOutUser = async () => {
      try {
        const response = await axios.post(
          "http://3.110.223.250:8000/logout",
          {},
          {
            withCredentials: true, // If cookies are used for authentication
          }
        );
        console.log("Logout successful:", response.data);
        // Redirect to the login page or homepage
        navigate("/login");
      } catch (err) {
        console.error("Error logging out:", err);
        // Optionally handle errors, such as displaying an error message
      }
    };

    logOutUser();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1>Logging out...</h1>
    </div>
  );
};

export default LogOut;
