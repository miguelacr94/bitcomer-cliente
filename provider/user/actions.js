// import Cookies from '@/utils/cookies'
// import Call from '@/utils/call'

import Call from "../../utils/call"
import Cookies from "../../utils/cookies"

export const loginUser = async (data) => {
  try {
    const res = await Call('POST', '/auth/login', data)
    Cookies.set('ssid', res.token)
    if (res.success) {
      return res
    }
    return
  } catch (err) {
    console.error(err)
    return
  }
}
export const getData = async () => {
  try {
    const token = Cookies.read('ssid')
    if (token) {
      const res = await Call('GET', '/user/me', token)
      if (res.success) {

        return res.user
      }
    }
    return
  } catch (err) {
    console.error(err)
    return
  }
}



export const resetPassword = async (data) => {
  try {
    const res = await Call('GET', `/auth/restore/password/${data}`)
    if (res) {
      return res
    }
    return
  } catch (err) {
    console.error(err)
    return
  }
}



export const SendNewPassword = async (data) => {

  try {
    const res = await Call('PUT', `/auth/restore/password/`, data)
    if (res) {
      return res
    }
    return
  } catch (err) {
    console.error(err)
    return
  }
}


export const updateUser = async (data) => {
  console.log(JSON.stringify(data))
  try {
    const res = await Call('PUT', '/user/update', data, 1, 1);
    if (res) {
      return res;
    }
    return
  } catch (err) {
    console.error(err);
    return
  }
}

export const deleteAccount = async () => {

  try {
    const res = await Call('DELETE', '/user/remove', null, 1);
    if (res) {
      return res;
    }
    return
  } catch (err) {
    console.error(err);
    return
  }
}





export const logout = () => {
  try {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    localStorage.removeItem('purchase');

    return true
  } catch (err) {
    console.error(err)
    return false
  }


}


export const sendMessage = async (data) => {

  try {
    const res = await Call('POST', '/chat/send', data, 1, 1)

    if (res.success) {
      return res
    }
    return
  } catch (err) {
    console.error(err)
    return
  }
}

