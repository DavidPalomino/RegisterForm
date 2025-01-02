import { Header } from "../../components/Header/Header";
import { useState, useRef } from "react";
import { sectionOneValidation } from "./Validation";
export const Form = () => {
  const [formSection, setFormSection] = useState(0);
  const [formData, setFormData] = useState({
    formSection: formSection,
    document: "",
    nationality: "",
    documentNumber: "",
    name: "",
    lastname: "",
    date: "",
    department: "",
    province: "",
    district: "",
    addres: "",
    email: "",
    code: "",
    terms: false,
    pep: false,
  });

  const [errors, setErrors] = useState({
    document: "",
    nationality: "",
    documentNumber: "",
    name: "",
    lastname: "",
    date: "",
    department: "",
    province: "",
    district: "",
    addres: "",
    email: "",
    terms: "",
    pep: "",
  });

  const [otp, setOtp] = useState({
    digit1: "",
    digit2: "",
    digit3: "",
    digit4: "",
  });
  const otpRefs = useRef([]);

  const handleOtpChange = (e, index) => {
    const { value } = e.target;

    if (value.length > 1) return;
    const newOtp = { ...otp, [`digit${index + 1}`]: value };
    setOtp(newOtp);

    if (value && index < 3) {
      otpRefs.current[index + 1].focus();
    }

    const fullCode = Object.values(newOtp).join("");
    setFormData({ ...formData, code: fullCode });
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[`digit${index + 1}`] && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  const handleOtpSubmit = () => {
    const fullCode = Object.values(otp).join("");
    if (fullCode.length === 4) {
      console.log("OTP enviado:", fullCode);
      setFormSection(4);
    } else {
      alert("Por favor, completa el código OTP.");
    }
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    if (name === "terms" || name === "pep") {
      const { checked } = e.target;
      setFormData({ ...formData, [name]: checked })
      setErrors(sectionOneValidation({...formData, [name]: checked}))
    } else {
      setFormData({ ...formData, [name]: value });
      
    }
    if(formSection == 0){ 
      setErrors(sectionOneValidation({...formData, [name]: value}))
    }
  };

  const continueHandler = () => {
    const hasErrors = Object.values(errors).some((error) => error !== "");
    if(!hasErrors) {
      setFormSection(formData.formSection++)
    }
  }

  const danger = (prop) => {
    return errors[prop] ? (
      <p >{errors[prop]}</p>
    ) : null;
  }

  const nationalitySelector = () => {
    return formData.document == "Carnet" || formData.document == "Pasaporte" ? (
      <select name="nationality" onChange={changeHandler}>
        <option value="">Nacionalidad</option>
        <option value="Peru">Peru</option>
        <option value="Argentina">Argentina</option>
        <option value="Chile">Chile</option>
      </select>
    ) : null;
  };

  return (
    <form>
      <Header />
      {formSection === 0 && (
        <div>
          <p>Tipo de documento</p>
          <select name="document" onChange={changeHandler}>
            <option value="">Elige tu documento</option>
            <option value="DNI">DNI</option>
            <option value="Carnet">Carnet de Extranjería</option>
            <option value="Pasaporte">Pasaporte</option>
          </select>
          {danger("document")}
          <div>
          {formData.document == "Carnet" || formData.document == "Pasaporte" ? (<p>Nacionalidad</p>) : null} 
          {nationalitySelector()}
          {danger("nationality")}
          </div>
          <p>Numero de documento</p>
          <input
            type="number"
            name="documentNumber"
            onChange={changeHandler}
            disabled={!formData.document}
            placeholder="Ingrese su documento"
          />
          {danger("documentNumber")}
          <p>
            Tengo 18 años de edad o más y he leído y acepto los Términos y
            Condiciones generales así como la Política de privacidad
          </p>
          <input type="checkbox" name="terms" onChange={changeHandler} />
          {danger("terms")}
          <button type="button" onClick={continueHandler} disabled={!formData.terms}>
            Empezar
          </button>
        </div>
      )}
      {formSection === 1 && (
        <div>
          <p>Nombre</p>
          <input type="text" name="name" onChange={changeHandler} />
          <p>Apellidos</p>
          <input type="text" name="lastname" onChange={changeHandler} />
          <p>Fecha de Nacimiento</p>
          <input type="date" name="date" onChange={changeHandler} />
          <button type="button" onClick={() => setFormSection(2)}>
            Continuar
          </button>
        </div>
      )}
      {formSection === 2 && (
        <div>
          <p>Departamento</p>
          <select name="department" onChange={changeHandler}>
            <option value="">Selecciona tu departamento</option>
            <option value="Lima">Lima</option>
            <option value="Ayacucho">Ayacucho</option>
            <option value="Cusco">Cusco</option>
          </select>
          <p>Provincia</p>
          <select
            name="province"
            onChange={changeHandler}
            disabled={!formData.department}
          >
            <option value="">Selecciona tu provincia</option>
            <option value="Lima">Lima</option>
            <option value="Ayacucho">Ayacucho</option>
            <option value="Cusco">Cusco</option>
          </select>
          <p>Distrito</p>
          <select
            name="district"
            onChange={changeHandler}
            disabled={!formData.province || !formData.department}
          >
            <option value="">Selecciona tu distrito</option>
            <option value="Lima">Lima</option>
            <option value="Ayacucho">Ayacucho</option>
            <option value="Cusco">Cusco</option>
          </select>
          <p>Dirección</p>
          <input type="text" name="addres" onChange={changeHandler} />
          <p>Correo</p>
          <input type="email" name="email" onChange={changeHandler} />
          <p>
            Afirmo y ratifico que no he sido o soy una persona expuesta
            políticamente (PEP), ni tengo pariente PEP
          </p>
          <input type="checkbox" name="pep" onChange={changeHandler} />
          <button type="button" onClick={() => setFormSection(3)}>
            Continuar
          </button>
        </div>
      )}
      {formSection === 3 && (
        <div>
          <h1>Ingresa el código que te mandamos al celular</h1>
          <div>
            {[0, 1, 2, 3].map((index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                name={`digit${index + 1}`}
                value={otp[`digit${index + 1}`]}
                onChange={(e) => handleOtpChange(e, index)}
                onKeyDown={(e) => handleOtpKeyDown(e, index)}
                ref={(el) => (otpRefs.current[index] = el)}
              />
            ))}
          </div>
          <button type="button" onClick={handleOtpSubmit}>
            Continuar
          </button>
        </div>
      )}
      {formSection === 4 && (
        <div>
          <h1>Felicidades</h1>
        </div>
      )}
    </form>
  );
};