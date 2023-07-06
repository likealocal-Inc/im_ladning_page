import "../app/globals.css";
import "flowbite";
import langDic from "../app/lang.json";
import { useEffect, useState } from "react";
import Image from "next/image";

export type LangType = "en" | "cns" | "cnb" | "jp";

export default function Main() {
  const [loading, setLoading] = useState(false);
  const [langData, setLangData] = useState<any>();
  const [lang, setLang] = useState<LangType>("en");
  useEffect(() => {
    let tempLang: LangType = "en";
    const nowLang = localStorage.getItem("iamlandinglang");
    if (nowLang === null || nowLang === undefined) {
      localStorage.setItem("iamlandinglang", "en");
    } else {
      tempLang = nowLang as LangType;
    }
    setLang(tempLang);
    setLangData(langDic[tempLang]);
  }, []);

  useEffect(() => {}, []);

  const onChangeLang = (selectLang: LangType) => {
    setLang(selectLang);
    localStorage.setItem("iamlandinglang", selectLang);
    setLangData(langDic[selectLang]);
  };

  if (langData === undefined || loading === true) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <div role='status' className='text-2xl font-bold'>
          <svg
            aria-hidden='true'
            className='inline w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400'
            viewBox='0 0 100 101'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
              fill='currentColor'
            />
            <path
              d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
              fill='currentFill'
            />
          </svg>
          <span className='sr-only'>Loading...</span>
        </div>
      </div>
    );
  }

  const InfoLangButton = ({ langType, name }: any) => {
    return (
      <div className='w-[155px] h-[60px]'>
        <button
          onClick={(e) => onChangeLang(langType)}
          className={
            lang !== langType
              ? "flex justify-center items-center text-[#717171] text-[36px] bg-[#f2f0f0] rounded-[10px] w-[155px] h-[60px] p-[21px]"
              : "flex justify-center items-center text-white text-[36px] bg-[#0515AB] rounded-[10px] w-[155px] h-[60px] p-[21px]"
          }
        >
          {name}
        </button>
      </div>
    );
  };
  return (
    <>
      <div className='font-NotoSans'>
        <div className='bg-white w-[1000px] h-[2800px]'>
          <div className='pt-[223px]' />
          <div className='flex items-center justify-center'>
            <Image
              className='w-[130px] h-[50px]'
              src={"/img/im.png"}
              width={130}
              height={50}
              alt=''
            />
            <div
              className='mx-[30px] text-[#717171] text-center relative w-[20.11px] h-[76.01px] flex items-center justify-center'
              style={{ font: "300 40px/80px 'Assistant', sans-serif" }}
            >
              X
            </div>
            <Image
              className='w-[201px] h-[29px]'
              src={"/img/likealocal.png"}
              width={201}
              height={29}
              alt=''
            />
          </div>
          <div className='mt-[60px]' />
          {/* 언어 */}
          <div className='flex items-center justify-center'>
            <InfoLangButton langType='en' name='English' />
            {/* <div className='w-[155px] h-[60px]'>
            <button
              onClick={(e) => onChangeLang("en")}
              className='flex justify-center items-center text-[#717171] text-[36px] bg-[#f2f0f0] rounded-[10px] w-[155px] h-[60px] p-[21px]'
            >
              English
            </button>
          </div> */}
            <div className='pl-[22px]' />
            <InfoLangButton langType='jp' name='日本語' />
            {/* <div className='w-[155px] h-[60px]'>
            <button
              onClick={(e) => onChangeLang("jp")}
              className='flex justify-center items-center text-[#717171] text-[36px] bg-[#f2f0f0] rounded-[10px] w-[155px] h-[60px] p-[21px]'
            >
              日本語
            </button>
          </div> */}
            <div className='pl-[22px]' />
            <InfoLangButton langType='cnb' name='繁中' />
            {/* <div className='w-[155px] h-[60px]'>
            <button
              onClick={(e) => onChangeLang("cnb")}
              className='flex justify-center items-center text-[#717171] text-[36px] bg-[#f2f0f0] rounded-[10px] w-[155px] h-[60px] p-[21px]'
            >
              繁中
            </button>
          </div> */}
            <div className='pl-[22px]' />
            <InfoLangButton langType='cns' name='简中' />
            {/* <div className='w-[155px] h-[60px]'>
            <button
              onClick={(e) => onChangeLang("cns")}
              className='flex justify-center items-center text-[#717171] text-[36px] bg-[#f2f0f0] rounded-[10px] w-[155px] h-[60px] p-[21px]'
            >
              簡中
            </button>
          </div> */}
          </div>
          {/* 언어 끝 */}
          <div className='mt-[24px]' />
          {/* 소개 */}
          <div className=''>
            <div className='text-[#0516B8] flex justify-center items-center text-[50px] '>
              {langData["h1-1"]}
            </div>
            <div className='text-[#0516B8] flex justify-center items-center text-[50px] '>
              {langData["h1-2"]}
            </div>
          </div>
          {/* 소개끝 */}
          <div className='mt-[36px]' />
          {/* 상단이미지 */}
          <div className='flex justify-center'>
            <Image
              className='w-[655px] h-[408px]'
              src={"/img/75067471all.png"}
              width={655}
              height={408}
              alt=''
            />
            <Image
              className='w-[134px] h-[252px] mt-[114px] ml-[-138px]'
              src={"/img/Grouphuman.png"}
              width={134}
              height={252}
              alt=''
            />
          </div>
          {/* 상단이미지 끝 */}

          {/* 푸른영역 */}
          <div className='w-full mt-[-50px] h-[400px] bg-[#EAF7FF] flex flex-col justify-center items-center'>
            <div className='text-[#2337C1] text-[45px] '>
              {langData["h2-1"]}
            </div>
            <div className='mt-[6px]' />
            <div className='text-[#2337C1] text-[45px] '>
              {langData["h2-2"]}
            </div>
            <div className='mt-[31px]' />
            <div className='flex'>
              <button
                onClick={(e) => {
                  if (lang === "en") {
                    location.href = "https://en.likealocal.kr/?redirect=no";
                    return;
                  } else if (lang === "cnb") {
                    location.href = "https://tw.likealocal.kr/?redirect=no";
                    return;
                  } else if (lang === "cns") {
                    location.href = "https://cn.likealocal.kr/?redirect=no";
                    return;
                  } else if (lang === "jp") {
                    location.href = "https://jp.likealocal.kr/?redirect=no";
                    return;
                  }
                }}
                className='bg-[#0516b8] rounded-[40px] w-[312px] h-[84px] pr-[55px] relative flex justify-center items-center'
              >
                <div
                  className='text-[#ffffff]'
                  style={{
                    font: "500 40px/30px 'Taipei Sans TC Beta', sans-serif",
                  }}
                >
                  {langData["b1"]}
                </div>
              </button>
              <div className='h-[84px] flex items-center ml-[-30px]'>
                <svg
                  className='relative overflow-visible'
                  style={{ transform: "translate(-36px, 0px)" }}
                  width='36'
                  height='36'
                  viewBox='0 0 36 36'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M24.4205 17.2045C24.8598 17.6438 24.8598 18.3562 24.4205 18.7955L13.1705 30.0455C12.7312 30.4848 12.0188 30.4848 11.5795 30.0455C11.1402 29.6062 11.1402 28.8938 11.5795 28.4545L22.034 18L11.5795 7.54549C11.1402 7.10615 11.1402 6.39384 11.5795 5.9545C12.0188 5.51516 12.7312 5.51516 13.1705 5.9545L24.4205 17.2045Z'
                    fill='white'
                  />
                </svg>
              </div>
              <div className='ml-[54px]' />
              <button
                onClick={(e) => {
                  if (lang === "en") {
                    location.href = "https://wa.me/8201099859547";
                    return;
                  } else if (lang === "cnb") {
                    location.href =
                      "https://liff.line.me/1645278921-kWRPP32q/?accountId=386wonuu";
                    return;
                  } else if (lang === "cns") {
                    location.href = "/wechat";
                    return;
                  } else if (lang === "jp") {
                    location.href =
                      "https://liff.line.me/1645278921-kWRPP32q/?accountId=315mqvdn";
                    return;
                  }
                }}
                className='bg-[#0516b8] rounded-[40px] w-[312px] h-[84px] relative flex items-center justify-center pr-[55px]'
              >
                <div
                  className='text-[#ffffff] text-left relative'
                  style={{ font: "500 40px/150% 'Noto Sans', sans-serif" }}
                >
                  {langData["b2"]}
                </div>
              </button>
              <div className='h-[84px] flex items-center ml-[-30px]'>
                <svg
                  className='relative overflow-visible'
                  style={{ transform: "translate(-36px, 0px)" }}
                  width='36'
                  height='36'
                  viewBox='0 0 36 36'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M24.4205 17.2045C24.8598 17.6438 24.8598 18.3562 24.4205 18.7955L13.1705 30.0455C12.7312 30.4848 12.0188 30.4848 11.5795 30.0455C11.1402 29.6062 11.1402 28.8938 11.5795 28.4545L22.034 18L11.5795 7.54549C11.1402 7.10615 11.1402 6.39384 11.5795 5.9545C12.0188 5.51516 12.7312 5.51516 13.1705 5.9545L24.4205 17.2045Z'
                    fill='white'
                  />
                </svg>
              </div>
            </div>
          </div>
          {/* 푸른영역 끝 */}

          <div className='mt-[65px]' />
          {/* 하단 */}
          <div className='flex flex-col px-[70px] w-full'>
            <div
              className='text-[#0085fe] text-center relative flex items-center justify-center'
              style={{
                font: "400 45px/60px 'Taipei Sans TC Beta', sans-serif",
              }}
            >
              {langData["h3-1"]}
            </div>
            <div className='mt-[89px]' />
            {/* 상 */}
            <div className='flex items-center justify-center'>
              {/* 왼상 */}
              <div className='flex flex-col items-center justify-center w-[397px]'>
                <div className='flex justify-center items-center bg-[#eaf7ff] rounded-[20px] w-[163.73px] h-[161.53px] relative'>
                  <Image
                    src={"/img/speak3.png"}
                    width={116}
                    height={114}
                    className='w-[116px] h-[114px]'
                    alt=''
                  />
                </div>
                <div className='mt-[24px]' />
                <div className='text-[#0085fe] text-center relative text-[40px]'>
                  {langData["h3-2-1"]}
                </div>
                <div className='mt-[15px]' />
                <div className='text-[#717171] text-center relative text-[31px] w-[395px] h-[183px] flex items-start justify-center whitespace-pre-wrap tracking-wide'>
                  {langData["h3-2-2"]}
                </div>
              </div>
              {/* 왼상 끝 */}
              <div className='ml-[40px]' />
              {/* 왼상 */}
              <div className='flex flex-col items-center justify-center'>
                <div className='flex justify-center items-center bg-[#eaf7ff] rounded-[20px] w-[163.73px] h-[161.53px] relative'>
                  <Image
                    src={"/img/car2.png"}
                    width={116}
                    height={114}
                    className='w-[116px] h-[114px]'
                    alt=''
                  />
                </div>
                <div className='mt-[24px]' />
                <div className='text-[#0085fe] text-center relative text-[40px]'>
                  {langData["h3-3-1"]}
                </div>
                <div className='mt-[15px]' />
                <div className='text-[#717171] text-center relative text-[31px] w-[395px] h-[183px] flex items-start justify-center whitespace-pre-wrap tracking-wide'>
                  {langData["h3-3-2"]}
                </div>
              </div>
              {/* 왼상 끝 */}
            </div>
            <div className='mt-[80px]' />
            {/* 하 */}
            <div className='flex items-center justify-center'>
              {/* 왼상 */}
              <div className='flex flex-col items-center justify-center'>
                <div className='flex justify-center items-center bg-[#eaf7ff] rounded-[20px] w-[163.73px] h-[161.53px] relative'>
                  <Image
                    src={"/img/quality1.png"}
                    width={116}
                    height={114}
                    className='w-[116px] h-[114px]'
                    alt=''
                  />
                </div>
                <div className='mt-[24px]' />
                <div className='text-[#0085fe] text-center relative text-[40px]'>
                  {langData["h3-4-1"]}
                </div>
                <div className='mt-[15px]' />
                <div className='text-[#717171] text-center relative text-[31px] w-[395px] h-[183px] flex items-start justify-center whitespace-pre-wrap tracking-wide'>
                  {langData["h3-4-2"]}
                </div>
              </div>
              {/* 왼상 끝 */}
              <div className='ml-[45px]' />
              {/* 왼상 */}
              <div className='flex flex-col items-center justify-center'>
                <div className='flex justify-center items-center bg-[#eaf7ff] rounded-[20px] w-[163.73px] h-[161.53px] relative'>
                  <Image
                    src={"/img/pay-per-click1.png"}
                    width={116}
                    height={114}
                    className='w-[116px] h-[114px]'
                    alt=''
                  />
                </div>
                <div className='mt-[24px]' />
                <div className='text-[#0085fe] text-center relative text-[40px]'>
                  {langData["h3-5-1"]}
                </div>
                <div className='mt-[15px]' />
                <div className='text-[#717171] text-center relative text-[31px] w-[395px] h-[183px] flex items-start justify-center whitespace-pre-wrap tracking-wide'>
                  {langData["h3-5-2"]}
                </div>
              </div>
              {/* 왼상 끝 */}
            </div>
          </div>
          {/* 하당 끝 */}
        </div>
      </div>
    </>
  );
}
