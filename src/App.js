import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { addUser, deleteUser, updateUsername } from "./features/Users";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  Container,
  Modal,
  TextField,
  Typography,
} from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function App() {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.users.value);
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const [newUsername, setNewUsername] = useState("");

  const [inputField, setInputField] = useState({
    name: "",
    username: "",
  });

  const handleForm = (event) => {
    setInputField({ ...inputField, [event.target.name]: event.target.value });
  };

  return (
    <Container
      component="div"
      disableGutters
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
      }}
      maxWidth="xl"
      className="App"
    >
      <Box
        p={2}
        justifyContent="center"
        alignItems="center"
        display="flex"
        flexDirection="column"
        sx={{ width: 420, border: "1px solid #0E0E0E", borderRadius: 4 }}
      >
        <Typography fontSize={24}>FORM</Typography>
        <Box mt={2}>
          <TextField
            variant="filled"
            onChange={handleForm}
            name="name"
            sx={{ width: 360 }}
            placeholder="Name"
          />
          <TextField
            variant="filled"
            onChange={handleForm}
            name="username"
            sx={{ marginTop: 3, width: 360 }}
            placeholder="Username"
          />
        </Box>
        <Button
          onClick={() => {
            dispatch(
              addUser({
                id: userList.id + 1,
                ...inputField,
              })
            );
          }}
          sx={{
            backgroundColor: "black",
            color: "white",
            marginTop: 3,
            width: 360,
            height: 42,
            fontSize: 18,
            fontWeight: 600,
          }}
        >
          Add
        </Button>
      </Box>
      <TableContainer
        component={Paper}
        sx={{ marginTop: 3, width: 700 }}
        className="displayUser"
      >
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Username</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userList.map((user) => (
              <StyledTableRow key={user.id}>
                <StyledTableCell component="th" scope="row" align="center">
                  {user.name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {user.username}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    color="primary"
                    onClick={() => {
                      dispatch(deleteUser({ id: user.id }));
                    }}
                  >
                    Delete
                  </Button>
                  <Button onClick={handleOpen} color="secondary">
                    Update
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default App;
