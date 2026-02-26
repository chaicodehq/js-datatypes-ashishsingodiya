/**
 * 📋 Jugaad Form Validator - Indian Style!
 *
 * India mein form bharna ek art hai! College admission ka form validate
 * karna hai. Har field ke apne rules hain. Tujhe ek errors object return
 * karna hai jisme galat fields ke error messages hain. Agar sab sahi hai
 * toh empty errors object aur isValid = true.
 *
 * formData object:
 *   { name, email, phone, age, pincode, state, agreeTerms }
 *
 * Validation Rules:
 *   1. name: must be a non-empty trimmed string, min 2 chars, max 50 chars
 *      Error: "Name must be 2-50 characters"
 *
 *   2. email: must be a string containing exactly one "@" and at least one "."
 *      after the "@". Use indexOf(), lastIndexOf(), includes().
 *      Error: "Invalid email format"
 *
 *   3. phone: must be a string of exactly 10 digits, starting with 6, 7, 8, or 9
 *      (Indian mobile numbers). Check each char is a digit.
 *      Error: "Invalid Indian phone number"
 *
 *   4. age: must be a number between 16 and 100 inclusive, and an integer.
 *      JUGAAD: Agar string mein number diya hai (e.g., "22"), toh parseInt()
 *      se convert karo. Agar convert nahi ho paya (isNaN), toh error.
 *      Error: ""
 *
 *   5. pincode: must be a string of exactly 6 digits, NOT starting with "0"
 *      Error: "Invalid Indian pincode"
 *
 *   6. state: Use optional chaining (?.) and nullish coalescing (??) -
 *      if state is null/undefined, treat as "". Must be a non-empty string.
 *      Error: "State is required"
 *
 *   7. agreeTerms: must be truthy (Boolean(agreeTerms) === true).
 *      Falsy values: 0, "", null, undefined, NaN, false
 *      Error: "Must agree to terms"
 *
 * Return:
 *   { isValid: boolean, errors: { fieldName: "error message", ... } }
 *   - isValid is true ONLY when errors object has zero keys
 *
 * Hint: Use typeof, Boolean(), parseInt(), isNaN(), Number.isInteger(),
 *   ?. (optional chaining), ?? (nullish coalescing), Object.keys(),
 *   startsWith(), trim(), length
 *
 * @param {object} formData - Form fields to validate
 * @returns {{ isValid: boolean, errors: object }}
 *
 * @example
 *   validateForm({
 *     name: "Rahul Sharma", email: "rahul@gmail.com", phone: "9876543210",
 *     age: 20, pincode: "400001", state: "Maharashtra", agreeTerms: true
 *   })
 *   // => { isValid: true, errors: {} }
 *
 *   validateForm({
 *     name: "", email: "bad-email", phone: "12345", age: 10,
 *     pincode: "0123", state: null, agreeTerms: false
 *   })
 *   // => { isValid: false, errors: { name: "...", email: "...", ... } }
 */
export function validateForm(formData) {
  const name = formData.name;
  const email = formData.email;
  const phone = formData.phone;
  const age = formData.age;
  const pincode = formData.pincode;
  const state = formData?.state ?? "";
  const agreeTerms = formData.agreeTerms;

  let isValid = true;
  let errors = {}

  if(name.trim().length < 2 || name.trim().length > 50) {
    isValid = false
    errors.name = "Name must be 2-50 characters"
  }

  const isEmailError = ()=>{
    if (typeof email !== "string" || !email.includes("@") || !email.includes(".")) return true
    if(email.indexOf("@") > email.lastIndexOf(".")) return true
    if(!(email.indexOf("@") === email.lastIndexOf("@"))) return true
    return false
  }
  if(isEmailError()){
    isValid = false
    errors.email = "Invalid email format"
  }

  const isPhoneError = ()=>{
    if (typeof phone !== "string" || phone.length !== 10) return true
    if(/[a-zA-Z]/.test(phone)) return true
    if(phone.startsWith("9") || phone.startsWith("8") || phone.startsWith("7") || phone.startsWith("6")) return false
    else return true
  }
  if(isPhoneError()){
    isValid = false
    errors.phone = "Invalid Indian phone number"
  }

  const isAgeError = ()=>{
    const parsedAge = parseFloat(age);
    if(!Number.isInteger(parsedAge)) return true
    if(Number.isNaN(parsedAge)) return true
    if(parsedAge < 16 || parsedAge > 100) return true
    return false

  }
  if(isAgeError()){
    isValid = false
    errors.age = "Age must be an integer between 16 and 100"
  }

  const isPincodeError = ()=>{
    if(typeof pincode !== "string" || pincode.length !== 6) return true
    if(pincode.startsWith("0")) return true
    if(/[a-zA-Z]/.test(pincode)) return true
    return false
  }
  if(isPincodeError()){
    isValid = false
    errors.pincode = "Invalid Indian pincode"
  }

  const isStateError = ()=>{
    if(state.length === 0) return true
    return false
  }
  if(isStateError()){
    isValid = false
    errors.state = "State is required"
  }
  
  if(!(Boolean(agreeTerms) === true)){
    isValid = false
    errors.agreeTerms = "Must agree to terms"
  }

  return {
    isValid,
    errors
  }
}
