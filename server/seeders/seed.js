//This file will only create **** ONE MAIN**** login for user which will have access to backend
const db = require('../config/connection');
const { User, Centre, CentreRoom, Enquiry } = require('../models');

db.once('open', async () => {
    await User.deleteMany();

    await User.create(
      [
        { 
          firstName: 'Huw',
          lastName: 'Richmond',
          email: 'git@internode.on.net',
          password: 'password123',
          userType:'SUPER_ADMIN',
          resetCode : 'none'
        },
      ]
    );

    await User.create(
      [
        { 
          firstName: 'admin',
          lastName: 'admin',
          email: 'admin@gmail.com',
          password: 'password123',
          userType:'SUPER_ADMIN',
          resetCode : 'none'
        },
      ]
    );

    await User.create(
      [
        { 
          firstName: 'user',
          lastName: 'test',
          email: 'user@gmail.com',
          password: 'password123',
          userType:'USER',
          resetCode : 'none'
        },
      ]
    );
    
    await CentreRoom.deleteMany();

    const centreroom = await CentreRoom.insertMany([
      {
        roomName: 'small-dogs',
        roomCapacity: 10,
        roomSupervisor: 'Emma'
      },
      {
        roomName: 'Elimentary',
        roomCapacity: 8,
        roomSupervisor: 'Christi'
      },
      {
        roomName: 'Primary',
        roomCapacity: 12,
        roomSupervisor: 'Sylvia Dsouza'
      }
    ]);

    await Branch.deleteMany();

    const branch = await Branch.insertMany([
      {
        branchName: 'Lakemba Branch',
        addressLine1: '529 Canterbury Rd',
        addressLine2: '',
        suburb: 'Lakemba',
        state: 'NSW',
        postCode: '2195',
        email1: 'lakemba.itsy@itsybitsy.com',
        email2: '',
        phone1: '0405685654',
        phone2: '',
        branchRoom: branchroom[0]._id
      },
      {
        branchName: 'Wentworthville Branch',
        addressLine1: '529 Canterbury Rd',
        addressLine2: '',
        suburb: 'Wentworthville',
        state: 'NSW',
        postCode: '2145',
        email1: 'wenty.itsy@itsybitsy.com',
        email2: '',
        phone1: '0412345678',
        phone2: '',
        branchRoom: branchroom[2]._id
      }
    ]);

    await Enquiry.deleteMany();

    await Enquiry.insertMany([
      {
        firstName: 'Ahmed',
        lastName: 'Mansoor',
        addressLine1: '3/66 Denman Avenue',
        addressLine2: '',
        suburb: 'Wiley Park',
        state: 'NSW',
        postCode: '2195',
        email: 'just_mansoor@gmail.com',
        phone: '0470112185',
        childFirstName: 'Ismael',
        childLastName: 'Shah',
        childDateOfBirth: '01/04/2015',
        requestedDays: ['mon', 'tue', 'wed', 'thu'],
        branch: branch[0]._id,
        branchRoom: branch.map((b) => b.branchRoom)
      }
    ]);

    await Enquiry.insertMany([
      {
        firstName: 'Kamal',
        lastName: 'Mehmood',
        addressLine1: '281 Beames Avenue',
        addressLine2: '',
        suburb: 'Mt Druitt',
        state: 'NSW',
        postCode: '2770',
        email: 'km_wonder@gmail.com',
        phone: '0471256235',
        childFirstName: 'Rayan',
        childLastName: 'Kamal',
        childDateOfBirth: '11/25/2019',
        requestedDays: ['mon', 'tue'],
        branch: branch[0]._id,
        branchRoom: branch.map((b) => b.branchRoom)
      }
    ])

    console.log('User added!');
    console.log('Branch added!');
    console.log('BranchRoom added!');
    console.log('Enquiry added!');
    process.exit(0);
});