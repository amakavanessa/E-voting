const fs = require('fs');
const User = require('../model/user_model.js');

const superadminsList = JSON.parse(
  fs.readFileSync(`./data/superadmin.json`, 'utf-8')
);
exports.createSuperAdmin = async () => {
  let superAdmins = await User.find({ role: 'superadmin' });
  try {
    if (superAdmins.length < 1) {
      await User.create(superadminsList, { validateBeforeSave: false });
      console.log('created!');
    }
  } catch (err) {
    console.log(err);
  }
};
