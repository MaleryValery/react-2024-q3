import { Component, FormEvent, ReactNode } from 'react';

type FormProps = {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  children?: ReactNode;
  className?: string;
};

class Form extends Component<FormProps> {
  render() {
    return (
      <form onSubmit={this.props.onSubmit} className={this.props.className}>
        {this.props.children}
      </form>
    );
  }
}

export default Form;
