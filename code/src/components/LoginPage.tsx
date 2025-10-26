import React, { useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newErrors: { email?: string; password?: string } = {};
    if (!email) newErrors.email = 'กรุณากรอกอีเมล';
    if (!password) newErrors.password = 'กรุณากรอกรหัสผ่าน';
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      console.log('ทำการ Login ด้วยข้อมูล:', { email, password });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gray-100 px-4">
      <form className="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-md" onSubmit={handleSubmit} noValidate>
        <h2 className="text-3xl font-bold text-left text-gray-900 mb-6">
          Sign In
        </h2>

        <div className="space-y-5">
          <div>
            <input
              className={`w-full transition-transform duration-200 hover:scale-105 bg-white/80 border rounded-md px-3 py-2 placeholder-gray-500 text-black ${errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'}`}
              type="email"
              id="email"
              title='Please enter your Email'
              placeholder="Email"
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

          <div className="relative">
            <input
              className={`w-full pr-10 transition-transform duration-200 hover:scale-105 bg-white/80 border rounded-md px-3 py-2 placeholder-gray-500 text-black ${errors.password ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'}`}
              type={showPassword ? 'text' : 'password'}
              id="password"
              title='Please enter your Password'
              placeholder="Password"
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
              title={showPassword ? "Don't show your Password" : "Show your Password"}
            >
              {showPassword ? <BsEyeSlash /> : <BsEye />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-600 text-sm -mt-3">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors font-semibold"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;