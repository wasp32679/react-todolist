type ButtonProps = {
  title: string;
  type?: 'button' | 'submit';
};

export default function Button({ title, type = 'button' }: ButtonProps) {
  return <button type={type}>{title}</button>;
}
