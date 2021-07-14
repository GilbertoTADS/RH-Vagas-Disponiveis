const validUser = require('./user/user')().validUser;
const validAddressUser = require('./user/address')().validAddressUser;
const validContactUser = require('./user/contact')().validContactUser;
const validExperiences = require('./user/experiences')().validExperiences;
const validFormations = require('./user/formations')().validFormations;
const validSubscribeVacancie = require('./vacancie/subscribe')().subscribe;

module.exports = { 
    validUser, 
    validAddressUser,
    validContactUser,
    validExperiences,
    validFormations,
    validSubscribeVacancie

}