import React from 'react';

export interface IOption {
  id: number;
  label: string;
  value: string;
}

export type CreateModalProps = {
  isOpen: boolean;
  close: () => void;
};

export type ReactChildrenType = {
  children: React.ReactNode;
};
