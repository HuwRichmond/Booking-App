const validate = values => {
    const errors = {}
    if (!values.email) {
      errors.email = 'Required'
    }
    if (!values.newpassword) {
      errors.newpassword = 'Required'
    }
    if (!values.confirmpassword) {
      errors.confirmpassword = "Required"
    }
    
    if (values.newpassword !== values.confirmpassword) {
      errors.newpassword = 'Both password does not match'
    } 
    console.log(errors);
    return errors
  }
  export default validate


  