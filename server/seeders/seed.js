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
        roomName: 'medium-dogs',
        roomCapacity: 8,
        roomSupervisor: 'Andrew'
      },
      {
        roomName: 'big-dogs',
        roomCapacity: 6,
        roomSupervisor: 'James'
      }
    ]);

    await Centre.deleteMany();

    const centre = await Centre.insertMany([
      {
        centreName: 'Hallett Cove Centre',
        addressLine1: '123 Hallett Cove Rd',
        addressLine2: '',
        suburb: 'Hallett Cove',
        state: 'SA',
        postCode: '5158',
        email1: 'hallett.cove@scruffymuffins.com',
        email2: '',
        phone1: '0401234567',
        phone2: '',
        centreRoom: centreroom[0]._id
      },
      {
        centreName: 'Somerton Park Centre',
        addressLine1: '12 Somerton Park Rd',
        addressLine2: '',
        suburb: 'Somerton Park',
        state: 'SA',
        postCode: '5044',
        email1: 'somerton.park@scruffymuffins.com',
        email2: '',
        phone1: '0412345678',
        phone2: '',
        centreRoom: centreroom[2]._id
      }
    ]);

    await Enquiry.deleteMany();

    await Enquiry.insertMany([
      {
        firstName: 'Huw',
        lastName: 'Richmond',
        addressLine1: '5 Smith Avenue',
        addressLine2: '',
        suburb: 'Brighton',
        state: 'SA',
        postCode: '5048',
        email: 'huw.richmond@gmail.com',
        phone: '0491333555',
        dogFirstName: 'Rosie',
        dogLastName: 'Young',
        dogDateOfBirth: '09/12/2020',
        requestedDays: ['mon', 'tue', 'wed', 'thu'],
        centre: centre[0]._id,
        centreRoom: centre.map((b) => b.centreRoom)
      }
    ]);

    await Enquiry.insertMany([
      {
        firstName: 'Emma',
        lastName: 'Young',
        addressLine1: '13 Seaview Avenue',
        addressLine2: '',
        suburb: 'Hallett Cove',
        state: 'SA',
        postCode: '5158',
        email: 'emma.young@gmail.com',
        phone: '0430300987',
        dogFirstName: 'Angus',
        dogLastName: 'Young',
        dogDateOfBirth: '10/02/2022',
        requestedDays: ['mon', 'tue'],
        centre: centre[0]._id,
        centreRoom: centre.map((b) => b.centreRoom)
      }
    ])

    console.log('User added');
    console.log('Centre added');
    console.log('CentreRoom added');
    console.log('Enquiry added');
    process.exit(0);
});