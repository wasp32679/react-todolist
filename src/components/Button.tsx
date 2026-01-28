type ButtonProps = {
  title: string;
  type?: 'button' | 'submit';
  className: string;
  disabled?: boolean;
  onClick?: () => void;
};

export default function Button({
  title,
  type = 'button',
  className,
  disabled = false,
  onClick,
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={className}
      type={type}
      onClick={onClick}
    >
      {title}
    </button>
  );
}
