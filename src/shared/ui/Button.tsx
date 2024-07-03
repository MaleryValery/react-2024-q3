import { Component, MouseEvent, ReactNode } from 'react';

type ButtonProps = {
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  title?: string;
  className?: string;
  children?: ReactNode;
  type?: 'button' | 'submit' | 'reset';
};

class Button extends Component<ButtonProps> {
  render() {
    return (
      <button
        type={this.props.type || 'button'}
        onClick={this.props.onClick}
        className={this.props.className}
      >
        {this.props.title || this.props.children}
      </button>
    );
  }
}

export default Button;
