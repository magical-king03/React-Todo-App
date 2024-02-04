import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
let tempUsers = {}
function Register() {
    let user_name = useRef();
    let navigate = useNavigate()
    let password = useRef();
    let email = useRef();
    const [check, setCheck] = useState(false)
    const [users, setUsers] = useState([])
    function registerHandler() {
        let name = user_name.current.value
        let pass = password.current.value
        let em = email.current.value
        if (name === '' || pass === '' || em === '') {
            setCheck(true);
            setTimeout(() => {
                setCheck(false);
            }, 3000);
        } else {
            setCheck(false);
            tempUsers = {
                user_name: name,
                email: em,
                password: pass,
            }
            let newUsers = [...users, tempUsers]
            setUsers(newUsers)
            fetch('https://todo-app-f0a16-default-rtdb.firebaseio.com/users.json', {
                method: 'POST',
                body: JSON.stringify(newUsers),
            })
                .then(response => response.json())
                .then(data => console.log('Success:', data))
                .catch(error => console.error('Error:', error));

            navigate('/login')
        }

    }
    return (
        <div>
            <div>
                <h1 className="text-4xl p-2 font-bold text-black text-center m-7">Register Now for free</h1>
                <div className=' m-auto border border-black rounded-xl m-3 md:w-[375px] w-[340px]'>
                    <div className="m-5">
                        <p className="text-xl font-bold">Name</p>
                        <input type='text' placeholder='Enter the name' className='border-1 border-black p-[10px] mt-5 border mb-5 rounded-lg w-[300px]' ref={user_name} />
                    </div>
                    <div className="m-5">
                        <p className="text-xl font-bold">Email</p>
                        <input type='email' placeholder='Enter the name' className='border-1 border-black p-[10px] mt-5 border mb-5 rounded-lg w-[300px]' ref={email} />
                    </div>
                    <div className="m-5">
                        <p className="text-xl font-bold">Password</p>
                        <input type='password' placeholder='Enter the password' className='border-1 border-black p-[10px] mt-5 border rounded-lg w-[300px]' ref={password} />
                    </div>
                    <div className="flex items-center justify-center">
                        <button className='bg-black text-white px-5 py-3 rounded-lg cursor-pointer m-5' onClick={registerHandler}>Register</button>
                        
                    </div>
                    <p className={check ? 'ml-5 mb-5 text-xl transform animate-pulse transition-all text-[#ff0000] font-bold' : 'hidden'}>Fill all the fields</p>
                </div>
            </div>
        </div>
    )
}

export default Register