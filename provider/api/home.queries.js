import Call from "../../utils/call";



export const getCountry = async () => {
  try {
    const res = await Call("GET", "config/countries");
    if (res.success) {
      return res;
    }
    return;
  } catch (err) {
    console.error(err);
    return;
  }
};



export const getPurchaseAndSale = async () => {
  try {
    const res = await Call("GET", "/purchase/report-me", null, 1);
    if (res.success) {
      return res;
    }
    return;
  } catch (err) {
    console.error(err);
    return;
  }
};


export const getNotification = async () => {

  try {
    const res = await Call("GET", `notification/me/${1}/${5}`, null, 1);
    if (res.success) {
      return res;
    }
    return;
  } catch (err) {
    console.error(err);
    return;
  }
};


export const SendContact = async (payload) => {
  try {
    if (!payload) throw "SignUp data must be provided";
    const res = await Call("POST", `user/contact`, payload);

    if (res) {
      return res;
    }
    return false;
  } catch (err) {
    console.error(err);
    return false;
  }
}


export const getBankColombia = async () => {

  try {
    const res = await Call("GET", `/purchase/banks`, null);

    if (res.success) {
      return res;
    }
    return;
  } catch (err) {
    console.error(err);
    return;
  }
};

export const getCountryRegister = async () => {

  try {
    const res = await Call("GET", `config/countries/${true}`, null);

    if (res.success) {
      return res;
    }
    return;
  } catch (err) {
    console.error(err);
    return;
  }
};

export const getSucursal = async (country) => {

  try {
    const res = await Call("GET", `config/branch?country=${country}`, null);

    if (res.success) {
      return res;
    }
    return;
  } catch (err) {
    console.error(err);
    return;
  }
};


export const getCities = async (country) => {

  try {
    const res = await Call("GET", `config/cities/${country}`, null);

    if (res.success) {
      return res;
    }
    return;
  } catch (err) {
    console.error(err);
    return;
  }
};



