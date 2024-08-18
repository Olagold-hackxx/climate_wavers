import { BrowserRouter, Routes, Route } from "react-router-dom";
import SharedLayout from "./components/ShareLayout";
import Mainfeed from "./components/Mainfeed";
import Community from "./components/Community";
import Happeningnow from "./components/Happeningnow";
import DisaX from "./components/DisaX";
import Profile from "./components/Profile";
import Comment from "./pages/Comment";
import Createpost from "./components/Createpost";
import Createcomment from "./components/Createcomment";
import WaverxChatPage from "./pages/WaverX";
import VerifyResetRequest from "./pages/Auth/VerifyResetRequest";
// import Signuppage from "./pages/Signuppage";
// import Loginpage from "./pages/LoginPage";
// import Forgotpasswordpage from "./pages/Forgotpasswordpage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Funds from "./components/Funds";
import AuthRoute from "./HOC/AuthRoute";
import { configWeb3Modal } from "./connection";
import {
  EmailCode,
  ForgotPassword,
  UploadPhoto,
  PasswordReset,
  PhoneCode,
  PhoneVerification,
  Signin,
  Signup,
  VerifyMail,
} from "./pages/Auth";

configWeb3Modal();

function App() {
  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
        <Route
            path="/bot"
            element={<AuthRoute element={<WaverxChatPage />} />}
          />
          <Route path="/" element={<AuthRoute element={<SharedLayout />} />}>
            <Route index element={<AuthRoute element={<Mainfeed />} />} />
            <Route
              path="/community"
              element={<AuthRoute element={<Community />} />}
            />
            <Route
              path="/bookmark"
              element={<AuthRoute element={<Community />} />}
            />
            <Route
              path="/happeningnow"
              element={<AuthRoute element={<Happeningnow />} />}
            />
            <Route path="/wallet" element={<AuthRoute element={<Funds />} />} />
            <Route
              path="/profile"
              element={<AuthRoute element={<Profile />} />}
            />
            <Route
              path="/:postId/comments"
              element={<AuthRoute element={<Comment type="comments" />} />}
            />
            <Route
              path="/post/:postId/comments"
              element={<AuthRoute element={<Comment type="subcomments" />} />}
            />
            <Route
              path="/createpost"
              element={<AuthRoute element={<Createpost />} />}
            />
            <Route
              path="/:postId/comment"
              element={<AuthRoute element={<Createcomment />} />}
            />
          </Route>
          {/* <Route path="/signup" element={<Signuppage />} /> */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Signin />} />

          <Route
            path="/verifypasswordreset/:uid/:token"
            element={<VerifyResetRequest/>}
          />
          {/* <Route path="/login" element={<Loginpage />} /> */}
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/emailcode" element={<EmailCode />} />
          <Route path="/resetpassword" element={<PasswordReset />} />
          <Route path="/phonecode" element={<PhoneCode />} />
          <Route path="/verifyphone" element={<PhoneVerification />} />
          <Route path="/verifymail" element={<VerifyMail />} />
          <Route path="/uploadphoto" element={<UploadPhoto />} />

          {/* <Route path="/wallet" element={<AuthRoute element={<Web3 />} />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
