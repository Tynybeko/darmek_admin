
const useDateFormat = (date: string | undefined) => {
    date = date ?? ''
    let myDate = new Date(date)
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateFormatter = new Intl.DateTimeFormat('ru-RU', options as any);
    const formattedDate = dateFormatter.format(myDate);
    return formattedDate
}


export default useDateFormat