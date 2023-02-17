import { Route, Routes } from "react-router-dom";
import RegisterPage from "../pages/auth/RegisterPage";
import SigninPage from "../pages/auth/SigninPage";
import HomePage from "../pages/posts/HomePage";
import SinglePostPage from "../pages/posts/SinglePostPage";
import CreateShopPage from "../pages/shops/CreateShopPage";
import SingleShopPage from "../pages/shops/SingleShopPage";

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:id" element={<SinglePostPage />} />
      <Route path="/creation-boutique" element={<CreateShopPage />} />
      <Route path="/boutique/:id" element={<SingleShopPage />} />
      <Route path="/auth/signin" element={<SigninPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
    </Routes>
  );
};

export default MainRouter;
