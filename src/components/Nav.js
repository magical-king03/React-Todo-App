import { Link, useNavigate } from "react-router-dom"
function Nav() {
    let loggedin = localStorage.getItem('loggedin') === 'true'
    let navigate = useNavigate()
    function logouthandler(){
        localStorage.setItem('name' , '')
        localStorage.setItem('loggedin', false)
        navigate('/login')
    }
    return (
        <div>
            <div className='w-full h-full border p-[16px] bg-black flex items-center justify-between'>
                <h1 className='md:text-4xl text-2xl p-2 font-bold text-white text-center'>Manage your tasks in TODO App</h1>
                {
                    !loggedin ? 
                    <div>
                    <Link to='/login' className="bg-white text-black px-3 py-3 rounded-lg font-bold cursor-pointer">Login</Link>
                </div>
                :
<div>
                    <button onClick={logouthandler} className="bg-white text-black px-3 py-3 rounded-lg font-bold cursor-pointer">Logout</button>
                </div>
                }
            </div>

        </div>
    )
}

export default Nav