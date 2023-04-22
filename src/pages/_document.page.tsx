import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="pt-br">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#F3F5F8" />
        <meta
          name="description"
          content="Sorteie nomes para qualquer ocasião. Crie um grupo, adicione os participantes e faça o sorteio de amigo secreto para o natal ou outra festividade."
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
