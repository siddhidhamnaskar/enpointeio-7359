import {Route,Routes} from "react-router-dom"
import App from "../App"
// import PrivateRoute from "./PrivateRoutes"
import Transactions from "./Transactions"
import Signup from "./Signup"
import Accounts from "./Accounts"
import UserTransTable from "./transDetails"

export default function Allroutes(){
    return <>

      <Routes>
         <Route path="/" element={<App/>}></Route>
         <Route path="/transactions" element={<Transactions/>}></Route>
         <Route path="/signup" element={<Signup/>}></Route>
         <Route path="/accounts" element={<Accounts/>}></Route>
         <Route path="/trans/:id" element={<UserTransTable/>}></Route>

      </Routes>
    </>
}