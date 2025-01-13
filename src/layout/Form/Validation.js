const today = new Date().getFullYear();
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
 const noNumberRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/
 
const optCode = "1234";
const adult = (d) => {
  let userYearStr = "";
  for (let i = 0; i < 4; i++) {
    userYearStr = userYearStr + d[i];
  }
  let userYear = parseInt(userYearStr);
  let validation = today - userYear > 18 ? true : false;
  return validation;
};

const empty = (str) => {
  return str.split(" ").join("");
};

export const formValidations = (formData) => {
  let errors = {
    sectionOne: {
      document: "",
      documentNumber: "",
      nationality: "",
      terms: "",
    },
    sectionTwo: {
      name: "",
      lastname: "",
      date: "",
    },
    sectionThree: {
      addres: "",
      email: "",
      pep: "",
    },
    sectionFour: {
      opt: "",
    },
  };

  
  if (!formData.document) {
    errors.sectionOne.document = "Debes elegir tu tipo de documento";
  }

  if (
    (formData.document == "Carnet" || formData.document == "Pasaporte") &&
    !formData.nationality
  ) {
    errors.sectionOne.nationality = "Seleccione su nacionalidad";
  }

  if (formData.document == "DNI" && !(formData.documentNumber.length == 8)) {
    errors.sectionOne.documentNumber = "El DNI debe tener 8 numeros";
  }

  if (
    formData.document == "Carnet" &&
    !(formData.documentNumber.length == 12)
  ) {
    errors.sectionOne.documentNumber = "El Carnet debe tener 12 numeros";
  }

  if (
    formData.document == "Pasaporte" &&
    !(formData.documentNumber.length == 12)
  ) {
    errors.sectionOne.documentNumber = "El Pasaporte debe tener 12 numeros";
  }

  if (formData.terms == false) {
    errors.sectionOne.terms =
      "Acepta los terminos y condiciones para continuar";
  }

  if (!empty(formData.name) || !noNumberRegex.test(formData.name)) {
    errors.sectionTwo.name = "El nombre no debe estar vacio ni contener numeros o simbolos";
  }

  if (!empty(formData.lastname) || !noNumberRegex.test(formData.lastname)) {
    errors.sectionTwo.lastname = "El apellido no debe estar vacio ni contener numeros o simbolos";
  }

  if (!adult(formData.date)) {
    errors.sectionTwo.date = "Debes ser mayor de edad";
  }

  if(!empty(formData.addres)){
    errors.sectionThree.addres = "Ingresa tu direccion"
  }


  if(!emailRegex.test(formData.email)){
    errors.sectionThree.email = "Ingresa un correo valido"
  }

  if (formData.pep == false) {
    errors.sectionThree.pep = "Acepta el pep";
  }

  if(formData.code != optCode){
    errors.sectionFour.opt = "Codigo incorrecto"
  }

  return errors;
};
