
import { useContext, useEffect } from 'react'
import { Context } from '../provider/user/context'
import Cookies from '../utils/cookies'
import { Routes } from '../utils/routes'
import Router, { useRouter } from "next/router";
import PublicMain from '../component/Layouts/PublicMain'
import Banner from '../component/Home/Banner'
import Tab from '../component/Home/TabPurchase/Tab'
import Banner2 from '../component/Home/Banner2'
import Steps from '../component/Home/Steps/Steps'
import Service from '../component/Home/Service'
import BanneApp from '../component/Home/BanneApp'
import PayMethod from '../component/Home/PayMethod'
import UserTestimonial from '../component/Home/Testimonials/UserTestimonial'
import { getData } from '../provider/user/actions'

export default function Home() {


  const { user, setUser } = useContext(Context);
  const router = useRouter();

  const loadUser = async () => {
    const token = Cookies.read("ssid");
    if (!token) {
      return router.push(Routes.index);
    }
    if (token || !user) {
      const a = await getData();
      if (a) {
        setUser(a);
        return router.push(Routes.home);
      }

    }
  }
  useEffect(() => {
    loadUser();
  }, [setUser]);



  return (
    <div className="w-full overflow-x-hidden">
      <PublicMain>
        <Banner />
        <div className='w-11/12 m-auto'>
          <Tab />
        </div>
        <Banner2 />
        <Steps />
        <Service />
        <BanneApp />
        <PayMethod />
        <UserTestimonial />
      </PublicMain>
    </div>
  )
}
