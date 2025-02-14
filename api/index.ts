import express from 'express';
import axios from "axios";

const app = express();

// 환경변수 또는 직접 API 키를 입력하세요.
const NAVER_API_KEY_ID = process.env.NAVER_API_KEY_ID || 'your_api_key_id';
const NAVER_API_KEY_SECRET = process.env.NAVER_API_KEY_SECRET || 'your_api_key';

const DATA_SERVICE_KEY = process.env.DATA_SERVICE_KEY || 'your_api_key';

app.get('/', (req, res) => {
    console.log("Express 앱에 '/' 요청이 들어왔습니다.");
    res.send("Express on Vercel");
});

app.get('/directions', async (req, res) => {
    console.log("Express 앱에 '/direction' 요청이 들어왔습니다.");

    let {start, goal, option} = req.query;

    try {

        const url = 'https://naveropenapi.apigw.ntruss.com/map-direction/v1/driving';
        const headers = {
            'x-ncp-apigw-api-key-id': NAVER_API_KEY_ID,
            'x-ncp-apigw-api-key': NAVER_API_KEY_SECRET
        }

        // Naver API 호출
        const response = await axios.get(url, {
            params: {start, goal, option},
            headers: headers
        });
        console.log("Response status:", response.status);
        console.log("Response data: ", response.data);

        // API 응답 데이터를 그대로 반환합니다.
        res.json(response.data);
    } catch (error: any) {
        console.error("Naver API 호출 중 에러 발생:", error.message);
        res.status(500).json({error: 'Naver API 호출 중 문제가 발생했습니다.'});
    }
});

app.get('/pfm-period', async (req, res) => {
    console.log("Express 앱에 '/pfm-period' 요청이 들어왔습니다.");

    let { from, to } = req.query;
    const serviceKey = DATA_SERVICE_KEY;

    try {

        const url = 'https://apis.data.go.kr/B553457/nopenapi/rest/publicperformancedisplays/period';

        // 공공 DATA API 호출
        const response = await axios.get(url, {
            params: { serviceKey, from, to },
        });
        console.log("Response status:", response.status);
        console.log("Response data: ", response.data);

        // API 응답 데이터를 그대로 반환합니다.
        res.json(response.data);
    } catch (error: any) {
        console.error("공공 DATA API 호출 중 에러 발생:", error.message);
        res.status(500).json({ error: '공공 DATA API 호출 중 문제가 발생했습니다.' });
    }
});





// Vercel 서버리스 함수로 동작하므로 app.listen() 호출 불필요
export default app;
