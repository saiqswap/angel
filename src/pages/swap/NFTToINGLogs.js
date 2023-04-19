import SearchHigherComponent from "../../components/SearchHigherComponent";
import {
    ENDPOINT_NFT_TO_ING_LOGS
} from "../../constants/endpoint";
import { Filter } from "../../settings";
const columns = [
  {
    key: "userAddress",
    label: "Address",
    isOwnerAddress: true,
    userId: "userId",
  },
  {
    key: "tokenId",
    label: "Token Id",
  },
  {
    key: "inglAmount",
    label: "Amount (ING Lock)",
    isAmount: true,
  },
  {
    key: "createdTime",
    label: "Time",
    isTime: true,
  },
];

export default function NFTItemsToINGLogs(props) {
  const Component = new SearchHigherComponent({
    ...props,
    endpoint: ENDPOINT_NFT_TO_ING_LOGS,
    columns,
    title: "NFTs to INGL logs",
    filterBy: [
      new Filter({
        key: "userAddress",
        type: "input",
        text: "Wallet address",
      }),
      new Filter({
        key: "tokenId",
        type: "input",
        text: "Token ID",
      }),
    ],
  });

  return <Component />;
}
