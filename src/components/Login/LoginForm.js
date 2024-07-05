import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import useAuthFacade from "../../facades/authFacade";
import "./LoginForm.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const { setIsUserValid } = useAuthFacade();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setUsernameError("");
    setPasswordError("");

    if (username.trim() === "") {
      setUsernameError("Username is required");
    }

    if (password.trim() === "") {
      setPasswordError("Password is required");
    }

    if (username && password) {
      const userData = {
        username: username,
        password: password,
      };
      axios.post("http://localhost:5000/api/auth", userData)
      .then((res) => {
        console.log('res.data.message',res.data.message)
        switch (res.data.message) {
          case "Login Success":
            console.log(res);
            setIsUserValid(true);
            toast.success(`Login Success`);
            navigate("/home");
            break;

          case "Password Mismatch":
            toast.error(`Password Is Not Match`);
            setPasswordError("Password is wrong");
            break;

          case "User Unvalid":
            toast.error(`User Is Not Registerd`);
            setUsernameError("User not registerd");
            break;
          default:
            break;
        }
      })
      .catch((error) => {
        console.error("There was an error logging in:", error);
        toast.error(`Login failed: ${error.message}`);
      });
    }
  };

  return (
    <Grid className="Background" alignItems="center" justifyContent="center">
      <Paper elevation={20} className="Paper">
        <h2>Login</h2>
        <TextField
          label="Username"
          placeholder="Enter username"
          className="TextField"
          fullWidth
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={!!usernameError}
          helperText={usernameError}
        />
        <TextField
          label="Password"
          placeholder="Enter password"
          className="TextField"
          type="password"
          fullWidth
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!passwordError}
          helperText={passwordError}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          className="Button"
          onClick={handleSubmit}
          fullWidth
        >
          Sign in
        </Button>
      </Paper>
    </Grid>
  );
};

export default LoginForm;
