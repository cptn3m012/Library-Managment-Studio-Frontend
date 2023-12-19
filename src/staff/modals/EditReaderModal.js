import React, { useEffect } from 'react';
import ReaderForm from '../containers/AddReaderContainer/ReaderForm';
import useFormValidation from '../../admin/hooks/useFormValidation';
import useFormatters from '../../admin/hooks/useFormatters';
import { errorNotify } from '../../utils/Notifications';

function EditReaderModal({ isOpen, onClose, readerData, handleFormSubmit }) {
  const { formatPhoneNumber } = useFormatters();
  const { formData, formErrors, handleInputChange, setFormErrors } = useFormValidation(readerData);

  useEffect(() => {
    if (isOpen) {
      setFormErrors({});
    }
  }, [isOpen, setFormErrors]);

  const handleCustomInputChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === 'phone_number') {
      newValue = formatPhoneNumber(value);
    }
    handleInputChange({ ...e, target: { ...e.target, name, value: newValue } });
  };

  const handleCloseClick = () => {
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.values(formErrors).some(error => error)) {
      errorNotify('Masz błędy w formularzu. Popraw je przed wysłaniem.');
      return;
    }

    handleFormSubmit(formData);
    onClose();
  };

  return (
    <div
      id="editReaderModal"
      tabIndex="-1"
      aria-hidden="true"
      className={`fixed inset-0 z-50 flex justify-center pt-10 items-start ${isOpen ? "" : "hidden"} overflow-x-hidden overflow-y-auto`}
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75" aria-hidden="true" onClick={onClose}></div>
      <div className="relative w-full max-w-2xl max-h-full">
        <form onSubmit={handleSubmit} className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Edytuj dane czytelnika
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={handleCloseClick}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-6 space-y-6">
            <ReaderForm
              formData={formData}
              handleInputChange={handleCustomInputChange}
              formErrors={formErrors}
            />
          </div>
          <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Zapisz
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditReaderModal;
