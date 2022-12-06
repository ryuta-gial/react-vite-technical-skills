import React, { useState } from 'react';
import styles from './Button.module.css';

export type ButtonComponentProps = {
  /**
   * @desctiprion
   * ボタンに表示するテキスト
   */
  buttonText?: string;
  /**
   * @desctiprion
   * ボタンonClickイベント
   */
  onClick: Function;
  /**
   * @desctiprion
   * ボタンスタイル
   */
  style?: React.CSSProperties;
  /**
   * @desctiprion
   * disabled属性
   */
  disabled?: boolean;
  /**
   * @desctiprion
   * アイコンボタンにする時のiconのsrc
   */
  iconSrc?: string;
  iconPosition?: string;
  /**
   * @description
   * クラス名
   */
  className?: string;
  /**
   * @description
   * ドラッグ可能な要素の中にあるかどうか（react-rnd内の要素であるかどうか）
   */
  inDraggable?: boolean;
};

function ButtonComponent(props: ButtonComponentProps) {
  const [isTouch, setIsTouch] = useState(false);

  return (
    <button
      className={`${styles.button} ${props.className ? props.className : ''}`}
      style={{
        ...props.style,
        backgroundImage: props.iconSrc ? `url(${props.iconSrc})` : '',
        backgroundPosition: props.iconPosition ? props.iconPosition : 'center',
        backgroundRepeat: props.iconSrc ? 'no-repeat' : '',
        color: !props.buttonText ? 'transparent' : 'inherit',
      }}
      onClick={() => {
        if (!props.disabled) {
          props.onClick();
        }
      }}
      // NOTE: 以下、タッチデバイス用であり、react-rnd内の要素である要素対応
      onTouchStart={() => {
        if (!props.disabled && props.inDraggable) {
          setIsTouch(true);
        }
      }}
      onTouchEnd={() => {
        if (!props.disabled && isTouch && props.inDraggable) {
          props.onClick();
          setIsTouch(false);
        }
      }}
      disabled={props.disabled}
    >
      <span>{props.buttonText ? props.buttonText : '@'}</span>
    </button>
  );
}

export default ButtonComponent;
