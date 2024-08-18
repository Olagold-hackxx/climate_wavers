import Communityselector from './Communityselector'
import Popularaccounts from './Popularaccounts'

const Rightsidebar = () => {
  return (
    <div className=' border-l-[1px] border-gray-200 h-[100vh] hidden md:block pt-5'>
        {/* Search btn */}
        <div className='  md:pl-6 '>
            <input className='bg-white bg-opacity-25 p-1 md:p-2 outline-[1px] w-[90%] border border-[#dadada] focus:border-none focus:outline-none border-graydark rounded-full text-graydark ' type="text" placeholder='🔍Search' />
        </div>
        <Communityselector />
        <div className="mt-[30%]">
        <Popularaccounts />
        </div>
    </div>
  )
}

export default Rightsidebar