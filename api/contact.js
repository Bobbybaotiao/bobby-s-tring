// Vercel Serverless Function: 联系表单中转
// 接收前端表单数据，转发到 PushPlus 微信推送
// PushPlus token 存在 Vercel 环境变量 PUSHPLUS_TOKEN 里，前端看不到

export default async function handler(req, res) {
  // 只允许 POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = process.env.PUSHPLUS_TOKEN;
  if (!token) {
    return res.status(500).json({ error: '服务端未配置推送令牌' });
  }

  const { name, email, phone, company, type, message } = req.body || {};

  // 基本校验
  if (!name || !email || !message) {
    return res.status(400).json({ error: '请填写必填项（姓名、邮箱、留言内容）' });
  }

  const typeLabel = {
    customer: '客户咨询',
    dealer: '经销商合作',
    media: '媒体采访',
    other: '其他',
  }[type] || '客户咨询';

  // 组装微信推送内容
  const content = `【欧蜜儿网站留言】\n\n姓名：${name}\n邮箱：${email}\n电话：${phone || '未填写'}\n公司：${company || '未填写'}\n类型：${typeLabel}\n留言：${message}`;

  try {
    const response = await fetch('https://www.pushplus.plus/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token,
        title: `欧蜜儿 · ${typeLabel}`,
        content,
      }),
    });

    const result = await response.json();
    if (result.code === 200) {
      return res.status(200).json({ success: true });
    }
    // PushPlus 返回非 200
    return res.status(502).json({ error: result.msg || '推送失败' });
  } catch (err) {
    return res.status(500).json({ error: '网络异常，请稍后重试' });
  }
}
