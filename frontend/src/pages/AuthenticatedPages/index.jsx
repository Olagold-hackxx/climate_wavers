import Mainfeed from "../../components/Mainfeed";
import Community from "../../components/Community";
// import Happeningnow from "../../components/Happeningnow";
import Profile from "../../components/Profile";
import Comment from "../Comment";
import WaverxChatPage from "../WaverX";
import Funds from "../../components/Funds";
import withAuth from "../../HOC/withAuth";
import SharedLayout from "../../components/ShareLayout";
import CampaignsPage from "../CampaignsPage";
import WaverXPosts from "../../components/WaverXPosts";
import Notification from "../../components/Notification";
import DisasterPage from "../Disasters";
import {
  OnboardingLayout,
  Welcome,
  Home,
  Campaign,
  Notifications,
  Profile as OnboardingProfile,
  Community as OnboardingCommunity,
  Wallet,
  Disasters,
  Chatbot,
  BotLeg,
  GrabLeg,
} from "../../components/Onboarding";

const AuthSharedLayout = withAuth(SharedLayout);
const AuthCommunity = withAuth(Community);
const AuthMainfeed = withAuth(Mainfeed);
const AuthProfile = withAuth(Profile);
const AuthComment = withAuth(Comment);
const AuthWaverX = withAuth(WaverxChatPage);
const AuthFunds = withAuth(Funds);
const AuthCampaigns = withAuth(CampaignsPage);
const AuthWaverXPosts = withAuth(WaverXPosts);
const AuthNotification = withAuth(Notification);
const AuthOnboardingLayout = withAuth(OnboardingLayout);
const AuthWelcome = withAuth(Welcome);
const AuthHome = withAuth(Home);
const AuthOnboardingCampaign = withAuth(Campaign);
const AuthOnboardingNotification = withAuth(Notifications);
const AuthOnboardingProfile = withAuth(OnboardingProfile);
const AuthOnboardingWallet = withAuth(Wallet);
const AuthOnboardingDisaster = withAuth(Disasters);
const AuthOnboardingChatbot = withAuth(Chatbot);
const AuthOnboardingCommunity = withAuth(OnboardingCommunity);
const AuthGrabLeg = withAuth(GrabLeg);
const AuthBotLeg = withAuth(BotLeg);
const AuthDisasterPage = withAuth(DisasterPage)

export {
  AuthSharedLayout,
  AuthWaverXPosts,
  AuthCampaigns,
  AuthComment,
  AuthCommunity,
  AuthFunds,
  AuthMainfeed,
  AuthWaverX,
  AuthProfile,
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
};
