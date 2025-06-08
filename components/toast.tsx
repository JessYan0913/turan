'use client';

import React, { type ReactNode } from 'react';

import { CheckCircleIcon, FileWarningIcon } from 'lucide-react';
import { toast as sonnerToast } from 'sonner';

const iconsByType: Record<'success' | 'error', ReactNode> = {
  success: <CheckCircleIcon />,
  error: <FileWarningIcon />,
};

export function toast(props: Omit<ToastProps, 'id'>) {
  return sonnerToast.custom((id) => <Toast id={id} type={props.type} description={props.description} />);
}

function Toast(props: ToastProps) {
  const { id, type, description } = props;

  return (
    <div className="toast-mobile:w-[356px] flex w-full justify-center">
      <div
        data-testid="toast"
        key={id}
        className="toast-mobile:w-fit flex w-full flex-row items-center gap-2 rounded-lg bg-zinc-100 p-3"
      >
        <div data-type={type} className="data-[type=error]:text-red-600 data-[type=success]:text-green-600">
          {iconsByType[type]}
        </div>
        <div className="text-sm text-zinc-950">{description}</div>
      </div>
    </div>
  );
}

interface ToastProps {
  id: string | number;
  type: 'success' | 'error';
  description: string;
}
