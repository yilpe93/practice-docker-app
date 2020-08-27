const express = require("express");
const redis = require("redis");

// 레디스 클라이언트 생성
const client = redis.createClient({
  host: "redis-server",
  prot: 6379,
});

const app = express();

// 숫자 0 부터 시작하도록 셋팅
client.set("number", 0);

app.get("/", (req, res) => {
  client("number", (err, number) => {
    // 현재 숫자를 가져온 후 1씩 올려준다.
    client.set("number", parseInt(number) + 1);
    res.send("숫자가 1씩 올라갑니다. 숫자: " + number);
  });
});

app.listen(8080);
console.log("Server is running");
