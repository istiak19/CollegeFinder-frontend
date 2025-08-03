import Profile from "../../pages/Profile/Profile";
import PrivateProvider from "../../provider/PrivateProvider";

const PrivateProfile = () => {
    return (
        <PrivateProvider>
            <Profile />
        </PrivateProvider>
    );
};

export default PrivateProfile;