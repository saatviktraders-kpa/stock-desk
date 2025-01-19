import moment from "moment";
const BILL_SEQ_LEN = 5;

export function getBillNo(seq, label) {
  const sequ = String(seq + 1).padStart(BILL_SEQ_LEN, '0');
  return `ST/${label}/${moment().format('MM')}/${sequ}`;
}

export function getCurrentFinancialYearFilter() {
  const currTime = moment();
  const currMonth = Number(currTime.format('M'));
  let yearOffset;

  if (currMonth <= 3) // Jan, Feb, March
    yearOffset = [-1, 0];
  else
    yearOffset = [0, 1];

  const currYear = Number(currTime.format('YYYY'));
  const currYearShort = Number(currTime.format('YY'));
  const years = [currYear + yearOffset[0], currYear + yearOffset[1]];
  const yearsShort = [currYearShort + yearOffset[0], currYearShort + yearOffset[1]];

  const startOfYear = moment(`${years[0]}-04-01`).startOf('day').toISOString();
  const endOfYear = moment(`${years[1]}-03-31`).endOf('day').toISOString();

  return { filter: { createdAt: { $gte: new Date(startOfYear), $lte: new Date(endOfYear) } }, label: yearsShort.join('-') };
}