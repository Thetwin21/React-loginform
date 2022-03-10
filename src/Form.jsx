import React, { useState, useEffect } from 'react'

const Form = () => {
    const initialValues = { username: "" , email : "" ,password : ""}
    const [formValues, setFormValues] = useState(initialValues)
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false)

  const handleChange = (e) => {
      const {name, value} = e.target;
      setFormValues({...formValues, [name] : value})
  }
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues))
    }

    useEffect(() => {
         console.log(formErrors)
       if(Object.keys(formErrors).length === 0 && isSubmit) {
           console.log(formValues)
       }
    }, [formErrors])
    const validate =(values) =>{
       const errors = {}
       const regex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
       if(!values.username){
           errors.username = 'username is required'
       }
       if(!values.email){
           errors.email = 'email is required'
       }else if(!regex.test(values.email)){
           errors.email = 'This email is not valid';
       }
       if(!values.password){
           errors.password = 'password is required';
       }else if(values.password.length < 4) {
           errors.password = 'passord must be more than 4 character';
       }else if(values.password.length > 10) {
           errors.password = 'passord must not exceed 10 character';
        }

        if(errors.length === undefined){
            setIsSubmit(true);
        }
       return errors
    }
    return (
        <div className='container'>
            {Object.keys(formErrors).length === 0 && isSubmit ? ( <div className='ui message' success> Signed in successful</div>
            ) : (
                 <></>
            )}
            

            <form onSubmit={handleSubmit}>
                <h1>Registration form</h1>
                <div className="ui divider"></div>
                <div className="ui form">
                    <div className="field">
                        <label>Username</label>
                        <input type="text" name="username" placeholder="Username" value={formValues.username} onChange={ handleChange } />
                    </div>
                    <p>{formErrors.username}</p>
                    <div className="field">
                        <label>Email</label>
                        <input type="email" name="email" placeholder="Email@email" value={formValues.email} onChange={ handleChange } />
                    </div>
                    <p>{formErrors.email}</p>
                    <div className="field">
                        <label>Username</label>
                        <input type="password" name="password" placeholder="Password"value={formValues.password} onChange={ handleChange } />
                    </div>
                    <p >{formErrors.password}</p>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Form
