type ButtonProps = {
  title: string;
  type?: 'button' | 'submit';
  className: string;
};

export default function Button({
  title,
  type = 'button',
  className,
}: ButtonProps) {
  return (
    <button className={className} type={type}>
      {title}
    </button>
  );
}
