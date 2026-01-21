import { Outlet } from "react-router-dom";
import AccountNavbar from '../sections/adminNavbar/AdminNavbar'

const AccountLayout = () => {
    return (
        <>
        <AccountNavbar />
        <Outlet />
        </>
    )
    }
 
export default AccountLayout
