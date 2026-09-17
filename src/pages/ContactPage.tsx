import { useState } from 'react';
import { MapPin, Phone, MessageCircle, Clock, Send, Loader2 } from 'lucide-react';
import { stores, siteConfig } from '../data/mockData';
import CustomFieldsDisplay from '../components/CustomFieldsDisplay';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    type: 'customer',
  });
  const [submitState, setSubmitState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitState('loading');
    setErrorMsg('');

    const typeLabel = {
      customer: '客户咨询',
      dealer: '经销商合作',
      media: '媒体采访',
      other: '其他',
    }[formData.type] || '客户咨询';

    const content = `【欧蜜儿网站留言】\n\n姓名：${formData.name}\n邮箱：${formData.email}\n电话：${formData.phone || '未填写'}\n公司：${formData.company || '未填写'}\n类型：${typeLabel}\n留言：${formData.message}`;

    const token = siteConfig.pushplusToken;

    try {
      if (!token) {
        // 没配置 token，只显示成功（不推送）
        setSubmitState('success');
        setTimeout(() => {
          setSubmitState('idle');
          setFormData({ name: '', email: '', phone: '', company: '', message: '', type: 'customer' });
        }, 3000);
        return;
      }

      const body = JSON.stringify({
        token,
        title: `欧蜜儿 · ${typeLabel}`,
        content,
      });

      // 直接调 PushPlus
      const sendRequest = async (url: string) => {
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body,
        });
        return res.json();
      };

      let result: any;
      try {
        result = await sendRequest('https://www.pushplus.plus/send');
      } catch {
        // CORS 失败时走代理
        result = await sendRequest(
          `https://api.allorigins.win/post?url=${encodeURIComponent('https://www.pushplus.plus/send')}`
        );
        // allorigins 返回的内容在 contents 字段里
        if (result.contents) {
          result = JSON.parse(result.contents);
        }
      }

      if (result.code === 200) {
        setSubmitState('success');
        setTimeout(() => {
          setSubmitState('idle');
          setFormData({ name: '', email: '', phone: '', company: '', message: '', type: 'customer' });
        }, 3000);
      } else {
        throw new Error(result.msg || '推送失败，请确认 Token 是否正确');
      }
    } catch (err) {
      setSubmitState('error');
      setErrorMsg((err as Error).message || '网络异常，请稍后重试');
      setTimeout(() => setSubmitState('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-bobby-gold text-sm uppercase tracking-[0.3em] mb-4">
            Contact Us
          </p>
          <h1 className="font-display text-4xl md:text-6xl text-white mb-6">
            联系我们
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto">
            {siteConfig.contactIntro}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-8 border border-white/10">
            <MapPin className="w-8 h-8 text-bobby-gold mb-6" />
            <h3 className="font-display text-xl text-white mb-4">门店地址</h3>
            <p className="text-white/60 text-sm">
              欢迎到{siteConfig.brandName}门店试穿选购，亲身体验我们的产品
            </p>
            <p className="text-bobby-gold mt-2">{siteConfig.address}</p>
          </div>
          <div className="p-8 border border-white/10">
            <Phone className="w-8 h-8 text-bobby-gold mb-6" />
            <h3 className="font-display text-xl text-white mb-4">联系电话</h3>
            <p className="text-white/60 text-sm">
              {siteConfig.hours}
            </p>
            <a href={`tel:${siteConfig.phone}`} className="text-bobby-gold mt-2 inline-block hover:underline">
              　{siteConfig.phone}
            </a>
          </div>
          <div className="p-8 border border-white/10">
            <MessageCircle className="w-8 h-8 text-bobby-gold mb-6" />
            <h3 className="font-display text-xl text-white mb-4">微信咨询</h3>
            <p className="text-white/60 text-sm">
              产品咨询、下单合作，随时联系
            </p>
            <p className="text-bobby-gold mt-2">{siteConfig.wechat}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="font-display text-2xl text-white mb-8">门店信息</h2>
            <div className="space-y-6">
              {stores.map((store) => (
                <div
                  key={store.id}
                  className="p-6 border border-white/10 hover:border-bobby-gold/30 transition-all duration-300"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-display text-lg text-white mb-2">
                        {store.name}
                      </h3>
                      <p className="text-white/60 text-sm">
                        {store.country} - {store.city}
                      </p>
                      <p className="text-white/50 text-sm mt-2">
                        {store.address}
                      </p>
                    </div>
                    <Clock className="w-5 h-5 text-white/40" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl text-white mb-8">联系表单</h2>
            {submitState === 'success' ? (
              <div className="p-8 border border-bobby-gold/30 bg-bobby-gold/10 text-center">
                <p className="text-bobby-gold text-lg mb-2">感谢您的留言！</p>
                <p className="text-white/60 text-sm">
                  我们会尽快与您联系
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white/70 text-sm mb-2">
                      姓名 *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={submitState === 'loading'}
                      className="w-full bg-white/5 border border-white/20 px-4 py-3 text-white placeholder-white/40 focus:border-bobby-gold focus:outline-none transition-colors disabled:opacity-50"
                      placeholder="请输入姓名"
                    />
                  </div>
                  <div>
                    <label className="block text-white/70 text-sm mb-2">
                      邮箱 *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={submitState === 'loading'}
                      className="w-full bg-white/5 border border-white/20 px-4 py-3 text-white placeholder-white/40 focus:border-bobby-gold focus:outline-none transition-colors disabled:opacity-50"
                      placeholder="请输入邮箱"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white/70 text-sm mb-2">
                      电话
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={submitState === 'loading'}
                      className="w-full bg-white/5 border border-white/20 px-4 py-3 text-white placeholder-white/40 focus:border-bobby-gold focus:outline-none transition-colors disabled:opacity-50"
                      placeholder="请输入电话"
                    />
                  </div>
                  <div>
                    <label className="block text-white/70 text-sm mb-2">
                      公司名称
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      disabled={submitState === 'loading'}
                      className="w-full bg-white/5 border border-white/20 px-4 py-3 text-white placeholder-white/40 focus:border-bobby-gold focus:outline-none transition-colors disabled:opacity-50"
                      placeholder="请输入公司名称"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-2">
                    咨询类型
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    disabled={submitState === 'loading'}
                    className="w-full bg-bobby-black border border-white/20 px-4 py-3 text-white focus:border-bobby-gold focus:outline-none transition-colors appearance-none cursor-pointer disabled:opacity-50"
                  >
                    <option value="customer" className="text-black bg-white">客户咨询</option>
                    <option value="dealer" className="text-black bg-white">经销商合作</option>
                    <option value="media" className="text-black bg-white">媒体采访</option>
                    <option value="other" className="text-black bg-white">其他</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-2">
                    留言内容 *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    disabled={submitState === 'loading'}
                    className="w-full bg-white/5 border border-white/20 px-4 py-3 text-white placeholder-white/40 focus:border-bobby-gold focus:outline-none transition-colors resize-none disabled:opacity-50"
                    placeholder="请输入您的留言"
                  />
                </div>
                {submitState === 'error' && (
                  <p className="text-red-400 text-sm">{errorMsg || '提交失败，请稍后重试'}</p>
                )}
                <button
                  type="submit"
                  disabled={submitState === 'loading'}
                  className="w-full bg-bobby-gold text-bobby-black py-4 text-sm uppercase tracking-widest hover:bg-bobby-gold/90 transition-colors flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitState === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      提交中...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      提交留言
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        <CustomFieldsDisplay section="siteConfig" />
      </div>
    </main>
  );
}