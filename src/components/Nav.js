import { Link, useNavigate } from "react-router-dom"
import logo from "../assests/img/Duty dash.png"
function Nav() {
    let loggedin = localStorage.getItem('loggedin') === 'true'
    let navigate = useNavigate()
    function logouthandler() {
        localStorage.setItem('name', '')
        localStorage.setItem('loggedin', false)
        navigate('/login')
    }
    return (
        <div>
            <div className='h-full flex w-full'>
                <div className="flex items-center justify-between w-full lg:mt-[150px] lg:ml-[250px] lg:mr-[250px] md:mt-[100px] md:mr-[75px] md:ml-[75px] mt-[90px] ml-[40px] mr-[40px]">
                    <div className="flex items-center">
                        <img src={logo} className="md:h-10 md:w-10 h-5 w-5" alt="Logo" />
                        <Link to="/"><p className="font-bold md:text-4xl text-xl">uty Dash</p></Link>
                    </div>
                    <div>
                    {
                        !loggedin ?
                            <div className="">
                                <Link to='/login' className="bg-black text-white md:p-3 p-2 rounded-lg font-bold cursor-pointer md:text-xl">Login</Link>
                            </div>
                            :
                            <div>
                                <button onClick={logouthandler} className="bg-black text-white md:p-3 p-2 rounded-lg font-bold md:text-xl cursor-pointer">Logout</button>
                            </div>
                    }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Nav