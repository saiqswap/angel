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
import HdrStrongIcon from "@material-ui/icons/HdrStrong";
import HistoryIcon from "@material-ui/icons/History";
import InboxIcon from "@material-ui/icons/Inbox";
import PersonIcon from "@material-ui/icons/Person";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
import ViewComfyIcon from "@material-ui/icons/ViewComfy";
import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppBar from "../components/AppBar";
import Content from "../components/Content";
import CurrentUserProfile from "../components/CurrentUserProfile";
import Sidebar from "../components/Sidebar";
import AdminList from "./AdminList";
import AffiliateCommission from "./AffiliateCommission";
import AppConfigs from "./AppConfigs";
import Boxes from "./Boxes";
import Contracts from "./Contracts";
import RoleList from "./RoleList";
import S3Component from "./S3Component";
import Transactions from "./Transactions";
import AirdropBox from "./airdrop/AirdropBox";
import AirdropToken from "./airdrop/AirdropToken";
import BoxList from "./box/BoxList";
import BoxRate from "./box/BoxRate";
import CoinList from "./fund/CoinList";
import FundLogs from "./fund/FundLogs";
import WithdrawHistory from "./fund/WithdrawHistory";
import MintingBoxCombo from "./minting-box/MintingBoxCombo";
import MintingBoxExport from "./minting-box/MintingBoxExport";
import MintingBoxProducts from "./minting-box/MintingBoxProducts";
import MintingBoxPushSold from "./minting-box/MintingBoxPushSold";
import MintingBoxSetting from "./minting-box/MintingBoxSetting";
import MintingBoxTransactions from "./minting-box/MintingBoxTransactions";
import Equipment from "./nft/Equipment";
import NFTs from "./nft/NFTs";
import NewTemplates from "./nft/NewTemplates";
import RI from "./nft/RI";
import RIConfig from "./r-i/RIConfig";
import RIReward from "./r-i/RIReward";
import ChangePassword from "./setting/ChangePassword";
import GoogleAuthenticator from "./setting/GoogleAuthenticator";
import StakingConfig from "./staking/StakingConfig";
import StakingList from "./staking/StakingList";
import NFTItemsToING from "./swap/NFTItemsToING";
import NFTItemsToINGLogs from "./swap/NFTToINGLogs";
import SwapConfig from "./swap/SwapConfig";
import MemberCount from "./user/MemberCount";
import UserList from "./user/UserList";
const routes = [
  //ri
  {
    name: "Staking",
    icon: <HdrStrongIcon />,
    scope: "",
    routes: [
      {
        name: "List",
        path: "/staking/list",
        component: StakingList,
        // scope: "FUND_FULL",
      },
      {
        name: "Config",
        path: "/staking/config",
        component: StakingConfig,
        // scope: "FUND_FULL",
      },
    ],
  },
  //ri
  {
    name: "R-I",
    icon: <ViewComfyIcon />,
    scope: "",
    routes: [
      {
        name: "Factory Config",
        path: "/r-i/config",
        component: RIConfig,
        // scope: "FUND_FULL",
      },
      {
        name: "Reward Config",
        path: "/r-i/reward-config",
        component: RIReward,
        // scope: "FUND_FULL",
      },
    ],
  },
  {
    name: "Affiliate Commission",
    icon: <Grain />,
    scope: "ADMIN_FULL",
    component: AffiliateCommission,
    path: "/affiliate-commission",
  },
  // airdrop
  {
    name: "Airdrop",
    icon: <Share />,
    scope: "ADMIN_FULL",
    routes: [
      {
        name: "Box",
        component: AirdropBox,
        path: "/airdrop/box",
      },
      {
        name: "Token",
        component: AirdropToken,
        path: "/airdrop/token",
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
  //contracts
  {
    name: "Contracts",
    icon: <GavelIcon />,
    scope: "ADMIN_FULL",
    component: Contracts,
    path: "/contracts",
  },
  //fund
  {
    name: "Fund",
    icon: <AccountBalanceWallet />,
    scope: "FUND_READ",
    routes: [
      // {
      //   name: "Deposits",
      //   path: "/fund/deposits",
      //   component: DepositHistory,
      //   // scope: "FUND_FULL",
      // },
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
        name: "Combos",
        component: MintingBoxCombo,
        path: "/minting-box/combo",
      },
      {
        name: "Transactions",
        component: MintingBoxTransactions,
        path: "/minting-box/transactions",
      },
      {
        name: "Settings",
        component: MintingBoxSetting,
        path: "/minting-box/settings",
      },
      {
        name: "Sold Job",
        component: MintingBoxPushSold,
        path: "/minting-box/sold-job",
      },
      {
        name: "Export",
        component: MintingBoxExport,
        path: "/minting-box/export",
      },
    ],
  },
  // // airdrop
  // {
  //   name: "INO",
  //   icon: <TelegramIcon />,
  //   scope: "ADMIN_FULL",
  //   routes: [
  //     {
  //       name: "List",
  //       component: INOList,
  //       path: "/ino/list",
  //     },
  //     {
  //       name: "Whitelist",
  //       component: Whitelist,
  //       path: "/ino/Whitelist",
  //     },
  //   ],
  // },
  {
    name: "Transactions",
    icon: <HistoryIcon />,
    scope: "ADMIN_FULL",
    component: Transactions,
    path: "/transactions",
  },
  //swap
  {
    name: "Swap",
    icon: <SwapHorizIcon />,
    routes: [
      {
        name: "Asset to asset Config",
        path: "/swap/config",
        component: SwapConfig,
      },
      {
        name: "NFT items to ING lock config",
        path: "/swap/nft-items-to-ing",
        component: NFTItemsToING,
      },
      {
        name: "Logs",
        path: "/swap/nft-items-to-ing-logs",
        component: NFTItemsToINGLogs,
      },
    ],
  },
];

const subRoutes = [
  {
    name: "Role",
    icon: <FormatListBulletedIcon />,
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
        name: "Swap KT Raon configs",
        path: "/setting/swap-ktraon-configs",
        component: AppConfigs,
      },

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
          routes={routes.sort((a, b) => a.name.localeCompare(b.name))}
          subRoutes={subRoutes.sort((a, b) => a.name.localeCompare(b.name))}
          _handleDrawerClose={_handleDrawerClose}
          _handleDrawerOpen={_handleDrawerOpen}
          open={open}
        />
        <Content routes={routes} subRoutes={subRoutes} />
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
