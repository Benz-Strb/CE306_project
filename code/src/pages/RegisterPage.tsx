import React, { useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

const RegisterPage: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'กรุณากรอกชื่อ';
    if (!formData.lastName.trim()) newErrors.lastName = 'กรุณากรอกนามสกุล';
    if (!formData.email.trim()) {
      newErrors.email = 'กรุณากรอกอีเมล';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'รูปแบบอีเมลไม่ถูกต้อง';
    }
    if (!formData.password) {
      newErrors.password = 'กรุณากรอกรหัสผ่าน';
    } else if (formData.password.length < 6) {
      newErrors.password = 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'กรุณายืนยันรหัสผ่าน';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'รหัสผ่านไม่ตรงกัน';
    }

    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validateForm();
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      console.log('สมัครสมาชิกด้วยข้อมูล:', formData);
      alert('สมัครสมาชิกสำเร็จ!');
      onNavigate('login');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 px-4 py-8">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-bold text-left text-gray-900 mb-2">
          สมัครสมาชิก
        </h2>
        <p className="text-gray-600 text-sm mb-6">สร้างบัญชีของคุณเพื่อเริ่มต้นใช้งาน</p>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อ</label>
              <input
                className={`w-full transition-all duration-200 hover:shadow-md bg-gray-50 border rounded-lg px-4 py-3 placeholder-gray-400 text-black focus:ring-2 focus:ring-purple-500 focus:border-transparent ${errors.firstName ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'}`}
                type="text"
                placeholder="ชื่อ"
                value={formData.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
              />
              {errors.firstName && (
                <p className="text-red-600 text-xs mt-1">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">นามสกุล</label>
              <input
                className={`w-full transition-all duration-200 hover:shadow-md bg-gray-50 border rounded-lg px-4 py-3 placeholder-gray-400 text-black focus:ring-2 focus:ring-purple-500 focus:border-transparent ${errors.lastName ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'}`}
                type="text"
                placeholder="นามสกุล"
                value={formData.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
              />
              {errors.lastName && (
                <p className="text-red-600 text-xs mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">อีเมล</label>
            <input
              className={`w-full transition-all duration-200 hover:shadow-md bg-gray-50 border rounded-lg px-4 py-3 placeholder-gray-400 text-black focus:ring-2 focus:ring-purple-500 focus:border-transparent ${errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'}`}
              type="email"
              placeholder="example@email.com"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">รหัสผ่าน</label>
            <div className="relative">
              <input
                className={`w-full pr-10 transition-all duration-200 hover:shadow-md bg-gray-50 border rounded-lg px-4 py-3 placeholder-gray-400 text-black focus:ring-2 focus:ring-purple-500 focus:border-transparent ${errors.password ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'}`}
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ยืนยันรหัสผ่าน</label>
            <div className="relative">
              <input
                className={`w-full pr-10 transition-all duration-200 hover:shadow-md bg-gray-50 border rounded-lg px-4 py-3 placeholder-gray-400 text-black focus:ring-2 focus:ring-purple-500 focus:border-transparent ${errors.confirmPassword ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'}`}
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none bg-transparent border-none"
              >
                {showConfirmPassword ? <BsEyeSlash size={20} /> : <BsEye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>
            )}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="mt-6 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
        >
          สมัครสมาชิก
        </button>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            มีบัญชีอยู่แล้ว?{' '}
            <button
              type="button"
              onClick={() => onNavigate('login')}
              className="text-purple-600 hover:text-purple-700 font-semibold bg-transparent border-none cursor-pointer underline"
            >
              เข้าสู่ระบบ
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;