import React from "react";
import ButtonAppBar from "../../components/Navbar";
import { useFormik } from "formik";
import Loading from "../../components/Loading";
import AlertDialog from "../../components/Alert";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, updateUser, createUser } from "../../actions/userAction";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { Grid, TextField, Typography, Button } from "@mui/material";
const container = {
    display: "flex",
    padding: "40px",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
};
const rowContainer = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
};

const validate = (values) => {
    const errors = {};

    if (!values.name || values.name == "" || values.name == " ") {
        errors.name = "Required";
    }
    if (!values.statusMessage || values.statusMessage == "") {
        errors.statusMessage = "Required";
    }
    if (!values.age || values.age <=0) {
        errors.age = "Required";
    }
    if (!values.email) {
        errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email address";
    }

    return errors;
};
export default function UserDetails() {
    const dispatch = useDispatch();
    const { user, isLoading, errors: error, userLoading } = useSelector((store) => store?.user);
    let { id } = useParams();
    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState("Loading user");
    const [description, setDescription] = React.useState("Please wait while user is being loaded");
    let navigate = useNavigate();
    console.log("user", user);
    React.useEffect(() => {
        console.log("check id", id);

        if (id) dispatch(fetchUser(id));
    }, []);

    const getInitialValues = () => {
        if (id) {
            return {
                name: user?.name,
                statusMessage: user?.statusMessage,
                email: user?.email,
                age: user?.age,
                isPublic: user?.isPublic,
                avatarUrl: user?.avatarUrl,
                createdAt: user?.createdAt,
                id: user?.id,
            };
        } else {
            return {
                name: "",
                statusMessage: "",
                email: "",
                age: "",
                isPublic: false,
                avatarUrl: "",
            };
        }
    };
    const formik = useFormik({
        initialValues: getInitialValues(),
        enableReinitialize: true,
        onSubmit: (values) => {
            setOpen(true);
            if (id) {
                dispatch(updateUser(values));
            } else {
                values["createdAt"] = new Date().toLocaleString();
                dispatch(createUser(values));
            }
        },
        validate,
    });
    React.useEffect(() => {
        if (userLoading) {
            setOpen(true);
            setTitle("Loading");
            setDescription("Please wait!");
        } else {
            setOpen(false);
        }
    }, [userLoading]);
    React.useEffect(() => {
        if (isLoading) {
            setOpen(true);
            setTitle("Loading");
            setDescription("Please wait!");
        } else {
            if (error === "") {
                setTitle("Success");
                setDescription("Successfully saved user details");
            } else {
                setTitle("Error");
                setDescription(error);
            }
        }
    }, [isLoading]);

    React.useEffect(() => {
        if (error !== "") {
            setOpen(true);
            setTitle("Something went wrong!");
            setDescription(error);
        }
    }, [error]);
    React.useEffect(() => {
        if (title === "Success") {
            navigate(-1);
        }
    }, [open]);
    const topRow={
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
    return (
        <>
            <ButtonAppBar title="User Details" />
            {userLoading ? (
                <Loading />
            ) : (
                <div style={container}>
                    <form onSubmit={formik.handleSubmit}>
                        <Paper>
                            <Box px={3} py={2}>
                                <Typography variant="h6" align="center" margin="dense">
                                    User Details
                                </Typography>

                                    <div style={topRow}>
                                        <img src= {formik.values.avatarUrl}/>
                                        {id && <Typography>{ `Created At: ${formik.values.createdAt}`}</Typography>}
                                    </div>
                                <Grid container spacing={1}>

                                    <Grid item xs={12} sm={12}>
                                        <TextField required id="name" name="name" label="Name" onChange={formik.handleChange} value={formik.values.name || ""} fullWidth margin="dense" error={formik.errors.name ? true : false} />
                                        <Typography variant="inherit" color="textSecondary">
                                            {formik.errors.name}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField required id="statusMessage" name="statusMessage" label="statusMessage" onChange={formik.handleChange} value={formik.values.statusMessage || ""} fullWidth margin="dense" error={formik.errors.statusMessage ? true : false} />
                                        <Typography variant="inherit" color="textSecondary">
                                            {formik.errors.statusMessage}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField required id="email" name="email" label="Email" onChange={formik.handleChange} value={formik.values.email || ""} fullWidth margin="dense" error={formik.errors.email ? true : false} />
                                        <Typography variant="inherit" color="textSecondary">
                                            {formik.errors.email}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField required id="age" name="age" label="age" type="number" fullWidth margin="dense" onChange={formik.handleChange} value={formik.values.age || ""} error={formik.errors.age ? true : false} />
                                        <Typography variant="inherit" color="textSecondary">
                                            {formik.errors.age}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField required id="avatarUrl" name="avatarUrl" label=" Avatar Url" fullWidth onChange={formik.handleChange} value={formik.values.avatarUrl || ""} margin="dense" error={formik.errors.avatarUrl ? true : false} />
                                        <Typography variant="inherit" color="textSecondary">
                                            {formik.errors.avatarUrl}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <Select labelId="isPublic" name="isPublic" id="isPublic" value={formik.values.isPublic || false} defaultValue={formik.values.isPublic || false} label="isPublic" onChange={formik.handleChange}>
                                            <MenuItem value={true}>Public</MenuItem>
                                            <MenuItem value={false}>Not Public</MenuItem>
                                        </Select>
                                    </Grid>
                                </Grid>
                                <Box mt={3}>
                                    <Button variant="contained" color="primary" type="submit">
                                        Save
                                    </Button>
                                </Box>
                            </Box>
                        </Paper>
                        <AlertDialog open={open} handleClose={() => setOpen(false)} title={title} description={description} />
                    </form>
                </div>
            )}
        </>
    );
}
