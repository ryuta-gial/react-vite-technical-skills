import { formatQuestionsSheetsType } from '../types/formatSheets.type';

function checkScore(arg: string) {
  if (arg === '' || arg === '#REF!') {
    return '0';
  } else {
    return arg;
  }
}

export async function formatGoogleSheets(results: any[]) {
  let result: formatQuestionsSheetsType = {
    data: [],
  };
  for (let i = 0; i < results.length; i++) {
    if (results[i]['質問ID']) {
      result.data.push({
        id: results[i]['質問ID'],
        dependent: results[i]['依存関係']
          ? results[i]['依存関係']
          : null,
        group: parseInt(results[i]['タイトル'].charAt(0)),
        title: results[i]['タイトル'],
        text: results[i]['質問'],
        answers: [
          {
            answer: 'はい',
            disabled: false,
            values: [
              {
                category: results[i]['分類A'],
                title: results[i]['価値観A'],
                score: checkScore(results[i]['スコアA']),
              },
            ],
          },
        ],
      });
    } else if (results[i]['回答'] == 'いいえ') {
      let x: number;
      if (result.data.length === 1) {
        x = 0;
      } else {
        x = result.data.length - 1;
      }
      result.data[x].answers.push({
        answer: 'いいえ',
        disabled: false,
        values: [
          {
            category: results[i]['分類A'],
            title: results[i]['価値観A'],
            score: checkScore(results[i]['スコアA']),
          },
        ],
      });
    } else {
      let y;
      if (1 == result.data.length) {
        y = 0;
      } else {
        y = result.data.length - 1;
      }
      result.data[y].answers.push({
        answer: 'どちらでもない',
        disabled: false,
        values: [
          {
            category: results[i]['分類A'],
            title: results[i]['価値観A'],
            score: checkScore(results[i]['スコアA']),
          },
        ],
      });
    }
  }
  return result;
}
