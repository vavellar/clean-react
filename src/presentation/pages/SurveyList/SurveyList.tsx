import { Footer, Header, Icon } from '@/presentation/components'
import React from 'react'
import Styles from './SurveyList-styles.scss'

const SurveyList: React.FC = () => {
    return (
      <div className={Styles.surveyListWrap}>
        <Header/>  
        <div className={Styles.contentWrap}>
          <h2>Enquetes</h2>
          <ul>
            <li>
              <div className={Styles.surveyContent}>
                <Icon isAnswered={false}/>
                <time>
                  <span className={Styles.day}>22</span>
                  <span className={Styles.month}>03</span>
                  <span className={Styles.year}>2020</span>
                </time>
                <p>Qual é seu framewrok web favorito?</p>
              </div>
              <footer>Ver Resultado</footer>
            </li>
          </ul>
        </div>
        <Footer />
      </div>
    )
}

export default SurveyList