import { BrowserRouter, Routes, Route } from "react-router-dom";
import SharedLayout from "./components/ShareLayout";
import Mainfeed from "./components/Mainfeed";
import Community from "./components/Community";
import Education from "./components/Education";
import Happeningnow from "./components/Happeningnow";
import DisaX from "./components/DisaX";
import Profile from "./components/Profile";
import Comment from "./pages/Comment";
import Createpost from "./components/Createpost";
import Createcomment from "./components/Createcomment";
import DisaXBot from "./pages/DisaX";
import Signuppage from "./pages/Signuppage";
import Emailconfirmation from "./pages/Emailconfirmation";
import Loginpage from "./pages/LoginPage";
import Forgotpasswordpage from "./pages/Forgotpasswordpage";
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
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<AuthRoute element={<Mainfeed />} />} />
            <Route
              path="/community"
              element={<AuthRoute element={<Community />} />}
            />
            <Route
              path="/education"
              element={<AuthRoute element={<Education />} />}
            />
            <Route
              path="/happeningnow"
              element={<AuthRoute element={<Happeningnow />} />}
            />
            <Route path="/disaX" element={<AuthRoute element={<DisaX />} />} />
            <Route path="/funds" element={<AuthRoute element={<Funds />} />} />
            <Route
              path="/profile"
              element={<AuthRoute element={<Profile />} />}
            />
            <Route
              path="/:postId/comments"
              element={<AuthRoute element={<Comment type="comment" />} />}
            />
            <Route
              path="/post/:postId/subcomments"
              element={<AuthRoute element={<Comment type="subcomment" />} />}
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

          <Route
            path="/:userId/disaX"
            element={<AuthRoute element={<DisaXBot />} />}
          />
          {/* <Route path="/signup" element={<Signuppage />} /> */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Signin />} />

          {/* <Route
            path="/register/verify/:userToken"
            element={<Emailconfirmation />}
          /> */}
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
