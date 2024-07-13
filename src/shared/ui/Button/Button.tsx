import { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonProps = {
  title?: string;
  className?: string;
  children?: ReactNode;
  type?: 'button' | 'submit' | 'reset';
} & ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ title, className, children, type, ...rest }: ButtonProps) {
  return (
    <button type={type || 'button'} className={className} {...rest}>
      {title || children}
    </button>
  );
}

export default Button;
