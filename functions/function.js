
const fs=require("fs");
const jwt=require("jsonwebtoken");
const moment=require("moment");

exports.createJWT = (data) => {

    const privateKey = fs.readFileSync('private.key');
    const token = jwt.sign({
        "_id": data.get("_id"),
        "role":data.get("roleId").get("rolename"),
        "roleId":data.get("roleId").get("_id"),
        "email": data.get("email"),
        "firstname": data.get("firstname"),
        "lastname": data.get("lastname")
    }, privateKey, { algorithm: "RS256" });

    return "Bearer"+" "+token;
}

exports.manipulateDate=(startingDate, amount, unit)=> {
    const startDate = moment(startingDate, 'YYYY-MM-DD', true);
  
    // Check if the input startingDate is a valid date
    if (!startDate.isValid()) {
      throw new Error('Invalid starting date format');
    }
  
    // Perform date manipulation based on the given amount and unit
    const endDate = startDate.clone().add(amount, unit);
  
    // Return the resulting date as a string in YYYY-MM-DD format
    return endDate.format('YYYY-MM-DD');
  }

exports.calculateDifference=(fromDate, endDate)=> {
    const start = moment(fromDate, 'YYYY-MM-DD', true);
    const end = moment(endDate, 'YYYY-MM-DD', true);
  
    // Check if the input dates are valid
    if (!start.isValid() || !end.isValid()) {
      throw new Error('Invalid date format');
    }
  
    // Calculate the difference between the dates
    const diffDuration = moment.duration(end.diff(start));
  
    // Get the number of months, weeks, and days
    const months = diffDuration.months();
    const weeks = diffDuration.weeks();
    const days = diffDuration.days();
  
    return {
      months,
      weeks,
      days
    };
  }