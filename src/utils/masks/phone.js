module.exports = class PhoneMasks{
    constructor(){}
    format(phone){
        if(phone === null || phone === undefined) return ' '
        const regexPhone = /(\d{2})(\d{0,1})(\d{4})(\d{4})/g;
        const phoneFormated = phone.toString().replace(regexPhone,"($1)$2 $3-$4");
        return phoneFormated;
    }
}