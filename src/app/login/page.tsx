import { Divider } from "@mui/material";

import AuthPage from "@/components/Auth/Auth";

const Login = () => {
  return (
    <>
      <Divider sx={{ mx: 4 }} />
      <AuthPage type="login" />
    </>
  );
};

export default Login;
