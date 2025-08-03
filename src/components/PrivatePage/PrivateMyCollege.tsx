import MyCollegePage from "../../pages/MyCollegePage/MyCollegePage";
import PrivateProvider from "../../provider/PrivateProvider";

const PrivateMyCollege = () => {
    return (
        <PrivateProvider>
            <MyCollegePage />
        </PrivateProvider>
    );
};

export default PrivateMyCollege;