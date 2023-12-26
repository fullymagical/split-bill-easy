import { Currency } from '../enums';
import { Payer } from '../types';
import { DetailedPayerTotal } from '.';

function formatBillText(currentPayer: Payer, payerDetail: DetailedPayerTotal, currency: Currency) {
  let totalForPayer = 0;
  let billText = `Счёт для: ${currentPayer.name}\n`;
  billText += '------------------------------\n';

  payerDetail.dishes.forEach((dish) => {
    billText += `${dish.dishName.padEnd(20)}      ${Number(dish.cost).toFixed(2)} ${currency}\n`;
    totalForPayer += dish.cost;
  });

  payerDetail.services.forEach((service) => {
    if (service.amount !== 0) {
      billText += `${service.serviceName.padEnd(20)}      ${service.amount.toFixed(2)} ${currency}\n`;
      totalForPayer += service.amount;
    }
  });

  billText += '------------------------------\n';
  billText += `Итоговая сумма      : ${totalForPayer.toFixed(2)} ${currency}`;

  return billText;
}

export { formatBillText };
