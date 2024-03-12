import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import login from "../assests/img/login_page.png"

function Login() {
    let name = useRef();
    let password = useRef();
    let navigate = useNavigate();
    const [check, setCheck] = useState(false);
    const [userCheck, setUserCheck] = useState(false);

    function loginHandler() {
        let user_name = name.current.value;
        let pass = password.current.value;

        if (user_name === "" || pass === "") {
            setCheck(true);
            setTimeout(() => {
                setCheck(false);
            }, 3000);
        } else {
            setCheck(false);

            fetch("https://todo-app-f0a16-default-rtdb.firebaseio.com/users.json")
                .then((response) => response.json())
                .then((data) => {
                    let tempUsers = [];

                    for (const key in data) {
                        let user = {
                            id: key,
                            ...data[key],
                        };
                        tempUsers.push(user);
                    }
                    let userFound = tempUsers.find(
                        (tempUs) => user_name === tempUs[0].user_name && pass === tempUs[0].password
                    );

                    if (userFound) {
                        localStorage.setItem('name', userFound[0].user_name)
                        localStorage.setItem('loggedin', true)
                        setUserCheck(false);
                        navigate("/");
                    } else {
                        setUserCheck(true);
                        setTimeout(() => {
                            setUserCheck(false);
                        }, 3000);
                    }
                });
        }
    }

    return (
        <div>
            <div>
                <h1 className="mt-[20px] md:mt-[50px] text-xl md:text-2xl p-2 text-black lg:ml-[250px] md:ml-[75px] ml-[40px]">LOGIN NOW</h1>
                <div className="grid grid-cols-2">
                    <div>
                        <input type="name" placeholder="Name" ref={name} className="lg:ml-[270px] mt-[15px] md:ml-[75px] ml-[40px] text-white md:w-[400px] w-[300px] bg-black px-6 py-4 rounded-full" />

                        <input type="password" placeholder="Password" ref={password} className="lg:ml-[270px] mt-[15px] md:ml-[75px] ml-[40px] text-white md:w-[400px] w-[300px] bg-black px-6 py-4 rounded-full" />
                        <br />
                        <div className="flex items-end gap-5 w-screen">
                            <button className="bg-white text-black border-1 border-black border px-7 py-3 rounded-full cursor-pointer lg:ml-[270px] mt-[15px] md:ml-[75px] ml-[40px]" onClick={loginHandler}>
                                Login
                            </button>
                            <Link to="/register" className="underline text-[#0000ff] text-lg">Don't have an account</Link>
                        </div>
                        <p className={check ? 'lg:mt-[25px] md:mt-0 mt-[25px] lg:ml-[270px] md:ml-[75px] ml-[40px] text-xl transform animate-pulse transition-all text-[#8b4513] font-bold' : 'hidden'}>Fill all the fields</p>
                        <p className={userCheck ? 'lg:mt-[25px] md:mt-0 mt-[25px] lg:ml-[270px] md:ml-[75px] ml-[40px] text-xl transform animate-pulse transition-all text-[#8b4513] font-bold' : 'hidden'}>User not found</p>
                    </div>
                    <div className="hidden md:block">
                        <img src={login} className="md:w-[300px] md:ml-[50px] md:h-[225px] lg:w-[500px] lg:h-[400px]" alt="Login img" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
