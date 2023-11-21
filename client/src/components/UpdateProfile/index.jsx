import { Avatar, Box } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import { blue } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import EmailIcon from "@material-ui/icons/Email";
import PeopleIcon from "@material-ui/icons/People";
import React, { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DefaultUser from "../../assets/images/default-user.png";
import authServices from "../../service/authServices";
import { useAuth } from "../../store/AuthContext";
import { useDialog } from "../../store/DialogContext";
import "./index.css";

const emails = ["username@gmail.com", "user02@gmail.com"];
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

export default function SimpleDialog(props) {
  const { token, userInfo, logout } = useAuth();
  const { updateDialog, openDialog, closeDialog } = useDialog();
  const classes = useStyles();
  const [editUsername, setEditUserName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editFullname, setEditFullname] = useState(false);
  const [image, _setImage] = useState(null);
  const usernameInput = useRef(null);
  const emailInput = useRef(null);
  const fullNameInput = useRef(null);
  const inputFileRef = useRef(null);
  const navigate = useNavigate();

  const cleanup = () => {
    URL.revokeObjectURL(image);
    inputFileRef.current.value = null;
  };

  // const handleUpload = async () => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("image", image);
  //     const response = await authServices.uploadImage(formData.get("image"));
  //   } catch (error) {
  //     console.error("Error uploading file:", error);
  //   }
  // };

  const handleUpdateProfile = async () => {
    if (
      usernameInput?.current &&
      emailInput?.current &&
      fullNameInput?.current
    ) {
      const username = usernameInput?.current?.value;
      const email = emailInput?.current?.value;
      const fullName = fullNameInput?.current?.value;
      try {
        let response = await authServices.updateProfile({
          username: username,
          email: email,
          fullName: fullName,
        });
        if (response?.status === 200 || response?.status === 201) {
          toast.success("Update profile user successfully");
          let userResponse = await authServices.getUserInfo();
          if (userResponse?.status === 200 || userResponse?.status === 201) {
            localStorage.setItem(
              "user",
              JSON.stringify(userResponse?.data?.data?.user)
            );
          }
          window.location.reload();
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const setImage = (newImage) => {
    if (image) {
      cleanup();
    }
    _setImage(newImage);
  };

  const handleFileChange = (event) => {
    const newImage = event.target?.files[0];

    if (newImage) {
      setImage(URL.createObjectURL(newImage));
    }
  };

  return createPortal(
    <Dialog
      onClose={closeDialog}
      aria-labelledby="simple-dialog-title"
      open={updateDialog}
    >
      <Box
        style={{
          padding: "24px 8px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <DialogTitle
          id="simple-dialog-title"
          style={{
            textAlign: "center",
            marginBottom: "12px",
            fontWeight: "800",
          }}
        >
          Update your profile
        </DialogTitle>
        <Box
          style={{
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            style={{
              width: "200px",
              height: "200px",
              marginBottom: "36px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Avatar
              src={image ? image : DefaultUser}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                marginBottom: "12px",
                border: "4px solid #55a138",
              }}
            />
            <input
              onChange={handleFileChange}
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
              ref={inputFileRef}
            />
            <label htmlFor="contained-button-file">
              <Button
                style={{
                  background: "linear-gradient(to right, #177647, #55a138)",
                  color: "white",
                  fontSize: "12px",
                  fontWeight: "800",
                }}
                component="span"
              >
                Edit Avatar
              </Button>
            </label>
          </Box>
          <Box className="wrapper-input">
            <AccountCircleIcon />
            <input
              type="text"
              className="input-root"
              placeholder={"Username"}
              defaultValue={userInfo?.username}
              ref={usernameInput}
              disabled={!editUsername}
            />
            <Link
              to="#"
              children={"Edit"}
              onClick={(e) => {
                e.preventDefault();
              }}
              style={{color:"grey", textDecoration:"none"}}
            />
          </Box>
          <Box className="wrapper-input">
            <EmailIcon />
            <input
              type="email"
              className="input-root"
              placeholder="Email"
              defaultValue={userInfo?.email}
              ref={emailInput}
              disabled={!editEmail}
            />
            <Link
              to="#"
              children={"Edit"}
              onClick={(e) => {
                e.preventDefault();
                setEditEmail(!editEmail);
              }}
            />
          </Box>
          <Box className="wrapper-input">
            <PeopleIcon />
            <input
              type="text"
              className="input-root"
              placeholder="Full name"
              defaultValue={userInfo?.fullName}
              ref={fullNameInput}
              disabled={!editFullname}
            />
            <Link
              to="#"
              children={"Edit"}
              onClick={(e) => {
                e.preventDefault();
                setEditFullname(!editFullname);
              }}
            />
          </Box>
          <Box style={{ width: "100%", marginTop: "24px" }}>
            <Button
              style={{
                background: "linear-gradient(to right, #177647, #55a138)",
                color: "white",
                fontSize: "12px",
                fontWeight: "800",
                width: "48%",
                padding: "12px",
              }}
              onClick={closeDialog}
            >
              CANCEL
            </Button>{" "}
            <Button
              style={{
                background: "linear-gradient(to right, #177647, #55a138)",
                color: "white",
                fontSize: "12px",
                fontWeight: "800",
                width: "48%",
                padding: "12px",
              }}
              onClick={handleUpdateProfile}
            >
              UPDATE
            </Button>
          </Box>
        </Box>
      </Box>
    </Dialog>,
    document.querySelector("#update-profile")
  );
}

// UpdateProfileDialog.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   open: PropTypes.bool.isRequired,
//   selectedValue: PropTypes.string.isRequired,
// };

// export default function UpdateProfileDialog() {
//   const [open, setOpen] = React.useState(false);
//   const [selectedValue, setSelectedValue] = React.useState(emails[1]);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const closeDialog = (value) => {
//     setOpen(false);
//     setSelectedValue(value);
//   };

//   return (
//     <div>
//       <Typography variant="subtitle1">Selected: {selectedValue}</Typography>
//       <br />
//       <Button variant="outlined" color="primary" onClick={handleClickOpen}>
//         Open simple dialog
//       </Button>
//       <SimpleDialog
//         selecteddefaultValue={selectedValue}
//         open={open}
//         onClose={closeDialog}
//       />
//     </div>
//   );
// }
