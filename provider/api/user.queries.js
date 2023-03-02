

import Call from "../../utils/call";

export const registerUser = async (payload) => {
    try {
        if (!payload) throw "SignUp data must be provided";
        const res = await Call("POST", "auth/register", payload);

        if (res) {
            return res;
        }
        return false;
    } catch (err) {
        console.error(err);
        return err;
    }
};



export const getPurchaseMe = async (page, search) => {

    try {
        // if (!payload) throw "SignUp data must be provided";
        const res = await Call("GET", `purchase/me/${page}/${10}?search=${search}`, null, 1);

        if (res) {
            return res;
        }
        return false;
    } catch (err) {
        console.error(err);
        return false;
    }
};



export const Purchase = async (payload) => {

    console.log(payload);

    try {
        if (!payload) throw "SignUp data must be provided";
        const res = await Call("POST", `/purchase/create`, payload);

        if (res) {
            return res;
        }
        return false;
    } catch (err) {
        console.error(err);
        return false;
    }
};

export const sendSaleOtc = async (payload) => {
    try {
        if (!payload) throw "SignUp data must be provided";
        const res = await Call("POST", `/otc/create`, payload, 1);

        if (res) {
            return res;
        }
        return false;
    } catch (err) {
        console.error(err);
        return false;
    }
};



export const CompanyValidator = async (payload) => {
    try {
        if (!payload) throw "SignUp data must be provided";
        const res = await Call("POST", `auth/nit-validate`, payload);

        if (res) {
            return res;
        }
        return false;
    } catch (err) {
        console.error(err);
        return false;
    }
};


export const passwordUpdate = async (payload) => {
    try {
        if (!payload) throw "SignUp data must be provided";
        const res = await Call("PUT", `auth/update/password`, payload);

        if (res) {
            return res;
        }
        return false;
    } catch (err) {
        console.error(err);
        return false;
    }
};


export const getMessageMe = async (page,) => {
    try {
        // if (!payload) throw "SignUp data must be provided";
        const res = await Call("GET", `/chat/me/${1}`, null, 1);

        if (res) {
            return res;
        }
        return false;
    } catch (err) {
        console.error(err);
        return false;
    }
};

export const getOtcList = async (page, search) => {

    try {
        // if (!payload) throw "SignUp data must be provided";
        const res = await Call("GET", `/otc/me/${page}/${10}?search=${search}`, null, 1);

        if (res) {
            return res;
        }
        return false;
    } catch (err) {
        console.error(err);
        return false;
    }
};



export const getReferred = async (data) => {
    const limit = 15;
    try {
        // if (!payload) throw "SignUp data must be provided";
        const res = await Call("GET", `/user/referrals/?paid=${data}`, null, 1);

        if (res) {
            return res;

        }
        return false;
    } catch (err) {
        console.error(err);
        return false;
    }
};
export const getReferredTotal = async () => {

    try {
        // if (!payload) throw "SignUp data must be provided";
        const res = await Call("GET", `/user/referred-total`, null, 1);

        if (res) {
            return res;

        }
        return false;
    } catch (err) {
        console.error(err);
        return false;
    }
};

export const getReferredHistory = async (data) => {
    const limit = 15;
    try {
        // if (!payload) throw "SignUp data must be provided";
        const res = await Call("GET", `/user/referrals/?paid=${data}`, null, 1);

        if (res) {
            return res;

        }
        return false;
    } catch (err) {
        console.error(err);
        return false;
    }
};

export const getPaymentHistoryReferred = async (data) => {
    const limit = 15;
    try {
        // if (!payload) throw "SignUp data must be provided";
        const res = await Call("GET", `/user/vouchers`, null, 1);

        if (res) {
            return res;

        }
        return false;
    } catch (err) {
        console.error(err);
        return false;
    }
};





//   GET ssid solo admin