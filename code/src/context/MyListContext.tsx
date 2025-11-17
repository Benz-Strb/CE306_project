import React, { createContext, useState, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Media } from '../types/types';
import { useAuth } from './AuthContext';

interface MyListContextType {
  myList: Media[];
  addToMyList: (media: Media) => void;
  removeFromMyList: (id: number) => void;
  isInMyList: (id: number) => boolean;
}

const MyListContext = createContext<MyListContextType | undefined>(undefined);

export const MyListProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth(); // ดึง user มาใช้
  
  // ฟังก์ชันสำหรับ generate key ตาม user
  const getStorageKey = () => {
    if (!user) return 'my-list-guest';
    return `my-list-${user.email}`;
  };

  const [myList, setMyList] = useState<Media[]>(() => {
    const storageKey = getStorageKey();
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : [];
  });

  // เมื่อ user เปลี่ยน ให้โหลดข้อมูลของ user นั้นๆ
  useEffect(() => {
    const storageKey = getStorageKey();
    const saved = localStorage.getItem(storageKey);
    setMyList(saved ? JSON.parse(saved) : []);
  }, [user?.email]); // ทำงานเมื่อ user เปลี่ยน

  // บันทึกลง localStorage เมื่อ myList เปลี่ยน
  useEffect(() => {
    const storageKey = getStorageKey();
    localStorage.setItem(storageKey, JSON.stringify(myList));
  }, [myList, user?.email]);

  const addToMyList = (media: Media) => {
    setMyList((prev) => {
      if (prev.find((item) => item.id === media.id)) return prev;
      return [...prev, media];
    });
  };

  const removeFromMyList = (id: number) => {
    setMyList((prev) => prev.filter((item) => item.id !== id));
  };

  const isInMyList = (id: number) => {
    return myList.some((item) => item.id === id);
  };

  return (
    <MyListContext.Provider value={{ myList, addToMyList, removeFromMyList, isInMyList }}>
      {children}
    </MyListContext.Provider>
  );
};

export const useMyList = () => {
  const context = useContext(MyListContext);
  if (!context) throw new Error('useMyList must be used within a MyListProvider');
  return context;
};