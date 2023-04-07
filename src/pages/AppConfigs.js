import { Filter } from "../settings";
import SearchHigherComponent from "../components/SearchHigherComponent";

const EndpointConstant = {
  APP_CONFIGS: `/adm-api/v1/kt-raon/admin/get-configuration`,
  APP_CONFIGS_ADD: `/adm-api/v1/kt-raon/admin/create-configuration`,
  APP_CONFIGS_UPDATE: `/adm-api/v1/kt-raon/admin/update-configuration`,
};

const columns = [
  {
    key: "id",
    label: "ID",
  },
  // {
  //   key: "referralContractAddress",
  //   label: "Ref Address",
  //   isUserAddress: true,
  // },
  // {
  //   key: "referralBonus",
  //   label: "Ref Bonus",
  // },
  {
    key: "extBuyBackBurnPercent",
    label: "Buy Back Burn",
    render: (data) => <>{data.extBuyBackBurnPercent} %</>,
  },
  {
    key: "extProjectHolderPercent",
    label: "Project Holder",
    render: (data) => <>{data.extProjectHolderPercent} %</>,
  },
  {
    key: "extLockHours",
    label: "Lock Hours",
  },
  // {
  //   key: "isDeleted",
  //   label: "Is Deleted",
  //   isBool: true,
  // },
  {
    key: "creationDate",
    label: "Created Time",
    isTime: true,
  },
  {
    key: "modificationDate",
    label: "Modified Time",
    isTime: true,
  },
];

const createFields = [
  // new Filter({
  //   key: "referralContractAddress",
  //   type: "input",
  //   text: "Referral Contract Address",
  //   col: 12,
  // }),
  // new Filter({
  //   key: "referralBonus",
  //   type: "input",
  //   text: "Referral Bonus",
  //   col: 12,
  // }),
  new Filter({
    key: "extBuyBackBurnPercent",
    type: "input",
    text: "Buy Back Burn Percent",
    col: 12,
  }),
  new Filter({
    key: "extProjectHolderPercent",
    type: "input",
    text: "Project Holder Percent",
    col: 12,
  }),
  new Filter({
    key: "extLockHours",
    type: "input",
    text: "Lock Hours",
    col: 12,
  }),
  // new Filter({
  //   key: "isDeleted",
  //   type: "singleCheckbox",
  //   text: "Is deleted",
  //   col: 12,
  // }),
];

export default SearchHigherComponent({
  endpoint: EndpointConstant.APP_CONFIGS,
  method: "GET",
  title: "App Configs",
  createEndpoint: EndpointConstant.APP_CONFIGS_ADD,
  updateEndpoint: EndpointConstant.APP_CONFIGS_UPDATE,
  // updateMethod: "PUT",
  columns,
  createFields,
  updateFields: createFields,
});
