import "../../app/globals.css";
import "flowbite";
import Image from "next/image";

export default function WechatQRPage() {
  return (
    <>
      <div className='w-[1000px] h-[2800px] bg-slate-600'>
        <div className='bg-slate-500 w-[1000px] h-[150px] flex items-center'>
          <button
            onClick={(e) => history.back()}
            className='font-sans font-bold text-white text-[40px] px-11'
          >
            Back
          </button>
        </div>
        <div className='flex flex-col items-center pt-[500px]'>
          <Image src={"/img/wechat.png"} width={600} height={600} alt='' />
        </div>
      </div>
    </>
  );
}
