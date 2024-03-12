import home_img from "../assests/img/home-img.png"
import { Link } from "react-router-dom"

function Home() {
    return (
        <div>
            <div className="lg:grid lg:grid-cols-2 lg:block hidden">

                <div className="flex items-start justify-end mr-[50px]">
                    <div className="">
                        <div className="flex items-center justify-center gap-[50px] mb-[50px] mt-[75px]">
                            <input type="checkbox" disabled checked className="custom-checkbox" />
                            <Link to="/add"><p className="w-[300px] bg-black text-2xl px-6 py-3 rounded-full text-white font-semibold text-center">Add Tasks</p></Link>
                        </div>
                        <div className="flex items-center justify-center gap-[50px]">
                            <input type="checkbox" disabled checked className="custom-checkbox" />
                            <Link to="/view"><p className="w-[300px] bg-black text-2xl px-6 py-3 rounded-full text-white font-semibold text-center">View Tasks</p></Link>
                        </div>
                    </div>
                </div>
                <div className="">
                    <img src={home_img} className="mt-[20px]" alt="Home img" />
                </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:block lg:hidden hidden">
                <div className="flex items-center ">
                    <div>
                        <div className="flex items-center justify-center gap-[25px] mb-[50px] ml-[50px]">
                            <input type="checkbox" disabled checked className="custom-checkbox" />
                            <Link to="/add"><p className="w-[300px] bg-black text-2xl px-6 py-3 rounded-full text-white font-semibold text-center">Add Tasks</p></Link>
                        </div>
                        <div className="flex items-center justify-center gap-[25px] ml-[50px]">
                            <input type="checkbox" disabled checked className="custom-checkbox" />
                            <Link to="/view"><p className="w-[300px] bg-black text-2xl px-6 py-3 rounded-full text-white font-semibold text-center">View Tasks</p></Link>
                        </div>
                    </div>
                </div>
                <div className="">
                    <img src={home_img} className="w-[325px] h-[325px]" alt="Home img" />
                </div>
            </div>
            <div className="md:hidden">
                <div className="flex items-center mt-[35px]">
                    <div>
                        <div className="flex items-center justify-center gap-[25px] mb-[50px] ml-[50px]">
                            <input type="checkbox" disabled checked className="custom-checkbox" />
                            <Link to="/add"><p className="w-[220px] bg-black px-6 py-3 rounded-full text-white font-semibold text-center">Add Tasks</p></Link>
                        </div>
                        <div className="flex items-center justify-center gap-[25px] ml-[50px]">
                            <input type="checkbox" disabled checked className="custom-checkbox" />
                            <Link to="/view"><p className="w-[220px] bg-black px-6 py-3 rounded-full text-white font-semibold text-center">View Tasks</p></Link>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end mr-[25px]">
                    <img src={home_img} className="mt-[40px] w-[200px] h-[200px]" alt="Home img" />
                </div>
            </div>
        </div>
    )
}

export default Home