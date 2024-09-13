import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Signuppage from "./pages/Signuppage";
// import Loginpage from "./pages/LoginPage";
// import Forgotpasswordpage from "./pages/Forgotpasswordpage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  VerifyResetRequest,
} from "./pages/Auth";

import {
  AuthComment,
  AuthCommunity,
  AuthFunds,
  AuthMainfeed,
  AuthProfile,
  AuthSharedLayout,
  AuthWaverX,
  AuthCampaigns,
  AuthWaverXPosts,
  AuthNotification,
  AuthOnboardingLayout,
  AuthWelcome,
  AuthHome,
  AuthOnboardingCampaign,
  AuthOnboardingNotification,
  AuthOnboardingProfile,
  AuthOnboardingWallet,
  AuthOnboardingDisaster,
  AuthOnboardingChatbot,
  AuthOnboardingCommunity,
  AuthBotLeg,
  AuthGrabLeg,
  AuthDisasterPage
} from "./pages/AuthenticatedPages";

configWeb3Modal();

function App() {
  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/bot" element={<AuthWaverX />} />
          <Route path="/campaigns" element={<AuthCampaigns />} />
          <Route path="/disasters" element={<AuthDisasterPage/>} />


          <Route path="/" element={<AuthSharedLayout />}>
            <Route index element={<AuthMainfeed />} />
            <Route path="/community" element={<AuthCommunity />} />
            <Route path="/notifications" element={<AuthNotification />} />
            <Route path="/waverx" element={<AuthWaverXPosts />} />
            {/* <Route path="/happeningnow" element={<Happeningnow />} /> */}
            <Route path="/wallet" element={<AuthFunds />} />
            <Route path="/:userId/profile" element={<AuthProfile />} />
            <Route
              path="/:postId/comments"
              element={<AuthComment type={"post"} />}
            />
            <Route
              path="/:postId/:commentId/comments"
              element={<AuthComment type={"comments"} />}
            />
          </Route>
          <Route path="/onboarding" element={<AuthOnboardingLayout />}>
            <Route index element={<AuthWelcome />} />
            <Route path="/onboarding/bot" element={<AuthOnboardingChatbot />} />
            <Route path="/onboarding/campaigns" element={<AuthOnboardingCampaign />} />
            <Route path="/onboarding/home" element={<AuthHome />} />
            <Route path="/onboarding/community" element={<AuthOnboardingCommunity/>} />
            <Route
              path="/onboarding/notifications"
              element={<AuthOnboardingNotification />}
            />
            <Route path="/onboarding/disasters" element={< AuthOnboardingDisaster/>} />
            <Route path="/onboarding/waverx" element={<AuthWaverXPosts />} />
            {/* <Route path="/happeningnow" element={<Happeningnow />} /> */}
            <Route path="/onboarding/wallet" element={<AuthOnboardingWallet />} />
            <Route path="/onboarding/profile" element={<AuthOnboardingProfile />} />
            <Route path="/onboarding/grableg" element={<AuthGrabLeg />} />
            <Route path="/onboarding/botleg" element={<AuthBotLeg/>} />
          </Route>

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Signin />} />

          <Route
            path="/verifypasswordreset/:uid/:token"
            element={<VerifyResetRequest />}
          />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/emailcode" element={<EmailCode />} />
          <Route path="/resetpassword" element={<PasswordReset />} />
          <Route path="/phonecode" element={<PhoneCode />} />
          <Route path="/verifyphone" element={<PhoneVerification />} />
          <Route path="/verifymail" element={<VerifyMail />} />
          <Route path="/uploadphoto" element={<UploadPhoto />} />

          {/* <Route path="/wallet"  element={<Web3 />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
