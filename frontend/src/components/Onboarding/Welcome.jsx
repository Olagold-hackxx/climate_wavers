import { NavLink } from "react-router-dom"

const Welcome = () => {
    return <div className="grid  h-[100vh] w-[100%] text-white">
        <NavLink to={"/"} className="border-2 bg-gray-300 w-[15%] h-12 text-center text-2xl pt-2 ml-2  mt-4 rounded-xl capitalize">cancel</NavLink>
        <div className="flex place-content-center gap-x-1">
            <div className="flex flex-col pt-8 relative left-12">
            <img src={"/waverbot1.png"} className="w-[80%]"/>
            <img src={"/Ellipse.png"} className="w-[80%] " />
            </div>
            <div className="flex flex-col gap-8 text-start">
                <span className="bg-[#008080] content-center px-2 border-2 rounded-2xl shadow-md min-h-20 max-w-[100%]">Hello there welcome to Climate Weavers</span>
                <span className="bg-[#008080]  content-center px-2 border-2 rounded-2xl shadow-md min-h-20  max-w-[100%]">My name is WaverX.<br/> Your Real time AI assistant here in Climate Waver</span>
                <span className="bg-[#008080]  content-center px-2 border-2 rounded-2xl shadow-md min-h-20 w-[70%]  max-w-[100%]">Lets get you started</span>
            </div>
        </div>
        <NavLink to={"/onboarding/home"} className="bg-linear border-2 w-[30%] h-20 relative left-[53%] bottom-20 text-2xl text-center pt-4 rounded-[35px]">Let&apos;s Go</NavLink>
    </div>
}

export default Welcome