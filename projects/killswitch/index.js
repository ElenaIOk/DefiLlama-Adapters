const utils = require("../helper/utils");

const tvlUrl = "https://api.killswitch.finance/ksw/tvl";

function fetchChain(chain) {
  return async () => {
    const response = await utils.fetchURL(tvlUrl);

    let tvl = Number(response.data.summary[chain]);
    if (tvl === 0) {
      throw new Error(`chain ${chain} tvl is 0`);
    }

    console.log("tvl", tvl);
    return tvl;
  };
}

async function fetch() {
  const response = await utils.fetchURL(tvlUrl);

  let tvl = 0;
  for (chain in response.data.summary) {
    tvl += Number(response.data.summary[chain]);
  }
  if (tvl === 0) {
    throw new Error("tvl is 0");
  }

  return tvl;
}

module.exports = {
  bsc: {
    fetch: fetchChain("bsc"),
  },
  kcc: {
    fetch: fetchChain("kcc"),
  },
  fetch,
};
