import React, { useState } from "react";
import { Card, Grid, Stepper, Step, StepLabel, Button } from "@material-ui/core";
import PaymentInformation from "components/payment/PaymentInformations";
import SummaryAndValidation from "components/payment/SummaryAndValidation";
import { Cart } from "typing";
import {paymentValidation} from "public/notifications/notificationsFunctions";
import { useRouter } from 'next/router'

// import { useAccountQuery } from "typing";

const steps = ['Entrez vos informations', 'Récapitulatif et validation'];

const handleNext = (setActiveStep : any) => {
    setActiveStep((prevActiveStep : number) => prevActiveStep + 1);
};

const handleBack = (setActiveStep : any) => {
    setActiveStep((prevActiveStep : number) => prevActiveStep - 1);
};

interface PaymentContainerProps {
    cart : Cart;
    loading: boolean;
}

const PaymentContainer = ({cart, loading} : PaymentContainerProps) => {
    const router = useRouter();
    // const {data, loading} = useAccountQuery();
    const [activeStep, setActiveStep] = React.useState(0);

    const [cardValues, setCardValues] = React.useState({
        textmask: '',
        numberformat: '1320',
      });
    const [expirationDateValues, setExpirationDateValues] = React.useState({
        textmask: '  /  ',
        numberformat: '1320',
    });
    const [cryptogramValues, setCryptogramValues] = React.useState({
        textmask: '   ',
        numberformat: '1320',
    });
    const [zipCodeValues, setZipCodeValues] = React.useState({
        textmask: '   ',
        numberformat: '1320',
    });
    const [userName, setUserName] = useState("");
    const [city, setCity] = useState("");
    const [fullAdress, setFullAdress] = useState("");
    const [nextButtonEnabled, setNextButtonEnabled] = useState(false);

    return (
        <div style={{alignContent: "center", height: "100%", alignItems: "center", padding:"20px"}}>
            <Card color={"primary"} style={{width: "50%", height: "100%", margin:"auto", transitionDuration: '0.3s'}}>
                <Grid container>
                    <Grid item style={{textAlign:"center"}} xs={12}>
                        <Stepper activeStep={activeStep}>
                            {
                                steps.map((label) => {
                                    return (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>);
                                })
                            }
                        </Stepper>
                    </Grid>
                    {activeStep === 0 ? <PaymentInformation cart={cart} loading={loading} cardValues={cardValues} setCardValues={setCardValues} expirationDateValues={expirationDateValues} setExpirationDateValues={setExpirationDateValues} cryptogramValues={cryptogramValues} setCryptogramValues={setCryptogramValues} userName={userName} setUserName={setUserName} setNextButtonEnabled={setNextButtonEnabled} zipCodeValues={zipCodeValues} setZipCodeValues={setZipCodeValues} city={city} setCity={setCity} fullAdress={fullAdress} setFullAdress={setFullAdress}/> : <SummaryAndValidation cart={cart} cardValues={cardValues} expirationDateValues={expirationDateValues} cryptogramValues={cryptogramValues} userName={userName} fullAdress={fullAdress} zipCode={zipCodeValues.textmask}/>}
                    <Grid container justify={"center"} style={{margin: "5px"}} spacing={3}>
                        <Grid item>
                            <Button disabled={activeStep === 0} onClick={() => handleBack(setActiveStep)}>
                                Retour
                            </Button>
                        </Grid>
                        <Grid item>
                            {(!nextButtonEnabled && activeStep !== steps.length - 1) ? 
                            <Button
                                disabled
                                variant="contained"
                                color="secondary"
                            >
                                Next
                            </Button>
                            : 
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => {
                                    if (activeStep === steps.length - 1) {
                                        paymentValidation("Commande validée et payée")
                                        router.push("shop");
                                    } else {
                                        handleNext(setActiveStep)}
                                    }
                                }
                            >
                                {activeStep === steps.length - 1 ? 'Payer' : 'Suivant'}
                            </Button>}
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
        </div>
    );
}

export default PaymentContainer;