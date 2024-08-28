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
};
