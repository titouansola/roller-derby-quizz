import { useEffect, useState } from 'react';
import { RegularMenu } from './regular-menu.component';
import { SmallMenu } from './small-menu.component';

export function Header() {
  const [smallMenu, setSmallMenu] = useState(false);

  useEffect(() => {
    const listener = () => setSmallMenu(window.innerWidth < 600);
    window.addEventListener('resize', listener);
    listener();
    return () => window.removeEventListener('resize', listener);
  }, []);

  return (
    <header className="h-[50px] border-b border-border flex items-center justify-between px-3 lg:px-20">
      <h1>Roller Derby Quizz</h1>
      {!smallMenu ? <RegularMenu /> : <SmallMenu />}
    </header>
  );
}
