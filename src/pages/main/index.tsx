import "../../app/globals.css";
import "../../app/css/main.css";
import "flowbite";
import langDic from "../../app/lang.json";
import Image from "next/image";

import { forwardRef, useEffect, useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export interface InputData {
  airport: string;
  name: string;
  location: string;
  address: string;
  passengersCount: string;
  picDate: string;
  whatappid: string;
}
export type LangType = "en" | "cns" | "cnb" | "jp";

export default function Main() {
  const [inputData, setInputData] = useState<InputData>({
    airport: "",
    name: "",
    location: "",
    address: "",
    passengersCount: "",
    picDate: "",
    whatappid: "",
  });
  const [loading, setLoading] = useState(false);
  const [langData, setLangData] = useState<any>();
  const [lang, setLang] = useState("en");
  const [h, seth] = useState(4100);
  const [picDate, setPicDate] = useState<Date | null>(new Date());
  const passengersNum = [1, 2, 3, 4, 5, 6];
  useEffect(() => {
    let tempLang: LangType = "en";
    const nowLang = localStorage.getItem("lang");
    if (nowLang === null || nowLang === undefined) {
      localStorage.setItem("lang", "en");
    } else {
      tempLang = nowLang as LangType;
    }
    if (tempLang === "jp") {
      seth(4100);
    }
    setLang(tempLang);
    setLangData(langDic[tempLang]);
  }, []);

  // 날짜데이터 세팅
  useEffect(() => {
    if (picDate !== null && picDate !== undefined) {
      setInputData({ ...inputData, picDate: `${picDate}` });
    }
  }, [picDate]);

  const onChangeLang = (selectLang: LangType) => {
    localStorage.setItem("lang", selectLang);
    setLangData(langDic[selectLang]);
  };

  const onSubmit = async () => {
    setLoading(true);
    let isOk = true;
    if (inputData.airport.trim() === "") {
      isOk = false;
    } else if (inputData.name.trim() === "") {
      isOk = false;
    } else if (inputData.location.trim() === "") {
      isOk = false;
    } else if (inputData.address.trim() === "") {
      isOk = false;
    } else if (inputData.passengersCount.trim() === "") {
      isOk = false;
    } else if (inputData.picDate.trim() === "") {
      isOk = false;
    } else if (inputData.whatappid.trim() === "") {
      isOk = false;
    }

    if (isOk === false) {
      alert("You have to Fill Everything");
    } else {
      setTimeout(async () => {
        await axios
          .post("/api/order", { inputData })
          .then((d) => {
            location.replace("/done");
          })
          .catch((e) => {
            setLoading(false);
            alert("요청실패");
          });
      }, 200);
    }
  };

  //
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

  // eslint-disable-next-line react/display-name
  const ExampleCustomInput = forwardRef<any>(({ value, onClick }: any, ref) => (
    <button
      className='text-[35px] rounded-2xl w-[720px] h-[70px] text-black bg-white text-left pl-[20px]'
      onClick={onClick}
      ref={ref}
    >
      {value}
    </button>
  ));
  return (
    <>
      <div className=''>
        <div className='page-1'>
          <div className='rectangle-6'></div>
          <div className='rectangle-12'></div>
          <div className='on-site-discount'>
            <div className='flex flex-col justify-center'>
              <div className='mt-[10px]'></div>
              <div className=''>{langData["h1"]}</div>
              <div className='mt-[16px]'></div>
              <div className='reserve-airport-transfer-service-now-have-a-safe-and-comfortable-ride-to-the-airport'>
                {langData["h2"]}
                <br />
                {langData["h3"]}
              </div>
            </div>
          </div>
          <div className='group-51'>
            <div className='x'>x</div>
            <Image
              className='_5-1'
              src='/img/logo.png'
              width={160}
              height={24.65}
              alt=''
            />
            <Image
              className='logo-1'
              src='/img/logo1.png'
              width={40}
              height={34.05}
              alt=''
            />
          </div>

          <div className='absolute top-[47px] ml-[630px]'>
            <select
              id='countries'
              className='rounded-2xl bg-[#D8F0FD] text-[#212E56] font-bold text-2xl'
              onChange={(e) => {
                const lang = e.target.value;
                onChangeLang(lang as LangType);
              }}
            >
              <option value='en' selected={lang === "en" ? true : false}>
                English
              </option>
              <option value='cns' selected={lang === "cns" ? true : false}>
                更换语言
              </option>
              <option value='cnb' selected={lang === "cnb" ? true : false}>
                更換語言
              </option>
              <option value='jp' selected={lang === "jp" ? true : false}>
                言語を選択
              </option>
            </select>
          </div>

          {/* 입력내용 */}
          <div className='absolute w-[720px] bg-[#EAF7FF] top-[900px] ml-[72px]'>
            {/* 공항선택 */}
            <div className='flex flex-col'>
              <div className='text-[45px] text-[#212E56] bg-slate-200 pl-[15px] pt-[10px] h-[90px] rounded-lg'>
                {langData["c2-q"]}
              </div>
              <div className='mt-[3px]'></div>
              <div className='bg-white pl-[15px] h-[200px]'>
                <div className='flex items-center mt-[12px]'>
                  <input
                    id='airport-1'
                    type='radio'
                    name='airportInput'
                    className='w-8 h-8 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                    onClick={(e) => {
                      setInputData({ ...inputData, airport: "인천1공항" });
                      document.getElementById("airport-1")?.focus();
                    }}
                  />
                  <label
                    htmlFor='airport-1'
                    className='ml-[12px] text-[35px] text-[#212E56]'
                  >
                    {langData["c2-a1"]}
                  </label>
                </div>
                <div className='flex items-center mt-[10px]'>
                  <input
                    id='airport-2'
                    type='radio'
                    name='airportInput'
                    className='w-8 h-8 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                    onClick={() => {
                      setInputData({ ...inputData, airport: "인천2공항" });
                      document.getElementById("airport-2")?.focus();
                    }}
                  />
                  <label
                    htmlFor='airport-2'
                    className='ml-[12px] text-[35px] text-[#212E56]'
                  >
                    {langData["c2-a2"]}
                  </label>
                </div>
                <div className='flex items-center mt-[10px]'>
                  <input
                    id='airport-3'
                    type='radio'
                    name='airportInput'
                    className='w-8 h-8 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                    onClick={() => {
                      setInputData({ ...inputData, airport: "김포공항" });
                      document.getElementById("airport-3")?.focus();
                    }}
                  />
                  <label
                    htmlFor='airport-3'
                    className='ml-[12px] text-[35px] text-[#212E56]'
                  >
                    {langData["c2-a3"]}
                  </label>
                </div>
              </div>
            </div>
            ,<div className='mt-[40px]'></div>
            {/* 이름 */}
            <div className='flex flex-row '>
              <div className='text-[#212E56] pl-[15px] pr-[15px] rounded-lg bg-slate-200 w-[350px] h-[90px] pt-[10px] text-center text-[40px] '>
                {langData["c3-q"]}
              </div>
              <input
                className='ml-[5px] w-[390px] h-[90px] text-black pl-2 text-[40px]'
                onChange={(e) =>
                  setInputData({ ...inputData, name: e.target.value })
                }
              />
            </div>
            ,<div className='mt-[40px]'></div>
            {/* 픽업위치 */}
            <div className='flex flex-col'>
              <div className='bg-slate-200 h-[100px] w-[720px] pl-[15px] flex items-center rounded-lg'>
                <div className='text-[#212E56] text-[40px]'>
                  {langData["c4-q-1"]}
                </div>
                <div className='text-[#1369F9] text-[35px] pl-[15px]'>
                  {"["}
                  {langData["c4-q-2"]}
                  {"]"}
                </div>
              </div>
              <div className='mt-[3px]'></div>
              <input
                className='w-[720px] h-[85px] text-black text-[45px] pl-5'
                onChange={(e) =>
                  setInputData({ ...inputData, location: e.target.value })
                }
              />
            </div>
            ,<div className='mt-[40px]'></div>
            {/* 픽업주소 */}
            <div className='flex flex-col'>
              <div className='bg-slate-200 w-[720px] pl-[15px] h-[140px] pt-[10px] rounded-lg'>
                <div className='text-[#212E56] text-[40px]'>
                  {langData["c5-q-1"]}
                </div>
                <div className='text-[#1369F9] text-[35px] pl-[15px]'>
                  {"["}
                  {langData["c5-q-2"]}
                  {"]"}
                </div>
              </div>
              <div className='mt-[3px] '></div>
              <input
                className='w-[720px] h-[85px] text-black text-[40px] pl-5'
                onChange={(e) =>
                  setInputData({ ...inputData, address: e.target.value })
                }
              />
            </div>
            ,<div className='mt-[40px]'></div>
            {/* 고객수 */}
            <div className='flex flex-col'>
              <div className='bg-slate-200 h-[100px] w-[720px] pl-[15px] rounded-lg flex items-center'>
                <div className='text-[#212E56] text-[40px]'>
                  {langData["c6-q-1"]}
                </div>
                <div className='text-[#1369F9] text-[35px] pl-[20px]'>
                  {langData["c6-q-2"]}
                </div>
              </div>
              <div className='mt-[3px]'></div>

              <div className='bg-white pl-[30px] h-[160px] w-[720px] pr-[30px]'>
                <div className='flex justify-between px-[30px]'>
                  <div className='flex items-center mt-[12px]'>
                    <input
                      id='pcoung-1'
                      type='radio'
                      value=''
                      name='pcoung'
                      className='w-10 h-10 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                      onClick={(e) =>
                        setInputData({ ...inputData, passengersCount: "1" })
                      }
                    />
                    <label
                      htmlFor='pcoung-1'
                      className='ml-[12px] text-[35px] text-[#212E56]'
                    >
                      1
                    </label>
                  </div>
                  <div className='flex items-center mt-[12px]'>
                    <input
                      id='pcoung-1'
                      type='radio'
                      value=''
                      name='pcoung'
                      className='w-10 h-10 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                      onClick={(e) =>
                        setInputData({ ...inputData, passengersCount: "2" })
                      }
                    />
                    <label
                      htmlFor='pcoung-1'
                      className='ml-[12px] text-[35px] text-[#212E56]'
                    >
                      2
                    </label>
                  </div>
                  <div className='flex items-center mt-[12px]'>
                    <input
                      id='pcoung-1'
                      type='radio'
                      value=''
                      name='pcoung'
                      className='w-10 h-10 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                      onClick={(e) =>
                        setInputData({ ...inputData, passengersCount: "3" })
                      }
                    />
                    <label
                      htmlFor='pcoung-1'
                      className='ml-[12px] text-[35px] text-[#212E56]'
                    >
                      3
                    </label>
                  </div>
                </div>
                <div className='flex justify-between pt-2  px-[30px]'>
                  <div className='flex items-center mt-[12px]'>
                    <input
                      id='pcoung-1'
                      type='radio'
                      value=''
                      name='pcoung'
                      className='w-10 h-10 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                      onClick={(e) =>
                        setInputData({ ...inputData, passengersCount: "4" })
                      }
                    />
                    <label
                      htmlFor='pcoung-1'
                      className='ml-[12px] text-[35px] text-[#212E56]'
                    >
                      4
                    </label>
                  </div>
                  <div className='flex items-center mt-[12px]'>
                    <input
                      id='pcoung-1'
                      type='radio'
                      value=''
                      name='pcoung'
                      className='w-10 h-10 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                      onClick={(e) =>
                        setInputData({ ...inputData, passengersCount: "5" })
                      }
                    />
                    <label
                      htmlFor='pcoung-1'
                      className='ml-[12px] text-[35px] text-[#212E56]'
                    >
                      5
                    </label>
                  </div>
                  <div className='flex items-center mt-[12px]'>
                    <input
                      id='pcoung-1'
                      type='radio'
                      value=''
                      name='pcoung'
                      className='w-10 h-10 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                      onClick={(e) =>
                        setInputData({ ...inputData, passengersCount: "6" })
                      }
                    />
                    <label
                      htmlFor='pcoung-1'
                      className='ml-[12px] text-[35px] text-[#212E56]'
                    >
                      6
                    </label>
                  </div>
                </div>
                {/* {passengersNum.map((d, k) => (
                <>
                  <div key={k} className='flex items-center mt-[12px]'>
                    <input
                      id='default-radio-1'
                      type='radio'
                      value=''
                      name='default-radio'
                      className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                    />
                    <label
                      htmlFor='default-radio-1'
                      className='ml-[12px] text-[35px] text-[#212E56]'
                    >
                      {d}
                    </label>
                  </div>
                </>
              ))} */}
              </div>
            </div>
            ,<div className='mt-[40px]'></div>
            {/* 픽업날짜 */}
            <div className='flex flex-col'>
              <div className='bg-slate-200 w-[720px] pl-[15px] rounded-lg py-[10px] flex items-center'>
                <div className='text-[#212E56] text-[40px]'>
                  {langData["c7-q-1"]}
                </div>
                {/* <div className='text-[#1369F9] text-[35px] pl-[20px]'>
                  {langData["c7-q-2"]}
                </div> */}
              </div>
              <div className='mt-[3px] '></div>
              <div className='w-[720px] h-[75px]'>
                <DatePicker
                  className='text-[35px] rounded-2xl w-[720px] h-[70px] text-black '
                  selected={picDate}
                  onChange={(date: any) => setPicDate(date)}
                  showTimeSelect
                  timeFormat='HH:mm'
                  timeIntervals={5}
                  timeCaption='time'
                  dateFormat='yyyy/MM/dd h:mm aa'
                  customInput={<ExampleCustomInput />}
                />
              </div>
            </div>
            ,<div className='mt-[40px]'></div>
            {/* 픽업시간 */}
            {/* <div className='flex flex-col'>
              <div className='bg-slate-200 w-[720px] pl-[15px] rounded-lg py-[10px] flex items-center'>
                <div className='text-[#212E56] text-[40px]'>
                  {langData["c8-q-1"]}
                </div>
                <div className='text-[#1369F9] text-[35px] pl-[20px]'>
                  {langData["c8-q-2"]}
                </div>
              </div>
              <div className='mt-[3px] '></div>
              <input className='w-[720px] h-[75px] text-black text-[35px] pr-2 pl-5' />
            </div> */}
            {/* ,<div className='mt-[40px]'></div> */}
            {/* Whatsapp ID */}
            <div className='flex flex-col'>
              <div className='bg-slate-200 w-[720px] pl-[15px] py-[20px] rounded-lg'>
                <div className='text-[#212E56] text-[40px]'>
                  {langData["c9-q-1"]}
                </div>
                <div className='text-[#1369F9] text-[30px]'>
                  {langData["c9-q-2"]}
                </div>
              </div>
              <div className='mt-[3px] '></div>
              <input
                className='w-[720px] h-[75px] text-black text-[35px] pl-5'
                onChange={(e) =>
                  setInputData({ ...inputData, whatappid: e.target.value })
                }
              />
            </div>
            {/* end */}
          </div>
          <div className='absolute top-[2880px] bg-[#212e56] w-full h-full'>
            <div className='flex flex-col'>
              <div className='text-[38px] pt-[55px] pl-[80px]'>
                {langData["desc-h"]}
              </div>
              <div className='text-[34px] whitespace-pre-wrap tracking-wide pl-[80px] pr-[80px] pt-[10px]'>
                {langData["desc"]}
              </div>
              <div className='flex flex-col items-center justify-center pt-5'>
                <div className='rectangle-15'></div>
                <svg
                  className='polygon-12'
                  width='76'
                  height='45'
                  viewBox='0 0 76 45'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M37.94 45L5.08314 11.25L70.7969 11.25L37.94 45Z'
                    fill='#D8F0FD'
                  />
                </svg>
                <div className='text-black mt-[-60px] text-2xl font-bold'>
                  <div className='text-center'>{langData["qr-lang"]}</div>
                </div>
                <Image
                  className='pt-[34px]'
                  src={`/img/` + langData["qr-img"]}
                  width={250}
                  height={250}
                  alt=''
                />
              </div>
            </div>
          </div>

          <svg
            className='vector'
            width='1'
            height='37'
            viewBox='0 0 1 37'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M0.5 0.970581C0.224242 0.970581 0 1.43619 0 2.00874V35.23C0 35.8026 0.224245 36.2682 0.5 36.2682C0.775755 36.2682 1 35.8026 1 35.23V2.00874C1 1.43618 0.775755 0.970581 0.5 0.970581Z'
              fill='#3F3D56'
            />
          </svg>
          <div className='group-70'>
            <svg
              className='vector2'
              width='44'
              height='64'
              viewBox='0 0 44 64'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M13.1636 63.4343C10.1993 63.434 7.33118 62.1811 5.06916 59.8983C2.80714 57.6156 1.29783 54.451 0.80957 50.9672L0.805578 50.9385L0.821213 50.9161C1.62251 49.7728 2.27018 48.4884 2.74121 47.1087C2.18066 47.9648 1.50353 48.7028 0.737997 49.2918L0.659493 49.3542L0.654931 49.2419C0.644931 48.9947 0.639837 48.749 0.639837 48.5118C0.632892 45.9744 1.1722 43.4772 2.20624 41.2589C3.24027 39.0406 4.73448 37.1753 6.54607 35.8413C4.70837 33.5568 3.32562 30.8088 2.50027 27.8011C1.67492 24.7933 1.42812 21.6027 1.77815 18.4659C2.12819 15.329 3.06608 12.3262 4.52236 9.67986C5.97863 7.03355 7.91594 4.81156 10.1908 3.17853C12.4656 1.54551 15.0197 0.543313 17.6638 0.24616C20.3078 -0.0509928 22.9741 0.364523 25.4651 1.46194C27.9561 2.55935 30.208 4.31052 32.0538 6.58572C33.8997 8.86093 35.2922 11.6019 36.1283 14.6054L36.1441 14.6621L36.0976 14.6845C35.0312 15.2324 33.8835 15.5204 32.7221 15.5317C33.9313 15.9397 35.1864 16.1205 36.4424 16.0677L36.4856 16.0659L36.4961 16.1159C36.847 17.7927 37.0242 19.5145 37.0239 21.2427C37.0239 21.305 37.0237 21.3673 37.0232 21.4296C37.0199 22.7734 37.2541 24.1029 37.7109 25.3315C38.1676 26.5602 38.8365 27.6603 39.674 28.5603C41.0119 30.0107 42.0702 31.7892 42.7761 33.7734C43.4821 35.7577 43.8188 37.9006 43.7633 40.0548C43.7078 42.209 43.2613 44.3233 42.4545 46.2522C41.6477 48.1811 40.4998 49.8788 39.0897 51.2286L39.064 51.2532L39.034 51.237C37.1825 50.236 35.893 49.1186 35.0147 47.7467C35.6086 49.4742 36.4744 51.0502 37.5654 52.3899L37.6129 52.4483L37.554 52.4893C35.6824 53.7884 33.5602 54.4873 31.3943 54.518C29.2285 54.5487 27.0929 53.9101 25.1959 52.6645C24.4339 55.7661 22.8505 58.491 20.6819 60.432C18.5133 62.3731 15.8759 63.4263 13.1636 63.4343Z'
                fill='#B1E2FC'
              />
            </svg>

            <svg
              className='vector3'
              width='12'
              height='57'
              viewBox='0 0 12 57'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M0.702004 56.2038C0.64726 56.2037 0.594364 56.1801 0.553038 56.1373C0.511712 56.0946 0.484707 56.0354 0.476994 55.9708C-0.118021 49.6485 -0.153598 43.2692 0.370851 36.9381C1.15622 26.9505 3.67837 12.5648 11.2337 0.75008C11.2518 0.721584 11.2744 0.697627 11.3003 0.679567C11.3261 0.661507 11.3547 0.649705 11.3844 0.644847C11.4141 0.639989 11.4443 0.642196 11.4733 0.651283C11.5022 0.66037 11.5294 0.676162 11.5533 0.697803C11.5771 0.719445 11.5971 0.74648 11.6121 0.777363C11.6272 0.808246 11.637 0.842373 11.6409 0.877769C11.6449 0.913165 11.6429 0.949155 11.6351 0.983646C11.6274 1.01814 11.614 1.05045 11.5957 1.07876C4.10562 12.7915 1.6038 27.0715 0.823963 36.9886C0.302348 43.2775 0.33707 49.6142 0.927555 55.8944C0.932118 55.9329 0.929687 55.9721 0.920443 56.0094C0.911198 56.0466 0.895373 56.0811 0.873988 56.1104C0.852603 56.1397 0.826174 56.1632 0.796504 56.1793C0.766834 56.1955 0.73461 56.2038 0.702004 56.2038Z'
                fill='#212E56'
              />
            </svg>

            <svg
              className='vector4'
              width='24'
              height='8'
              viewBox='0 0 24 8'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M0.478697 7.37249C0.430631 7.37254 0.383789 7.35446 0.344885 7.32082C0.305981 7.28719 0.277024 7.23973 0.262149 7.18527C0.247275 7.13081 0.24725 7.07215 0.262089 7.01767C0.276929 6.9632 0.305853 6.91572 0.344735 6.88205C2.49757 5.14571 4.82324 3.73508 7.26822 2.68258C11.088 1.01628 16.8966 -0.494345 22.8765 1.77335C22.934 1.79516 22.9819 1.84329 23.0096 1.90715C23.0373 1.97102 23.0426 2.04539 23.0243 2.1139C23.006 2.18241 22.9656 2.23946 22.912 2.27248C22.8584 2.30551 22.796 2.31181 22.7385 2.29001C16.8812 0.0689141 11.1778 1.55456 7.42469 3.19184C5.01902 4.2263 2.73067 5.6132 0.612299 7.32068C0.573498 7.35437 0.526707 7.37252 0.478697 7.37249Z'
                fill='#212E56'
              />
            </svg>

            <svg
              className='vector5'
              width='84'
              height='363'
              viewBox='0 0 84 363'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M53.7314 61.3822H51.1596V40.6025C51.1596 37.7942 50.3094 35.1011 48.7962 33.1154C47.283 31.1297 45.2306 30.0141 43.0906 30.0141H31.9468V0.111816H30.1596V30.0141H14.9681V61.3822H0V362.164H84V101.102C84 90.5676 80.811 80.4647 75.1345 73.0158C69.4581 65.5669 61.7591 61.3822 53.7314 61.3822Z'
                fill='#B1E2FC'
              />
            </svg>

            <svg
              className='vector6'
              width='93'
              height='249'
              viewBox='0 0 93 249'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M61.5329 46.1277V39.069C61.5318 36.3721 60.6658 33.7777 59.1119 31.8168C57.5581 29.8558 55.434 28.6766 53.1745 28.5205V0.954468H51.2078V28.4892H42.3577V46.0645H0.56543V248.181H93V85.7521C92.9996 75.6064 89.7382 65.8462 83.8859 58.4767C78.0335 51.1072 70.0347 46.6883 61.5329 46.1277Z'
                fill='#B1E2FC'
                fill-opacity='0.5'
              />
            </svg>

            <svg
              className='vector7'
              width='14'
              height='13'
              viewBox='0 0 14 13'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M13.0991 0.770996H0.807251V12.4879H13.0991V0.770996Z'
                fill='white'
              />
            </svg>

            <svg
              className='vector8'
              width='14'
              height='13'
              viewBox='0 0 14 13'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M13.2577 0.770996H0.96582V12.4879H13.2577V0.770996Z'
                fill='white'
              />
            </svg>

            <svg
              className='vector9'
              width='13'
              height='13'
              viewBox='0 0 13 13'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M12.4163 0.770996H0.124512V12.4879H12.4163V0.770996Z'
                fill='white'
              />
            </svg>

            <svg
              className='vector10'
              width='14'
              height='13'
              viewBox='0 0 14 13'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M13.0991 0.649048H0.807251V12.366H13.0991V0.649048Z'
                fill='white'
              />
            </svg>

            <svg
              className='vector11'
              width='14'
              height='13'
              viewBox='0 0 14 13'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M13.2577 0.649048H0.96582V12.366H13.2577V0.649048Z'
                fill='white'
              />
            </svg>

            <svg
              className='vector12'
              width='13'
              height='13'
              viewBox='0 0 13 13'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M12.4163 0.649048H0.124512V12.366H12.4163V0.649048Z'
                fill='white'
              />
            </svg>

            <svg
              className='vector13'
              width='14'
              height='13'
              viewBox='0 0 14 13'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M13.0991 0.527222H0.807251V12.2441H13.0991V0.527222Z'
                fill='white'
              />
            </svg>

            <svg
              className='vector14'
              width='14'
              height='13'
              viewBox='0 0 14 13'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M13.2577 0.527222H0.96582V12.2441H13.2577V0.527222Z'
                fill='white'
              />
            </svg>

            <svg
              className='vector15'
              width='13'
              height='13'
              viewBox='0 0 13 13'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M12.4163 0.527222H0.124512V12.2441H12.4163V0.527222Z'
                fill='white'
              />
            </svg>

            <svg
              className='vector16'
              width='14'
              height='13'
              viewBox='0 0 14 13'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M13.0991 0.405273H0.807251V12.1222H13.0991V0.405273Z'
                fill='white'
              />
            </svg>

            <svg
              className='vector17'
              width='14'
              height='13'
              viewBox='0 0 14 13'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M13.2577 0.405273H0.96582V12.1222H13.2577V0.405273Z'
                fill='white'
              />
            </svg>

            <svg
              className='vector18'
              width='13'
              height='13'
              viewBox='0 0 13 13'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M12.4163 0.405273H0.124512V12.1222H12.4163V0.405273Z'
                fill='white'
              />
            </svg>

            <svg
              className='vector19'
              width='14'
              height='12'
              viewBox='0 0 14 12'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M13.0991 0.283447H0.807251V12.0004H13.0991V0.283447Z'
                fill='white'
              />
            </svg>

            <svg
              className='vector20'
              width='14'
              height='12'
              viewBox='0 0 14 12'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M13.2577 0.283447H0.96582V12.0004H13.2577V0.283447Z'
                fill='white'
              />
            </svg>

            <svg
              className='vector21'
              width='13'
              height='12'
              viewBox='0 0 13 12'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M12.4163 0.283447H0.124512V12.0004H12.4163V0.283447Z'
                fill='white'
              />
            </svg>

            <svg
              className='vector22'
              width='14'
              height='12'
              viewBox='0 0 14 12'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M13.0991 0.16156H0.807251V11.8785H13.0991V0.16156Z'
                fill='white'
              />
            </svg>

            <svg
              className='vector23'
              width='14'
              height='12'
              viewBox='0 0 14 12'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M13.2577 0.16156H0.96582V11.8785H13.2577V0.16156Z'
                fill='white'
              />
            </svg>

            <svg
              className='vector24'
              width='13'
              height='12'
              viewBox='0 0 13 12'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M12.4163 0.16156H0.124512V11.8785H12.4163V0.16156Z'
                fill='white'
              />
            </svg>

            <svg
              className='vector25'
              width='40'
              height='5'
              viewBox='0 0 40 5'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M39.8255 0.894043H0V4.40911H39.8255V0.894043Z'
                fill='white'
              />
            </svg>

            <svg
              className='vector26'
              width='40'
              height='5'
              viewBox='0 0 40 5'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M39.8255 0.570312H0V4.08538H39.8255V0.570312Z'
                fill='white'
              />
            </svg>

            <svg
              className='vector27'
              width='40'
              height='4'
              viewBox='0 0 40 4'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M39.8255 0.246582H0V3.76165H39.8255V0.246582Z'
                fill='white'
              />
            </svg>

            <svg
              className='vector28'
              width='40'
              height='5'
              viewBox='0 0 40 5'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M39.8255 0.922852H0V4.43792H39.8255V0.922852Z'
                fill='white'
              />
            </svg>

            <svg
              className='vector29'
              width='40'
              height='5'
              viewBox='0 0 40 5'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M39.8255 0.599182H0V4.11425H39.8255V0.599182Z'
                fill='white'
              />
            </svg>

            <svg
              className='vector30'
              width='40'
              height='4'
              viewBox='0 0 40 4'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M39.8255 0.275391H0V3.79046H39.8255V0.275391Z'
                fill='white'
              />
            </svg>

            <svg
              className='vector31'
              width='40'
              height='5'
              viewBox='0 0 40 5'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M39.8255 0.95166H0V4.46673H39.8255V0.95166Z'
                fill='white'
              />
            </svg>

            <svg
              className='vector32'
              width='41'
              height='5'
              viewBox='0 0 41 5'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M40.1301 0.515381H0.304565V4.03045H40.1301V0.515381Z'
                fill='white'
              />
            </svg>

            <svg
              className='group-71'
              width='70'
              height='161'
              viewBox='0 0 70 161'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M53.0833 42.9762H50.6423V38.9098C50.6413 36.2129 49.7752 33.6185 48.2214 31.6576C46.6675 29.6966 44.5435 28.5174 42.2839 28.3613V0.795288H40.3172V28.33H31.4671V42.9762H0V160.731H69.8176V62.9156C69.8176 60.2971 69.3848 57.7043 68.5438 55.2851C67.7028 52.8659 66.4702 50.6678 64.9162 48.8163C63.3623 46.9647 61.5175 45.496 59.4872 44.4939C57.4569 43.4919 55.2809 42.9762 53.0833 42.9762Z'
                fill='#B1E2FC'
                fill-opacity='0.5'
              />
              <path
                d='M21.6097 63.2441H9.31787V74.961H21.6097V63.2441Z'
                fill='white'
              />
              <path
                d='M41.7684 63.2441H29.4766V74.961H41.7684V63.2441Z'
                fill='white'
              />
              <path
                d='M61.9271 63.2441H49.6353V74.961H61.9271V63.2441Z'
                fill='white'
              />
              <path
                d='M21.8558 93.1222H9.56396V104.839H21.8558V93.1222Z'
                fill='white'
              />
              <path
                d='M42.0145 93.1222H29.7227V104.839H42.0145V93.1222Z'
                fill='white'
              />
              <path
                d='M62.1727 93.1222H49.8809V104.839H62.1727V93.1222Z'
                fill='white'
              />
              <path
                d='M22.1014 123H9.80957V134.717H22.1014V123Z'
                fill='white'
              />
              <path
                d='M42.2601 123H29.9683V134.717H42.2601V123Z'
                fill='white'
              />
              <path d='M62.4188 123H50.127V134.717H62.4188V123Z' fill='white' />
            </svg>

            <svg
              className='vector43'
              width='13'
              height='13'
              viewBox='0 0 13 13'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M12.2918 0.451904H0V12.1688H12.2918V0.451904Z'
                fill='white'
              />
            </svg>

            <svg
              className='vector44'
              width='5'
              height='7'
              viewBox='0 0 5 7'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M4.13174 6.94291C3.05355 6.63101 2.10351 5.87258 1.45129 4.8031C0.799068 3.73362 0.487127 2.42271 0.57119 1.10448C0.588969 0.837825 0.937578 0.858207 0.919794 1.12522C0.839612 2.35258 1.13028 3.57368 1.73933 4.5681C2.34839 5.56252 3.23571 6.26478 4.24115 6.54812C4.45959 6.61 4.34892 7.00444 4.13174 6.94291Z'
                fill='white'
              />
            </svg>

            <svg
              className='vector45'
              width='5'
              height='8'
              viewBox='0 0 5 8'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M0.604892 7.21927C2.55224 5.83382 3.98978 3.62473 4.63089 1.03246C4.69423 0.775567 5.02549 0.906206 4.96222 1.16279C4.29085 3.85889 2.79093 6.15419 0.761811 7.59061C0.568328 7.72736 0.412456 7.35528 0.604892 7.21927Z'
                fill='white'
              />
            </svg>

            <svg
              className='vector46'
              width='4'
              height='2'
              viewBox='0 0 4 2'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M0.542456 0.53557C0.938529 0.759618 1.37514 0.86304 1.8131 0.836575C2.25105 0.81011 2.67662 0.654566 3.0516 0.383924C3.24353 0.244449 3.39922 0.616343 3.20853 0.754911C2.79307 1.05164 2.32289 1.22274 1.83907 1.25325C1.35525 1.28377 0.872517 1.17276 0.433042 0.929956C0.390007 0.911203 0.354578 0.873654 0.333966 0.824929C0.313355 0.776204 0.309099 0.719963 0.322068 0.667639C0.336773 0.615503 0.368176 0.572379 0.40944 0.547644C0.450704 0.52291 0.498514 0.518588 0.542456 0.53557Z'
                fill='white'
              />
            </svg>

            <svg
              className='vector47'
              width='33'
              height='34'
              viewBox='0 0 33 34'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M32.5523 1.09482C32.4346 1.18605 32.3168 1.27726 32.1989 1.37201C30.621 2.60836 29.1299 3.99544 27.7405 5.51952C27.6315 5.63532 27.5225 5.75462 27.4165 5.87391C24.102 9.58826 21.3949 14.0036 19.4331 18.8954C18.6539 20.8428 18.0002 22.8581 17.4777 24.9237C16.7561 27.7764 16.1643 30.9379 14.736 33.2713C14.5893 33.5168 14.4299 33.7512 14.2589 33.9731H1.35156C1.32223 33.9556 1.29275 33.9415 1.26328 33.924L0.747925 33.9521C0.768634 33.8433 0.792071 33.731 0.812775 33.6222C0.824575 33.5591 0.839232 33.4959 0.851022 33.4328C0.859793 33.3907 0.868724 33.3485 0.874624 33.3099C0.877501 33.2959 0.880531 33.2819 0.883402 33.2714C0.889302 33.2328 0.898213 33.1977 0.904108 33.1626C1.03366 32.5345 1.16715 31.9064 1.30457 31.2783C1.30457 31.2748 1.30456 31.2748 1.30743 31.2713C2.31611 26.4734 3.79891 21.8349 5.72472 17.4533C5.78368 17.3234 5.84248 17.1901 5.90733 17.0602C6.7991 15.1207 7.82241 13.2712 8.96707 11.5303C9.59642 10.5794 10.2658 9.66707 10.9725 8.79684C12.8023 6.55247 14.917 4.66502 17.2391 3.20367C21.8685 0.291293 27.228 -0.824533 32.1755 0.954474C32.302 1.00009 32.4258 1.04569 32.5523 1.09482Z'
                fill='#CACACA'
              />
            </svg>

            <svg
              className='vector48'
              width='33'
              height='34'
              viewBox='0 0 33 34'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M32.5234 1.28994C26.0961 2.81099 20.2343 6.70644 15.7708 12.423C14.7916 13.6333 13.9786 15.02 13.3618 16.532C12.8008 18.0279 12.5863 19.6756 12.7406 21.3038C12.8588 22.8253 13.1276 24.3654 12.9334 25.8947C12.8242 26.6758 12.5776 27.4205 12.21 28.0801C11.8423 28.7396 11.3617 29.2992 10.7999 29.7219C9.42279 30.8187 7.79711 31.2605 6.19474 31.6267C4.4156 32.0333 2.56225 32.4221 1.07736 33.7463C0.897448 33.9067 0.699031 33.5647 0.878669 33.4045C3.46208 31.1007 6.92406 31.5841 9.75021 29.9577C11.069 29.1988 12.2037 27.9618 12.5304 26.2035C12.8161 24.6659 12.5401 23.0775 12.4092 21.5381C12.2392 19.9524 12.3976 18.3413 12.8707 16.8453C13.4209 15.3008 14.1877 13.8792 15.1383 12.6412C17.2409 9.81344 19.7037 7.39721 22.4362 5.481C25.5447 3.27345 28.9473 1.71576 32.4966 0.875332C32.7163 0.823426 32.7417 1.23836 32.5234 1.28994Z'
                fill='white'
              />
            </svg>

            <svg
              className='vector49'
              width='2'
              height='8'
              viewBox='0 0 2 8'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M1.1172 7.48148C0.413921 6.45896 0.038594 5.17187 0.0582282 3.85005C0.0778623 2.52824 0.491188 1.25776 1.22439 0.265543C1.37332 0.0653888 1.64136 0.331755 1.49223 0.532184C0.808035 1.45464 0.423109 2.63812 0.406937 3.86904C0.390765 5.09996 0.744406 6.29721 1.40403 7.24473C1.54716 7.45084 1.25952 7.68641 1.1172 7.48148Z'
                fill='white'
              />
            </svg>

            <svg
              className='vector50'
              width='3'
              height='3'
              viewBox='0 0 3 3'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M0.604279 0.820187C0.807205 1.28338 1.10352 1.67925 1.46658 1.97228C1.82965 2.26531 2.24811 2.44631 2.68439 2.49902C2.90818 2.52524 2.84438 2.93414 2.62205 2.90808C2.14026 2.84718 1.67831 2.64661 1.27658 2.32392C0.874844 2.00122 0.545544 1.56621 0.317449 1.0569C0.292574 1.01104 0.283289 0.95562 0.291476 0.901892C0.299663 0.848165 0.324715 0.800174 0.361533 0.76766C0.399643 0.736543 0.446513 0.724607 0.491969 0.734442C0.537424 0.744276 0.577783 0.775093 0.604279 0.820187Z'
                fill='white'
              />
            </svg>

            <svg
              className='vector51'
              width='17'
              height='50'
              viewBox='0 0 17 50'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M0.903735 22.0055C1.88075 12.6445 6.74968 3.4211 14.2422 0.374756C11.2874 10.0099 11.288 20.5799 14.244 30.2145C15.3953 33.9253 17.0002 37.9097 15.9172 41.6496C15.2434 43.9766 13.595 45.757 11.7524 46.8703C9.90978 47.9835 7.86478 48.5141 5.84541 49.0341L5.44799 49.4257C2.24224 40.8005 -0.0732839 31.3666 0.903735 22.0055Z'
                fill='#212E56'
              />
            </svg>

            <svg
              className='vector52'
              width='10'
              height='50'
              viewBox='0 0 10 50'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M9.31661 0.551799C4.9533 6.37716 2.24137 13.6926 1.56603 21.459C1.39574 23.1278 1.44727 24.8183 1.71875 26.468C2.02678 28.0648 2.68807 29.5343 3.63392 30.7236C4.49713 31.8537 5.48992 32.8905 6.10756 34.2509C6.41503 34.9529 6.59452 35.7244 6.63422 36.5148C6.67392 37.3052 6.57293 38.0966 6.33791 38.8373C5.7926 40.7008 4.71785 42.2199 3.62347 43.6618C2.40839 45.2628 1.12504 46.9028 0.608553 49.0253C0.545973 49.2825 0.214718 49.1517 0.277219 48.8949C1.17584 45.2021 4.1843 43.1046 5.61904 39.7786C6.28851 38.2266 6.56953 36.4248 5.94191 34.7865C5.39308 33.3539 4.37006 32.2837 3.48774 31.1485C2.55076 30.0044 1.86314 28.6042 1.48498 27.0705C1.14388 25.4425 1.03778 23.7573 1.1712 22.087C1.42124 18.3208 2.16672 14.6248 3.38031 11.1345C4.74682 7.14189 6.67646 3.45727 9.08575 0.239997C9.23493 0.0409383 9.46481 0.354047 9.31661 0.551799Z'
                fill='white'
              />
            </svg>

            <svg
              className='vector53'
              width='4'
              height='7'
              viewBox='0 0 4 7'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M3.65994 6.94291C2.58175 6.63101 1.6317 5.87258 0.979473 4.8031C0.327251 3.73362 0.0153257 2.42271 0.099389 1.10448C0.117168 0.837825 0.465762 0.858207 0.447978 1.12522C0.367796 2.35258 0.658478 3.57368 1.26753 4.5681C1.87659 5.56252 2.76391 6.26478 3.76935 6.54812C3.98779 6.61 3.87712 7.00444 3.65994 6.94291Z'
                fill='white'
              />
            </svg>

            <svg
              className='vector54'
              width='5'
              height='8'
              viewBox='0 0 5 8'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M0.132839 7.21927C2.08019 5.83382 3.51776 3.62473 4.15886 1.03246C4.22221 0.775567 4.55347 0.906206 4.4902 1.16279C3.81882 3.85889 2.31891 6.15419 0.289788 7.59061C0.0963049 7.72736 -0.0595968 7.35528 0.132839 7.21927Z'
                fill='white'
              />
            </svg>

            <svg
              className='vector55'
              width='4'
              height='2'
              viewBox='0 0 4 2'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M1.07054 0.53557C1.46661 0.759618 1.90321 0.86304 2.34116 0.836575C2.77912 0.81011 3.2047 0.654566 3.57968 0.383924C3.77161 0.244449 3.92728 0.616343 3.7366 0.754911C3.32114 1.05164 2.85094 1.22274 2.36712 1.25325C1.8833 1.28377 1.40057 1.17276 0.961093 0.929956C0.918058 0.911203 0.882644 0.873654 0.862032 0.824929C0.841421 0.776204 0.83718 0.719963 0.850149 0.667639C0.864854 0.615503 0.896242 0.572379 0.937506 0.547644C0.97877 0.52291 1.0266 0.518588 1.07054 0.53557Z'
                fill='white'
              />
            </svg>

            <svg
              className='vector56'
              width='33'
              height='34'
              viewBox='0 0 33 34'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M32.0805 1.09482C31.9628 1.18605 31.845 1.27726 31.7271 1.37201C30.1492 2.60836 28.6581 3.99544 27.2687 5.51952C27.1597 5.63532 27.0507 5.75462 26.9447 5.87391C23.6301 9.58826 20.9231 14.0036 18.9613 18.8954C18.1821 20.8428 17.5284 22.8581 17.0059 24.9237C16.2843 27.7764 15.6925 30.9379 14.2642 33.2713C14.1175 33.5168 13.9581 33.7512 13.7871 33.9731H0.879761C0.850428 33.9556 0.820949 33.9415 0.791474 33.924L0.276123 33.9521C0.296832 33.8433 0.320269 33.731 0.340973 33.6222C0.352773 33.5591 0.367445 33.4959 0.379235 33.4328C0.388007 33.3907 0.396922 33.3485 0.402823 33.3099C0.405699 33.2959 0.408714 33.2819 0.411585 33.2714C0.417485 33.2328 0.426397 33.1977 0.432292 33.1626C0.561848 32.5345 0.69535 31.9064 0.832767 31.2783C0.832767 31.2748 0.832771 31.2748 0.835647 31.2713C1.84433 26.4734 3.32709 21.8349 5.2529 17.4533C5.31186 17.3234 5.37069 17.1901 5.43554 17.0602C6.32731 15.1207 7.35061 13.2712 8.49527 11.5303C9.12461 10.5794 9.79396 9.66707 10.5007 8.79684C12.3305 6.55247 14.4452 4.66502 16.7673 3.20367C21.3967 0.291293 26.7562 -0.824533 31.7037 0.954474C31.8302 1.00009 31.954 1.04569 32.0805 1.09482Z'
                fill='#CACACA'
              />
            </svg>

            <svg
              className='vector57'
              width='33'
              height='34'
              viewBox='0 0 33 34'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M32.0515 1.28994C25.6241 2.81099 19.7624 6.70644 15.2989 12.423C14.3197 13.6333 13.5067 15.02 12.8899 16.532C12.3289 18.0279 12.1145 19.6756 12.2687 21.3038C12.3869 22.8253 12.6557 24.3654 12.4614 25.8947C12.3522 26.6758 12.1057 27.4205 11.738 28.0801C11.3704 28.7396 10.8898 29.2992 10.3279 29.7219C8.95087 30.8187 7.32519 31.2605 5.72281 31.6267C3.94368 32.0333 2.0903 32.4221 0.605437 33.7463C0.425524 33.9067 0.227107 33.5647 0.406745 33.4045C2.99016 31.1007 6.45213 31.5841 9.27829 29.9577C10.597 29.1988 11.7318 27.9618 12.0585 26.2035C12.3442 24.6659 12.0681 23.0775 11.9372 21.5381C11.7672 19.9524 11.9257 18.3413 12.3987 16.8453C12.949 15.3008 13.7158 13.8792 14.6663 12.6412C16.769 9.81344 19.2317 7.3972 21.9643 5.481C25.0728 3.27345 28.4754 1.71576 32.0247 0.875332C32.2444 0.823426 32.2698 1.23836 32.0515 1.28994Z'
                fill='white'
              />
            </svg>

            <svg
              className='vector58'
              width='3'
              height='8'
              viewBox='0 0 3 8'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M1.6454 7.48148C0.94212 6.45896 0.566792 5.17187 0.586426 3.85005C0.606061 2.52824 1.01939 1.25776 1.75259 0.265543C1.90152 0.0653888 2.16956 0.331755 2.02042 0.532184C1.33623 1.45464 0.951307 2.63812 0.935135 3.86904C0.918963 5.09996 1.2726 6.29721 1.93223 7.24473C2.07536 7.45084 1.78772 7.68641 1.6454 7.48148Z'
                fill='white'
              />
            </svg>

            <svg
              className='vector59'
              width='4'
              height='3'
              viewBox='0 0 4 3'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M1.13249 0.820187C1.33542 1.28338 1.63171 1.67925 1.99478 1.97228C2.35784 2.26531 2.77631 2.44631 3.21259 2.49902C3.43638 2.52524 3.37259 2.93414 3.15026 2.90808C2.66847 2.84718 2.20652 2.64661 1.80479 2.32392C1.40305 2.00122 1.07375 1.56621 0.84566 1.0569C0.820786 1.01104 0.811485 0.95562 0.819672 0.901892C0.82786 0.848165 0.852896 0.800174 0.889714 0.76766C0.927824 0.736543 0.974709 0.724607 1.02016 0.734442C1.06562 0.744276 1.10599 0.775093 1.13249 0.820187Z'
                fill='white'
              />
            </svg>

            <svg
              className='vector60'
              width='30'
              height='9'
              viewBox='0 0 30 9'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M22.7254 2.07437C21.6983 1.21051 20.5746 0.309699 19.3178 0.345711C16.2759 0.432867 14.6359 5.74624 11.5971 5.55938C9.65924 5.44021 8.3728 3.09451 6.56841 2.24398C4.21926 1.13673 1.22981 3.30226 0.973511 6.29683L1.27521 5.96782C10.4068 8.62032 19.8829 9.14195 29.1808 7.50391C27.0291 5.69407 24.8773 3.88422 22.7254 2.07437Z'
                fill='white'
              />
            </svg>

            <svg
              className='vector61'
              width='29'
              height='9'
              viewBox='0 0 29 9'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M21.7519 2.35172C20.7248 1.48786 19.6011 0.587043 18.3443 0.623055C15.3024 0.710211 13.6624 6.02358 10.6236 5.83672C8.68574 5.71756 7.39928 3.37186 5.59488 2.52132C3.24574 1.41407 0.256299 3.57961 0 6.57417L0.301684 6.24516C9.43327 8.89767 18.9094 9.41929 28.2074 7.78125C26.0556 5.97141 23.9037 4.16156 21.7519 2.35172Z'
                fill='white'
              />
            </svg>

            <svg
              className='vector62'
              width='29'
              height='9'
              viewBox='0 0 29 9'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M21.7519 1.98935C20.7248 1.12549 19.6011 0.224677 18.3443 0.260689C15.3024 0.347845 13.6624 5.66121 10.6236 5.47436C8.68574 5.35519 7.39928 3.00949 5.59488 2.15896C3.24574 1.05171 0.256299 3.21724 0 6.21181L0.301684 5.8828C9.43327 8.5353 18.9094 9.05693 28.2074 7.41889C26.0556 5.60904 23.9037 3.79919 21.7519 1.98935Z'
                fill='white'
              />
            </svg>

            <svg
              className='vector63'
              width='29'
              height='9'
              viewBox='0 0 29 9'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M21.7519 1.88406C20.7248 1.02021 19.6011 0.119391 18.3443 0.155403C15.3024 0.242559 13.6624 5.55593 10.6236 5.36907C8.68574 5.24991 7.39928 2.90421 5.59488 2.05367C3.24574 0.946423 0.256299 3.11195 0 6.10652L0.301684 5.77751C9.43327 8.43002 18.9094 8.95164 28.2074 7.3136C26.0556 5.50376 23.9037 3.69391 21.7519 1.88406Z'
                fill='white'
              />
            </svg>

            <svg
              className='vector64'
              width='29'
              height='9'
              viewBox='0 0 29 9'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M21.7519 2.2804C20.7248 1.41654 19.6011 0.515723 18.3443 0.551735C15.3024 0.638891 13.6624 5.95226 10.6236 5.76541C8.68574 5.64624 7.39928 3.30054 5.59488 2.45C3.24574 1.34275 0.256299 3.50829 0 6.50285L0.301684 6.17384C9.43327 8.82635 18.9094 9.34797 28.2074 7.70993C26.0556 5.90009 23.9037 4.09024 21.7519 2.2804Z'
                fill='white'
              />
            </svg>

            <svg
              className='vector65'
              width='30'
              height='9'
              viewBox='0 0 30 9'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M22.6762 1.89092C21.6491 1.02706 20.5255 0.126227 19.2686 0.162239C16.2268 0.249395 14.5867 5.56277 11.548 5.37592C9.61006 5.25675 8.32359 2.91105 6.5192 2.06051C4.17005 0.953267 1.18062 3.11879 0.924316 6.11336L1.226 5.78435C10.3576 8.43686 19.8337 8.95849 29.1317 7.32045C26.9799 5.5106 24.8281 3.70076 22.6762 1.89092Z'
                fill='white'
              />
            </svg>

            <svg
              className='vector66'
              width='2'
              height='1'
              viewBox='0 0 2 1'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M0.990967 0.553515C1.01707 0.533796 1.03878 0.506826 1.0542 0.474924C1.06961 0.443022 1.07827 0.407137 1.07946 0.370361C1.05372 0.39715 1.02872 0.425522 1.00267 0.451596C0.998889 0.486017 0.997629 0.518439 0.990967 0.553515Z'
                fill='#2F2E41'
              />
            </svg>

            <svg
              className='vector67'
              width='3'
              height='2'
              viewBox='0 0 3 2'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M2.64408 0.221495L0.451805 1.55956C0.43104 1.57224 0.406909 1.57457 0.384704 1.56604C0.3625 1.5575 0.344025 1.53881 0.333388 1.51406C0.322752 1.48932 0.320825 1.46055 0.327987 1.43409C0.335149 1.40763 0.350825 1.38566 0.37159 1.37298L2.56386 0.0349143C2.57415 0.0285338 2.58541 0.0246347 2.59696 0.0234541C2.60852 0.0222735 2.62018 0.0238305 2.63123 0.028031C2.64229 0.0322315 2.65251 0.038993 2.66136 0.0479299C2.67021 0.0568668 2.6775 0.0677917 2.68279 0.0800934C2.68808 0.0923952 2.69127 0.105826 2.69218 0.119605C2.6931 0.133384 2.69173 0.147245 2.68813 0.160386C2.68454 0.173527 2.67879 0.185693 2.67124 0.196179C2.66368 0.206665 2.65444 0.215273 2.64408 0.221495Z'
                fill='white'
              />
            </svg>

            <svg
              className='vector68'
              width='2'
              height='2'
              viewBox='0 0 2 2'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M0.948561 1.00274C0.98743 1.00274 1.01893 0.964967 1.01893 0.918384C1.01893 0.871801 0.98743 0.834045 0.948561 0.834045C0.909692 0.834045 0.878174 0.871801 0.878174 0.918384C0.878174 0.964967 0.909692 1.00274 0.948561 1.00274Z'
                fill='white'
              />
            </svg>

            <svg
              className='vector69'
              width='3'
              height='5'
              viewBox='0 0 3 5'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M2.18223 4.04212C2.14484 4.06487 2.10139 4.06904 2.06144 4.05368C2.02148 4.03833 1.98828 4.00471 1.9691 3.96022L0.55734 0.676333C0.547738 0.654267 0.541873 0.630157 0.540114 0.60539C0.538356 0.580624 0.540722 0.555691 0.547077 0.532017C0.553431 0.508343 0.563652 0.486395 0.577146 0.467439C0.590639 0.448484 0.607135 0.432895 0.625701 0.421563C0.644267 0.410231 0.664535 0.403388 0.68533 0.401414C0.706124 0.39944 0.727042 0.40238 0.746879 0.410067C0.766716 0.417754 0.785084 0.430029 0.800926 0.4462C0.816767 0.46237 0.829768 0.48211 0.839188 0.504287L2.25098 3.78817C2.27007 3.83272 2.27356 3.88449 2.26067 3.93209C2.24778 3.9797 2.21957 4.01926 2.18223 4.04212Z'
                fill='#3F3D56'
              />
            </svg>

            <svg
              className='vector70'
              width='1'
              height='3'
              viewBox='0 0 1 3'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M0.71059 1.98197C0.673203 2.00472 0.629757 2.00887 0.589802 1.99352C0.549846 1.97816 0.516644 1.94454 0.497463 1.90005L0.176603 1.15372C0.157456 1.10919 0.153929 1.05741 0.16682 1.00978C0.179711 0.962159 0.207977 0.922592 0.245354 0.899777C0.282732 0.876963 0.326173 0.872778 0.366142 0.888138C0.406111 0.903498 0.439334 0.937142 0.458481 0.981679L0.779311 1.72804C0.798403 1.77258 0.801891 1.82434 0.789004 1.87194C0.776117 1.91954 0.747927 1.95911 0.71059 1.98197Z'
                fill='#3F3D56'
              />
            </svg>

            <svg
              className='vector71'
              width='2'
              height='2'
              viewBox='0 0 2 2'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M1.30408 1.36281C1.26669 1.38556 1.22328 1.38971 1.18332 1.37436C1.14337 1.359 1.11014 1.32538 1.09095 1.28089L0.770093 0.53453C0.760533 0.512468 0.754719 0.488367 0.752988 0.463624C0.751257 0.43888 0.753646 0.413982 0.76001 0.390339C0.766374 0.366696 0.776594 0.344779 0.79008 0.325851C0.803566 0.306923 0.820058 0.291348 0.838605 0.280028C0.857151 0.268709 0.877402 0.261861 0.898173 0.259879C0.918945 0.257898 0.939841 0.260819 0.959662 0.268479C0.979484 0.276139 0.997838 0.288391 1.01368 0.304522C1.02952 0.320653 1.04253 0.340349 1.05197 0.362484L1.37283 1.10883C1.39194 1.15337 1.39544 1.20513 1.38255 1.25275C1.36967 1.30036 1.34143 1.33995 1.30408 1.36281Z'
                fill='#3F3D56'
              />
            </svg>
          </div>
          <svg
            className='vector72'
            width='895'
            height='343'
            viewBox='0 0 895 343'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M60.9861 248.292C56.6945 248.288 52.4083 248.662 48.1616 249.41L47.5488 249.518C33.9593 252.142 21.6321 260.659 12.8828 273.468C4.13346 286.277 -0.43596 302.497 0.0327971 319.081L0.195211 325.32C0.302315 329.264 0.416365 333.504 0.510381 338.208C0.521609 339.302 0.890768 340.347 1.53754 341.115C2.1843 341.883 3.05637 342.312 3.96408 342.309H690.927C739.362 341.695 787.621 340.922 834.355 340.012C843.156 340.046 851.941 339.096 860.596 337.173C873.584 333.964 882.598 327.602 888.157 317.724C895.07 305.475 895.289 290.051 894.871 272.624C894.02 237.436 893.175 200.469 892.333 163.615C891.588 131.134 890.847 98.7406 890.106 67.727C889.648 49.322 888.63 33.0764 880.779 20.6604C872.271 7.23246 856.753 0.426392 834.656 0.426392C834.389 0.426392 834.124 0.426341 833.853 0.428509C764.604 0.942922 695.988 50.6579 663.114 124.138C659.328 132.599 655.801 141.658 652.389 150.42C647.533 163.566 642.033 176.353 635.918 188.712C632.73 194.989 629.089 200.915 625.037 206.42C624.77 206.806 624.464 207.218 624.141 207.61C623.402 208.616 622.63 209.585 621.876 210.449C617.725 215.521 613.064 219.946 608 223.621L607.514 223.962C607.148 224.235 606.751 224.508 606.354 224.757C603.6 226.606 600.735 228.205 597.784 229.54C585.253 235.306 571.003 236.689 555.434 233.645C540.66 230.575 526.424 224.517 513.325 215.729C498.907 206.215 485.411 194.354 472.36 182.884C466.628 177.843 460.698 172.633 454.777 167.697C453.663 166.767 452.569 165.859 451.457 164.951C444.225 159.066 437.668 154.205 431.412 150.092C416.672 140.15 400.429 133.869 383.643 131.619C366.42 129.65 351.243 133.364 338.543 142.63C334.91 145.294 331.494 148.366 328.342 151.807C313.3 168.116 304.026 192.186 295.059 215.464C283.905 244.418 272.37 274.36 249.593 289.882C223.311 307.808 184.948 300.361 157.807 287.409C149.273 283.336 140.751 278.651 132.508 274.119C129.179 272.288 125.85 270.459 122.514 268.663C115.963 265.132 110.601 262.427 105.641 260.143L104.072 259.414C103.2 259.019 102.326 258.623 101.437 258.246C95.9412 255.809 90.3394 253.735 84.6565 252.033L83.3783 251.643C80.8157 250.938 78.4198 250.352 76.0688 249.858L75.1303 249.664C70.4542 248.745 65.7239 248.286 60.9861 248.292Z'
              fill='#1369F9'
            />
          </svg>
          <svg
            className='vector73'
            width='895'
            height='282'
            viewBox='0 0 895 282'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M60.9861 204.026C56.6945 204.023 52.4083 204.33 48.1616 204.946L47.5488 205.034C33.9593 207.195 21.6321 214.204 12.8828 224.746C4.13346 235.288 -0.43596 248.637 0.0327971 262.286L0.195211 267.42C0.302315 270.666 0.416365 274.156 0.510381 278.027C0.521609 278.928 0.890768 279.788 1.53754 280.42C2.1843 281.052 3.05637 281.405 3.96408 281.402H690.927C739.362 280.897 787.621 280.261 834.355 279.512C843.156 279.54 851.941 278.758 860.596 277.175C873.584 274.534 882.598 269.299 888.157 261.169C895.07 251.088 895.289 238.394 894.871 224.051C894.02 195.091 893.175 164.667 892.333 134.336C891.588 107.604 890.847 80.9436 890.106 55.4191C889.648 40.2716 888.63 26.9014 880.779 16.6829C872.271 5.63155 856.753 0.0300904 834.656 0.0300904C834.389 0.0300904 834.124 0.0300486 833.853 0.0318327C764.604 0.4552 695.988 41.371 663.114 101.846C659.328 108.81 655.801 116.265 652.389 123.476C647.533 134.296 642.033 144.819 635.918 154.991C632.73 160.157 629.089 165.034 625.037 169.565C624.77 169.882 624.464 170.222 624.141 170.544C623.402 171.372 622.63 172.17 621.876 172.88C617.725 177.055 613.064 180.696 608 183.721L607.514 184.001C607.148 184.226 606.751 184.451 606.354 184.657C603.6 186.178 600.735 187.494 597.784 188.592C585.253 193.338 571.003 194.476 555.434 191.971C540.66 189.444 526.424 184.459 513.325 177.226C498.907 169.396 485.411 159.634 472.36 150.194C466.628 146.046 460.698 141.758 454.777 137.695C453.663 136.93 452.569 136.183 451.457 135.435C444.225 130.592 437.668 126.591 431.412 123.206C416.672 115.024 400.429 109.854 383.643 108.003C366.42 106.383 351.243 109.439 338.543 117.065C334.91 119.257 331.494 121.786 328.342 124.617C313.3 138.04 304.026 157.85 295.059 177.008C283.905 200.837 272.37 225.48 249.593 238.255C223.311 253.008 184.948 246.879 157.807 236.22C149.273 232.867 140.751 229.012 132.508 225.281C129.179 223.774 125.85 222.269 122.514 220.792C115.963 217.885 110.601 215.659 105.641 213.779L104.072 213.18C103.2 212.854 102.326 212.528 101.437 212.218C95.9412 210.212 90.3394 208.505 84.6565 207.104L83.3783 206.784C80.8157 206.203 78.4198 205.721 76.0688 205.315L75.1303 205.155C70.4542 204.398 65.7239 204.021 60.9861 204.026Z'
              fill='#EAF7FF'
            />
          </svg>
          <Image
            width={451}
            height={228}
            alt=''
            className='_2'
            src='/img/car.png'
          />
          <svg
            className='vector74'
            width='41'
            height='51'
            viewBox='0 0 41 51'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M29.0945 50.2714C31.9124 50.2711 34.639 49.2927 36.7893 47.5101C38.9396 45.7275 40.3744 43.2563 40.8386 40.5358L40.8424 40.5133L40.8275 40.4958C40.0658 39.6031 39.4501 38.6001 39.0023 37.5227C39.5352 38.1912 40.1789 38.7674 40.9066 39.2274L40.9813 39.2761L40.9856 39.1884C40.9951 38.9954 40.9999 38.8036 40.9999 38.6184C41.0065 36.6368 40.4939 34.6868 39.5109 32.9545C38.5279 31.2222 37.1075 29.7656 35.3853 28.7239C37.1323 26.9399 38.4468 24.794 39.2314 22.4452C40.016 20.0964 40.2506 17.6049 39.9178 15.1553C39.5851 12.7058 38.6935 10.3608 37.3091 8.29433C35.9247 6.22781 34.0831 4.49265 31.9205 3.21742C29.758 1.94219 27.33 1.15957 24.8165 0.927521C22.303 0.695474 19.7683 1.01995 17.4003 1.87693C15.0323 2.7339 12.8917 4.10139 11.137 5.87811C9.38226 7.65483 8.05844 9.79524 7.26363 12.1407L7.24862 12.185L7.29281 12.2025C8.30663 12.6303 9.39766 12.8553 10.5017 12.864C9.35219 13.1826 8.15901 13.3238 6.96508 13.2826L6.924 13.2812L6.91405 13.3203C6.58047 14.6297 6.41195 15.9742 6.41225 17.3238C6.41225 17.3724 6.41247 17.4211 6.4129 17.4698C6.41612 18.5191 6.19339 19.5573 5.75922 20.5168C5.32504 21.4762 4.68917 22.3353 3.89305 23.0381C2.62121 24.1707 1.61514 25.5596 0.944057 27.1091C0.272976 28.6586 -0.0471764 30.332 0.00561142 32.0142C0.0583954 33.6964 0.482849 35.3475 1.24982 36.8538C2.01678 38.3601 3.10803 39.6858 4.44849 40.7399L4.47288 40.7591L4.5014 40.7465C6.26154 39.9648 7.48735 39.0922 8.32226 38.0209C7.75773 39.3698 6.93467 40.6006 5.89749 41.6468L5.85233 41.6924L5.90833 41.7244C7.68755 42.7388 9.70498 43.2846 11.7639 43.3086C13.8228 43.3326 15.853 42.8339 17.6563 41.8611C18.3806 44.2833 19.8859 46.4111 21.9475 47.9269C24.009 49.4426 26.5161 50.2651 29.0945 50.2714Z'
              fill='#B1E2FC'
            />
          </svg>
          <svg
            className='vector75'
            width='11'
            height='44'
            viewBox='0 0 11 44'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M10.3389 43.4244C10.3907 43.4244 10.4406 43.406 10.4797 43.3726C10.5187 43.3392 10.5443 43.293 10.5516 43.2426C11.1138 38.3081 11.1475 33.3291 10.6519 28.3876C9.9097 20.5923 7.52632 9.3643 0.38666 0.142934C0.369596 0.120692 0.348219 0.101994 0.32379 0.0878983C0.29936 0.0738026 0.272356 0.064591 0.244301 0.0607992C0.216246 0.0570075 0.18769 0.0587302 0.160304 0.0658227C0.132918 0.0729153 0.107225 0.0852404 0.0847006 0.102132C0.0621767 0.119023 0.0432768 0.140124 0.0290623 0.164228C0.0148478 0.188332 0.00559521 0.214968 0.00186634 0.242594C-0.00186253 0.270221 1.14441e-05 0.298311 0.00733948 0.325231C0.0146675 0.352151 0.0273113 0.377375 0.0445738 0.399468C7.12257 9.5412 9.48675 20.6868 10.2237 28.4271C10.7166 33.3355 10.6838 38.2813 10.1258 43.183C10.1215 43.213 10.1238 43.2436 10.1325 43.2727C10.1412 43.3018 10.1562 43.3287 10.1764 43.3516C10.1966 43.3745 10.2216 43.3928 10.2496 43.4054C10.2777 43.4179 10.3081 43.4244 10.3389 43.4244Z'
              fill='#212E56'
            />
          </svg>
          <svg
            className='vector76'
            width='22'
            height='7'
            viewBox='0 0 22 7'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M21.7801 6.16936C21.8265 6.1694 21.8718 6.15319 21.9093 6.12303C21.9469 6.09287 21.9748 6.05032 21.9892 6.00148C22.0036 5.95265 22.0036 5.90005 21.9893 5.85121C21.9749 5.80236 21.947 5.75979 21.9095 5.7296C19.8307 4.17268 17.5851 2.90782 15.2242 1.96408C11.5359 0.469957 5.92713 -0.884566 0.153059 1.1488C0.0975361 1.16835 0.0513115 1.21151 0.0245457 1.26878C-0.00221825 1.32604 -0.00732231 1.39273 0.0103474 1.45416C0.028017 1.51559 0.0670242 1.56674 0.118778 1.59636C0.170532 1.62597 0.230801 1.63162 0.286322 1.61207C5.94207 -0.37951 11.4491 0.952622 15.0731 2.42071C17.396 3.34827 19.6056 4.59186 21.6511 6.1229C21.6886 6.15311 21.7338 6.16938 21.7801 6.16936Z'
              fill='#212E56'
            />
          </svg>
          <div className='kindpng-1488822-1'></div>
          <svg
            className='vector77'
            width='97'
            height='109'
            viewBox='0 0 97 109'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M57.9785 51.8365C56.9748 51.4585 57.7738 50.0257 57.7738 50.0257L63.1175 38.5099L77.5233 15.7221C73.9542 14.6781 73.3697 15.3087 72.4317 16.2157L42.7312 46.0472C42.7312 46.0472 33.5342 44.3904 25.6673 42.0891C22.0238 41.0233 13.3924 40.9876 12.5362 43.9647C11.6799 46.9417 19.1095 51.6044 22.634 52.6354C30.0993 54.8192 39.1494 58.5003 39.1494 58.5003L48.4115 99.7296C48.7578 101.329 49.0306 101.894 52.451 102.894L52.3722 75.8693L53.9626 63.2766C53.9626 63.2766 54.0478 61.635 55.0963 61.8574C56.1448 62.0797 65.3052 65.0969 70.6101 65.151C71.3148 65.1673 71.1691 65.8419 71.4419 66.4069L73.4151 77.9325C73.6025 78.346 74.3608 78.7366 74.3608 78.7366L77.056 79.736L78.4823 65.8084L83.9126 64.8656L79.8254 61.1385L86.0104 48.6031L83.2033 47.9929C83.2089 47.9734 82.3611 47.8941 81.9834 48.1423L74.201 56.8141C73.6708 57.1442 73.4359 57.7927 72.8319 57.4262C68.3105 54.648 58.9823 52.2145 57.9785 51.8365Z'
              fill='white'
            />
          </svg>
          <div className='group-52'>
            <div className='rectangle-1'></div>
            <div className='group-26'>
              <div className='group-25'>
                <button className='submit' onClick={onSubmit}>
                  {langData["submit"]}
                </button>
              </div>
            </div>
          </div>
          <div className='money-box'>
            MONEY BOX
            <br />
          </div>
          <div className='group-72'>
            <div className='group-702'>
              <div className='group-52'>
                <div className='rectangle-14'></div>

                <div className='group-262'>
                  <div className='apply-here'>
                    <div className='text-center'>{langData["c1"]}</div>
                  </div>
                </div>
              </div>
            </div>

            <svg
              className='polygon-1'
              width='71'
              height='45'
              viewBox='0 0 71 45'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M35.5 45L4.7561 11.25L66.2439 11.25L35.5 45Z'
                fill='#1369F9'
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}
