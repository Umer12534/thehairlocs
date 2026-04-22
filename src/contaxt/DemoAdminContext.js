import { createContext, useContext } from "react";

const DemoAdminContext = createContext(false);

export const useDemoAdmin = () => useContext(DemoAdminContext);

export default DemoAdminContext;
