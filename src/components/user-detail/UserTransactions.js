import { Grid, Tab, Tabs } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import React, { useState } from "react";
import BoxList from "../../pages/box/BoxList";
import FundLogs from "../../pages/fund/FundLogs";
import WithdrawHistory from "../../pages/fund/WithdrawHistory";
import NFTs from "../../pages/nft/NFTs";
import StakingList from "../../pages/staking/StakingList";
import Transactions from "../../pages/Transactions";

export default function UserTransaction({ userId, userAddress }) {
  const [tab, setTab] = useState(0);

  const menus = [
    // {
    //   title: "Referrals",
    //   component: <Referrals />,
    // },
    // {
    //   title: "Balances",
    //   component: <Balances />,
    // },
    {
      title: "Items",
      component: <NFTs isProfile={true} userAccount={userAddress} />,
    },
    {
      title: "Box",
      component: <BoxList isProfile={true} ownerAddress={userAddress} />,
    },
    {
      title: `Transactions`,
      component: <Transactions isProfile={true} profileUserId={userId} />,
    },
    {
      title: `Staking`,
      component: <StakingList isProfile={true} profileUserId={userId} />,
    },
    {
      title: "Logs",
      component: <FundLogs isProfile={true} profileUserId={userId} />,
    },
    // {
    //   title: "Deposit",
    //   component: <DepositHistory isProfile={true} profileUserId={userId} />,
    // },
    {
      title: "Withdraw/Transfer",
      component: <WithdrawHistory isProfile={true} profileUserId={userId} />,
    },
    // {
    //   title: `Affiliate Commission`,
    //   component: <AffiliateCommission />,
    // },
  ];

  const _handleChange = (e, value) => setTab(value);

  return (
    <Grid item xs={12}>
      <AppBar position="static" color="default" variant="outlined">
        <Tabs
          value={tab}
          onChange={_handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {menus.map((item, index) => (
            <Tab key={index} label={item.title} value={index}></Tab>
          ))}
        </Tabs>
      </AppBar>
      {menus[tab].component}
    </Grid>
  );
}
