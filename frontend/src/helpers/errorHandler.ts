export enum Messages {
  EVENT_TEMPLATE_FORM_ERROR = "event_template_form_error",
}

export enum Errors {
  TEMPLATE_WITH_NAME_ALREADY_EXISTS = "Template with given name already exists",
}

const receivedIsOneOfErrors = (received: string): boolean => !!Errors[received];

export const handleError =
  (onErrorHandler: (error: string) => void, onSuccessHandler?: Function) =>
  (received) => {
    if (received && receivedIsOneOfErrors(received)) {
      onErrorHandler(Errors[received]);
      return;
    }

    onSuccessHandler?.();
  };
