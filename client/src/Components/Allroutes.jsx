import {Route,Routes} from "react-router-dom"
import App from "../App"
// import PrivateRoute from "./PrivateRoutes"
import Transactions from "../Pages/Transactions"
import CustomerSignup from "../Pages/customerSignup"
import BankerSignup from "../Pages/bankerSignup"
import Accounts from "../Pages/Accounts"
import UserTransTable from "../Pages/transDetails"

export default function Allroutes(){
    return <>

      <Routes>
         <Route path="/" element={<App/>}></Route>
         <Route path="/transactions" element={<Transactions/>}></Route>
         <Route path="/customerSignup" element={<CustomerSignup/>}></Route>
         <Route path="/bankerSignup" element={<BankerSignup/>}></Route>
         <Route path="/accounts" element={<Accounts/>}></Route>
         <Route path="/trans/:id" element={<UserTransTable/>}></Route>

      </Routes>
    </>
}