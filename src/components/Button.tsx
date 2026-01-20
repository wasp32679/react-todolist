type ButtonProps = {
  title: string;
  type?: 'button' | 'submit';
  classname: string;
};

export default function Button({
  title,
  type = 'button',
  classname,
}: ButtonProps) {
  return (
    <button className={classname} type={type}>
      {title}
    </button>
  );
}
