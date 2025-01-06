import { Header } from "../../components/Header/Header";
import { useState, useRef } from "react";
import { formValidations } from "./Validation";
import styles from "./Form.module.css"
export const Form = () => {
  const [formSection, setFormSection] = useState(0);
  const [formData, setFormData] = useState({
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
  });

  const [otp, setOtp] = useState({
    digit1: "",
    digit2: "",
    digit3: "",
    digit4: "",
  });
  const otpRefs = useRef([]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    if (name === "terms" || name === "pep") {
      const { checked } = e.target;
      setFormData({ ...formData, [name]: checked });
      if (name === "terms") {
        setErrors(formValidations({ ...formData, [name]: checked }));
      }
      if (name === "pep") {
        setErrors(formValidations({ ...formData, [name]: checked }));
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
    setErrors(formValidations({ ...formData, [name]: value }));
  };

  const continueHandler = () => {
    const allSections = Object.values(errors);
    const hasErrors = Object.values(allSections[formSection]).some(
      (error) => error !== ""
    );
    if (!hasErrors) {
      setFormSection(formSection + 1);
    }
  };

  const danger = (prop) => {
    return errors[prop] ? <p>{errors[prop]}</p> : null;
  };

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
    setErrors(formValidations({ ...formData, code: fullCode }));

  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[`digit${index + 1}`] && index > 0) {
      otpRefs.current[index - 1].focus();
    }
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
            {formData.document == "Carnet" ||
            formData.document == "Pasaporte" ? (
              <p>Nacionalidad</p>
            ) : null}
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
          <button
            type="button"
            onClick={continueHandler}
            disabled={!formData.terms}
          >
            Empezar
          </button>
        </div>
      )}
      {formSection === 1 && (
        <div>
          <p>Nombre</p>
          <input type="text" name="name" onChange={changeHandler} />
          {danger("name")}
          <p>Apellidos</p>
          <input type="text" name="lastname" onChange={changeHandler} />
          {danger("lastname")}
          <p>Fecha de Nacimiento</p>
          <input type="date" name="date" onChange={changeHandler} />
          {danger("date")}
          <button type="button" onClick={continueHandler}>
            Continuar
          </button>
        </div>
      )}
      {formSection === 2 && (
        <div>
          <p>Departamento</p>
          <select name="department" onChange={changeHandler}>
            <option value="" hidden>
              Selecciona tu pais
            </option>
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
            <option value="" hidden>
              Selecciona tu Departamento
            </option>
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
            <option value="" hidden>
              Selecciona tu Distrito
            </option>
            <option value="Lima">Lima</option>
            <option value="Ayacucho">Ayacucho</option>
            <option value="Cusco">Cusco</option>
          </select>
          <p>Dirección</p>
          <input type="text" name="addres" onChange={changeHandler} />
          {danger("addres")}
          <p>Correo</p>
          <input type="email" name="email" onChange={changeHandler} />
          {danger("email")}

          <p>
            Afirmo y ratifico que no he sido o soy una persona expuesta
            políticamente (PEP), ni tengo pariente PEP
          </p>
          <input type="checkbox" name="pep" onChange={changeHandler} />
          {danger("pep")}
          <button type="button" onClick={continueHandler}>
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
          {danger("opt")}
          <button type="button" onClick={continueHandler}>
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