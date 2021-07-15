export class DateCustom{
    static currentDate():string{
        const day = new Date().getDate().toString().padStart(2,'0')
        const month = (new Date().getMonth()+1).toString().padStart(2,'0')
        const year = new Date().getFullYear()
        return `${year}-${month}-${day}`;
    }
    maxDateIsToday(date:string = '0000-00-00'):string{
        console.log(Date.parse(date),Date.now().toString(),parseInt(Date.now().toString()));
        
        if(Date.parse(date) < parseInt(Date.now().toString())) return date;
        else return DateCustom.currentDate();
    }
}