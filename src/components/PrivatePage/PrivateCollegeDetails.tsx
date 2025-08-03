import CollegeDetails from "../../pages/CollegeDetails/CollegeDetails";
import PrivateProvider from "../../provider/PrivateProvider";

const PrivateCollegeDetails = () => {
    return (
        <PrivateProvider>
            <CollegeDetails />
        </PrivateProvider>
    );
};

export default PrivateCollegeDetails;