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
  PasswordReset,
  PhoneCode,
  PhoneVerification,
  Signin,
  Signup,
  VerifyMail,
  VerifyResetRequest,
} from "./pages/Auth";

import {
  OnboardingLayout,
  Welcome,
  Home,
  Campaign as OnboardingCampaign,
  Notifications as  OnboardingNotification,
  Profile as OnboardingProfile,
  Community as OnboardingCommunity,
  Wallet as OnboardingWallet,
  Disasters as OnboardingDisasters,
  Chatbot as OnboardingChatbot,
  BotLeg,
  GrabLeg,
} from "./components/Onboarding";


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
  AuthDisasters,
  AuthDisasterPage,
  AuthUploadCover,
  AuthUploadPhoto 
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
          <Route path="/disasters/:disasterId" element={<AuthDisasterPage/>} />
          <Route path="/disasters" element={<AuthDisasters/>} />



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
          <Route path="/onboarding" element={<OnboardingLayout />}>
            <Route index element={<Welcome />} />
            <Route path="/onboarding/bot" element={<OnboardingChatbot />} />
            <Route path="/onboarding/campaigns" element={<OnboardingCampaign />} />
            <Route path="/onboarding/home" element={<Home />} />
            <Route path="/onboarding/community" element={<OnboardingCommunity/>} />
            <Route
              path="/onboarding/notifications"
              element={<OnboardingNotification />}
            />
            <Route path="/onboarding/disasters" element={< OnboardingDisasters/>} />
            {/* <Route path="/happeningnow" element={<Happeningnow />} /> */}
            <Route path="/onboarding/wallet" element={<OnboardingWallet />} />
            <Route path="/onboarding/profile" element={<OnboardingProfile />} />
            <Route path="/onboarding/grableg" element={<GrabLeg />} />
            <Route path="/onboarding/botleg" element={<BotLeg/>} />
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
          <Route path="/uploadphoto" element={<AuthUploadPhoto />} />
          <Route path="/uploadcover" element={<AuthUploadCover />} />


          {/* <Route path="/wallet"  element={<Web3 />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
