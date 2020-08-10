import React from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Button from '../../components/UI/Button/Button';
import LandingBox from '../../components/UI/LandingBox/LandingBox';
import classes from './landingpage.module.css';
import collect from '../../assets/collect.png';
import save from '../../assets/save.png';
import investigate from '../../assets/investigate.png';
import cycle from '../../assets/cycle.png';
import calculate from '../../assets/calculate.png';
import { connect } from 'react-redux';

const DATA = {
            0 : {title: 'zbierz informacje...',
                text: ' ... o procesie pracy na danym stanowisku. Weź pod uwagę: urządzenia i maszyny, substancje chemiczne, lokalizację stanowiska pracy, pomiary środowiska pracy itp.',
                img: collect},
            1 : {title: 'zidentyfikuj zagrożenia',
                text: '.... jakie występują na podstawie zebranych informacji. Pomoże Ci w tym lista kontrolna znajdująca się w formularzu oceny ryzyka zawodowego.',
                img: investigate},
            2 : {title: 'oszacuj ryzyko',
                text: 'Określ potencjalne skutki wystąpienia niepożądanego zdarzenia oraz prawdopodobieństwo jego wystąpienia. Na tej podstawie oszacowane zostanie ryzyko przy użyciu metody pięciostopniowej wg polskiej normy PN-N-18002',
                img: calculate},
            3 :{title: 'zapisz dokument',
                text: 'Ocena ryzyka będzie natychmiast dostępna dla niezalogowanych użytkowników w Panelu Użytkownika. Wystarczy, że poinformujesz ich o nowym dokumencie.',
                img: save},
            4: {title: 'monitoruj, przeglądaj, aktualizuj',
                text: 'Z poziomu Panelu Administratora na bieżąco możesz monitorować dokumenty do przeglądu i aktualizować w zależności od potrzeby ( dodatkowy panel boczny po otwarciu danej oceny ryzyka zawodowego )',
                img: cycle}
    }

const landingpage = (props) => {

    const box = Object.keys(DATA).map(box => {
        return <LandingBox title = {DATA[box].title}
                            text = {DATA[box].text}
                            img = {DATA[box].img}
                            right = {box %2 === 0 ? true : false}
                            key = {box}
                />
    })

    let redirectBox = (<Auxiliary>
                            <h3>Zaloguj lub zarejestruj się, aby móc korzystać:</h3>
                            <Button btnType = 'SubmitFocus' clicked = {() => props.history.push('/authentication')}>Zaloguj się / Zarejestruj się</Button>
                        </Auxiliary>);
    if (props.isAuth) {
        redirectBox = (<Auxiliary>
                            <h3>Przejdź do panelu administratora</h3>
                            <Button btnType = 'SubmitFocus' clicked = {() => props.history.push('/')}>Panel administratora</Button>
                        </Auxiliary>)
    }
    
    
    return (
        <div className={classes.LandingPage}>
            <div className={classes.Banner}>
                <h1>Ryzyko zawodowe</h1>
                <p>to prawdopodobieństwo wystąpienia niepożądanych zdarzeń związanych z wykonywaną pracą, powodujących straty, w szczególności wystąpienia u pracowników niekorzystnych skutków zdrowotnych w wyniku zagrożeń zawodowych występujących w środowisku pracy lub sposobu wykonywania pracy</p>
                <span>§ 2 pkt 7 Rozporządzenia Ministra Pracy i Polityki Socjalnej z dnia 26 września 1997 r. w sprawie ogólnych przepisów bhp, z późn. zm. (t.j.Dz.U. 2003 nr 169 poz. 1650 ze zm.</span>
                <div className={classes.Decor}>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <h1>W jednym dokumencie:</h1>
            {box}
            {redirectBox}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isAuth: state.firebase.auth.uid
    }
}

export default connect(mapStateToProps)(landingpage)