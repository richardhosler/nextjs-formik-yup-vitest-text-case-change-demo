import { FormikErrors } from "formik";
import React, { ReactNode, useEffect, useState } from "react";

interface IToast {
  id: string;
  body: string;
  isLeaving?: boolean;
}

interface IToastProps {
  messages: FormikErrors<{
    inputString: string;
    caseType: string;
    alphaNumeric: boolean;
    replace: boolean;
    replaceString: string;
  }>;
  onErrorsProcessed?: () => void;
}

export function ToastNotification({
  messages,
  onErrorsProcessed = ()=>{},
}: IToastProps): ReactNode {
  const [toasts, setToasts] = useState<IToast[]>([]);

  useEffect(() => {
    const errorMessages = Object.values(messages).filter(
      (message): message is string => typeof message === "string"
    );

    const newToasts = errorMessages.map((message) => ({
      id: Math.random().toString(36).slice(2, 11),
      body: message,
    }));

    setToasts((prev) => [...prev, ...newToasts]);
    onErrorsProcessed?.();

    newToasts.forEach((toast) => {
      setTimeout(() => {
        setToasts((prev) =>
          prev.map((t) => (t.id === toast.id ? { ...t, isLeaving: true } : t))
        );
      }, 4700);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id));
      }, 5000);
    });
  }, [messages, onErrorsProcessed]);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 1000,
      }}
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            bg-rose-200 text-rose-500 ring-2 ring-rose-500 
            rounded-md shadow-md px-6 py-3 mb-2.5 
            min-w-[200px] max-w-[400px]
            ${toast.isLeaving ? "animate-slideOut" : "animate-slideIn"}
          `}
        >
          {toast.body}
        </div>
      ))}
    </div>
  );
}
