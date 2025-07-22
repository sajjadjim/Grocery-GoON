import Banner from './Banner';
import NearlyExpairySection from '../Components/NearlyExpairySection/NearlyExpairySection';
import ExpairedFoodSection from '../Components/ExpairedFoodSection/ExpairedFoodSection';
import RecentProducts from '../Components/RecentProducts/RecentProducts';
import OfferSection from '../Components/OfferSection/OfferSection';

const Home = () => {
  

    return (
        <div>
            <Banner></Banner>
            <OfferSection></OfferSection>
            <RecentProducts></RecentProducts>
            <NearlyExpairySection  />
            <ExpairedFoodSection></ExpairedFoodSection>
        </div>
    );
};

export default Home;