import { CarRepairHistory } from 'src/app/Models/CarRepairHistory';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Alignment } from 'pdfmake/interfaces';
import { KanbanTaskDetails } from '../Models/KanbanTask';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

export class PdfMaker {
    public CollectionProtokol(kanbanTask: KanbanTaskDetails) {
        var subtasks = [];
        for(let subtask of kanbanTask.subtasks) {
            subtasks.push('- ' + subtask.name + '\n');
        }
        var pdfContent = {
            info: {title: 'Protokół', author: 'workstonks-spa'},
            watermark: {text: 'WORKSTONKS-SPA', color: 'red', opacity: 0.05},
            header: [
                ' ',
                {text: `PROTOKÓŁ PRZYJĘCIA POJAZDU NA WARSZTAT - ${kanbanTask.protocolNumber}`, style: 'header'}
            ],
            content: [
                {text: 'Data ........................................, godzina ....................', style: ['defaultStyle', 'centerText']},
                ' ',
                {columns: [
                    {
                        width: '50%',
                        text: 'Warsztat\n\n\n\n\n\n\n................................................................................\n(pieczątka warsztatu)',
                        style: ['defaultStyle', 'centerText']
                    },
                    {
                        width: '50%',
                        text: `Klient\n\n ${kanbanTask.customer?.name} ${kanbanTask.customer?.surname} \n ${kanbanTask.customer?.email} \n Tel. kom. ${kanbanTask.customer?.phoneNumber} \n ................................................................................ \n ................................................................................ \n ................................................................................ \n (imię, naziwsko, adres zamieszkania, telefon)`,
                        style: ['defaultStyle', 'centerText']
                    }
                ]},
                ' ',
                {text: 'Dane pojazdu\n', style: 'header', lineHeight: 1.5},
                {text: `Marka: ${kanbanTask.make} \t Model: ${kanbanTask.model} \t Rocznik: ${kanbanTask.productionYear} \t VIN: ${kanbanTask.vin} \t Numer rej.: ...............................
                        Silnik: ${kanbanTask.engineDescription} \t Moc: ${kanbanTask.power} KM \t Stan licznika: ............................... km`, style: ['justifyText', 'defaultStyle']},
                {text: 'Zaobserwowane uszkodzenia pojazdu', style: 'header'},
                {
                    style: 'centerText',
                    columns: [
                    {
                        width: 200,
                        image: 'data:image/png;base64,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'
                    },
                    {
                        width: '80%',
                        qr: 'Placeholder',
                        fit: 90
                    }
                ]},
                {text: 'Uwagi', style: ['defaultStyle', 'centerText']},
                {text: `..................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................`,
                style: ['defaultStyle', 'justifyText'], lineHeight: 1.5},
                {text: 'Zlecony zakres prac', style: 'header'},
                {text: subtasks, style: 'defaultStyle'},
                {columns: [
                    {
                        width: '50%',
                        text: 'Warsztat\n\n\n................................................................................\n(podpis pracownika)',
                        style: ['defaultStyle', 'centerText']
                    },
                    {
                        width: '50%',
                        text: `Klient\n\n\n................................................................................ \n (podpis Klienta)`,
                        style: ['defaultStyle', 'centerText']
                    }
                ]},
                {
                  text: 'Wyrażam zgodę na przetwarzanie moich danych osobowych w zakresie: imię, nazwisko, numer telefonu oraz adres e-mail w celu przekazania informacji związanych z naprawą pojazdu.',
                  style: ['rodo']
                },
                {stack: [
                    {text: '-----------------------------------------------------------------------------------------------------------------------------------------------------------', style: 'defualtStyle'},
                    {text: 'Odbiór pojazdu', style: 'header', lineHeight: 1.5},
                    {text: 'Data ........................................, godzina ....................', style: ['defaultStyle', 'centerText'], lineHeight: 1.5},
                    {text: 'Uwagi', style: ['defaultStyle', 'centerText']},
                    {text: `......................................................................................................................................................................................................................................................................................................................................................................................................`,
                    style: ['defaultStyle', 'justifyText'], lineHeight: 1.5},
                    {columns: [
                        {
                            width: '50%',
                            text: 'Warsztat\n\n\n................................................................................\n(podpis pracownika)',
                            style: ['defaultStyle', 'centerText']
                        },
                        {
                            width: '50%',
                            text: `Klient\n\n\n................................................................................ \n (podpis Klienta)`,
                            style: ['defaultStyle', 'centerText']
                        }
                    ]}
                ], unbreakable: true},
            ],
            styles: {
                header: {
                  fontSize: 14,
                  alignment: 'center' as Alignment,
                  bold: true
                },
                centerText: {
                  alignment: 'center' as Alignment
                },
                justifyText: {
                  alignment: 'justify' as Alignment
                },
                defaultStyle: {
                  fontSize: 10
                },
                rodo: {
                  fontSize: 8
                }
            }
        };
        pdfMake.createPdf(pdfContent).open();
    }
    public invoice(kanbanTask: KanbanTaskDetails) {
      let todayDate = new Date().toLocaleDateString();
      var pdfContent = {
        info: {title: 'Faktura', author: 'workstonks-spa'},
        watermark: {text: 'WORKSTONKS-SPA', color: 'red', opacity: 0.05},
        header: [
          ' ',
          {text: ' Faktura nr: ', style: 'header'},

      ],
        content: [
          {text: `Data wystawienia: ${todayDate} \n\n`, style: 'header2'},
          {columns: [
            {
              width: '50%',
              text: 'Sprzedawca\n',
              style: ['defaultStyle', 'centerText']
            },
            {
            width: '50%',
            text: 'Kupujący\n',
            style: ['defaultStyle', 'centerText']
            }
          ]
          }
        ],
        styles: {
            header: {
              fontSize: 16,
              bold: true
            },
            header2: {
              fontSize: 12,
              alignment: 'right' as Alignment
            },
            centerText: {
              alignment: 'center' as Alignment
            },
            justifyText: {
              alignment: 'justify' as Alignment
            },
            defaultStyle: {
              fontSize: 10
            },
            rodo: {
              fontSize: 8
            }
        }
      };
      pdfMake.createPdf(pdfContent).open();
    }

