import React from 'react';
import './Login.css';

const Login: React.FC = () => {
  return (
    <div className="login-container">
      {/* 1. กำหนด action (URL ที่จะส่งข้อมูลไป) และ method (วิธีการส่ง) */}
      <form className="login-form" action="/api/login" method="POST">
        <h2>เข้าสู่ระบบ</h2>
        
        <div className="form-group">
          <label htmlFor="email">อีเมล</label>
          <input 
            type="email"
            id="email"
            name="email" // 2. เพิ่ม name เพื่อให้ฟอร์มรู้ว่าข้อมูลนี้ชื่ออะไร
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">รหัสผ่าน</label>
          <input 
            type="password"
            id="password"
            name="password" // 3. เพิ่ม name สำหรับรหัสผ่าน
            required
          />
        </div>
        
        <button type="submit" className="login-button">
          ล็อกอิน
        </button>
      </form>
    </div>
  );
};

export default Login;