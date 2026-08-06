// app.js —— 演示用：故意包含 CodeQL 能识别出的安全问题（命令注入），
// 仅供测试 workflow 使用，请勿用于生产环境。
const http = require('http');
const { exec } = require('child_process');

http
  .createServer((req, res) => {
    const query = new URL(req.url, 'http://localhost').searchParams;
    const host = query.get('host') || 'localhost';

    // CodeQL 会告警：js/command-line-injection —— 用户输入直接拼进 exec
    exec('ping -c 1 ' + host, (err, stdout) => {
      res.end(stdout);
    });
  })
  .listen(3000, () => console.log('listening on 3000'));
