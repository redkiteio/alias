// Can't save (method post) data to google sheet. But GET is working.
// ERROR IS =>
// "The connection doesn't exist or is not shared correctly, check the documentation at: https://docs.sheet.best/#generating-your-rest-api."

import { useRef } from "react";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Typography, Button } from "@mui/material";
import axios from "axios";

const AddForm = () => {
    const inputRef = useRef(null);

    const schema = yup
        .object({
            phrase: yup.string().required("Phrase is required"),
            description: yup.string(),
        })
        .required();

    const {
        control,
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {},
    });

    const handleRefSubmit = () => {
        inputRef.current.click();
    };

    const onSubmit = (data) => {
        axios.post("https://sheet.best/api/sheets/25d1509a-0289-4d76-8436-164874e9e12a", data);
    };

    return (
        <Typography margin={4} width="500px" component="form" onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="phrase"
                control={control}
                render={({ field }) => (
                    <TextField
                        fullWidth
                        type="text"
                        label="Phrase"
                        {...register("phrase")}
                        sx={{ marginBottom: "15px" }}
                        error={!!errors?.phrase?.message}
                        helperText={errors?.phrase?.message}
                    />
                )}
            />
            <Controller
                name="description"
                control={control}
                render={({ field }) => (
                    <TextField
                        fullWidth
                        size="small"
                        type="text"
                        label="Description"
                        {...register("description")}
                        sx={{ marginBottom: "15px" }}
                        error={!!errors?.description?.message}
                        helperText={errors?.description?.message}
                    />
                )}
            />

            <input type="submit" ref={inputRef} style={{ display: "none" }} />

            <Button fullWidth size="small" color="primary" variant="contained" onClick={handleRefSubmit}>
                Create
            </Button>
        </Typography>
    );
};

export default AddForm;
