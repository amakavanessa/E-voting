const fs = require('fs');
const ErrorHandler = require('../errorController/error_handler');
const User = require('../model/user.model.js');
const Voter = require('../model/voter.model.js');

exports.upload = async () => {
  // const users = await JSON.parse(fs.readFileSync(data, 'utf-8'));
  // let usersLength = Object.keys(users).length;

  const users = await JSON.parse(
    fs.readFileSync(`./data/generated.json`, 'utf-8')
  );
  let final = {};
  for (let key in users) {
    let email = users[key]['email'];

    let user = await User.findOne({ email });
    if (!user) {
      throw new ErrorHandler('All voters must be registered users', 404);
    }
    const voter = {
      user: user._id,
    };
    let id = user._id;
    let election = 'Presidential';
    final[key] = { id, election };
    const voters = Voter.create(final[key]);
  }
  console.log(final);
  const voters = Voter.create(final);
  return voters;
  // console.log(final);
  // if (!user) {
  //   throw new ErrorHandler('All voters must be registered users', 404);
  // }
  // }
  // await model.create(users, { validateBeforeSave: false });

  //Check if the user already exist in the user db
  // const user = await User.findOne({ email });

  // if (!user) {
  //   throw new ErrorHandler('No document found with that email', 404);
  // }

  // //get the id of the user and add to the db
  // let userId = await user._id;

  // return userId;
  //update the role of the user on the user dB
  // let role = [user.role];

  // await model.create(data);

  // const users = await JSON.parse(
  //   fs.readFileSync(`./data/generated.json`, 'utf-8')
  // );
  // let final = [];
  // for (let key in users) {
  //   final[key] = users[key]['email'];
  // }
  // console.log(final);
  // let lent = users.length;

  //read the file
  //update the file
  //send email to the email
  //put it in the db
};
