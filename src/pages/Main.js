import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import {
  AccountBalanceWallet,
  CloudUpload,
  Grain,
  Settings,
  Share,
  Star,
} from "@material-ui/icons";
import DvrIcon from "@material-ui/icons/Dvr";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import GavelIcon from "@material-ui/icons/Gavel";
import HistoryIcon from "@material-ui/icons/History";
import InboxIcon from "@material-ui/icons/Inbox";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import PersonIcon from "@material-ui/icons/Person";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppBar from "../components/AppBar";
import Content from "../components/Content";
import CurrentUserProfile from "../components/CurrentUserProfile";
import Sidebar from "../components/Sidebar";
import AdminList from "./AdminList";
import AffiliateCommission from "./AffiliateCommission";
import BoxByType from "./airdrop/BoxByType";
import BoxByTypeAndTier from "./airdrop/BoxByTypeAndTier";
import BoxList from "./box/BoxList";
import BoxRate from "./box/BoxRate";
import Boxes from "./Boxes";
import Contracts from "./Contracts";
import CoinList from "./fund/CoinList";
import DepositHistory from "./fund/DepositHistory";
import FundLogs from "./fund/FundLogs";
import WithdrawHistory from "./fund/WithdrawHistory";
import INOList from "./ino/INOList";
import Whitelist from "./ino/Whitelist";
import MintingBoxCombo from "./minting-box/MintingBoxCombo";
import MintingBoxProducts from "./minting-box/MintingBoxProducts";
import MintingBoxTransactions from "./minting-box/MintingBoxTransactions";
import Equipment from "./nft/Equipment";
import NewTemplates from "./nft/NewTemplates";
import NFTs from "./nft/NFTs";
import RI from "./nft/RI";
import PresaleSetting from "./PresaleSetting";
import RoleList from "./RoleList";
import S3Component from "./S3Component";
import ChangePassword from "./setting/ChangePassword";
import GoogleAuthenticator from "./setting/GoogleAuthenticator";
import Transactions from "./Transactions";
import MemberCount from "./user/MemberCount";
import UserList from "./user/UserList";
import TelegramIcon from "@material-ui/icons/Telegram";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { _getMintingBoxes } from "../actions/adminActions";

const routes = [
  //user
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
      {
        name: "Member count",
        path: "/user/member-count",
        component: MemberCount,
      },
    ],
  },
  //nft
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
  //box
  {
    name: "Box",
    icon: <InboxIcon />,
    routes: [
      { name: "List", path: "/box/list", component: BoxList },
      { name: "Box Rate", path: "/box/rate", component: BoxRate },
      {
        name: "Box Price",
        path: "/box/price",
        component: Boxes,
      },
    ],
  },
  //fund
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
      // {
      //   name: "Pending withdrawals",
      //   path: "/fund/pending-withdraws",
      //   component: PendingWithdraws,
      //   // scope: "FUND_FULL",
      // },
      // {
      //   name: "Approved withdrawals",
      //   path: "/fund/approved-withdraws",
      //   component: ApprovedWithdraws,
      //   // scope: "FUND_FULL",
      // },
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
    // scope: "AIRDROP_WRITE_SUPPORT",
    routes: [
      {
        name: "Products",
        component: MintingBoxProducts,
        path: "/minting-box/products",
      },
      {
        name: "Combo",
        component: MintingBoxCombo,
        path: "/minting-box/combo",
      },
      {
        name: "Transactions",
        component: MintingBoxTransactions,
        path: "/minting-box/boxes",
      },
    ],
  },
  // airdrop
  {
    name: "Airdrop",
    icon: <Share />,
    scope: "ADMIN_FULL",
    routes: [
      {
        name: "Box",
        component: BoxByType,
        path: "/airdrop/box-by-type",
      },
      {
        name: "Box With Tier",
        component: BoxByTypeAndTier,
        path: "/airdrop/box-by-type-and-tier",
      },
    ],
  },
  // airdrop
  {
    name: "INO",
    icon: <TelegramIcon />,
    scope: "ADMIN_FULL",
    routes: [
      {
        name: "List",
        component: INOList,
        path: "/ino/list",
      },
      {
        name: "Whitelist",
        component: Whitelist,
        path: "/ino/Whitelist",
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
  // {
  //   name: "Presale Setting",
  //   icon: <MonetizationOnIcon />,
  //   component: PresaleSetting,
  //   path: "/presale-setting",
  //   scope: "ADMIN_FULL",
  // },
];

export default function Main() {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(_getMintingBoxes());
  }, [dispatch]);

  const _handleDrawerOpen = () => {
    setOpen(true);
  };

  const _handleDrawerClose = () => {
    setOpen(false);
  };

  return (
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
      <CurrentUserProfile />
    </Router>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));
