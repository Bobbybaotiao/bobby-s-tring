import { siteConfig } from '../data/mockData';

/**
 * PushPlus 微信推送（联系页留言和购物车下单共用）
 * 返回 'sent'（推送成功）或 'skipped'（未配置 Token，跳过推送）
 * 推送失败时抛出错误，由调用方展示
 */
export async function sendPushPlus(title: string, content: string): Promise<'sent' | 'skipped'> {
  const token = siteConfig.pushplusToken;
  if (!token) return 'skipped';

  const body = JSON.stringify({ token, title, content });

  const send = async (url: string) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    });
    return res.json();
  };

  let result: any;
  try {
    // 直接调 PushPlus
    result = await send('https://www.pushplus.plus/send');
  } catch {
    // CORS 失败时走代理
    result = await send(
      `https://api.allorigins.win/post?url=${encodeURIComponent('https://www.pushplus.plus/send')}`
    );
    // allorigins 返回的内容在 contents 字段里
    if (result.contents) {
      result = JSON.parse(result.contents);
    }
  }

  if (result.code === 200) return 'sent';
  throw new Error(result.msg || '推送失败，请确认 Token 是否正确');
}
