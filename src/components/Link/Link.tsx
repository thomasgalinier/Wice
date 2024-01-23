import "./link.css"
type Props = {
  children: string;
  variant: "primary" | "secondary" | "outline" | "link";
  href: string
};
function Link({ children, variant, href }: Props) {
  const buttonClassName = variant;

  return (
    <a href={href} className={buttonClassName}>
      {children}
    </a>
  );
}

export default Link;
