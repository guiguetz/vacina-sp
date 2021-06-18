import Head from 'next/head';
import { useState } from 'react';
import { format, formatDistanceToNowStrict, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function Home() {
  const [idade, setIdade] = useState(null);
  const [data, setData] = useState({ grupo: '', inicio: '', fim: '' });
  const [showResult, setShowResult] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (idade >= 18 && idade <= 24) {
      setShowResult(true);
      setData({
        grupo: '18 a 24',
        inicio: '2021-09-01',
        fim: '2021-09-15',
      });
      return;
    }
    if (idade >= 25 && idade <= 29) {
      setShowResult(true);
      setData({
        grupo: '25 a 29',
        inicio: '2021-08-16',
        fim: '2021-08-31',
      });
      return;
    }
    if (idade >= 30 && idade <= 34) {
      setShowResult(true);
      setData({
        grupo: '30 a 34',
        inicio: '2021-07-30',
        fim: '2021-08-15',
      });
      return;
    }
    if (idade >= 35 && idade <= 39) {
      setShowResult(true);
      setData({
        grupo: '35 a 39',
        inicio: '2021-07-15',
        fim: '2021-07-29',
      });
      return;
    }
    if (idade >= 40 && idade <= 42) {
      setShowResult(true);
      setData({
        grupo: '40 a 42',
        inicio: '2021-06-30',
        fim: '2021-07-14',
      });
      return;
    }
    if (idade >= 43 && idade <= 49) {
      setShowResult(true);
      setData({
        grupo: '43 a 49',
        inicio: '2021-06-23',
        fim: '2021-06-29',
      });
      return;
    }
    if (idade >= 50 && idade <= 59) {
      setShowResult(true);
      setData({
        grupo: '50 a 59',
        inicio: '2021-06-16',
        fim: '2021-06-22',
      });
      return;
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  py-2">
      <Head>
        <title>Vem, vacina!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center w-full max-w-screen-lg flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold max-w-screen-md">
          E aí, quando tem <p className="text-emerald-600">vacina?</p>
        </h1>

        <p className="mt-3 text-2xl max-w-screen-md">
          Vamos descobrir quando você toma a vacina aqui no{' '}
          <span className="font-bold">estado de SP</span>?
        </p>

        <form
          onSubmit={handleSubmit}
          className="max-w-screen-md my-5 flex flex-col"
        >
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="idade">
              Qual a sua idade? (em anos)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="idade"
              name="idade"
              type="number"
              min="18"
              max="59"
              onChange={(e) => setIdade(e.target.value)}
              requiemerald
            />
          </div>
          <div className="inline-block mr-2 mt-2">
            <button
              type="submit"
              className="focus:outline-none text-white text-sm py-2.5 px-5 border-b-4 border-emerald-600 rounded-md bg-emerald-500 hover:bg-emerald-400"
            >
              Calcular
            </button>
          </div>
        </form>

        {showResult && (
          <>
            <hr className="w-full pb-4" />
            <p className="max-w-screen-md font-bold text-2xl mb-2">
              {parseISO(data.inicio).getTime() < Date.now()
                ? 'Chegou!'
                : 'Tá Chegando!'}
            </p>
            <p className="max-w-screen-md">
              Você faz parte do grupo{' '}
              <span className="font-bold text-lg">{data.grupo}</span> anos - que
              poderá se vacinar entre os dias{' '}
              <span className="font-bold text-lg">
                {format(parseISO(data.inicio), 'dd/MM/yyyy')}
              </span>{' '}
              e{' '}
              <span className="font-bold text-lg">
                {format(parseISO(data.fim), 'dd/MM/yyyy')}
              </span>
              .{' '}
              {parseISO(data.inicio).getTime() < Date.now() ? (
                'Você pode se vacinar, aproveite! 💉'
              ) : (
                <>
                  São só mais{' '}
                  <span className="font-bold text-lg">
                    {formatDistanceToNowStrict(parseISO(data.inicio), {
                      unit: 'day',
                      roundingMethod: 'ceil',
                      locale: ptBR,
                    })}
                  </span>
                  ! ⏰
                </>
              )}
            </p>
            <p className="max-w-screen-md mt-2">
              Já separa <strong>comprovante de residência</strong>,{' '}
              <strong>documento com foto</strong> e prepara o bracinho! 💪
            </p>

            <p>
              Quer lembrar do evento? Adicione na sua agenda do google, só
              clicar{' '}
              <a
                target="_blank"
                className="font-bold underline"
                href="https://www.google.com/calendar/render?action=TEMPLATE&text=Vacina&details=Tomar+a+primeira+dose+da+vacina%21&dates=20210618T184500Z%2F20210620T184500Z"
              >
                aqui
              </a>
              ! O link irá te levar ao Google Agenda, e você pode criar um
              lembrete!
            </p>
            <div className="w-full">
              <details className="bg-gray-100 rounded-lg px-6 py-2 my-5">
                <summary className="font-bold">
                  Minha data já passou! 😱
                </summary>
                <p className="pt-2">
                  Calma, está tudo bem! Com comprovante de residência e
                  documento com foto em mãos, vá à unidade de saúde mais próxima
                  e se informe pelas regras da <strong>repescagem</strong> em
                  sua cidade!
                </p>
              </details>
              <details className="bg-gray-100 rounded-lg px-6 py-2 my-5">
                <summary className="font-bold">
                  Tenho menos de 18 anos! 🧒
                </summary>
                <p className="pt-2">
                  Dá até vontade, né, jovem?
                  <br /> Aguenta mais um pouco, já temos aprovação da ANVISA
                  para maiores de 12 anos tomarem a vacina da Pfizer (você pode
                  ler mais sobre clicando{' '}
                  <a
                    target="_blank"
                    className="underline font-bold"
                    href="https://www.uol.com.br/vivabem/noticias/emeraldacao/2021/06/11/anvisa-autoriza-vacina-da-pfizer-para-criancas-com-mais-de-12-anos.htm"
                  >
                    aqui
                  </a>
                  ), mas a distribuição de doses dessa fabricante ainda está
                  devagar, dado o número de doses disponívies por que o
                  presidente ignorou mais de 80 emails da Pfizer, infelizmente
                  (leia mais{' '}
                  <a
                    target="_blank"
                    className="underline font-bold"
                    href="https://vermelho.org.br/2021/06/09/governo-bolsonaro-ignorou-81-emails-da-pfzier-sobre-ofertas-de-vacinas/"
                  >
                    aqui
                  </a>
                  ). Entre em contato com a unidade de saúde mais próxima e veja
                  como está funcionando esse grupo em sua cidade!
                </p>
              </details>
            </div>
          </>
        )}
      </main>

      <footer className="flex items-center justify-center w-full  py-5 px-20 border-t">
        <p className="text-center max-w-screen-md">
          Baseado no calendário disponível{' '}
          <a
            className="underline font-bold"
            target="_blank"
            href="https://imagens.brasil.elpais.com/resizer/5CqN9wtq1Fh-eTzve7xoQ7Wsozw=/1960x0/cloudfront-eu-central-1.images.arcpublishing.com/prisa/PEINHAJMIVD3BIK3BUBJQGJYQQ.jpeg"
          >
            aqui
          </a>
          . As datas estão sujeitas à alterações de acordo com o fornecimento de
          insumos, disponibilidade regional e possíveis presepadas do
          despresidente da república.
        </p>
      </footer>
    </div>
  );
}
