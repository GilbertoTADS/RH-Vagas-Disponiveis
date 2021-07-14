module.exports = function ResourceInvalid( message, error = false){
    this.name = 'ResourceInvalid';
    this.error = error;
    this.message = message;    
}