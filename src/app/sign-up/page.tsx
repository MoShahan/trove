import { Divider } from "@mui/material";

import AuthPage from "@/components/Auth/Auth";

const Signup = () => {
  return (
    <>
      <Divider sx={{ mx: 4 }} />
      <AuthPage type="signup" />
    </>
  );
};

export default Signup;
