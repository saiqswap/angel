import SearchHigherComponent from "../../components/SearchHigherComponent";
import { EndPointConstant } from "../../constants/endpoint";
import { Filter } from "../../settings";

const columns = [
  {
    key: "packageType",
    label: "Package",
  },
  {
    key: "currency",
    label: "Asset",
  },
  {
    key: "amountToOpenSlot4",
    label: "Open Slot 4 Amount",
    isAmount: true,
  },
  {
    key: "amountToOpenSlot5",
    label: "Open Slot 5 Amount",
    isAmount: true,
  },
  {
    key: "amountToOpenSlot6",
    label: "Open Slot 6 Amount",
    isAmount: true,
  },
  {
    key: "annualInterestRate",
    label: "Interest (%)",
    isAmount: true,
  },
  {
    key: "isActive",
    label: "Active",
    isBool: true,
  },
  {
    key: "createdTime",
    label: "Created Time",
    isTime: true,
  },
  {
    key: "updatedTime",
    label: "Time",
    isTime: true,
  },
];

const createFields = [
  new Filter({
    key: "minAngels",
    type: "input",
    text: "Min Angels",
    col: 12,
    require: true,
  }),
  new Filter({
    key: "maxAngels",
    type: "input",
    text: "Max Angels",
    col: 12,
    require: true,
  }),
  new Filter({
    key: "startTime",
    type: "input",
    text: "Start Time",
    col: 12,
    require: true,
  }),
  new Filter({
    key: "endTime",
    type: "input",
    text: "End Time",
    col: 12,
    require: true,
  }),
  new Filter({
    key: "riBonusPercent",
    type: "input",
    text: "Ri Bonus Percent",
    col: 12,
    require: true,
  }),
  new Filter({
    key: "isActive",
    type: "singleCheckbox",
    text: "Active",
    col: 12,
    require: true,
  }),
];

export default function StakingConfig(props) {
  const Component = new SearchHigherComponent({
    ...props,
    endpoint: EndPointConstant.STAKING_PACKAGES,
    title: "Staking Config",
    columns,
    createFields,
    updateFields: createFields,
    createEndpoint: EndPointConstant.STAKING_PACKAGE_CREATE,
    updateEndpoint: EndPointConstant.STAKING_PACKAGE_UPDATE,
  });
  return <Component />;
}
