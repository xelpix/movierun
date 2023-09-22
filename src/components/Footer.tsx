const Footer = () => {
  const date = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-zinc-950 px-8 text-white py-6 z-[60] xsm:block hidden">
      <div className="container mx-auto flex gap-3 xsm:flex-row justify-between flex-col items-center">
        <p className="text-base">© {date} Movierun.</p>
        <p>
          спасибо{' '}
          <a className="text-orange-500" href="https://kinopoisk.dev/">
            {' '}
            kinopoisk.dev
          </a>{' '}
          за api !
        </p>
      </div>
    </footer>
  );
};

export default Footer;
