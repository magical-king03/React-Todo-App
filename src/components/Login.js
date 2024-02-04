import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
                <h1 className="text-4xl p-2 font-bold text-black text-center m-7">Login Now</h1>
                <div className="m-auto border border-black rounded-xl m-3 md:w-[350px] w-[340px]">
                    <div className="m-5">
                        <p className="text-xl font-bold">Name</p>
                        <input
                            type="email"
                            placeholder="Enter the name"
                            className="border-1 border-black p-[10px] mt-5 border mb-5 rounded-lg w-[300px]"
                            ref={name}
                        />
                    </div>
                    <div className="m-5">
                        <p className="text-xl font-bold">Password</p>
                        <input
                            type="password"
                            placeholder="Enter the password"
                            className="border-1 border-black p-[10px] mt-5 border rounded-lg w-[300px]"
                            ref={password}
                        />
                    </div>
                    <div className="flex items-center justify-center">
                        <button className="bg-black text-white px-5 py-3 rounded-lg cursor-pointer m-5" onClick={loginHandler}>
                            Login
                        </button>
                        <Link to="/register" className="m-5 underline text-[#0000ff]">
                            Don't have an account
                        </Link>
                    </div>
                    <p className={check ? "ml-5 mb-5 text-xl transform animate-pulse transition-all text-[#ff0000] font-bold" : "hidden"}>
                        Fill all the fields
                    </p>
                    <p className={userCheck ? "ml-5 mb-5 text-xl transform animate-pulse transition-all font-bold" : "hidden"}>
                        No user found
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
