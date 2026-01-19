import { Outlet } from "react-router-dom";
import AccountNavbar from '../sections/accountNavbar/AccountNavbar'

const AccountLayout = () => {
    return (
        <>
        <AccountNavbar />
        <Outlet />
        </>
    )
    }
 
export default AccountLayout
