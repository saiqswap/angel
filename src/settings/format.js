import { Icon, IconButton } from "@material-ui/core";
import { FileCopy } from "@material-ui/icons";
import { toast } from "react-toastify";

function formatBigMoney(str) {
  const num = Math.abs(Number(str));
  let result;
  if (num >= 1.0e9) {
    // Nine Zeroes for Billions
    const decimal = Math.floor((num - Math.floor(num / 1.0e9) * 1.0e9) / 1.0e7);
    result =
      Math.floor(num / 1.0e9) +
      "." +
      (decimal > 9 ? decimal : "0" + decimal) +
      "B";
  } else {
    if (num >= 1.0e6) {
      // Six Zeroes for Millions
      const decimal = Math.floor(
        (num - Math.floor(num / 1.0e6) * 1.0e6) / 1.0e4
      );
      result =
        Math.floor(num / 1.0e6) +
        "." +
        (decimal > 9 ? `${decimal}` : `0${decimal}`) +
        "M";
    } else {
      if (num >= 1.0e3) {
        // Three Zeroes for Thousands
        result = Math.floor(num / 1.0e3) + "K";
      }
    }
  }
  return result;
}
// module.exports = {
//   formatAmountInput: (str) => {
//     str += "";
//     const deleteText = str.replace(/[^\d.]/g, ""); //clear text
//     const x = deleteText.split(".");
//     let x1 = x[0];
//     const x2 = x[1];
//     const x3 = x.length > 1 ? "." + x2.slice(0, 8) : "";
//     if (!x1) x1 = "0";
//     let result = (x1 + x3).replace(/^0+(?!\.|$)/, "").replace(/^\./, "");
//     return result;
//   },
//   formatMoney: (str) => {
//     str += "";
//     const deleteText = str.replace(/[^\d.]/g, ""); //clear text
//     const x = deleteText.split(".");
//     let x1 = x[0];
//     const x2 = x[1];
//     const x3 = x.length > 1 ? "." + x2.slice(0, 2) : "";
//     if (!x1) x1 = "0";
//     const rgx = /(\d+)(\d{3})/;
//     while (rgx.test(x1)) {
//       x1 = x1.replace(rgx, "$1,$2");
//     }
//     let result = (x1 + x3).replace(/^0+(?!\.|$)/, "").replace(/^\./, "");
//     return result;
//   },
//   deleteText: (str) => {
//     str += "";
//     const deleteText = str.replace(/[^\d.]/g, ""); //clear text
//     return deleteText;
//   },
//   formatDate: (time) => {
//     const temp = new Date(time);
//     var dateString =
//       temp.getFullYear() +
//       "-" +
//       ("0" + (temp.getMonth() + 1)).slice(-2) +
//       "-" +
//       ("0" + temp.getDate()).slice(-2);
//     return dateString;
//   },
//   formatTime: (time) => {
//     const temp = new Date(time);
//     var dateString =
//       temp.getFullYear() +
//       "-" +
//       ("0" + (temp.getMonth() + 1)).slice(-2) +
//       "-" +
//       ("0" + temp.getDate()).slice(-2) +
//       " " +
//       ("0" + temp.getHours()).slice(-2) +
//       ":" +
//       ("0" + temp.getMinutes()).slice(-2) +
//       ":" +
//       ("0" + temp.getSeconds()).slice(-2);
//     return dateString;
//   },
// };

export function formatAddress(string, length = 10) {
  if (string)
    return (
      <>
        {string.length > length * 2
          ? string.slice(0, length) +
            "..." +
            string.slice(string.length - length)
          : string}
        <IconButton
          onClick={() => {
            toast.success("Copied");
            navigator.clipboard.writeText(string);
          }}
          size="small"
        >
          <FileCopy fontSize="small" />
        </IconButton>
      </>
    );
  else return "--/--";
}

export function getLinkHash(data) {
  if (data) {
    const { type, network, txId } = data;
    if (txId) {
      if (type === "EXTERNAL") {
        let address = null;
        if (network === "TRC20") {
          address = `https://tronscan.org/#/transaction/${txId}`;
        }
        if (network === "ERC20" || network === "ETH") {
          address = `https://etherscan.io/tx/${txId}`;
        }
        if (network === "BTC") {
          address = `https://www.blockchain.com/btc/tx/${txId}`;
        }
        return (
          <>
            <a href={address} target="_blank" rel="noreferrer">
              {data.txId.slice(0, 10) +
                "..." +
                data.txId.slice(data.txId.length - 10)}
            </a>
            <Icon
              name="copy outline"
              onClick={() => {
                toast.success("Copied");
                navigator.clipboard.writeText(txId);
              }}
              style={{
                cursor: "pointer",
                fontSize: "1.2em",
                marginLeft: 5,
                zIndex: 1001,
              }}
            />
          </>
        );
      } else {
        return formatAddress(txId);
      }
    } else return null;
  } else {
    return null;
  }
}

export function formatShortAmount(str) {
  str += "";
  let deleteText = str.replace(/[^\d.]/g, ""); //clear text
  deleteText = Math.floor(deleteText * 1.0e8) / 1.0e8;
  const x = deleteText.toString().split(".");
  let x1 = x[0];
  const x2 = x[1];
  const x3 = x.length > 1 ? "." + x2.slice(0, 8) : "";
  if (!x1) x1 = "0";
  if (x1.length > 6) {
    return formatBigMoney(x1);
  }
  const rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, "$1,$2");
  }
  let result = (x1 + x3).replace(/^0+(?!\.|$)/, "").replace(/^\./, "");
  return result;
}

export function formatAmount(str) {
  str += "";
  let deleteText = str.replace(/[^\d.]/g, ""); //clear text
  deleteText = Math.floor(deleteText * 1.0e8) / 1.0e8;
  const x = deleteText.toString().split(".");
  let x1 = x[0];
  const x2 = x[1];
  const x3 = x.length > 1 ? "." + x2.slice(0, 8) : "";
  if (!x1) x1 = "0";
  const rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, "$1,$2");
  }
  let result = (x1 + x3).replace(/^0+(?!\.|$)/, "").replace(/^\./, "");
  return result;
}

export function formatShortUSD(str) {
  str += "";
  const deleteText = str.replace(/[^\d.]/g, ""); //clear text
  const x = deleteText.split(".");
  let x1 = x[0];
  const x2 = x[1];
  const x3 = x.length > 1 ? "." + x2.slice(0, 2) : "";
  if (!x1) x1 = "0";
  if (x1.length > 6) {
    return formatBigMoney(x1);
  }
  const rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, "$1,$2");
  }
  let result = (x1 + x3).replace(/^0+(?!\.|$)/, "").replace(/^\./, "");
  return result;
}

export function formatNumber(str, length = 8) {
  str += "";
  let deleteText = str.replace(/[^\d.]/g, ""); //clear text
  deleteText = Math.floor(deleteText * 1.0e8) / 1.0e8;
  const x = deleteText.toString().split(".");
  let x1 = x[0];
  const x2 = x[1];
  const x3 = x.length > 1 ? "." + x2.slice(0, length) : "";
  if (!x1) x1 = "0";
  const rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, "$1,$2");
  }
  let result = (x1 + x3).replace(/^0+(?!\.|$)/, "").replace(/^\./, "");
  return result;
}
