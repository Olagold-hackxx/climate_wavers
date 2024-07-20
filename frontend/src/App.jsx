import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SharedLayout from "./components/ShareLayout";
import Mainfeed from "./components/Mainfeed";
import Community from "./components/Community";
import Education from "./components/Education";
import Signuppage from "./pages/Signuppage";
import Emailconfirmation from "./pages/Emailconfirmation";
import Loginpage from "./pages/LoginPage";
import Forgotpasswordpage from "./pages/Forgotpasswordpage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<AuthRoute element={<Mainfeed />} />} />
            <Route path="/community" element={<AuthRoute element={<Community />} />} />
            <Route path="/education" element={<AuthRoute element={<Education />} />} />
            <Route path="/:postId/comments" element={<AuthRoute element={<Comment type="comment" />} />} />
            <Route path="/post/:postId/subcomments" element={<AuthRoute element={<Comment type="subcomment" />} />} />
            <Route path="/createpost" element={<AuthRoute element={<Createpost />} />} />
            <Route path="/:postId/comment" element={<AuthRoute element={<Createcomment />} />} />
          </Route>

          <Route path="/signup" element={<Signuppage />} />
          <Route path="/register/verify/:userToken" element={<Emailconfirmation />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/forgotpassword" element={<Forgotpasswordpage />} />
          {/* <Route path="/wallet" element={<AuthRoute element={<Web3 />} />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
