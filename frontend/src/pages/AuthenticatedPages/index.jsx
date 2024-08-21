import Mainfeed from "../../components/Mainfeed";
import Community from "../../components/Community";
// import Happeningnow from "../../components/Happeningnow";
import Profile from "../../components/Profile";
import Comment from "../Comment";
import WaverxChatPage from "../WaverX";
import Funds from "../../components/Funds";
import withAuth from "../../HOC/withAuth";
import SharedLayout from "../../components/ShareLayout";
import Reports
 from "../Reports";
const AuthSharedLayout = withAuth(SharedLayout)
const AuthCommunity = withAuth(Community)
const AuthMainfeed = withAuth(Mainfeed)
const AuthProfile = withAuth(Profile)
const AuthComment = withAuth(Comment)
const AuthWaverX = withAuth(WaverxChatPage)
const AuthFunds = withAuth(Funds)
const AuthReports = withAuth(Reports)

export {AuthSharedLayout, AuthReports, AuthComment, AuthCommunity, AuthFunds, AuthMainfeed, AuthWaverX, AuthProfile}