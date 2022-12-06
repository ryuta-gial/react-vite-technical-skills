import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, getByText } from '@testing-library/react';
//import ButtonComponent, { ButtonComponentProps } from './ButtonComponent';

describe('ButtonComponent', () => {
  const props: ButtonComponentProps = {
    onClick: jest.fn(),
  };

  it('コンポネントが描画されるか', () => {
    const { getByText } = render(<ButtonComponent {...props} />);
    const button = getByText('@');
    expect(button).toBeInTheDocument();
  });

  it('テキストが表示されているか', () => {
    const attr: ButtonComponentProps = {
      ...props,
      buttonText: 'テストボタン',
    };
    const { container } = render(<ButtonComponent {...attr} />);
    const buttons = container.querySelector('button');
    expect(buttons).toHaveTextContent('テストボタン');
  });

  it('スタイルが適用されているか', () => {
    const attrs: ButtonComponentProps = {
      ...props,
      style: { backgroundColor: 'red' },
    };
    const { container } = render(<ButtonComponent {...attrs} />);
    const buttons = container.querySelector('button');
    expect(buttons).toHaveStyle('background-color: red');
  });

  it('非活性が適用されているか', () => {
    const attrs: ButtonComponentProps = { ...props, disabled: true };
    const { container } = render(<ButtonComponent {...attrs} />);
    const buttons = container.querySelector('button');
    expect(buttons).toHaveAttribute('disabled');
  });

  it('クラス名が適用されているか', () => {
    const attrs: ButtonComponentProps = { ...props, className: 'test' };
    const { container } = render(<ButtonComponent {...attrs} />);
    const buttons = container.querySelector('button');
    expect(buttons).toHaveClass('test');
  });

  it('画像が表示できるか', () => {
    const attrs: ButtonComponentProps = {
      ...props,
      iconSrc: '../../common/images/icon_car.svg',
    };
    const { container } = render(<ButtonComponent {...attrs} />);
    const buttons = container.querySelector('button');
    expect(buttons).toHaveStyle(
      'background-image: url(../../common/images/icon_car.svg)'
    );
  });

  it('画像の位置設定用スタイルが適用されているか', () => {
    const attrs: ButtonComponentProps = {
      ...props,
      iconPosition: 'left',
    };
    const { container } = render(<ButtonComponent {...attrs} />);
    const buttons = container.querySelector('button');
    expect(buttons).toHaveStyle('background-position: left');
  });

  it('イベントハンドラが呼ばれるか', () => {
    const { container } = render(<ButtonComponent {...props} />);
    fireEvent(
      getByText(container, '@'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );
    expect(props.onClick).toHaveBeenCalled();
  });
});
