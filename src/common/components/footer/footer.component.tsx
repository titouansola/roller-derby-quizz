export function Footer() {
  return (
    <footer className="flex justify-center gap-4 py-3 border-t border-border text-xs">
      <p>
        version: <b>1.2.2</b>
      </p>
      <p>
        Réalisé par{' '}
        <a
          href="https://titouansola.dev/"
          target="_blank"
          className="font-bold underline"
        >
          Titouan Sola
        </a>{' '}
        avec 💜
      </p>
    </footer>
  );
}
