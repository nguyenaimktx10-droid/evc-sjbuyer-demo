import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ArrowRight, ArrowLeft, Send, Sparkles, Building2, Landmark, Wallet, Clock, UserCheck, ShieldAlert, BadgeInfo } from 'lucide-react';
import { LeadSubmission } from '../types';

interface ApplicationFormProps {
  onSuccess: (newLead: LeadSubmission) => void;
}

export default function ApplicationForm({ onSuccess }: ApplicationFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    targetLocation: '',
    preApproved: '' as 'yes' | 'no_credit_ok' | 'dont_know' | 'cash' | '',
    downPayment: '' as 'under_200' | '200_400' | 'above_400' | '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<LeadSubmission | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const totalSteps = 4;

  const handleNext = () => {
    // Validate current step
    if (step === 1 && !formData.targetLocation.trim()) {
      setErrorMsg('Vui lòng nhập Zip codes anh/chị mong muốn đầu tư');
      return;
    }
    if (step === 2 && !formData.preApproved) {
      setErrorMsg('Vui lòng chọn trạng thái thư phê duyệt ngân hàng');
      return;
    }
    if (step === 3 && !formData.downPayment) {
      setErrorMsg('Vui lòng chọn khoản vốn down payment dự kiến');
      return;
    }
    setErrorMsg('');
    setStep((prev) => Math.min(totalSteps, prev + 1));
  };

  const handleBack = () => {
    setErrorMsg('');
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleOptionSelect = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrorMsg('');
    // Auto advance for multiple choice options
    setTimeout(() => {
      setStep((prev) => Math.min(totalSteps, prev + 1));
    }, 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMsg('Vui lòng điền đầy đủ Họ tên, Email và Số điện thoại chính xác');
      return;
    }

    // Email and Phone pattern checking
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      setErrorMsg('Vui lòng nhập Email hợp lệ để nhận kết quả duyệt hồ sơ');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    // Classify lead status automatically based on requirements
    let calculatedStatus: LeadSubmission['status'] = 'pending';
    if ((formData.preApproved === 'yes' || formData.preApproved === 'cash') && formData.downPayment === 'above_400') {
      calculatedStatus = 'vip'; // Ideal VIP Lead
    } else if (formData.preApproved === 'yes' || formData.preApproved === 'cash' || formData.downPayment === '200_400') {
      calculatedStatus = 'qualified'; // Highly qualified Lead
    } else if (formData.downPayment === 'under_200' && formData.preApproved === 'dont_know') {
      calculatedStatus = 'not_qualified'; // Requires a lot of education beforehand
    }

    const newLead: LeadSubmission = {
      id: `lead_${Date.now()}`,
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      targetLocation: formData.targetLocation,
      preApproved: formData.preApproved as any,
      downPayment: formData.downPayment as any,
      timestamp: new Date().toISOString(),
      status: calculatedStatus,
      notes: getAutoNotes(formData)
    };

    // Simulate saving delay
    setTimeout(() => {
      // Save local lead to localStorage
      try {
        const stored = localStorage.getItem('sanjose_leads');
        const list: LeadSubmission[] = stored ? JSON.parse(stored) : [];
        list.unshift(newLead);
        localStorage.setItem('sanjose_leads', JSON.stringify(list));
      } catch (err) {
        console.error('Error saving lead to storage', err);
      }

      setSubmittedLead(newLead);
      setIsSubmitting(false);
      setIsSubmitted(true);
      onSuccess(newLead);
    }, 1200);
  };

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-10 shadow-xl max-w-3xl mx-auto" id="application-form-section">
      
      {!isSubmitted ? (
        <div>
          {/* Progress Indicator */}
          {/* Form Header */}
          <div className="text-center md:text-left mb-8 pb-6 border-b border-slate-800/60 space-y-2">
            <h2 className="text-lg md:text-xl font-display font-black text-white tracking-tight">
              Evan chỉ trực tiếp cố vấn cho tối đa <span className="text-amber-500 italic">3-5 nhà đầu tư nghiêm túc</span> mỗi tháng.
            </h2>
            <p className="text-xs md:text-sm text-slate-400">
              Anh/chị vui lòng điền khảo sát bên dưới để được Evan và team hỗ trợ bước kế tiếp
            </p>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center text-xs text-slate-400 font-mono mb-2 uppercase tracking-widest">
              <span>Hồ sơ sàng lọc đầu tư</span>
              <span className="text-amber-500 font-bold">Bước {step} / {totalSteps}</span>
            </div>
            <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-amber-500 to-amber-300 h-full transition-all duration-300 rounded-full"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {/* Step 1: Target Location */}
            {step === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mb-2">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                    Anh/chị muốn tìm nhà tại khu vực nào?
                  </h3>
                  <p className="text-sm text-slate-400">
                    Nhập Zip codes mà anh chị mong muốn đầu tư (có thể điền nhiều Zip codes)*
                  </p>
                </div>

                <div className="space-y-2">
                  <input
                    type="text"
                    required
                    placeholder="Nhập các Zip codes tiềm năng..."
                    value={formData.targetLocation}
                    onChange={(e) => {
                      setFormData((prev) => ({ ...prev, targetLocation: e.target.value }));
                      setErrorMsg('');
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleNext();
                      }
                    }}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-2xl px-5 py-4 text-sm md:text-base text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all font-sans font-medium"
                    autoFocus
                  />
                </div>
              </motion.div>
            )}

            {/* Step 2: Pre-approval letter */}
            {step === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mb-2">
                    <Landmark className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                    Anh/chị đã có thư phê duyệt trước từ ngân hàng (Pre-approval Letter) chưa?
                  </h3>
                  <p className="text-sm text-slate-400">
                    Tại San Jose, lá thư này đóng vai trò quyết định để tham gia đấu giá nhà thành công.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <button
                    type="button"
                    onClick={() => handleOptionSelect('preApproved', 'yes')}
                    className={`p-4 md:p-5 rounded-2xl border text-left cursor-pointer transition-all flex items-center justify-between ${
                      formData.preApproved === 'yes'
                        ? 'bg-amber-500/10 border-amber-500 ring-2 ring-amber-500/20'
                        : 'bg-slate-950 border-slate-800 hover:bg-slate-950/60 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <h4 className="text-sm font-bold text-white">Đã có hồ sơ sẵn sàng</h4>
                      <p className="text-xs text-slate-400 mt-1">Đã được ngân hàng cấp mức trần tài chính cụ thể, sẵn sàng gửi offer.</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      formData.preApproved === 'yes' ? 'bg-amber-500 border-amber-500 text-slate-950' : 'border-slate-800'
                    }`}>
                      {formData.preApproved === 'yes' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOptionSelect('preApproved', 'cash')}
                    className={`p-4 md:p-5 rounded-2xl border text-left cursor-pointer transition-all flex items-center justify-between ${
                      formData.preApproved === 'cash'
                        ? 'bg-amber-500/10 border-amber-500 ring-2 ring-amber-500/20'
                        : 'bg-slate-950 border-slate-800 hover:bg-slate-950/60 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <h4 className="text-sm font-bold text-white">Chưa, dự định mua bằng tiền mặt</h4>
                      <p className="text-xs text-slate-400 mt-1">Không phụ thuộc ngân hàng, sẵn sàng giải ngân nhanh khi tìm được deal phù hợp.</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      formData.preApproved === 'cash' ? 'bg-amber-500 border-amber-500 text-slate-950' : 'border-slate-800'
                    }`}>
                      {formData.preApproved === 'cash' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOptionSelect('preApproved', 'no_credit_ok')}
                    className={`p-4 md:p-5 rounded-2xl border text-left cursor-pointer transition-all flex items-center justify-between ${
                      formData.preApproved === 'no_credit_ok'
                        ? 'bg-amber-500/10 border-amber-500 ring-2 ring-amber-500/20'
                        : 'bg-slate-950 border-slate-800 hover:bg-slate-950/60 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <h4 className="text-sm font-bold text-white">Chưa có nhưng điểm Credit tốt và thu nhập ổn định</h4>
                      <p className="text-xs text-slate-400 mt-1">Cần hỗ trợ kết nối đối tác Lender uy tín của Evan để lấy thư trong 48h.</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      formData.preApproved === 'no_credit_ok' ? 'bg-amber-500 border-amber-500 text-slate-950' : 'border-slate-800'
                    }`}>
                      {formData.preApproved === 'no_credit_ok' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOptionSelect('preApproved', 'dont_know')}
                    className={`p-4 md:p-5 rounded-2xl border text-left cursor-pointer transition-all flex items-center justify-between ${
                      formData.preApproved === 'dont_know'
                        ? 'bg-amber-500/10 border-amber-500 ring-2 ring-amber-500/20'
                        : 'bg-slate-950 border-slate-800 hover:bg-slate-950/60 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <h4 className="text-sm font-bold text-white">Chưa biết Pre-approval là gì / Cần tư vấn chi tiết</h4>
                      <p className="text-xs text-slate-400 mt-1">Cần chuyên viên hướng dẫn định nghĩa và sự quan trọng của đòn bẩy ngân hàng.</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      formData.preApproved === 'dont_know' ? 'bg-amber-500 border-amber-500 text-slate-950' : 'border-slate-800'
                    }`}>
                      {formData.preApproved === 'dont_know' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Downpayment range */}
            {step === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mb-2">
                    <Wallet className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                    Khoản vốn tự có (Down payment) anh/chị đã chuẩn bị sẵn sàng cho kế hoạch này là bao nhiêu?
                  </h3>
                  <p className="text-sm text-slate-400">
                    Khoản tiền trả trước thực tế quyết định trực tiếp phân khúc bất động sản anh/chị sở hữu tại San Jose.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <button
                    type="button"
                    onClick={() => handleOptionSelect('downPayment', 'under_200')}
                    className={`p-4 md:p-5 rounded-2xl border text-left cursor-pointer transition-all flex items-center justify-between ${
                      formData.downPayment === 'under_200'
                        ? 'bg-amber-500/10 border-amber-500 ring-2 ring-amber-500/20'
                        : 'bg-slate-950 border-slate-800 hover:bg-slate-950/60 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <h4 className="text-sm font-bold text-white">Dưới $200,000</h4>
                      <p className="text-xs text-slate-400 mt-1">Lập kế hoạch mua nhà vùng lân cận Silicon, condominium, hoặc đàm phán giảm tiền mặt.</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      formData.downPayment === 'under_200' ? 'bg-amber-500 border-amber-500 text-slate-950' : 'border-slate-800'
                    }`}>
                      {formData.downPayment === 'under_200' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOptionSelect('downPayment', '200_400')}
                    className={`p-4 md:p-5 rounded-2xl border text-left cursor-pointer transition-all flex items-center justify-between ${
                      formData.downPayment === '200_400'
                        ? 'bg-amber-500/10 border-amber-500 ring-2 ring-amber-500/20'
                        : 'bg-slate-950 border-slate-800 hover:bg-slate-950/60 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <h4 className="text-sm font-bold text-white">Từ $200,000 - $400,000</h4>
                      <p className="text-xs text-slate-400 mt-1">Mức chuẩn phổ thông, có cơ hội tiếp cận dòng single-family home và townhouse cực đẹp tại San Jose.</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      formData.downPayment === '200_400' ? 'bg-amber-500 border-amber-500 text-slate-950' : 'border-slate-800'
                    }`}>
                      {formData.downPayment === '200_400' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOptionSelect('downPayment', 'above_400')}
                    className={`p-4 md:p-5 rounded-2xl border text-left cursor-pointer transition-all flex items-center justify-between ${
                      formData.downPayment === 'above_400'
                        ? 'bg-amber-500/10 border-amber-500 ring-2 ring-amber-500/20'
                        : 'bg-slate-950 border-slate-800 hover:bg-slate-950/60 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <h4 className="text-sm font-bold text-white">Trên $400,000</h4>
                      <p className="text-xs text-slate-400 mt-1">Phù hợp trực tiếp với các phân khúc cao cấp bậc nhất San Jose. Đốc thúc xử lý hồ sơ ngay.</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      formData.downPayment === 'above_400' ? 'bg-amber-500 border-amber-500 text-slate-950' : 'border-slate-800'
                    }`}>
                      {formData.downPayment === 'above_400' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Contact Detail Input fields */}
            {step === 4 && (
              <motion.div
                key="step-4"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mb-2">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                    Thông tin liên hệ xác thực
                  </h3>
                  <p className="text-sm text-slate-400">
                    Evan's team sẽ gọi điện duyệt hồ sơ trực tiếp trong vòng 24 giờ.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono font-medium text-slate-400 uppercase tracking-wider mb-1.5">
                      Họ và tên của anh/chị <span className="text-amber-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="VD: Nguyễn Văn A"
                      value={formData.fullName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all font-sans"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-medium text-slate-400 uppercase tracking-wider mb-1.5">
                        Số điện thoại <span className="text-amber-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="VD: 408-555-0123"
                        value={formData.phone}
                        onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all font-sans"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-medium text-slate-400 uppercase tracking-wider mb-1.5">
                        Địa chỉ Email <span className="text-amber-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="VD: nguyenvana@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all font-sans"
                      />
                    </div>
                  </div>

                  <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-850 flex items-start gap-2.5">
                    <BadgeInfo className="w-4.5 h-4.5 text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-[11px] text-slate-400 leading-normal">
                      <strong>Bảo mật thông tin:</strong> Evan cam kết chỉ sử dụng thông tin này để tư vấn thẩm định BĐS San Jose và liên hệ phản hồi trực tiếp. Chúng tôi nói KHÔNG với việc chuyển giao dữ liệu cho bên thứ ba.
                    </p>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error Message */}
          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-xl flex items-center gap-2"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>{errorMsg}</span>
            </motion.div>
          )}

          {/* Navigation Action Buttons within Form Card */}
          <div className="mt-8 pt-6 border-t border-slate-800 flex justify-between items-center">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-5 py-2.5 border border-slate-800 hover:border-slate-700 bg-slate-950 hover:bg-slate-900 rounded-xl text-slate-300 text-xs font-semibold cursor-pointer flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Quay lại
              </button>
            ) : (
              <div />
            )}

            {step < totalSteps ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold cursor-pointer flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(245,158,11,0.15)] hover:shadow-[0_0_20px_rgba(245,158,11,0.25)]"
              >
                Tiếp tục <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 rounded-xl text-sm font-bold cursor-pointer flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(245,158,11,0.2)] disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>Đang nộp hồ sơ...</>
                ) : (
                  <>
                    Nộp Đơn Đăng Ký Kiểm Thử <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Success Screen */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-6 space-y-6"
        >
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto text-2xl">
            ✓
          </div>
          <div className="space-y-2">
            <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              Nộp Đơn Đăng Ký Thành Công!
            </h3>
            <p className="text-sm text-slate-400 max-w-lg mx-auto leading-relaxed">
              Cảm ơn anh/chị <strong>{formData.fullName}</strong>. Thông tin khảo sát của anh/chị đã được ghi nhận thành công.
            </p>
          </div>

          {/* Conditional Diagnostic Outcome Card based on lead score */}
          {submittedLead && (
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 max-w-md mx-auto text-left space-y-4">
              
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Trạng thái định vị:</span>
                  <span className="font-bold font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 animate-pulse">
                    Đang chờ duyệt
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Khu vực mong muốn:</span>
                  <span className="text-slate-200 font-medium font-sans">
                    {submittedLead.targetLocation}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Vốn tự có (Down payment):</span>
                  <span className="text-slate-200 font-medium">
                    {submittedLead.downPayment === 'above_400' ? 'Trên $400,000' : submittedLead.downPayment === '200_400' ? '$200,000 - $400,000' : 'Dưới $200,000'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Pre-Approval Letter:</span>
                  <span className="text-slate-200 font-medium">
                    {submittedLead.preApproved === 'yes' ? 'Đã có sẵn' : submittedLead.preApproved === 'cash' ? 'Dự định mua bằng tiền mặt' : submittedLead.preApproved === 'no_credit_ok' ? 'Đủ điều kiện lấy gấp' : 'Chưa hiểu quy chế'}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-900 text-center text-[11px] text-slate-400 leading-normal">
                {submittedLead.status === 'vip' ? (
                  <p className="text-amber-500 font-semibold">
                    🔥 Evan's team sẽ liên hệ trực tiếp cho anh/chị thông qua hotline riêng trong tối đa 2 giờ làm việc để xếp lịch 1-1 trực tiếp với Evan.
                  </p>
                ) : submittedLead.status === 'qualified' ? (
                  <p className="text-emerald-400">
                    👍 Hồ sơ của anh/chị đạt tiêu chuẩn vàng để tham gia mua nhà tại San Jose. Evan's team sẽ liên hệ trong 12 giờ làm việc tiếp theo.
                  </p>
                ) : (
                  <p className="text-indigo-400">
                    ℹ️ Đối với trường hợp tư vấn làm quen Pre-approval, chúng tôi sẽ chuẩn bị bộ giáo tài gửi trực tiếp qua email của anh/chị trước khi gọi hỗ trợ.
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
            <a
              href="https://www.facebook.com/groups/sannhagooddealevan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-slate-950 px-5 py-3 bg-amber-500 hover:bg-amber-400 rounded-xl cursor-pointer transition-colors flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
            >
              Tham gia nhóm săn nhà good deal cùng Evan (Facebook Group)
            </a>
            <button
              onClick={() => {
                const url = document.getElementById('vsl-interactive-player');
                if (url) url.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-xs font-semibold px-4 py-3 border border-slate-800 hover:border-slate-700 bg-slate-950 text-slate-300 rounded-xl cursor-pointer hover:text-white transition-colors"
            >
              Xem lại Video Thuyết Trình
            </button>
          </div>

        </motion.div>
      )}

    </div>
  );
}

// Helper function to calculate readable automated tags for the dashboard
function getAutoNotes(data: any): string {
  const parts: string[] = [];
  parts.push(`Khu vực quan tâm: ${data.targetLocation}.`);

  if (data.preApproved === 'yes') {
    parts.push('Sẵn Pre-Approval.');
  } else if (data.preApproved === 'cash') {
    parts.push('Dự định mua bằng tiền mặt (Cash).');
  } else if (data.preApproved === 'no_credit_ok') {
    parts.push('Chưa có Pre-Approval nhưng Credit ngon.');
  } else {
    parts.push('Mơ hồ về quy định Pre-Approval - Cần tư vấn chi tiết.');
  }

  if (data.downPayment === 'above_400') {
    parts.push('Vốn lực mạnh >$400k.');
  } else if (data.downPayment === '200_400') {
    parts.push('Ngân sách downpayment trung vị ($200k-$400k).');
  } else {
    parts.push('Nguồn vốn hạn chế, dưới $200k.');
  }

  return parts.join(' ');
}
