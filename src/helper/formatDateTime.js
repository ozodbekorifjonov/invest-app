import { injectIntl } from 'react-intl';

function FormatDateTime({ type, date, intl }) {
  const stringDate = intl.formatDate(date, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

  if (type === 'DATE') return `${stringDate}`;

  const stringTime = intl.formatTime(date);

  if (type === 'TIME') return `${stringTime}`;
}

export default injectIntl(FormatDateTime);
