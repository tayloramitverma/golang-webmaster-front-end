import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const ApiUrl = "https://go-webmaster.herokuapp.com/get-metadata";
const theme = createTheme();

export default function App() {
  const [status, setStatus] = React.useState(false);
  const [data, setData] = React.useState({});
  const [errStatus, setErrStatus] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (isUrlValid(data.get("website_url"))) {
      setErrStatus(false);
      setData({});
      let dataObj = { website_url: data.get("website_url") };
      fetch(ApiUrl, {
        mode: "cors",
        method: "POST",
        headers: {},
        body: JSON.stringify(dataObj),
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          setStatus(true);
          setData(result);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setErrStatus(true);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Link Meta Previewer
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="url"
              label="Website URL"
              name="website_url"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Get Meta
            </Button>
          </Box>
          {errStatus && (
            <Alert severity="error">
              Url is not Valid, Please enter correct website URL.
            </Alert>
          )}
          {status && (
            <Box component="div" sx={{ mt: 2, mb: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <b>Title</b>: {data?.title}
                </Grid>
                <Grid item xs={12}>
                  <b>Description</b>: {data?.description}
                </Grid>
                <Grid item xs={12}>
                  <b>Keywords</b>: {data?.keywords}
                </Grid>
                <Grid item xs={12}>
                  <b>Image</b>: {data?.image}
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function isUrlValid(userInput) {
  var res = userInput.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  );
  if (res == null) return false;
  else return true;
}
