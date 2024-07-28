import { FormHTMLAttributes, ReactNode } from 'react';

type FormProps = {
  children?: ReactNode;
  className?: string;
} & FormHTMLAttributes<HTMLFormElement>;

function Form({ children, className, ...rest }: FormProps) {
  return (
    <form name="search-form" {...rest} className={className}>
      {children}
    </form>
  );
}

export default Form;
