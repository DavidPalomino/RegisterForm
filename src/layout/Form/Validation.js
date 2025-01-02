export const sectionOneValidation = (formData) => {
  let errors = {
    document: "",
    documentNumber: "",
    nationality: "",
    terms: "",
  };

  if (!formData.document) {
    errors.document = "Debes elegir tu tipo de documento";
  }

  if ((formData.document == "Carnet" || formData.document == "Pasaporte") && !formData.nationality){
    errors.nationality = "Seleccione su nacionalidad";
  }

  if (formData.document == "DNI" && !(formData.documentNumber.length == 8)) {
    errors.documentNumber = "El DNI debe tener 8 numeros"
}

  if (formData.document == "Carnet" && !(formData.documentNumber.length == 12)) {
    errors.documentNumber = "El Carnet debe tener 12 numeros" 
}

  if (
    formData.document == "Pasaporte" &&
    !(formData.documentNumber.length == 12)
  ) {
    errors.documentNumber = "El Pasaporte debe tener 12 numeros"
  }

  if (formData.terms == false) {
    errors.terms = "Acepta los terminos y condiciones para continuar";
  }

  return errors;
};
