
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainComponent from '../Components/MainComponent';
import PredictionComponent from '../Components/PredictionComponent';
import QueryComponent from '../Components/QueryComponent';
import SiteLayout, { MenuItem } from '../Components/SiteLayout';
import { deleteCookie } from '../Util/Cookie';

function MainPage() {
  const [currentContent, setCurrentContent] = useState<JSX.Element[]>([])

  useEffect(() => {
    //Runs only on the first render, calls parent table from backend
    displayMain()

  }, []);

  const navigate = useNavigate()
  const displayMain = () => {
    const mainComponent = [
      <MainComponent key={15} />
    ]
    setCurrentContent(mainComponent)
  }

  const displayQuery = () => {
    const queryComponent = [
      <QueryComponent key={16} />
    ]
    setCurrentContent(queryComponent)
  }

  const displayPrediction = () => {
    const predictionComponent = [
      <PredictionComponent key={17} />
    ]
    setCurrentContent(predictionComponent)
  }

  const handleCurrentContent = (e: MenuItem) => {
    if (e?.key === '1') {
      displayMain()
    } else if (e?.key === '2') {
      displayQuery()
    } else if (e?.key === '3') {
      displayPrediction()
    } else if (e?.key === '4') {
      deleteCookie("access-token")
      deleteCookie("refresh-token")
      navigate("/")
    }
  }

  return (
    <SiteLayout child={currentContent} handleContent={handleCurrentContent} />
  );
}

export default MainPage;
