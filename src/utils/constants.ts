import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const PROTOCAL = publicRuntimeConfig.HTTP_PROTOCAL;
const IP = publicRuntimeConfig.SERVER_IP;
const PORT = publicRuntimeConfig.SERVER_PORT;

const SERVER = `${PROTOCAL}://${IP}:${PORT}`;

// API URL 생성하기
export const makeAPIURL = (path: string) => `${SERVER}/api${path}`;
