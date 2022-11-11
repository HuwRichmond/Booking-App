const { AuthenticationError } = require('apollo-server-express');
const randToken = require('rand-token');
const { User , Centre, CentreRoom, Enquiry} = require('../models');
const { signToken } = require('../utils/auth');
const sendMail = require('../utils/Email');


const resolvers = {
  Query: {
    
    allUsers: async () =>{
      const user = await User.find({});
      return  user;
    },

    user: async (Owner, args, context) => {
      if (context.user) {
        const user = await User.findOne(context.user.email);

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },

    enquiries: async() => {
      const enquiries = await Enquiry.find({})
      .sort({ createdAt: -1 })
      .populate('centre')
      .populate('centreRoom');
      return enquiries;
    },

    enquiry: async (Owner, { enquiryId }) => {
      const enquiry = await Enquiry.findOne({ _id: enquiryId })
      .populate('centre')
      .populate('centreRoom');
      return enquiry;
    },
    
    allCentres: async() => {
      const centres = await Centre.find({}).populate('centreRoom');
      return centres;
    },

    allCentreRooms: async() => {
      const centreRooms = await CentreRoom.find({});
      return centreRooms;
    },
    
    searchEnrollmentLink : async(Owner, {enrollmentCode}) => {
      console.log("EnrollmentLink", enrollmentCode)
      try{
        const searchResult= await Enquiry.findOne({ enrollmentCode});
        console.log(searchResult)
        if (searchResult){
          
          return searchResult;
        }
      }
      catch (e){
        
      }
      return null;
    }
  },
  Mutation: {
    addUser: async (Owner, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    
    updateUser: async (Owner, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },

    login: async (Owner, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Invalid user credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Invalid password credentials');
      }

      const token = signToken(user);
      return { token, user };
    },

    addCentreRoom: async(Owner,{roomName, roomCapacity, roomSupervisor, centreId }) => {
      const centreRoom = await CentreRoom.create({roomName: roomName, roomCapacity: roomCapacity, roomSupervisor: roomSupervisor});
      const updateCentre = await Centre.findByIdAndUpdate(centreId, {$addToSet: { centreRoom : centreRoom._id }}, { new: true });

      return (centreRoom);
    },

    addEnquiry: async (parent, args) => {
      const enquiry = await Enquiry.create(args);

      return enquiry ;
    },

    resetPassword: async(parent, arg)=>{

      let token =  randToken.generate(6);

      const user = await User.findOneAndUpdate({email: arg.email},{resetCode: token},{new: true});

      const userData = {
        email: arg.email,
        code : token
      }
      
      sendMail('Reset', userData);
      return (user);
    },

    updatePassword: async (parent, args) => {
      const userData= await User.findOneAndUpdate({email: args.email, resetCode: args.resetCode}, {password: args.password, resetCode: ""}, { returnOriginal: false} );
      
      return userData;
    },

    removeEnquiry: async (Owner, { enquiryId }) => {
      const enquiry = await Enquiry.findOneAndDelete(
        { _id: enquiryId },
      );
      return enquiry;
    },

    sendEnrollmentLink: async(Owner, {enquiryId}) => {
      let rand = randToken.generate(15);
      try{
        const enquiry= await Enquiry.findByIdAndUpdate({ _id: enquiryId}, {enrollmentCode: rand}, { returnOriginal: false} );
        console.log(enquiry)
        if (enquiry){
          const userData = {
            email: enquiry.email,
            enrollmentCode : rand
          };
          sendMail("Enrollment",userData)
          return enquiry;
        }
      }
      catch (e){
        
      }
      return null;
    },

 
  }
};

module.exports = resolvers;
