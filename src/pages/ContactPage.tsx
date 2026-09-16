import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { stores } from '../data/mockData';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    type: 'customer',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
        type: 'customer',
      });
    }, 3000);
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
            无论您是想了解产品、寻找门店，还是洽谈合作，我们都期待与您取得联系
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-8 border border-white/10">
            <MapPin className="w-8 h-8 text-bobby-gold mb-6" />
            <h3 className="font-display text-xl text-white mb-4">门店查询</h3>
            <p className="text-white/60 text-sm">
              查找离您最近的 Bobby Fashion 门店，亲身体验我们的产品
            </p>
          </div>
          <div className="p-8 border border-white/10">
            <Phone className="w-8 h-8 text-bobby-gold mb-6" />
            <h3 className="font-display text-xl text-white mb-4">客服热线</h3>
            <p className="text-white/60 text-sm">
              周一至周日 9:00-21:00
            </p>
            <p className="text-bobby-gold mt-2">+86 400-888-8888</p>
          </div>
          <div className="p-8 border border-white/10">
            <Mail className="w-8 h-8 text-bobby-gold mb-6" />
            <h3 className="font-display text-xl text-white mb-4">电子邮件</h3>
            <p className="text-white/60 text-sm">
              商务合作、媒体咨询等
            </p>
            <p className="text-bobby-gold mt-2">contact@bobbyfashion.com</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="font-display text-2xl text-white mb-8">全球门店</h2>
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
            {isSubmitted ? (
              <div className="p-8 border border-bobby-gold/30 bg-bobby-gold/10 text-center">
                <p className="text-bobby-gold text-lg mb-2">感谢您的留言！</p>
                <p className="text-white/60 text-sm">
                  我们会在24小时内与您联系
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
                      className="w-full bg-white/5 border border-white/20 px-4 py-3 text-white placeholder-white/40 focus:border-bobby-gold focus:outline-none transition-colors"
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
                      className="w-full bg-white/5 border border-white/20 px-4 py-3 text-white placeholder-white/40 focus:border-bobby-gold focus:outline-none transition-colors"
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
                      className="w-full bg-white/5 border border-white/20 px-4 py-3 text-white placeholder-white/40 focus:border-bobby-gold focus:outline-none transition-colors"
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
                      className="w-full bg-white/5 border border-white/20 px-4 py-3 text-white placeholder-white/40 focus:border-bobby-gold focus:outline-none transition-colors"
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
                    className="w-full bg-bobby-black border border-white/20 px-4 py-3 text-white focus:border-bobby-gold focus:outline-none transition-colors appearance-none cursor-pointer"
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
                    className="w-full bg-white/5 border border-white/20 px-4 py-3 text-white placeholder-white/40 focus:border-bobby-gold focus:outline-none transition-colors resize-none"
                    placeholder="请输入您的留言"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-bobby-gold text-bobby-black py-4 text-sm uppercase tracking-widest hover:bg-bobby-gold/90 transition-colors flex items-center justify-center gap-3"
                >
                  <Send className="w-4 h-4" />
                  提交留言
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}