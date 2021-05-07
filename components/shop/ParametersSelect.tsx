import React, {useState} from 'react'
import Button from '@material-ui/core/Button';
import { useTranslation } from "react-i18next"
import DragList, {CriteriaData} from './DragList';
import ObligationCheckboxList, { CheckBoxData } from './ObligationCheckboxList';
import {
    useCriterionsQuery, useObligationsQuery,
    useSetCriterionsMutation,
    useSetObligationsMutation
} from "../../typing";
import {notifyError, notifySuccess} from "../../public/notifications/notificationsFunctions";
// import {Fade} from "@material-ui/core";
import {Transition} from "react-transition-group";
// import {ReactCSSTransitionGroup} from 'react-transition-group';

interface Props {
    validate: boolean
    setValidate: (items: boolean) => void
}

enum toPrint {
    CRITERIA,
    OBLIGATIONS ,
    EMPTY
}

const duration = 500;

const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
}

const transitionStyles = {
    entering: { opacity: 1 },
    entered:  { opacity: 1 },
    exiting:  { opacity: 0 },
    exited:  { opacity: 0 },
};

const ParametersSelect = (props: Props) => {
    const [t] = useTranslation();
    const [isFirstCall, called] = useState(true)
    const [element, setElement] = useState<toPrint>(toPrint.CRITERIA)
    const [newElement, setNewElement] = useState<toPrint>(toPrint.EMPTY)
    const [isTransitioning, setTransitioning] = useState(false)
    const [launch, setLaunch] = useState(false)
    // To avoid multiple save calls
    const [validationProcessing, setValidation] = useState(false)
    // To store criteria and obligations values
    const [criteria, setCriteria] = useState<CriteriaData[]>([]);
    const [obligations, setObligations] = useState<CheckBoxData[]>([]);
    // Criteria and obligations queries
    const {data: criteriaData, loading: criteriaLoading} = useCriterionsQuery();
    const {data: obligationsData, loading: obligationsLoading} = useObligationsQuery();

    // Obligation saving mutation
    const [obligationsMutation] = useSetObligationsMutation({
        variables: {
            obligations: obligations.filter(item => item.checked).map(function (item) {
                return {id: item.id}
            })
        }
    })
    // Criteria saving mutation
    const [criteriaMutation] = useSetCriterionsMutation({
        variables: {
            criterias: criteria.map(function (item, index) {
                return {id: item.id, position: index + 1}
            })
        }
    })

    // Save criteria and obligations values
    if (props.validate && !validationProcessing) {
        setValidation(true)
        criteriaMutation().then(r2 => {
            obligationsMutation().then(r3 => {
                if (!r2) {
                    notifyError("Criteria saving failed")
                } else if (!r3) {
                    notifyError("Obligations saving failed")
                } else {
                    notifySuccess("Criteria and obligations save successfully")
                }
                props.setValidate(false)
                setValidation(false)
            })
        })
    }

    // To show the wanted information
    // To change to have transitions working
    const changeElementValue = () => {
        if (isFirstCall) {
            setLaunch(true)
            called(false)
            setNewElement(toPrint.CRITERIA)
            setTransitioning(true)
        } else {
            if (newElement === toPrint.EMPTY) {
                setLaunch(false)
            } else
                setLaunch(true)
        }
        setElement(newElement)
        setTransitioning(false)
    }

    if (isTransitioning || newElement !== element)
        changeElementValue()

    const returnButtonToggle = () => {
        if (element === toPrint.CRITERIA) {
            return(<DragList criteriaData={criteria} setCriteria={setCriteria}/>);
        } else if (element === toPrint.OBLIGATIONS) {
            return(<ObligationCheckboxList data={obligations}/>);
        } else {
            return(<></>) // Display nothing
        }
    }
    const buttonToggle = returnButtonToggle();

    const loadCriteriaValues = () => {
        let list: CriteriaData[] = []
        criteriaData.criterions.map((item) => {
            list.push({id: item.id, position: item.position, name: item.name, activated: item.activated})
        })
        let finalList = list.sort((n1, n2) => {
            if (n1.position > n2.position) {
                return 1
            }
            return -1
        })
        setCriteria(finalList)
    }

    const loadObligationValues = () => {
        let list: CheckBoxData[] = []
        obligationsData.obligations.forEach(function(item: any) {
            list.push({id: item.id, label: item.name, checked: item.activated})
        })
        setObligations(list)
    }

    if (!criteriaLoading && !obligationsLoading && criteria.length == 0 && obligations.length == 0) {
        loadCriteriaValues()
        loadObligationValues()
    }

    if (criteria.length != 0 && obligations.length != 0) {
        return (
            <div style={{minHeight: "150px"}}>
                <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                    <Button color='primary' variant={element === toPrint.CRITERIA ? "outlined" : undefined} onClick={() => {
                        if (element === toPrint.CRITERIA) {
                            setNewElement(toPrint.EMPTY)
                            setTransitioning(true)
                        } else {
                            setNewElement(toPrint.CRITERIA)
                            setTransitioning(true)
                        }
                    }}>
                        {t('button.criteria.label')}
                    </Button>
                    <Button color='primary' variant={element === toPrint.OBLIGATIONS ? "outlined" : undefined} onClick={() => {
                        if (element === toPrint.OBLIGATIONS) {
                            setNewElement(toPrint.EMPTY)
                            setTransitioning(true)
                        } else {
                            setNewElement(toPrint.OBLIGATIONS)
                            setTransitioning(true)
                        }
                    }}>
                        {t('button.obligation.label')}
                    </Button>
                </div>
                <div>
                    <Transition in={launch} timeout={duration}>
                        {state => (
                            <div style={{
                                ...defaultStyle,
                                ...transitionStyles[state]
                            }}>
                                {buttonToggle}
                            </div>
                        )}
                    </Transition>
                </div>
            </div>
        );
    } else {
        return (
            <>
                <p>Loading</p>
            </>
        )
    }
}

export default ParametersSelect