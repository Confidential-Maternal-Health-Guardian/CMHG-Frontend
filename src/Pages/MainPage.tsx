
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MainComponent from '../Components/MainComponent';
import PredictionComponent from '../Components/PredictionComponent';
import QueryComponent from '../Components/QueryComponent';
import SiteLayout, { MenuItem } from '../Components/SiteLayout';
import { deleteCookie } from '../Util/Cookie';

function MainPage() {
  const [currentContent, setCurrentContent] = useState<JSX.Element[]>([])
  const { state } = useLocation();
  const [currentEpsilon, setCurrentEpsilon] = useState(0)

  useEffect(() => {
    setCurrentEpsilon(state.res)
  }, [state.res]);

  useEffect(() => {
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
      <QueryComponent key={16} epsilon={currentEpsilon} setEpsilon={setCurrentEpsilon} />
    ]
    setCurrentContent(queryComponent)
  }

  const displayPrediction = () => {
    const predictionComponent = [
      <PredictionComponent key={17} epsilon={currentEpsilon} setEpsilon={setCurrentEpsilon} />
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
      deleteCookie("remember-user")
      navigate("/")
    }
  }

  return (
    <SiteLayout child={currentContent} handleContent={handleCurrentContent} epsilon={currentEpsilon} />
  );
}

export default MainPage;