    public carHistory(carRepairHistory: Array<CarRepairHistory>, vin: string) {
      let todayDate = new Date().toLocaleDateString();

      var body = [];

      body.push([{text: 'Data', style: 'centerText'},{text: 'Suma brutto\n(części + robocizna)', style: 'centerText'}, {text: 'Części', style: 'centerText'}, {text: 'Zadania', style: 'centerText'}],);

      for (let record of carRepairHistory)
      {
        var basketField = '';
        var taskField = '';
        for (let i = 0; i < record.basketItems.length; i++)
        {
          let amount = '';
          if (record.basketItems[i].unitOfMeasure == 0) amount = 'l';
          else if (record.basketItems[i].unitOfMeasure == 1) amount = 'szt';
          else amount = 'kg';

          basketField += `${i+1}. ${record.basketItems[i].itemName} - ${record.basketItems[i].amount} ${amount} / ${record.basketItems[i].price} zł\n`;
        }
        for (let i = 0; i < record.subtasks.length; i++)
        {
          taskField += `${i+1}. ${record.subtasks[i].name} - ${record.subtasks[i].manHour} godz.\n`;
        }
        
        body.push([{text: `${record.dateOfActualRealization}`, style: 'tableText'}, {text: `${record.totalBasketPrice} + ${record.totalWorkHoursCosts} = ${record.totalBasketPrice + record.totalWorkHoursCosts} zł`, style: 'tableText'}, {text: basketField, style: 'tableText'}, {text: taskField, style: 'tableText'}]);
      }

      var pdfContent = {
        info: {title: 'Historia pojazdu', author: 'workstonks-spa'},
        watermark: {text: 'WORKSTONKS-SPA', color: 'red', opacity: 0.03},
        header:
        [
          {text: `Wygenerowano: ${todayDate} dla ${vin}\n\n`, style: 'header2'},
        ],
        content:
        [
          {
            table: {
              headerRows: 1,
              widths: [77, 108, '*', '*'],
              body: body
            }
          }
        ],
        styles: {
            header2: {
              fontSize: 11,
              alignment: 'left' as Alignment
            },
            centerText: {
              alignment: 'center' as Alignment
            },
            justifyText: {
              alignment: 'justify' as Alignment
            },
            defaultStyle: {
              fontSize: 10
            },
            tableText: {
              alignment: 'left' as Alignment,
              fontSize: 8
            }
        }
      };
      pdfMake.createPdf(pdfContent).open();
  }
}
