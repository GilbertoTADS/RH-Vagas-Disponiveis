export class Validations{
    constructor(){}
    onlyNumber(data:string|number):string{
        return data.toString().replace(/[^\d]/g,'')
    }
    onlyText(data:string):string{
      return data.toString().replace(/[^a-zA-ZçÇéÉèÈêÊáÀãÃ\.\,\:\;\_\* ]/g,'')
    }
}