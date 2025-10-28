import React, { useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

const LoginPage: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event: React.MouseEvent) => {
    event.preventDefault();
    const newErrors: { email?: string; password?: string } = {};
    if (!email) newErrors.email = 'กรุณากรอกอีเมล';
    if (!password) newErrors.password = 'กรุณากรอกรหัสผ่าน';
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      console.log('ทำการ Login ด้วยข้อมูล:', { email, password });
      alert('เข้าสู่ระบบสำเร็จ!');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-4">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-bold text-left text-gray-900 mb-2">
          เข้าสู่ระบบ
        </h2>
        <p className="text-gray-600 text-sm mb-6">ยินดีต้อนรับกลับมา!</p>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">อีเมล</label>
            <input
              className={`w-full transition-all duration-200 hover:shadow-md bg-gray-50 border rounded-lg px-4 py-3 placeholder-gray-400 text-black focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'}`}
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
              }}
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">รหัสผ่าน</label>
            <div className="relative">
              <input
                className={`w-full pr-10 transition-all duration-200 hover:shadow-md bg-gray-50 border rounded-lg px-4 py-3 placeholder-gray-400 text-black focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.password ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'}`}
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none bg-transparent border-none"
              >
                {showPassword ? <BsEyeSlash size={20} /> : <BsEye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">{errors.password}</p>
            )}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="mt-6 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
        >
          เข้าสู่ระบบ
        </button>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            ยังไม่มีบัญชี?{' '}
            <button
              type="button"
              onClick={() => onNavigate('register')}
              className="text-blue-600 hover:text-blue-700 font-semibold bg-transparent border-none cursor-pointer underline"
            >
              สมัครสมาชิก
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;