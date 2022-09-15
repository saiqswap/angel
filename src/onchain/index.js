import { ethers } from "ethers";
import { parseUnits } from "ethers/lib/utils";
import { toast } from "react-toastify";
import { formatNumber } from "../settings/format";
import { EscrowVesting } from "./blockchain/Escrow_Vesting";
import presaleConfig from "./presale-config";
const common = require("./utils/common");

const ESCROW_VESTING = new EscrowVesting(
  presaleConfig.NODE_RPC_URL,
  presaleConfig.ESCROW_VESTING_CONTRACT_ADDRESS
);

export const _getPreSaleRounds = async (_callback) => {
  try {
    const roundList = [];
    // ------ get list round ------
    const arrRounds = await ESCROW_VESTING.getListRound();

    for (let roundId of arrRounds) {
      // get detail round
      const roundsInput = {
        roundId,
      };
      const onchainDetailRound = await ESCROW_VESTING.getRound(roundsInput);
      const getVestingInfo = await ESCROW_VESTING.getVestingInfo(roundsInput);
      roundList.push({ ...onchainDetailRound, ...getVestingInfo[0] });
    }
    _callback(roundList);
  } catch (error) {
    _showError(error);
  }
};

export const _showError = (error) => {
  toast.error(common.parseEthereumError(error));
};

export const _updateRoundDetail = async (data, _handleSuccess, _handleFail) => {
  // ------ create or update round ------
  try {
    const signerOwner_privatekey =
      "172e30ccbf4f740aae885b7b9eb6120a2009b25055c7234150ea96473183d267";
    const signerOwner = new ethers.Wallet(
      signerOwner_privatekey,
      ESCROW_VESTING.provider
    );
    const executeRoundInput = {
      roundId: data.roundId,
      projectId: data.projectId,
      tokenSaleAddress: data.tokenSaleAddress,
      minUSD: parseUnits(formatNumber(data.minUSD, 4), 18),
      startAt: parseInt(data.startAt),
      endAt: parseInt(data.endAt),
      isPause: false,
      signer: signerOwner,
    };
    const vestingInfo = {
      vestingId: data.roundId,
      vestingToken: data.tokenSaleAddress,
      TGETime: data.TGETime,
      TGEUnlockPercent: data.TGEUnlockPercent,
      cliffMonths: data.cliffMonths,
      linearVestingPercentPerMonth: data.linearVestingPercentPerMonth,
    };
    const txExecuteRound = await ESCROW_VESTING.executeRound(
      executeRoundInput,
      vestingInfo,
      signerOwner
    );
    const rsExecuteRound = await common.getReceiptFromTxHash(
      ESCROW_VESTING.provider,
      txExecuteRound.hash
    );
    console.log("ESCROW_VESTING.executeRound: ", rsExecuteRound);
    _handleSuccess();
  } catch (error) {
    _handleFail();
    _showError(error);
  }
};
