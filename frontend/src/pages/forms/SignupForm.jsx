import React, { useMemo } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  useTheme,
} from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import FormTextField from "../../components/inputs/FormTextField";
import FormGrid from "../../components/FormGrid";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import FormButtonsGrid from "../../components/FormButtonsGrid";
import {
  notAuthenticatedRoutes,
  userPaths,
} from "../../helpers/routesAndPaths";
import { useSignup } from "../../hooks/useSignup";

const SignupForm = () => {
  const theme = useTheme();

  const navigate = useNavigate();
  const { signup, loading } = useSignup();

  const formMethods = useForm({
    defaultValues: { name: "", password: "", email: "" },
  });

  const { handleSubmit, reset } = useMemo(() => formMethods, [formMethods]);

  const onSubmit = async ({ name, password, email }) => {
    await signup(name, email, password);
  };

  return (
    <FormProvider {...formMethods}>
      <Card sx={{ minWidth: 300, margin: "20px auto" }}>
        <CardContent>
          <FormGrid>
            <Typography variant="h4">Signup</Typography>

            <FormTextField name="name" label="Name" required />

            <FormTextField name="email" label="Email" required />

            <FormTextField
              name="password"
              label="Password"
              type="password"
              required
            />

            <Box sx={{ display: "grid", gridGap: theme.spacing(2) }}>
              <Button
                disabled={loading}
                size="medium"
                variant="contained"
                onClick={handleSubmit(onSubmit)}
              >
                Signup
              </Button>

              <Button
                size="small"
                variant="text"
                onClick={() => navigate(notAuthenticatedRoutes.login)}
              >
                Login
              </Button>
            </Box>
          </FormGrid>
        </CardContent>
      </Card>
    </FormProvider>
  );
};

export default SignupForm;
