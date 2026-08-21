// app.js —— 演示用：故意包含 CodeQL 能识别出的安全问题（命令注入），
// 仅供测试 workflow 使用，请勿用于生产环境。
const http = require('http');
const { execFile } = require('child_process');

http
  .createServer((req, res) => {
    const query = new URL(req.url, 'http://localhost').searchParams;
    const host = query.get('host') || 'localhost';

    // 使用不经 shell 的 API，避免命令注入
    execFile('ping', ['-c', '1', host], (err, stdout, stderr) => {
      if (err) {
        res.statusCode = 500;
        res.end(stderr || err.message);
        return;
      }
      res.end(stdout);
    });
  })
  .listen(3000, () => console.log('listening on 3000'));
