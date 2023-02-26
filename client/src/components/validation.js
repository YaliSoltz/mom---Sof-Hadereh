// validtion file for user input in contactUs
const Validation=(newContactUs)=>{
let errors={};
if (!newContactUs.name){
    errors.name="חובה להכניס שם"
}else if(newContactUs.name.length<3){
    errors.name="שם חייב להכיל לפחות 3 אותיות"
}
if (!newContactUs.phoneNumber){
    errors.phoneNumber="חובה להכניס מספר טלפון"
}else if(newContactUs.phoneNumber.length!==10){
    errors.phoneNumber="מספר טלפון חייב להכיל 10 ספרות "
}

if (!newContactUs.subject){
    errors.subject="חובה להכניס נושא"
}else if(newContactUs.subject.length<3){
    errors.name="נושא חייב להכיל לפחות 3 אותיות"
}
if (!newContactUs.content){
    errors.content="חובה להכניס תוכן"
}else if(newContactUs.content.length<3){
    errors.content="תוכן חייב להכיל לפחות 3 אותיות"
}
return errors;
}
export default Validation