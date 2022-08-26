import { CircularProgress } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import {
  AccountBalanceWallet,
  CloudUpload,
  Grain,
  Settings,
  Star,
} from "@material-ui/icons";
import DvrIcon from "@material-ui/icons/Dvr";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import GavelIcon from "@material-ui/icons/Gavel";
import HistoryIcon from "@material-ui/icons/History";
import InboxIcon from "@material-ui/icons/Inbox";
import PersonIcon from "@material-ui/icons/Person";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { _getProfile } from "../actions/adminActions";
import AppBar from "../components/AppBar";
import Content from "../components/Content";
import Sidebar from "../components/Sidebar";
import AdminList from "./AdminList";
import AffiliateCommission from "./AffiliateCommission";
import AngelBoxes from "./box/AngelBoxes";
import MinionBoxes from "./box/MinionBoxes";
import SkinBoxes from "./box/SkinBoxes";
import Boxes from "./Boxes";
import Contracts from "./Contracts";
import ApprovedWithdraws from "./fund/ApprovedWithdraws";
import CoinList from "./fund/CoinList";
import DepositHistory from "./fund/DepositHistory";
import FundLogs from "./fund/FundLogs";
import PendingWithdraws from "./fund/PendingWithdraws";
import WithdrawHistory from "./fund/WithdrawHistory";
import MintingBoxProducts from "./minting-box/MintingBoxProducts";
import MintingBox from "./minting-box/MintingBoxProducts";
import MintingBoxTransactions from "./minting-box/MintingBoxTransactions";
import Equipment from "./nft/Equipment";
import NewTemplates from "./nft/NewTemplates";
import NFTs from "./nft/NFTs";
import RI from "./nft/RI";
import RoleList from "./RoleList";
import S3Component from "./S3Component";
import ChangePassword from "./setting/ChangePassword";
import GoogleAuthenticator from "./setting/GoogleAuthenticator";
import Transactions from "./Transactions";
import UserList from "./user/UserList";

const routes = [
  {
    name: "User",
    icon: <PersonIcon />,
    scope: "USER_READ",
    routes: [
      {
        name: "List",
        path: "/user/list",
        component: UserList,
        scope: "USER_READ",
      },
      // {
      //   name: "Verifications",
      //   path: "/user/verifications",
      //   component: VerificationList,
      //   scope: "USER_FULL",
      // },
    ],
  },
  {
    name: "NFTs",
    icon: <DvrIcon />,
    routes: [
      {
        name: "List",
        path: "/nft/list",
        component: NFTs,
      },
      {
        name: "Templates",
        path: "/nft/templates",
        component: NewTemplates,
      },
      {
        name: "RI",
        path: "/nft/ri",
        component: RI,
      },
      {
        name: "Equipment",
        path: "/nft/equipment",
        component: Equipment,
      },
    ],
  },
  {
    name: "Box",
    icon: <InboxIcon />,
    routes: [
      {
        name: "Angels",
        path: "/box/angels",
        component: AngelBoxes,
      },
      {
        name: "Costume",
        path: "/box/costume",
        component: SkinBoxes,
      },
      {
        name: "Minion Parts",
        path: "/box/minion_parts",
        component: MinionBoxes,
      },
      {
        name: "Box Price",
        path: "/box/price",
        component: Boxes,
      },
    ],
  },
  {
    name: "Fund",
    icon: <AccountBalanceWallet />,
    scope: "FUND_READ",
    routes: [
      {
        name: "Deposits",
        path: "/fund/deposits",
        component: DepositHistory,
        // scope: "FUND_FULL",
      },
      {
        name: "Withdraws",
        path: "/fund/withdraws",
        component: WithdrawHistory,
        // scope: "FUND_FULL",
      },
      {
        name: "Pending withdrawals",
        path: "/fund/pending-withdraws",
        component: PendingWithdraws,
        // scope: "FUND_FULL",
      },
      {
        name: "Approved withdrawals",
        path: "/fund/approved-withdraws",
        component: ApprovedWithdraws,
        // scope: "FUND_FULL",
      },
      {
        name: "Coins",
        path: "/fund/coins",
        component: CoinList,
        scope: "COIN_FULL",
      },
      {
        name: "Logs",
        path: "/fund/logs",
        component: FundLogs,
        // scope: "FUND_FULL",
      },
    ],
  },
  {
    name: "Minting Box",
    icon: <Star />,
    scope: "ADMIN_FULL",
    routes: [
      {
        name: "Products",
        component: MintingBoxProducts,
        path: "/minting-box/products",
      },
      {
        name: "Transactions",
        component: MintingBoxTransactions,
        path: "/minting-box/boxes",
      },
    ],
  },
  {
    name: "Transactions",
    icon: <HistoryIcon />,
    scope: "ADMIN_FULL",
    component: Transactions,
    path: "/transactions",
  },
  {
    name: "Affiliate Commission",
    icon: <Grain />,
    scope: "ADMIN_FULL",
    component: AffiliateCommission,
    path: "/affiliate-commission",
  },

  {
    name: "Contracts",
    icon: <GavelIcon />,
    scope: "ADMIN_FULL",
    component: Contracts,
    path: "/contracts",
  },
  {
    name: "Role",
    icon: <FormatListBulletedIcon />,
    isBreak: true,
    component: RoleList,
    path: "/role",
    scope: "ROLE_FULL",
  },
  {
    name: "Administrator",
    icon: <SupervisorAccountIcon />,
    component: AdminList,
    path: "/administrator",
    scope: "ADMIN_FULL",
  },
  {
    name: "Setting",
    icon: <Settings />,
    routes: [
      {
        name: "Google authenticator",
        path: "/setting/google-authenticator",
        component: GoogleAuthenticator,
      },
      {
        name: "Change password",
        path: "/setting/change-password",
        component: ChangePassword,
      },
    ],
  },
  {
    name: "Upload",
    icon: <CloudUpload />,
    component: S3Component,
    path: "/upload",
    scope: "ADMIN_FULL",
  },
];

export default function Main() {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const { admin } = useSelector((state) => state);
  const { profile } = admin;

  const _handleDrawerOpen = () => {
    setOpen(true);
  };

  const _handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(_getProfile());
  }, [dispatch]);

  return profile ? (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar open={open} _handleDrawerOpen={_handleDrawerOpen} />
        <Sidebar
          routes={routes}
          _handleDrawerClose={_handleDrawerClose}
          _handleDrawerOpen={_handleDrawerOpen}
          open={open}
        />
        <Content routes={routes} />
      </div>
      {/* <RequireForAdmin /> */}
    </Router>
  ) : (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
      }}
    >
      <CircularProgress style={{ margin: "auto" }} />
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));
