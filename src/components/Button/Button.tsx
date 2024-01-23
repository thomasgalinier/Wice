import "./button.css";
type Props = {
  children: string;
  variant: "primary" | "secondary" | "outline" | "link" | "disabled";
};
function Button({ children, variant }: Props) {
  const buttonClassName = variant;
  const isDisabled = variant === "disabled";
  return (
    <button className={buttonClassName} disabled={isDisabled}>
      {children}
    </button>
  );
}

export default Button;
