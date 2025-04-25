import { FcSimCardChip } from "react-icons/fc";
import { LuNfc } from "react-icons/lu";


export default function CardFront(){
    return(
        <div className="w-[450px] h-[250px] bg-black rounded-xl">
            <div className="w-full h-[30%] flex">
                <div className="w-[50%] h-full flex items-center pl-4 gap-2">
                    <div className="w-[50px] h-[50px] rounded-full bg-white"></div>
                    <div className="w-[35px] h-[35px] rounded-full bg-white"></div>
                </div>
                <div className="w-[50%] h-full flex p-4 justify-end">
                    <p className="text-[20px] text-white">Nome do Banco</p>
                </div>
            </div>
            <div className="w-full h-[40%] flex flex-col">
                <div className="w-full h-[60%] flex items-center pl-5 pt-8">
                    <FcSimCardChip size={55} />                   
                    <LuNfc size={30} color="white"/>
                </div>
                <div className="w-full h-[40%] pl-6 pt-3">
                    <p className="text-[#b1acac] text-[25px]">
                        0000 0000 0000 0000</p>
                </div>
            </div>
            <div className="w-full h-[30%] pl-10 pt-2">
                <p className="text-white text-[25px]">Nome no Cartão</p>
            </div>
        </div>
    )
}