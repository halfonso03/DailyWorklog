export default function FormatDate(date: Date | string) {

    if (typeof (date) !== 'string') {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        }).format(date);
    } else {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        }).format(new Date(date));
    }

    // try {

    //     let newDate = date.toString();

    //     if (date.toString().indexOf('T') !== -1) {
    //         newDate = newDate.substring(0, date.toDateString().indexOf('T') - 1);
    //     }

    //     formatted = new Intl.DateTimeFormat('en-US', {
    //         year: 'numeric',
    //         month: 'numeric',
    //         day: 'numeric'
    //     }).format(new Date(newDate));
    // } catch (error) {
    //     console.log('format date', date, error)
    // }

}

export function MonthNameFromDate(date: Date) {
    return new Intl.DateTimeFormat('en-US', {
        month: 'long',
    }).format(date);
}


export function MonthNameFromOrdinal(month: number) {

    const newDate = new Date(`${month + 1}/1/${2024}`);

    return new Intl.DateTimeFormat('en-US', {
        month: 'long',
    }).format(newDate);
}