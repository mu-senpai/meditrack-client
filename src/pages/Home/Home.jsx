import AboutUsSection from "./AboutUsSection";
import Banner from "./Banner";
import FeedbackSection from "./FeedbackSection";
import PopularCamps from "./PopularCamps";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <AboutUsSection></AboutUsSection>
            <PopularCamps></PopularCamps>
            <FeedbackSection></FeedbackSection>
        </div>
    );
};

export default Home;