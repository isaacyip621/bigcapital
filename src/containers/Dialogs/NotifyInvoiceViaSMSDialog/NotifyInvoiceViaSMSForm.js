import React from 'react';
import intl from 'react-intl-universal';

import { Intent } from '@blueprintjs/core';
import { AppToaster } from 'components';

import NotifyViaSMSForm from '../../NotifyViaSMS/NotifyViaSMSForm';
import { useNotifyInvoiceViaSMSContext } from './NotifyInvoiceViaSMSFormProvider';
import { transformErrors } from '../../../containers/NotifyViaSMS/utils';

import withDialogActions from 'containers/Dialog/withDialogActions';
import { compose } from 'utils';

const transformFormValuesToRequest = (values) => {
  return {
    notification_type: values.notification_key,
  };
};

/**
 * Notify Invoice Via SMS Form.
 */
function NotifyInvoiceViaSMSForm({
  // #withDialogActions
  closeDialog,
}) {
  const {
    createNotifyInvoiceBySMSMutate,
    invoiceId,
    invoiceSMSDetail,
    dialogName,
    notificationType,
    setNotificationType,
  } = useNotifyInvoiceViaSMSContext();

  const [calloutCode, setCalloutCode] = React.useState([]);

  // Handles the form submit.
  const handleFormSubmit = (values, { setSubmitting, setErrors }) => {
    setSubmitting(true);

    // Handle request response success.
    const onSuccess = (response) => {
      AppToaster.show({
        message: intl.get('notify_invoice_via_sms.dialog.success_message'),
        intent: Intent.SUCCESS,
      });
      setSubmitting(false);
      closeDialog(dialogName);
    };
    // Handle request response errors.
    const onError = ({
      response: {
        data: { errors },
      },
    }) => {
      if (errors) {
        transformErrors(errors, { setErrors, setCalloutCode });
      }
      setSubmitting(false);
    };
    // Transformes the form values to request.
    const requestValues = transformFormValuesToRequest(values);

    // Submits invoice SMS notification.
    createNotifyInvoiceBySMSMutate([invoiceId, requestValues])
      .then(onSuccess)
      .catch(onError);
  };
  // Handle the form cancel.
  const handleFormCancel = React.useCallback(() => {
    closeDialog(dialogName);
  }, [closeDialog, dialogName]);

  const initialValues = {
    notification_key: notificationType,
    ...invoiceSMSDetail,
  };
  // Handle form values change.
  const handleValuesChange = (values) => {
    if (values.notification_key !== notificationType) {
      setNotificationType(values.notification_key);
    }
  };
  // Momerize the notification types.
  const notificationTypes = React.useMemo(
    () => [
      { key: 'details', label: 'Invoice details' },
      { key: 'reminder', label: 'Invoice reminder' },
    ],
    [],
  );
  return (
    <NotifyViaSMSForm
      initialValues={initialValues}
      notificationTypes={notificationTypes}
      onSubmit={handleFormSubmit}
      onCancel={handleFormCancel}
      onValuesChange={handleValuesChange}
      calloutCodes={calloutCode}
    />
  );
}

export default compose(withDialogActions)(NotifyInvoiceViaSMSForm);
