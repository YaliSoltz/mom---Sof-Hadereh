// validtion file for user input in contactUs
const Validation = (newContactUs) => {
  let errors = {};
  if (!newContactUs.name) {
    errors.name = "שדה חובה";
  }
  if (!newContactUs.phoneNumber) {
    errors.phoneNumber = "שדה חובה";
  } else if (newContactUs.phoneNumber.length !== 10) {
    errors.phoneNumber = "מספר טלפון חייב להיות באורך 10 ספרות";
  }

  if (!newContactUs.subject) {
    errors.subject = "שדה חובה";
  }
  if (!newContactUs.content) {
    errors.content = "שדה חובה";
  }
  if (!newContactUs.email) {
    errors.email = "שדה חובה";
  }
  return errors;
};
export default Validation;
