const { utils } = require("ethers");
// Number || String: shortNumber

export const index = {
  convertShortToLongNumber: (shortNumber) => {
    return utils.parseEther(Number(shortNumber).toString()).toString();
  },
  // BigNumber: longNumber
  convertLongToShortNumber: (longNumber) => {
    return Number(utils.formatEther(longNumber));
  },
  convertOutput: async (arrData, arrParseToShort) => {
    if (arrData.length === 0) return [];
    else {
      const parseKeys = Object.keys(arrData[0]);
      const arrKeys = parseKeys.slice(
        parseKeys.length / 2,
        parseKeys.length + 1
      );
      const rsData = await arrData.map((record) => {
        let tempData = {};
        arrKeys.map(async (key) => {
          let tempValue = record[key];
          if (arrParseToShort.indexOf(key) >= 0) {
            tempValue = this.convertLongToShortNumber(record[key]);
          }
          if (Array.isArray(tempValue)) {
            // console.log("222",tempValue);
            tempValue = await this.convertOutput(tempValue, arrParseToShort);
          }
          tempData[key] =
            typeof tempValue === "boolean" || Array.isArray(tempValue)
              ? tempValue
              : tempValue.toString();
        });
        return tempData;
      });
      return rsData;
    }
  },
  // get transaction receipt by txHash
  getReceiptFromTxHash: async (provider, txHash) => {
    return new Promise(async (resolve, reject) => {
      try {
        const receipt = await provider.waitForTransaction(txHash);
        // If status = 1 is success
        if (receipt.status === 1) {
          const gasPrice = await provider.getGasPrice();
          // Get real gas used
          const realGasUsed = utils.formatEther(receipt.gasUsed.mul(gasPrice));
          // Set data return to object dataResult
          const dataResult = {
            txHash: receipt.transactionHash,
            txFee: realGasUsed,
            isSuccess: true,
          };
          resolve(dataResult);
        }
        resolve({ isSuccess: false });
      } catch (error) {
        reject(error);
      }
    });
  },
  parseEthereumError: (exception) => {
    // console.log(exception);
    let objErr = {};
    let errorMessage = exception.toString();
    if (exception.tx) {
      if (exception.error.error.body) {
        objErr = JSON.parse(exception.error.error.body);
        errorMessage = objErr.error.message;
      } else {
        errorMessage = exception.reason;
      }
    } else if (exception.method && !exception.errorArgs) {
      if (exception.error) {
        objErr = JSON.parse(exception.error.body);
        errorMessage = objErr.error.message;
      } else {
        errorMessage = `[Smartcontract check] Address not found on chain`;
      }
    } else if (
      exception.argument ||
      exception.errorArgs ||
      exception.requestBody ||
      exception.code
    ) {
      if (exception.argument || exception.requestBody || exception.code) {
        errorMessage = `[Blockchain format check] ${
          exception.reason ? exception.reason : "Query for non exist data"
        }`;
      } else {
        errorMessage = `[Smartcontract check] ${exception.reason}`;
      }
    } else if (Object.keys(exception).length == 0) {
      errorMessage = `[Self check] ${errorMessage}`;
    } else {
      errorMessage = "Unknown error";
    }
    const modifyErrorMessage = errorMessage.replace(
      "execution reverted:",
      "[Smartcontract check]"
    );
    return modifyErrorMessage;
  },
};
