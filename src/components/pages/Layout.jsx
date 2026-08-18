import { Outlet } from "react-router-dom";
//import Landing from "../login/Landing";
const Layout = () => {
    return(
        <main className="App">
            <Outlet/>
        </main>
    );
}

export default Layout;