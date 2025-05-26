// src/components/CustomLink.tsx
import { useNavigationHook } from '../hooks/useNavigationHook'
import type { LinkProps as CustomLinkProps } from '../vite-env.d.ts'

const Link: React.FC<CustomLinkProps> = ({ to, params, className, children }) => {
  const { navigate } = useNavigationHook();

  const handleClick = (e: React.MouseEvent <HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    // get href from clicked a element
    // const href = e.currentTarget.href
    navigate(to, params);
  };

  return (
    <a href={to} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};

export default Link