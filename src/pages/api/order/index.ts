// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { makeAPIURL } from "@/utils/constants";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const body = req.body.inputData;

  try {
    const info: any = {};
    info["신청자"] = body.name;
    info["탑승자수"] = body.passengersCount;
    info["SNS 채널"] = "WHATSAPP";
    info["SNS ID"] = body.whatappid;
    const data = {
      outName: "moneybox",
      orderTitle: "공항샌딩",
      boardingDate: body.picDate,
      startLocation: body.location,
      startAddress: body.address,

      goalLocation: body.airport,
      goalAddress: "공항샌딩",

      information: info,

      company: "likealocal",
      else01: "",
      else02: "",
      // 2023.06.09 추가 (탑승자, 탑승자 번호)
      customName: body.name,
      customPhone: "",
    };

    const url = `${makeAPIURL("/order/out")}`;

    const result: any = {};
    result["ok"] = "good";
    res.status(200).json(result);
    axios.post(url, data).then((d) => {
      if (d.data.ok === true) {
        res.status(200).json(d.data.data);
      } else {
        res.status(500).json(d.data);
      }
    });
  } catch (err) {
    console.log(err);
  }
  //   const response = await fetch(url, {
  //     headers: {
  //       "X-NCP-APIGW-API-KEY-ID": "01gns67yau",
  //       "X-NCP-APIGW-API-KEY": "mZ8mst5crgIEw8vzU5H4SBLNbpmXJnpxPlC9IHYb",
  //     },
  //   });
}
