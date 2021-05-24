import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@material-ui/core/TextField';
import {makeStyles, Button, withStyles} from "@material-ui/core";

const useStyled = makeStyles({
  main: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    rowGap: '40px',
    height: '100vh',
  },
  form: {
    width: '500px',
  },
  textField: {
    borderRadius: '4px',
    margin: '20px 0',
    borderWidth: 2,
    background: 'white',
  },
})

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  passwordRepeat: yup
    .string()
    .min(8, 'Password repeat should be of minimum 8 characters length')
    .required('Password repeat is required'),
  name: yup
    .string()
    .required('Name is required'),
});

const Signup = () => {
  const classes = useStyled();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      passwordRepeat: '',
      name: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <main className={classes.main}>
      <h2>Sign up</h2>
      <form onSubmit={formik.handleSubmit} className={classes.form}>
        <TextField
          className={classes.textField}
          fullWidth
          id="name"
          name="name"
          label="Name"
          type="text"
          color="primary"
          variant="outlined"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          className={classes.textField}
          fullWidth
          id="email"
          name="email"
          label="Email"
          color="primary"
          variant="outlined"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          className={classes.textField}
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          color="primary"
          variant="outlined"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <TextField
          className={classes.textField}
          fullWidth
          id="passwordRepeat"
          name="passwordRepeat"
          label="Password"
          type="password"
          color="primary"
          variant="outlined"
          value={formik.values.passwordRepeat}
          onChange={formik.handleChange}
          error={formik.touched.passwordRepeat && Boolean(formik.errors.passwordRepeat)}
          helperText={formik.touched.passwordRepeat && formik.errors.passwordRepeat}
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </main>
  )
};

export default Signup;
