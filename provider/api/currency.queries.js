import Call from "../../utils/call";

export const getCurrency = async (data) => {
  try {
    const res = await Call("GET", `crypto/prices/${data}`);
    if (res.success) {
      return res;
    }
    return;
  } catch (err) {
    console.error(err);
    return;
  }
};


export const getCrypto = async () => {
  try {
    const res = await Call("GET", `crypto`);
    if (res.success) {
      return res;
    }
    return;
  } catch (err) {
    console.error(err);
    return;
  }
};



//de criptomoneda a dinero
export const getPriceCurrency = async (payload, idCountry) => {

  const { currency, crypto, quantity, typeTrasaction } = payload
  console.log(payload)
  try {
    const res = await Call("GET", `crypto/price/${currency}/${crypto}/${quantity}/${typeTrasaction}/${idCountry}`);
    console.log(res);
    if (res.success) {

      return res;
    }
    return;
  } catch (err) {
    console.error(err);
    return;
  }
};



//de dinero a criptomoneda
export const getPriceCurrencyInverse = async (payload, idCountry) => {
  const { currency, crypto, quantity, typeTrasaction } = payload

  console.log(payload)
  try {
    const res = await Call("GET", `crypto/price-money/${currency}/${crypto}/${quantity}/${typeTrasaction}/${idCountry}`);
    if (res.success) {
      console.log(res);
      return res;

    }
    return;
  } catch (err) {
    console.error(err);
    return;
  }
};


//de dinero a criptomoneda
export const getGiroPrice = async (payload, idCountry) => {
  const { currency, crypto, quantity, typeTrasaction } = payload

  console.log(quantity)
  try {
    const res = await Call("GET", `crypto/price-giro/${currency}/${crypto}/${quantity}/${idCountry}/?purchaseType=${'giro'}`);
    if (res.success) {
      console.log(res);
      return res;

    }
    return;
  } catch (err) {
    console.error(err);
    return;
  }
};




export const getAllPriceCurrency = async (currency, idCountry) => {

  try {
    const res = await Call("GET", `crypto/price/home/${currency}/${idCountry}`);
    if (res.success) {
      return res;
    }
    return;
  } catch (err) {
    console.error(err);
    return;
  }
};