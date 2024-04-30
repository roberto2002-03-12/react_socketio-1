import { InputHTMLAttributes  } from 'react'

type TextInputTypes = 'text' | 'password'

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: TextInputTypes;

  includeLabel?: boolean;
  htmlFor?: string;

  label?: string;
  placeHolder?: string;
  required?: boolean;

  error?: boolean;
  helperText?: string;

  className?: string;
  classNameContainer?: string;
}