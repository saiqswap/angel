import SearchHigherComponent from "../../components/SearchHigherComponent";
import { ENDPOINT_NEWS_FEED } from "../../constants/endpoint";
import { Filter } from "../../settings";

const columns = [
  {
    key: "token_id",
    label: "ID",
    isFeedToken: true,
  },
  {
    key: "owner_of",
    label: "Owner address",
    isAddress: true,
  },
  // {
  //   key: "content",
  //   label: "Short content",
  //   isContent: true,
  // },
  // {
  //   key: "images",
  //   label: "Image counter",
  //   isCount: true,
  // },
  // {
  //   key: "totalDonate",
  //   label: "Total donate",
  //   isAmount: true,
  // },
  // {
  //   key: "commentCount",
  //   label: "Total comment",
  //   isAmount: true,
  // },
  // {
  //   key: "createdTime",
  //   label: "Created time",
  //   isTime: true,
  // },
];

const filterBy = [
  new Filter({
    key: "account",
    type: "input",
    text: "Owner",
  }),
];

export default SearchHigherComponent({
  endpoint: ENDPOINT_NEWS_FEED,
  title: "News feed",
  columns,
  filterBy,
  isUserAPI: true,
});
