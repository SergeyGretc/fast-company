import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { validator } from "../../../utils/validator";
import api from "../../../api";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";

const EditUserPage = () => {
  const { userId } = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    profession: "",
    sex: "male",
    qualities: []
  });
  const [professions, setProfession] = useState([]);
  const [qualities, setQualities] = useState({});
  const [errors, setErrors] = useState({});
  const getProfessionById = (id) => {
    for (const prof in professions) {
      const profData = professions[prof];
      if (profData._id === id) return profData;
    }
  };
  const getQualities = (elements) => {
    const qualitiesArray = [];
    for (const elem of elements) {
      for (const quality in qualities) {
        if (elem.value === qualities[quality]._id) {
          qualitiesArray.push(qualities[quality]);
        }
      }
    }
    return qualitiesArray;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const { profession, qualities } = data;
    api.users
      .update(userId, {
        ...data,
        profession: getProfessionById(profession),
        qualities: getQualities(qualities)
      })
      .then((data) => history.push(`/users/${data._id}`));
    console.log(data);
  };
  const transformData = (data) => {
    return data.map((qual) => ({ label: qual.name, value: qual._id }));
  };
  useEffect(() => {
    setIsLoading(true);
    api.users.getById(userId).then(({ profession, qualities, ...data }) =>
      setData((prevState) => ({
        ...prevState,
        ...data,
        qualities: transformData(qualities),
        profession: profession._id
      }))
    );
    api.qualities.fetchAll().then((data) => setQualities(data));
    api.professions.fetchAll().then((data) => setProfession(data));
  }, []);
  useEffect(() => {
    if (data._id) setIsLoading(false);
  }, [data]);

  const validatorConfig = {
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения"
      },
      isEmail: {
        message: "Email введен некорректно"
      }
    },
    name: {
      isRequired: {
        message: "Введите ваше имя"
      }
    }
  };
  useEffect(() => {
    validate();
  }, [data]);
  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };
  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {!isLoading && Object.keys(professions).length > 0 ? (
            <form onSubmit={handleSubmit}>
              <TextField
                label="Имя"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
              />
              <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
              />
              <SelectField
                label="Выбери свою профессию"
                defaultOption="Choose..."
                options={professions}
                name="profession"
                onChange={handleChange}
                value={data.profession}
                error={errors.profession}
              />
              <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
              >
                Обновить
              </button>
            </form>
          ) : (
            "Loading..."
          )}
        </div>
      </div>
    </div>
  );
};

export default EditUserPage;

// import React, { useEffect, useState } from "react";
// import { validator } from "../../utils/validator";
// import TextField from "../common/form/textField";
// import api from "../../api";
// import SelectField from "../common/form/selectField";
// import RadioField from "../common/form/radioField";
// import MultiSelectField from "../common/form/multiSelectField";

// const EditorForm = ({ userId }) => {
//   const [data, setData] = useState({
//     name: "",
//     email: "",
//     profession: "",
//     sex: "male",
//     qualities: []
//   });

//   const [user, setUser] = useState();

//   useEffect(() => {
//     api.users.getById(userId).then((data) => setUser(data));
//   }, []);
//   const [qualities, setQualities] = useState({});
//   const [errors, setErrors] = useState({});
//   const [professions, setProfession] = useState();
//   useEffect(() => {
//     api.professions.fetchAll().then((data) => setProfession(data));
//     api.qualities.fetchAll().then((data) => setQualities(data));
//   }, []);
//   const handleChange = (target) => {
//     if (target.name === "qualities") {
//       setData((prevState) => ({
//         ...prevState,
//         [target.name]: JSON.parse(target.value)
//       }));
//     } else if (target.name === "profession") {
//       setData((prevState) => ({
//         ...prevState,
//         [target.name]: JSON.parse(target.value)
//       }));
//     } else {
//       setData((prevState) => ({ ...prevState, [target.name]: target.value }));
//     }
//   };

//   const validatorConfig = {
//     name: {
//       isRequired: {
//         message: "Имя пользователя обязательно для заполнения"
//       }
//     },
//     email: {
//       isRequired: {
//         message: "Электронная почта обязательна для заполнения"
//       },
//       isEmail: {
//         message: "Email введен некоректно"
//       }
//     }

//     // profession: {
//     //   isRequired: {
//     //     message: "Обязательно выберите профессию"
//     //   }
//     // }
//   };

//   useEffect(() => {
//     validate();
//   }, [data]);
//   const validate = () => {
//     const errors = validator(data, validatorConfig);

//     setErrors(errors);
//     return Object.keys(errors).length === 0;
//   };
//   const isValid = Object.keys(errors).length === 0;
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const isValid = validate();
//     if (!isValid) return;
//     api.users.update(userId, data);
//     console.log(professions);
//   };

//   if (user) {
//     return (
//       <form onSubmit={handleSubmit}>
//         <TextField
//           label="Имя"
//           name="name"
//           value={data.name}
//           onChange={handleChange}
//           error={errors.name}
//         />
//         <TextField
//           label="Электронная почта"
//           type="email"
//           name="email"
//           value={data.email}
//           onChange={handleChange}
//           error={errors.email}
//         />
//         <SelectField
//           onChange={handleChange}
//           options={professions}
//           defaultOption="Choose..."
//           value={data.profession}
//           error={errors.profession}
//           name="profession"
//           label="Выбери свою профессию"
//         />
//         <RadioField
//           options={[
//             { name: "Male", value: "male" },
//             { name: "Female", value: "female" },
//             { name: "Other", value: "other" }
//           ]}
//           value={data.sex}
//           name="sex"
//           onChange={handleChange}
//           label="Выберите ваш пол"
//         />
//         <MultiSelectField
//           options={qualities}
//           onChange={handleChange}
//           defaultValue={data.qualities}
//           name="qualities"
//           label="Выберите ваши качества"
//         />

//         <button
//           type="submit"
//           disabled={!isValid}
//           className="btn btn-primary w-100 mx-auto"
//         >
//           Обновить
//         </button>
//       </form>
//     );
//   } else return <span>Loading..</span>;
// };

// export default EditorForm;
