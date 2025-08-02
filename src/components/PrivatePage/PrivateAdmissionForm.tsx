import AdmissionForm from "../../pages/AdmissionForm/AdmissionForm";
import PrivateProvider from "../../provider/PrivateProvider";

const PrivateAdmissionForm = () => (
    <PrivateProvider>
        <AdmissionForm />
    </PrivateProvider>
);

export default PrivateAdmissionForm;