import React, { useEffect, useMemo } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
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
import { useLogin } from "../../hooks/useLogin";

const LoginForm = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { login, loading, error } = useLogin();

  useEffect(() => {
    if (user) {
      navigate(userPaths.tasks);
    }
  }, [user]);

  const formMethods = useForm({
    defaultValues: { password: "", email: "" },
  });

  const { handleSubmit, reset } = useMemo(() => formMethods, [formMethods]);

  const onSubmit = async ({ password, email }) => {
    await login(email, password);
  };

  return (
    <FormProvider {...formMethods}>
      <Card sx={{ width: "500px", margin: "20px auto" }}>
        <CardContent>
          <FormGrid>
            <Typography variant="h4">Login</Typography>

            <FormTextField name="email" label="Email" required />

            <FormTextField
              name="password"
              label="Password"
              type="password"
              required
            />

            <FormButtonsGrid>
              <Button
                size="medium"
                variant="contained"
                onClick={() => {
                  navigate(notAuthenticatedRoutes.signup);
                }}
              >
                Signup
              </Button>

              <Button
                disabled={loading}
                size="medium"
                variant="contained"
                onClick={handleSubmit(onSubmit)}
              >
                Submit
              </Button>
            </FormButtonsGrid>
          </FormGrid>
        </CardContent>
      </Card>
    </FormProvider>
  );
};

export default LoginForm;
