import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/app-context-provider";

const LandingPage = () => {
  const navigate = useNavigate();
  const { loginAction } = useAuth();

  const handleLogin = async () => {
    await loginAction({
      email: "subham@gmail.com",
      password: "subham",
    });
  };
  return (
    <div>
      <button onClick={handleLogin}>Logina</button>
    </div>
  );
};

export default LandingPage;
