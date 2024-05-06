import React, { useEffect, useState } from "react";
import accountApi from "../../api/modules/account.api.js";
import { Link, useParams } from "react-router-dom";
import Container from "../../components/common/Container.jsx";
import { useAuth } from "../../hooks/AuthContext.js";
import { Typography } from "@mui/material";
import { Box, Stack, TextField } from "@mui/material";
import styles from "./updateProfile.css";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Button from "@mui/material/Button";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { ToastContainer, toast } from "react-toastify";
import {useNavigate} from 'react-router-dom';

function UpdateProfile() {
  const { username } = useParams();
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({ name: "", gender: "" });
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      name: formData.displayName,
      gender: formData.gender,
    };
    accountApi.updateProfile(username, data, token).then((res) => {
      console.log(res);
      if (!res.success) {
        console.log("update failed");
        toast.error("Update failed");
      } else {
        console.log("update success");
        toast.success("Update success");
        navigate('/account/' + username);
      }
    });
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
    <Box padding="20px" paddingLeft={"50px"} 
    paddingRight={"50px"} display="flex" justifyContent="left" alignItems="left" sx={{ height: "100vh" }
  }
    
    >
    <Stack direction="column" spacing={4}>
    <Container header="Update Profile">
    <form className={styles["formGroup"]} onSubmit={handleSubmit}>
        <Stack direction="column" spacing={2}>
        <Typography variant="h6">Display name</Typography>
        <TextField
            className="review-text"
            id="outlined-basic"
            name="displayName"
            label="Tên hiển thị"
            variant="outlined"
            value={formData.displayName}
            onChange={handleChange}
            multiline
            rows={2}
            
        />
      <Typography variant="h6">Gender</Typography>
  <Select
    name="gender"
    value={formData.gender}
    label="Age"
    onChange={handleChange}
  >
    <MenuItem value={"Female"}>Female</MenuItem>
    <MenuItem value={"Male"}>Male</MenuItem>
    <MenuItem value={"Non-binary"}>Non-binary</MenuItem>
    <MenuItem value={"-"}>-</MenuItem>
  </Select>

  <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{ width: "max-content", backgroundColor: "darkred" }}
            startIcon={<SendOutlinedIcon />}
            loadingPosition="start"
        >
            Submit
        </Button>
    </Stack>
    </form>
    </Container>
    </Stack>
    </Box>
    <ToastContainer />
    </>
  );
}

export default UpdateProfile;
