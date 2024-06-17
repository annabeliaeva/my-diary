export const getFormattedDate = (date) => {
	return new Intl.DateTimeFormat('ru-RU').format(date)

}