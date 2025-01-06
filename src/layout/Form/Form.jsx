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

  const danger = (sec,prop) => {
    return errors[sec][prop] ? <p className={styles.error}>{errors[sec][prop]}</p> : null;
  };

  const nationalitySelector = () => {
    return formData.document == "Carnet" || formData.document == "Pasaporte" ? (
      <select name="nationality" onChange={changeHandler} className={styles.input}
      >
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
  <form className={styles.formContainer}>
    <Header />
    {formSection === 0 && (
      <div className={`${styles.formSection} ${styles.sectionOne}`}>
        <p className={styles.label}>Tipo de documento</p>
        <select
          className={styles.input}
          name="document"
          onChange={changeHandler}
        >
          <option value="">Elige tu documento</option>
          <option value="DNI">DNI</option>
          <option value="Carnet">Carnet de Extranjería</option>
          <option value="Pasaporte">Pasaporte</option>
        </select>
        {danger("sectionOne","document")}
        {formData.document == "Carnet" || formData.document == "Pasaporte" ?  (
          <>
            <p className={styles.label}>Nacionalidad</p>
            {nationalitySelector()}
            {danger("sectionOne","nationality")}
          </>
        ) : null }
        <p className={styles.label}>Número de documento</p>
        <input
          className={styles.input}
          type="number"
          name="documentNumber"
          onChange={changeHandler}
          disabled={!formData.document}
          placeholder="Ingrese su documento"
        />
        {danger("sectionOne","documentNumber")}
        <div className={styles.checkboxContainer}>
          <input
            className={styles.checkbox}
            type="checkbox"
            name="terms"
            onChange={changeHandler}
          />
          <p className={styles.checkboxLabel}>
            Tengo 18 años de edad o más y he leído y acepto los Términos y
            Condiciones generales así como la Política de privacidad
          </p>
        </div>
        {danger("sectionOne","terms")}
        <button
          className={styles.button}
          type="button"
          onClick={continueHandler}
          disabled={!formData.terms}
        >
          Empezar
        </button>
      </div>
    )}
    {formSection === 1 && (
      <div className={`${styles.formSection} ${styles.sectionTwo}`}>
        <p className={styles.label}>Nombre</p>
        <input
          className={styles.input}
          type="text"
          name="name"
          onChange={changeHandler}
        />
        {danger("sectionTwo","name")}
        <p className={styles.label}>Apellidos</p>
        <input
          className={styles.input}
          type="text"
          name="lastname"
          onChange={changeHandler}
        />
        {danger("sectionTwo","lastname")}
        <p className={styles.label}>Fecha de Nacimiento</p>
        <input
          className={styles.input}
          type="date"
          name="date"
          onChange={changeHandler}
        />
        {danger("sectionTwo","date")}
        <button
          className={styles.button}
          type="button"
          onClick={continueHandler}
        >
          Continuar
        </button>
      </div>
    )}
    {formSection === 2 && (
      <div className={`${styles.formSection} ${styles.sectionThree}`}>
        <p className={styles.label}>Departamento</p>
        <select
          className={styles.input}
          name="department"
          onChange={changeHandler}
        >
          <option value="" hidden>
            Selecciona tu departamento
          </option>
          <option value="Lima">Lima</option>
          <option value="Ayacucho">Ayacucho</option>
          <option value="Cusco">Cusco</option>
        </select>
        <p className={styles.label}>Provincia</p>
        <select
          className={styles.input}
          name="province"
          onChange={changeHandler}
          disabled={!formData.department}
        >
          <option value="" hidden>
            Selecciona tu provincia
          </option>
          <option value="Lima">Lima</option>
          <option value="Ayacucho">Ayacucho</option>
          <option value="Cusco">Cusco</option>
        </select>
        <p className={styles.label}>Distrito</p>
        <select
          className={styles.input}
          name="district"
          onChange={changeHandler}
          disabled={!formData.province || !formData.department}
        >
          <option value="" hidden>
            Selecciona tu distrito
          </option>
          <option value="Lima">Lima</option>
          <option value="Ayacucho">Ayacucho</option>
          <option value="Cusco">Cusco</option>
        </select>
        <p className={styles.label}>Dirección</p>
        <input
          className={styles.input}
          type="text"
          name="addres"
          onChange={changeHandler}
        />
        {danger("sectionThree","addres")}
        <p className={styles.label}>Correo</p>
        <input
          className={styles.input}
          type="email"
          name="email"
          onChange={changeHandler}
        />
        {danger("sectionThree","email")}
        <div className={styles.checkboxContainer}>
          <input
            className={styles.checkbox}
            type="checkbox"
            name="pep"
            onChange={changeHandler}
          />
          <p className={styles.checkboxLabel}>
            Afirmo y ratifico que no he sido o soy una persona expuesta
            políticamente (PEP), ni tengo pariente PEP
          </p>
        </div>
        {danger("sectionThree","pep")}
        <button
          className={styles.button}
          type="button"
          onClick={continueHandler}
        >
          Continuar
        </button>
      </div>
    )}
    {formSection === 3 && (
      <div className={`${styles.formSection} ${styles.sectionFour}`}>
        <h1 className={styles.title}>
          Ingresa el código que te mandamos al celular
        </h1>
        <div className={styles.otpContainer}>
          {[0, 1, 2, 3].map((index) => (
            <input
              key={index}
              className={styles.otpInput}
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
        {danger("sectionFour","opt")}
        <button
          className={styles.button}
          type="button"
          onClick={continueHandler}
        >
          Continuar
        </button>
      </div>
    )}
    {formSection === 4 && (
      <div className={`${styles.formSection} ${styles.sectionFive}`}>
        <h1 className={styles.title}>Felicidades</h1>
        <p>Tu registro se ha completado exitosamente.</p>
      </div>
    )}
  </form>
);
};